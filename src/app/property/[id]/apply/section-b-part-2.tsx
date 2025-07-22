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
  nextOfKin: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    telephone: z.string().min(1, { message: "Telephone is required" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    placeOfWork: z.string().min(1, { message: "Place of Work is required" }),
  }),
});

export default function SectionBPart2() {
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
      nextOfKin: {
        name: tenant.nextOfKin.name,
        address: tenant.nextOfKin.address,
        telephone: tenant.nextOfKin.telephone,
        relationship: tenant.nextOfKin.relationship,
        placeOfWork: tenant.nextOfKin.placeOfWork,
      },
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setTenant(values);
    goToNextSubStep();
  }

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-primary lg:text-xl">
        Section B
      </h2>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-black">
                Next of Kin
              </h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="nextOfKin.name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">
                        Name{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange("nextOfKin.name", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nextOfKin.address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">
                        Address{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "nextOfKin.address",
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
                  name="nextOfKin.telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Telephone{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "nextOfKin.telephone",
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
                  name="nextOfKin.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Relationship{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "nextOfKin.relationship",
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
                  name="nextOfKin.placeOfWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Place of Work{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "nextOfKin.placeOfWork",
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
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            {step > 1 || subStep > 1 ? (
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
            )}

            <Button className="w-full" type="submit">
              Save & Go to next <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
