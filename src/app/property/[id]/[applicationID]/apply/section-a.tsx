"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/utils";
import { useApplicationStore } from "@/store/application";

const schema = z.object({
  nin: z.string().min(1, { message: "NIN is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  otherNames: z.string().min(1, { message: "Other Names are required" }),
  contactAddress: z.string().min(1, { message: "Contact Address is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  passportNo: z.string(),
  stateOfOrigin: z.string().min(1, { message: "State of Origin is required" }),
  localGovernment: z
    .string()
    .min(1, { message: "Local Government is required" }),
  townOfOrigin: z.string().min(1, { message: "Town of Origin is required" }),
  maritalStatus: z.string().min(1, { message: "Marital Status is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of Birth is required" }),
  telephone: z
    .string()
    .min(11, {
      message: "Mobile Number is required and should be atleast 11 numbers",
    })
    .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
  personalEmail: z.string().email({ message: "Invalid email address" }),
  numberOfChildren: z.coerce
    .number()
    .min(0, { message: "Number of Children must be a non-negative number" }),
  domicileEmail: z.string().email({ message: "Invalid email address" }),
  profession: z.string().min(1, { message: "Profession is required" }),
  position: z.string().min(1, { message: "Role is required" }),
  officeAddress: z.string().min(1, { message: "Office Address is required" }),
  formOfIdentification: z
    .string()
    .min(1, { message: "Form of Identification is required" }),
  officePhone: z
    .string()
    .min(11, {
      message: "Mobile Number is required and should be atleast 11 numbers",
    })
    .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
});

export default function SectionA() {
  const { goToNextStep, goToPrevStep, setTenant } = useApplicationStore(
    (store) => store.actions,
  );
  const { tenant, actions, step, subStep } = useApplicationStore();
  const handleFieldChange = (name: string, value: any) => {
    actions.setTenant({ [name]: value });
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nin: tenant.nin,
      surname: tenant.surname,
      otherNames: tenant.otherNames,
      contactAddress: tenant.contactAddress,
      nationality: tenant.nationality,
      passportNo: tenant.passportNo,
      stateOfOrigin: tenant.stateOfOrigin,
      localGovernment: tenant.localGovernment,
      townOfOrigin: tenant.townOfOrigin,
      maritalStatus: tenant.maritalStatus,
      dateOfBirth: tenant.dateOfBirth,
      telephone: tenant.telephone,
      personalEmail: tenant.personalEmail,
      numberOfChildren: 0,
      domicileEmail: tenant.domicileEmail,
      profession: tenant.profession,
      position: tenant.position,
      officeAddress: tenant.officeAddress,
      formOfIdentification: tenant.formOfIdentification,
      officePhone: tenant.officePhone,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setTenant(values);
    goToNextStep();
  }

  const [ninStatus, setNinStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);
  const [verifyingNin, setVerifyingNin] = useState(false);

  async function handleVerifyNIN() {
    setVerifyingNin(true);
    setNinStatus(null);
    try {
      const nin = form.getValues("nin");
      const name = `${form.getValues("surname")} ${form.getValues("otherNames")}`;
      const email = form.getValues("personalEmail");
      const phone = form.getValues("telephone");
      const res = await apiRequest("/api/accounts/verify-guest-identity", {
        method: "POST",
        body: JSON.stringify({ nin, name, email, phone }),
      });
      setNinStatus({ success: true, message: "NIN verified successfully." });
    } catch (e: any) {
      setNinStatus({
        success: false,
        message: e.message || "NIN verification failed.",
      });
    } finally {
      setVerifyingNin(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section A
      </h2>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    NIN{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("nin", e.target.value);
                        }}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={handleVerifyNIN}
                      disabled={verifyingNin || !form.getValues("nin")}
                      className="shrink-0"
                    >
                      {verifyingNin ? "Verifying..." : "Verify NIN"}
                    </Button>
                  </div>
                  {ninStatus && (
                    <div
                      className={`mt-1 text-sm ${ninStatus.success ? "text-green-600" : "text-red-600"}`}
                    >
                      {ninStatus.message}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Surname{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("surname", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherNames"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Other Names{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("otherNames", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Contact Address{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("contactAddress", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Nationality{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("nationality", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Passport No. (If Non-Nigerian)
                    <span className="text-xs text-black"> </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("passportNo", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stateOfOrigin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    State of Origin{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("stateOfOrigin", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="localGovernment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Local Government{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("localGovernment", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="townOfOrigin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Town/Village{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("townOfOrigin", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Marital Status{" "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("maritalStatus", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Date of Birth{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="date"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("dateOfBirth", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Telephone{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("telephone", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalEmail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Personal Email{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("personalEmail", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfChildren"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Number of Children{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      min={0}
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("numberOfChildren", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domicileEmail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Domicile Email{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("domicileEmail", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Profession/Occupation{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("profession", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Position{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("position", e.target.value);
                      }}
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
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Office/Business Address{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("officeAddress", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="officePhone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Office Phone{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("officePhone", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formOfIdentification"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    Form of Identification{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange(
                          "formOfIdentification",
                          e.target.value,
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            {/* {step > 1 || subStep > 1 ? (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => {
                  setTenant(form.getValues());
                  goToPrevStep();
                }}
              >
                <ChevronLeft />
                Back
              </Button>
            ) : (
              <div className="w-full"></div>
            )} */}

            <Button className="w-full h-[52px]" type="submit">
              Save & Go to next <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
