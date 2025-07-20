"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronRight, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

// Schema for the first step
const step1Schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
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
  passportFile: z.any().optional(),
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
  passportFile: any;
  agreement: boolean;
  // Add more fields for future steps
};

// Custom Stepper for Guarantor Form
function GuarantorStepper({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const getStepLabel = (stepNumber: number) => {
    const labels = ["Step 1", "Step 2", "Step 3", "Step 4"];
    return labels[stepNumber - 1] || "";
  };

  const isStepCompleted = (stepNumber: number) => {
    return currentStep > stepNumber;
  };

  const isCurrentStep = (stepNumber: number) => {
    return currentStep === stepNumber;
  };

  const isStepActive = (stepNumber: number) => {
    return isStepCompleted(stepNumber) || isCurrentStep(stepNumber);
  };

  return (
    <div className="my-6 w-full">
      {/* Progress Bar with Dots */}
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 right-0 h-0.5 bg-gray-300"></div>

        {/* Progress Line */}
        <div
          className="absolute left-0 h-0.5 bg-teal-600 transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {/* Step Dots */}
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="relative z-10">
            <div
              className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ease-in-out ${
                isStepActive(stepNumber)
                  ? "border-teal-600 bg-teal-600"
                  : "border-gray-300 bg-white"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="mt-3 flex justify-between text-xs">
        {[1, 2, 3, 4].map((stepNumber) => (
          <span
            key={stepNumber}
            className={`font-medium transition-colors duration-300 ${
              isStepActive(stepNumber) ? "text-teal-600" : "text-gray-500"
            }`}
          >
            {getStepLabel(stepNumber)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function GuarantorForm() {
  const [step, setStep] = useState(1);
  const [guarantorData, setGuarantorData] = useState<GuarantorData>({
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
    passportFile: null,
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
      passportFile: guarantorData.passportFile,
    },
  });

  const form4 = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      agreement: guarantorData.agreement,
    },
  });

  function onSubmitStep1(values: Step1Data) {
    setGuarantorData((prev) => ({ ...prev, ...values }));
    setStep(2);
    console.log("Step 1 data:", values);
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
    setGuarantorData((prev) => ({ ...prev, ...values }));
    console.log("Final guarantor data:", guarantorData);
    console.log("Step 4 data:", values);
    // Here you would typically submit to API
    alert("Guarantor form submitted successfully!");
  }

  function renderContent(step: number) {
    switch (step) {
      case 1:
        return <Step1Form form={form1} onSubmit={onSubmitStep1} />;
      case 2:
        return <Step2Form form={form2} onSubmit={onSubmitStep2} />;
      case 3:
        return <Step3Form form={form3} onSubmit={onSubmitStep3} />;
      case 4:
        return (
          <Step4Form
            form={form4}
            onSubmit={onSubmitStep4}
            guarantorData={guarantorData}
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
        <h1 className="text-xl font-bold leading-tight text-gray-900">
          Dwight Schrute has named you as a Guarantor for his apartment rental
          application
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          As a Guarantor, you are responsible for Dwight Schrute's apartment
          rental obligations
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <GuarantorStepper currentStep={step} totalSteps={4} />
      </div>

      {/* Form Content */}
      {renderContent(step)}
    </div>
  );
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
      <h2 className="mb-6 text-lg font-semibold text-primary lg:text-xl">
        Personal Contact Information
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full name{" "}
                  <span className="text-xs text-black">(Required*)</span>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email address{" "}
                  <span className="text-xs text-black">(Required*)</span>
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
                <FormLabel>
                  Phone number{" "}
                  <span className="text-xs text-black">(Required*)</span>
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
                <FormLabel>
                  Home address{" "}
                  <span className="text-xs text-black">(Required*)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your home address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
            >
              Save & go to next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
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
      <h2 className="mb-6 text-lg font-semibold text-primary lg:text-xl">
        Location Information
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="stateOfOrigin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  State of Origin{" "}
                  <span className="text-xs text-black">(Required*)</span>
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
                <FormLabel>
                  City/Town{" "}
                  <span className="text-xs text-black">(Required*)</span>
                </FormLabel>
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
                <FormLabel>
                  L.G.A <span className="text-xs text-black">(Required*)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your Local Government Area" {...field} />
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
                <FormLabel>
                  Office Address{" "}
                  <span className="text-xs text-black">(Required*)</span>
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
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
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
}: {
  form: any;
  onSubmit: (values: Step3Data) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("passportFile", file);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold text-primary lg:text-xl">
        Signature & Documentation
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Signature/Initials{" "}
                  <span className="text-xs text-black">(Required*)</span>
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
                <FormLabel>
                  Date <span className="text-xs text-black">(Required*)</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passport Upload Section */}
          <div className="space-y-4">
            <FormLabel>
              Passport Upload{" "}
              <span className="text-xs text-black">(Required*)</span>
            </FormLabel>

            <div className="rounded-lg border-2 border-dashed border-teal-200 p-6 text-center">
              <input
                type="file"
                id="passport-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleFileChange}
              />
              <label htmlFor="passport-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <div className="rounded-lg bg-teal-100 p-3">
                    <Upload className="h-6 w-6 text-teal-600" />
                  </div>
                  <span className="font-medium text-black underline">
                    Upload passport
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
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
            >
              Save & go to next <ChevronRight className="ml-2 h-4 w-4" />
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
}: {
  form: any;
  onSubmit: (values: Step4Data) => void;
  guarantorData: GuarantorData;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-lg font-semibold text-primary lg:text-xl">
        Guarantee Undertaking
      </h2>

      {/* Photo Placeholder */}
      <div className="mb-6">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-200">
          <span className="px-2 text-center text-xs text-gray-500">
            (whose photograph appeared above and attached means of
            identification)
          </span>
        </div>
      </div>

      {/* Undertaking Form */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 lg:p-8">
        <h3 className="mb-6 text-center text-lg font-bold uppercase lg:text-xl">
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
            <span className="font-semibold">Dwight Schrute</span> is well known
            to me; he/she is very responsible and not of questionable character.
          </p>

          <p>
            I also certify that he/she is capable of paying the initial rent of{" "}
            <span className="text-lg font-bold">N 500,000</span> as well as
            other charges and subsequent rents in advance or any other
            arrangement as shall be agreed between him/her and the
            Landlord/landlady. He/She will be of good behavior and will keep the
            demise premises in a good and tenantable condition whilst in
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
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
            >
              Submit <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
