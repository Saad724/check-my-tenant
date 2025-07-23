"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { useApplicationStore } from "@/store/application";

const schema = z.object({
  religion: z.string().min(1, { message: "Religion is required" }),
  otherReligion: z.string().optional(),
  placeOfWorship: z
    .string()
    .min(1, { message: "Place of Worship is required" }),
  possessionTiming: z
    .string()
    .min(1, { message: "Possession timing is required" }),
  applicantSignature: z
    .string()
    .min(1, { message: "Applicant Signature is required" }),
  applicationDate: z
    .string()
    .min(1, { message: "Application Date is required" }),
});

export default function SectionCPart2() {
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
      religion: tenant.religion || "",
      otherReligion: tenant.otherReligion || "",
      placeOfWorship: tenant.placeOfWorship,
      possessionTiming: tenant.possessionTiming || "",
      applicantSignature: tenant.applicantSignature,
      applicationDate: tenant.applicationDate,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setTenant({
      ...values,
      possessionTiming: values.possessionTiming,
    });
    goToNextSubStep();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section C
      </h2>

      <Form {...form}>
        <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-black">
                Religion
              </h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label htmlFor="christian" className="radio-label">
                              Christian
                            </label>
                            <input
                              type="radio"
                              id="christian"
                              value="Christian"
                              checked={field.value === "Christian"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange("religion", e.target.value);
                              }}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="muslim" className="radio-label">
                              Muslim
                            </label>
                            <input
                              type="radio"
                              id="muslim"
                              value="Muslim"
                              checked={field.value === "Muslim"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange("religion", e.target.value);
                              }}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherReligion"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Others? State here{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange("otherReligion", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="placeOfWorship"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Place of worship{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange("placeOfWorship", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-black">
                How soon do you want to take possession?
              </h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="possessionTiming"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="Immediately"
                              className="radio-label"
                            >
                              Immediately
                            </label>
                            <input
                              type="radio"
                              id="Immediately"
                              value="Immediately"
                              checked={field.value === "Immediately"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange(
                                  "possessionTiming",
                                  e.target.value,
                                );
                              }}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="oneMonth" className="radio-label">
                              One month
                            </label>
                            <input
                              type="radio"
                              id="oneMonth"
                              value="oneMonth"
                              checked={field.value === "oneMonth"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange(
                                  "possessionTiming",
                                  e.target.value,
                                );
                              }}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="threeMonths"
                              className="radio-label"
                            >
                              Three month
                            </label>
                            <input
                              type="radio"
                              id="threeMonths"
                              value="threeMonths"
                              checked={field.value === "threeMonths"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange(
                                  "possessionTiming",
                                  e.target.value,
                                );
                              }}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="applicantSignature"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Applicant Signature{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "applicantSignature",
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
                name="applicationDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Date{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="date"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("applicationDate", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

            <Button className="w-full h-[52px]" type="submit">
              Save & Go to next <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
