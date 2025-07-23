"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { apiRequest } from "@/lib/utils";
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
});

export default function SectionAPart1() {
  const { goToNextSubStep, goToPrevSubStep, setTenant } = useApplicationStore(
    (store) => store.actions,
  );
  const { tenant, actions, step, subStep } = useApplicationStore();

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
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setTenant(values);
    goToNextSubStep();
  }

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-primary lg:text-xl">
        Section A
      </h2>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm">
                    NIN{"  "}
                    <span className="text-xs text-black">(Required*)</span>
                  </FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            {/* {step > 1 || subStep > 1 ? (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => {
                  setTenant(form.getValues());
                  goToPrevSubStep();
                }}
              >
                <ChevronLeft />
                Back
              </Button>
            ) : (
              <div className="w-full"></div>
            )} */}

            <Button className="h-[52px] w-full" type="submit">
              Save & Go to next <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
