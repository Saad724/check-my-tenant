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
  profession: z.string().min(1, { message: "Profession is required" }),
  position: z.string().min(1, { message: "Role is required" }),
  officeAddress: z.string().min(1, { message: "Office Address is required" }),
  formOfIdentification: z
    .string()
    .min(1, { message: "Form of Identification is required" }),
  officeEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .optional(),
});

export default function SectionAPart2() {
  const { goToNextSubStep, setTenant } = useApplicationStore(
    (store) => store.actions,
  );
  const { tenant, actions } = useApplicationStore();

  const handleFieldChange = (name: string, value: any) => {
    actions.setTenant({ [name]: value });
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      maritalStatus: tenant.maritalStatus,
      dateOfBirth: tenant.dateOfBirth,
      telephone: tenant.telephone,
      personalEmail: tenant.personalEmail,
      numberOfChildren: tenant.numberOfChildren || 0,
      profession: tenant.profession,
      position: tenant.position,
      officeAddress: tenant.officeAddress,
      formOfIdentification: tenant.formOfIdentification,
      officeEmail: tenant.officeEmail,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setTenant(values);
    goToNextSubStep();
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
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
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
            <FormField
              control={form.control}
              name="officeEmail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Office Email{"  "}
                    <span className="text-xs text-black">(Optional*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("officeEmail", e.target.value);
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
