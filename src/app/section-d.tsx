"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { Tenant, useApplicationStore } from "@/store/application";

const schema = z.object({
  guarantors: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      age: z.coerce.number().min(18, { message: "Age must be at least 18" }),
      telephone: z.string().min(1, { message: "Telephone is required" }),
      address: z.string().min(1, { message: "Address is required" }),
      placeOfWorkAddress: z
        .string()
        .min(1, { message: "Place of Work Address is required" }),
      occupation: z.string().min(1, { message: "Occupation is required" }),
      positionInCompany: z
        .string()
        .min(1, { message: "Position in Company is required" }),
      maritalStatus: z
        .string()
        .min(1, { message: "Marital Status is required" }),
      signature: z.string().min(1, { message: "Signature is required" }),
      date: z.string().min(1, { message: "Date is required" }),
    }),
  ),
});

export default function SectionD() {
  const tenant = useApplicationStore((store) => store.tenant);
  const { goToNextStep, resetStore, setTenant } = useApplicationStore(
    (store) => store.actions,
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      guarantors: [
        {
          name: "",
          age: 0,
          telephone: "",
          address: "",
          placeOfWorkAddress: "",
          occupation: "",
          positionInCompany: "",
          maritalStatus: "",
          signature: "",
          date: "",
        },
      ],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Tenant) => {
      await fetch(
        "http://check-my-tenant.vercel.app/api/tenants/tenant-application",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      goToNextStep();
      toast.success("Application submitted successfully");
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const vals = { ...tenant, ...values };
    console.log(vals);
    mutation.mutate({ ...tenant, ...values });
  }

  return (
    <div className="my-4 border-t py-2">
      <h2 className="text-lg font-semibold text-black lg:text-xl">Section D</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h3 className="my-4 text-sm font-semibold uppercase text-black">
              Guarantors
            </h3>
            <p className="text-sm">
              (Please give names and addresses of 2 persons; who shall be
              required to provide a letter of guarantee/recommendation on letter
              headed paper).
            </p>
          </div>

          <div>
            <h4 className="my-6 text-sm font-semibold uppercase text-black">
              Guarantor A
            </h4>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`guarantors.0.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.age`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.telephone`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.address`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.placeOfWorkAddress`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Place of Work Address</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.occupation`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.positionInCompany`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Position in Company</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.maritalStatus`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.signature`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Signature</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h4 className="my-6 text-sm font-semibold uppercase text-black">
              Guarantor B
            </h4>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`guarantors.1.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.age`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.telephone`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.address`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.placeOfWorkAddress`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Place of Work Address</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.occupation`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.positionInCompany`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Position in Company</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.maritalStatus`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.signature`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Signature</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.1.date`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <Button className="w-full" type="button" variant="outline">
              <ChevronLeft />
              Section C
            </Button>

            <Button className="w-full" variant="outline" type="submit">
              {mutation.isPending ? (
                <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-primary ease-linear"></div>
              ) : null}
              Submit <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
