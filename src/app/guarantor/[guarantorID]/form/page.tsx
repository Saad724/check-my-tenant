"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Check, ChevronRight, Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/utils";

// Schema for the first step
const step1Schema = z.object({
  nin: z.string().min(1, { message: "NIN is required" }),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(11, {
      message: "Mobile Number is required and should be atleast 11 numbers",
    })
    .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
  homeAddress: z.string().min(1, "Home address is required"),
});

type Step1Data = z.infer<typeof step1Schema>;

// Schema for the second step
const step2Schema = z.object({
  stateOfOrigin: z.string().min(1, "State of origin is required"),
  cityTown: z.string().min(1, "City/Town is required"),
  lga: z.string().min(1, "L.G.A is required"),
  officeAddress: z.string().min(1, "Office address is required"),
});

type Step2Data = z.infer<typeof step2Schema>;

// Schema for the third step
const step3Schema = z.object({
  signature: z.string().min(1, "Signature/Initials is required"),
  date: z.string().min(1, "Date is required"),
  passport: z.any().optional(),
});

type Step3Data = z.infer<typeof step3Schema>;

// Schema for the fourth step
const step4Schema = z.object({
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type Step4Data = z.infer<typeof step4Schema>;

// Guarantor store type
type GuarantorData = {
  nin: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  stateOfOrigin: string;
  cityTown: string;
  lga: string;
  officeAddress: string;
  signature: string;
  date: string;
  passport: any;
  agreement: boolean;
};

export default function GuarantorForm() {
  const params = useParams();
  const [
    guarantorFreeIdentityVerificationExhausted,
    setGuarantorFreeIdentityVerificationExhausted,
  ] = useState<String>(
    localStorage.getItem("guarantorFreeIdentityVerificationExhausted") ||
      "false",
  );
  const guarantorID = params.guarantorID;
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [verifyingNIN, setVerifyingNIN] = useState(false);
  const [guarantorData, setGuarantorData] = useState<GuarantorData>({
    nin: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    stateOfOrigin: "",
    cityTown: "",
    lga: "",
    officeAddress: "",
    signature: "",
    date: "",
    passport: null,
    agreement: false,
  });

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: guarantorData.fullName,
      email: guarantorData.email,
      phoneNumber: guarantorData.phoneNumber,
      homeAddress: guarantorData.homeAddress,
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      stateOfOrigin: guarantorData.stateOfOrigin,
      cityTown: guarantorData.cityTown,
      lga: guarantorData.lga,
      officeAddress: guarantorData.officeAddress,
    },
  });

  const form3 = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      signature: guarantorData.signature,
      date: guarantorData.date,
      passport: guarantorData.passport,
    },
  });

  const form4 = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      agreement: guarantorData.agreement,
    },
  });

  async function handleVerifyNIN(values: any) {
    try {
      setVerifyingNIN(true);
      const nin = values.nin;
      const name = values.fullName;
      const email = values.email;
      const phone = values.phoneNumber;
      await apiRequest("/api/accounts/verify-guest-identity", {
        method: "POST",
        body: JSON.stringify({ nin, name, email, phone }),
      });
      setGuarantorData((prev) => ({ ...prev, ...values }));
      setStep(2);
      console.log("Step 1 data:", values);
    } catch (e: any) {
      localStorage.setItem(
        "guarantorFreeIdentityVerificationExhausted",
        "true",
      );
      setGuarantorFreeIdentityVerificationExhausted("true");
      toast.error(e.message || "NIN verification failed.");
    } finally {
      setVerifyingNIN(false);
    }
  }

  const payWithPayStack = async (email: string) => {
    try {
      const response = await axios.post(
        `https://api.paystack.co/transaction/initialize`,
        {
          email,
          amount: 50000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const checkoutUrl = response.data.data.authorization_url;
      window.location.href = checkoutUrl;
    } catch (e: any) {
      toast.error(e.message || "Error initializing payment");
    }
  };

  async function onSubmitStep1(values: Step1Data) {
    if (
      localStorage.getItem("guarantorFreeIdentityVerificationExhausted") ===
      "false"
    ) {
      await handleVerifyNIN(values);
    }
  }

  function onSubmitStep2(values: Step2Data) {
    setGuarantorData((prev) => ({ ...prev, ...values }));
    setStep(3);
    console.log("Step 2 data:", values);
  }

  function onSubmitStep3(values: Step3Data) {
    setGuarantorData((prev) => ({ ...prev, ...values }));
    setStep(4);
    console.log("Step 3 data:", values);
  }

  function onSubmitStep4(values: Step4Data) {
    const id = guarantorID;
    setGuarantorData((prev) => ({ ...prev, ...values }));
    setIsSubmitting(true);

    const payload = {
      fullName: guarantorData.fullName,
      emailAddress: guarantorData.email,
      NIN: guarantorData.nin,
      phoneNumber: guarantorData.phoneNumber,
      homeAddress: guarantorData.homeAddress,
      stateOfOrigin: guarantorData.stateOfOrigin,
      cityTown: guarantorData.cityTown,
      LGA: guarantorData.lga,
      officeAddress: guarantorData.officeAddress,
      placeOfWork: guarantorData.officeAddress,
      occupation: "",
      positionInCompany: "", // Add if available
      maritalStatus: "", // Add if available
      signature: guarantorData.signature,
      date: new Date(guarantorData.date),
      passport: guarantorData.passport, // Add if available
    };

    apiRequest(`/api/tenants/update-guarantor?id=${id}`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(() => {
        toast.success("Guarantor form submitted successfully!");
      })
      .catch((e) => {
        toast.error(e.message || "Failed to submit guarantor form");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  // Step 1 Component
  function Step1Form({
    form,
    onSubmit,
  }: {
    form: any;
    onSubmit: (values: Step1Data) => void;
  }) {
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    NIN
                    <span className="text-xs text-black"> (Required*)</span>
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Nin number"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">Full name </FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">
                    Email address{" "}
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">
                    Phone number{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="homeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">
                    Home address{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your home address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              {guarantorFreeIdentityVerificationExhausted === "true" ? (
                <PaystackButton
                  email={form.getValues("email")}
                  amount={50000}
                  metadata={{
                    name: form.getValues("fullName"),
                    phone: form.getValues("telephone"),
                    custom_fields: [
                      {
                        display_name: "Name",
                        variable_name: "name",
                        value: form.getValues("fullName"),
                      },
                      {
                        display_name: "Phone",
                        variable_name: "phone",
                        value: form.getValues("telephone"),
                      },
                    ],
                  }}
                  publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
                  onSuccess={async (transaction: any) => {
                    setGuarantorFreeIdentityVerificationExhausted("false");
                    localStorage.setItem(
                      "guarantorFreeIdentityVerificationExhausted",
                      "false",
                    );
                    console.log(
                      `Payment successful! Reference: ${transaction.reference}`,
                    );
                    console.log("Payment successful:", transaction);
                  }}
                  onClose={() => {
                    alert("Payment cancelled");
                    console.log("Payment cancelled");
                  }}
                  className="inline-flex h-[52px] w-full items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  disabled={verifyingNIN}
                  text={verifyingNIN ? "Verifying..." : "Save & go to next"}
                />
              ) : (
                <Button
                  type="submit"
                  className="guarantor-primary h-[52px] w-full"
                  disabled={verifyingNIN}
                >
                  {verifyingNIN ? (
                    "Verifying..."
                  ) : (
                    <>
                      Save & go to next{" "}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    );
  }

  // Step 2 Component
  function Step2Form({
    form,
    onSubmit,
  }: {
    form: any;
    onSubmit: (values: Step2Data) => void;
  }) {
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="stateOfOrigin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">
                    State of Origin{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your state of origin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cityTown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">City/Town </FormLabel>
                  <FormControl>
                    <Input placeholder="Your city or town" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">L.G.A</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Local Government Area"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="officeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">
                    Office Address{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your office address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="guarantor-primary h-[52px] w-full"
              >
                Save & go to next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  // Step 3 Component
  function Step3Form({
    form,
    onSubmit,
    uploadingFile,
    setUploadingFile,
  }: {
    form: any;
    onSubmit: (values: Step3Data) => void;
    uploadingFile: boolean;
    setUploadingFile: (value: boolean) => void;
  }) {
    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setUploadingFile(true);
        try {
          const passport = await uploadPassport(file);
          form.setValue("passport", passport);
        } catch (error) {
          console.error("Error uploading passport:", error);
          toast.error("Failed to upload passport. Please try again.");
        } finally {
          setUploadingFile(false);
        }
      }
    };

    const uploadPassport = async (file: any) => {
      const base64Image = await fileToBase64(file);

      const res = await apiRequest("/api/upload", {
        method: "POST",
        body: JSON.stringify({ base64Image }),
      });

      return res?.url;
    };

    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    return (
      <div>
        <h2 className="guarantor-h2 guarantor-section-heading mb-6 text-lg font-semibold text-primary lg:text-xl">
          Signature & Documentation
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">
                    Signature/Initials{" "}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="guarantor-label">Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Passport Upload Section */}
            <div className="space-y-4">
              <FormLabel className="guarantor-label">
                Passport Upload{" "}
              </FormLabel>

              <div className="rounded-lg border-2 border-dashed border-teal-200 p-6 text-center">
                <input
                  type="file"
                  id="passport-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={handleFileChange}
                  disabled={uploadingFile}
                />
                <label
                  htmlFor="passport-upload"
                  className={`cursor-pointer ${uploadingFile ? "pointer-events-none opacity-50" : ""}`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="rounded-lg bg-teal-100 p-3">
                      {uploadingFile ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-600 border-t-transparent"></div>
                      ) : (
                        <Upload className="h-6 w-6 text-teal-600" />
                      )}
                    </div>
                    <span className="font-medium text-black underline">
                      {uploadingFile ? "Uploading..." : "Upload passport"}
                    </span>
                    <span className="text-sm text-gray-500">
                      JPG, PNG or GIF - Max file size 2MB
                    </span>
                    {selectedFile && (
                      <span className="text-sm font-medium text-teal-600">
                        Selected: {selectedFile.name}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="guarantor-primary h-[52px] w-full"
                disabled={uploadingFile}
              >
                {uploadingFile ? (
                  "Uploading..."
                ) : (
                  <>
                    Save & go to next <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  // Step 4 Component
  function Step4Form({
    form,
    onSubmit,
    guarantorData,
    isSubmitting,
  }: {
    form: any;
    onSubmit: (values: Step4Data) => void;
    guarantorData: GuarantorData;
    isSubmitting: boolean;
  }) {
    return (
      <div className="mx-auto max-w-4xl">
        {/* Photo Placeholder */}
        <div className="mb-6">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-200">
            <span className="px-2 text-center text-xs text-gray-500">
              {guarantorData?.passport ? (
                <img src={guarantorData?.passport} />
              ) : (
                <p>
                  (whose photograph appeared above and attached means of
                  identification)
                </p>
              )}
            </span>
          </div>
        </div>

        {/* Undertaking Form */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 lg:p-8">
          <h3 className="undertaking-title mb-6 text-center uppercase">
            Undertaking from a Guarantor
          </h3>

          <div className="space-y-4 text-sm leading-relaxed lg:text-base">
            <p>
              I,{" "}
              <span className="font-semibold underline">
                {guarantorData.fullName || "Dwight Schrute"}
              </span>
              , (whose photograph appeared above and attached means of
              identification), an origin of{" "}
              <span className="font-semibold underline">
                {guarantorData.stateOfOrigin || "Lagos"}
              </span>
              , Local Government Area in{" "}
              <span className="font-semibold underline">
                {guarantorData.lga || "Eti-Osa"}
              </span>
              , State and presently resident at{" "}
              <span className="font-semibold underline">
                {guarantorData.officeAddress || "Dangi Street, Eti-osa"}
              </span>
              , Lagos State of Nigeria with office/business address at{" "}
              <span className="font-semibold underline">
                {guarantorData.officeAddress || "Dangi Street, Eti-osa"}
              </span>{" "}
              do hereby certify that MR/MRS MISS{" "}
              <span className="font-semibold">Dwight Schrute</span> is well
              known to me; he/she is very responsible and not of questionable
              character.
            </p>

            <p>
              I also certify that he/she is capable of paying the initial rent
              of{" "}
              <span className="text-lg font-bold">
                N <span className="font-semibold underline">500,000</span>
              </span>{" "}
              as well as other charges and subsequent rents in advance or any
              other arrangement as shall be agreed between him/her and the
              Landlord/landlady. He/She will be of good behavior and will keep
              the demise premises in a good and tenantable condition whilst in
              possession and until he/she surrenders possession.
            </p>

            <p>
              In the event of a default or inability to meet his/her obligation
              under tenancy, I hereby undertake to take full responsibility and
              make payment for any unpaid/outstanding rent, levies, charges or
              rates including water, electricity and service charge payable by
              him/her during period of occupation as well as cost incurred on
              replacement of items damaged in the property which he/she fails to
              remedy and repair as at date of vacating the property.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-8 grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:text-base">
            <div className="flex items-center">
              <span className="min-w-[60px] font-semibold">Date:</span>{" "}
              <span className="ml-2 underline">
                {guarantorData.date || "23 Mar, 2024"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="min-w-[80px] font-semibold">Tel. No:</span>{" "}
              <span className="ml-2 underline">
                {guarantorData.phoneNumber || "080 784 499 3443"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="min-w-[60px] font-semibold">Email:</span>{" "}
              <span className="ml-2 underline">
                {guarantorData.email || "DwightSchrute@gmail.com"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="min-w-[70px] font-semibold">Initials:</span>{" "}
              <span className="ml-2 underline">
                {guarantorData.signature || "U.U.H"}
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      This agreement is valid and enforceable based on the
                      information, signature, and initials that I have supplied.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="guarantor-primary h-[52px] w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-white ease-linear"></div>
                ) : (
                  <>
                    Submit <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  function renderContent(step: number) {
    switch (step) {
      case 1:
        return <Step1Form form={form1} onSubmit={onSubmitStep1} />;
      case 2:
        return <Step2Form form={form2} onSubmit={onSubmitStep2} />;
      case 3:
        return (
          <Step3Form
            form={form3}
            onSubmit={onSubmitStep3}
            uploadingFile={uploadingFile}
            setUploadingFile={setUploadingFile}
          />
        );
      case 4:
        return (
          <Step4Form
            form={form4}
            onSubmit={onSubmitStep4}
            guarantorData={guarantorData}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return <Step1Form form={form1} onSubmit={onSubmitStep1} />;
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="guarantor-main-heading text-xl font-bold leading-tight">
          Dwight Schrute has named you as a Guarantor for his apartment rental
          application
        </h1>
        <p className="guarantor-subheading mt-4">
          As a Guarantor, you are responsible for Dwight Schrute&apos;s
          apartment rental obligations
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        {/* <GuarantorStepper currentStep={step} totalSteps={4} /> */}
      </div>

      {/* Form Content */}
      {renderContent(step)}
    </div>
  );
}
