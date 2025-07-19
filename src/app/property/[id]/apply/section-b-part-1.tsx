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
import { useApplicationStore } from "@/store/application";

const schema = z.object({
  spouse: z.object({
    surname: z.string().min(1, { message: "Surname is required" }),
    otherNames: z.string().min(1, { message: "Other Names is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    telephone: z
      .string()
      .min(11, {
        message: "Mobile Number is required and should be atleast 11 numbers",
      })
      .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
    placeOfWork: z.string().min(2, { message: "Place of Work is required" }),
  }),
});

export default function SectionBPart1() {
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
      spouse: {
        surname: tenant.spouse.surname,
        otherNames: tenant.spouse.otherNames,
        address: tenant.spouse.address,
        telephone: tenant.spouse.telephone,
        placeOfWork: tenant.spouse.placeOfWork,
      },
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setTenant(values);
    goToNextSubStep();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section B - First Part
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
                      <FormLabel>
                        Address{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
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
                      <FormLabel>
                        Telephone{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
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
                      <FormLabel>
                        Place of Work{"  "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
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
