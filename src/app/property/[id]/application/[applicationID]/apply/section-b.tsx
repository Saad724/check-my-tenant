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
  spouse: z.object({
    surname: z.string().min(1, { message: "Surname is required" }),
    otherNames: z.string().min(1, { message: "Other Names are required" }),
    address: z.string().min(1, { message: "Address is required" }),
    telephone: z
      .string()
      .min(11, {
        message: "Mobile Number is required and should be atleast 11 numbers",
      })
      .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
    placeOfWork: z.string().min(2, { message: "Place of Work is required" }),
  }),
  nextOfKin: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(2, { message: "Address is required" }),
    telephone: z
      .string()
      .min(11, {
        message: "Mobile Number is required and should be atleast 11 numbers",
      })
      .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    placeOfWork: z.string().min(1, { message: "Place of Work is required" }),
  }),
});

export default function SectionB() {
  const { goToNextStep, goToPrevStep, setTenant } = useApplicationStore(
    (store) => store.actions,
  );
  const { tenant, actions } = useApplicationStore();
  const handleFieldChange = (name: string, value: any) => {
    actions.setTenant({ [name]: value });
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      spouse: {
        surname: tenant.spouse.surname,
        otherNames: tenant.spouse.otherNames,
        address: tenant.spouse.address,
        telephone: tenant.spouse.telephone,
        placeOfWork: tenant.spouse.placeOfWork,
      },
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
    goToNextStep();
  }

  const handlePrevious = () => {
    setTenant(form.getValues());
    goToPrevStep();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section B
      </h2>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <h3 className="my-4 text-lg font-semibold text-black">Spouse</h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="spouse.surname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">Surname</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange("spouse.surname", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spouse.otherNames"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">Other Names</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "spouse.otherNames",
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
                  name="spouse.address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm">Address</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange("spouse.address", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spouse.telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Telephone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "spouse.telephone",
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
                  name="spouse.placeOfWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Place of Work</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "spouse.placeOfWork",
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
                      <FormLabel className="text-sm">Name</FormLabel>
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
                      <FormLabel className="text-sm">Address</FormLabel>
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
                      <FormLabel className="text-sm">Telephone</FormLabel>
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
                      <FormLabel className="text-sm">Relationship</FormLabel>
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
                      <FormLabel className="text-sm">Place of Work</FormLabel>
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
            <Button className="w-full" type="button" onClick={handlePrevious}>
              <ChevronLeft />
              Section A
            </Button>

            <Button className="w-full" type="submit">
              Section C <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
