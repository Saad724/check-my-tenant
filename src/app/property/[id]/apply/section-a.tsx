"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
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
import { useApplicationStore } from "@/store/application";

const schema = z.object({
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
  const { goToNextStep, setTenant } = useApplicationStore(
    (store) => store.actions,
  );
  const { tenant, actions } = useApplicationStore();
  const handleFieldChange = (name: string, value: any) => {
    actions.setTenant({ [name]: value });
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
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
              name="surname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
                    Marital Status{" "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleFieldChange("maritalStatus", value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition duration-150 ease-in-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-md border border-gray-300 bg-white shadow-lg">
                      <SelectItem
                        value="Married"
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      >
                        Married
                      </SelectItem>
                      <SelectItem
                        value="Single"
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                      >
                        Single
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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
                  <FormLabel>
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

          <div className="my-5">
            <Button className="w-full" type="submit">
              Save & Go to next <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
