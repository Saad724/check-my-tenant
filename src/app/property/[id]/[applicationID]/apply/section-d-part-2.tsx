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
import { apiRequest } from "@/lib/utils";
import { Tenant, useApplicationStore } from "@/store/application";
import { useParams } from "next/navigation";

const schema = z.object({
  guarantors: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Valid email is required" }),
      // age: z.coerce.number().min(18, { message: "Age must be at least 18" }),
      // telephone: z
      //   .string()
      //   .min(11, {
      //     message: "Mobile Number is required and should be atleast 11 numbers",
      //   })
      //   .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
      // address: z.string().min(2, { message: "Address is required" }),
      // placeOfWorkAddress: z
      //   .string()
      //   .min(2, { message: "Place of Work Address is required" }),
      // occupation: z.string().min(2, { message: "Occupation is required" }),
      // positionInCompany: z
      //   .string()
      //   .min(2, { message: "Position in Company is required" }),
      // maritalStatus: z
      //   .string()
      //   .min(1, { message: "Marital Status is required" }),
      // signature: z.string().min(1, { message: "Signature is required" }),
      // date: z.string().min(1, { message: "Date is required" }),
    }),
  ),
});

export default function SectionDPart2({
  landlordId,
  propertyId,
}: {
  landlordId: string;
  propertyId: string;
}) {
  const params = useParams();
  const applicationID = params.applicationID;
  const { tenant, step, subStep } = useApplicationStore();
  const { goToNextSubStep, goToPrevSubStep, setTenant, goToFinish } =
    useApplicationStore((store) => store.actions);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      guarantors: [
        {
          name: tenant.guarantors?.[1]?.name || "",
          email: tenant.guarantors?.[1]?.email || "",
          // age: tenant.guarantors?.[1]?.age || 0,
          // telephone: tenant.guarantors?.[1]?.telephone || "",
          // address: tenant.guarantors?.[1]?.address || "",
          // placeOfWorkAddress: tenant.guarantors?.[1]?.placeOfWorkAddress || "",
          // occupation: tenant.guarantors?.[1]?.occupation || "",
          // positionInCompany: tenant.guarantors?.[1]?.positionInCompany || "",
          // maritalStatus: tenant.guarantors?.[1]?.maritalStatus || "",
          // signature: tenant.guarantors?.[1]?.signature || "",
          // date: tenant.guarantors?.[1]?.date || "",
        },
      ],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Tenant) => {
      const response = await apiRequest("/api/tenants/tenant-application", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response && response.message && response.status === "error") {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error: any) => {
      toast.error(error.message || "Application submission failed");
    },
    onSuccess: (data) => {
      toast.success("Application submitted successfully");
      goToFinish();
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    // Merge with existing guarantor A data
    const updatedGuarantors = [
      tenant.guarantors?.[0] || {
        name: "",
        email: "",
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
      {
        ...values.guarantors[0],
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
    ];

    const finalData = {
      ...tenant,
      landlordId,
      propertyId,
      applicationId: applicationID,
      guarantors: updatedGuarantors,
    };

    console.log(finalData);
    mutation.mutate(finalData);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section D
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h4 className="my-6 text-sm font-semibold uppercase text-black">
              Guarantor B
            </h4>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`guarantors.0.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Name{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`guarantors.0.email`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Email{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name={`guarantors.0.age`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Age{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Telephone{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Address{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Place of Work Address{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Occupation{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Position in Company{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Marital Status{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Signature{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
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
                    <FormLabel>
                      Date{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            {/* {step > 1 || subStep > 1 ? (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => {
                  const values = form.getValues();
                  // Add missing fields for guarantors
                  const updatedGuarantors = values.guarantors.map(
                    (guarantor) => ({
                      ...guarantor,
                      age: 0,
                      telephone: "",
                      address: "",
                      placeOfWorkAddress: "",
                      occupation: "",
                      positionInCompany: "",
                      maritalStatus: "",
                      signature: "",
                      date: "",
                    }),
                  );

                  setTenant({
                    ...values,
                    guarantors: updatedGuarantors,
                  });
                  goToPrevSubStep();
                }}
              >
                <ChevronLeft />
                Back
              </Button>
            ) : (
              <div className="w-full"></div>
            )} */}

            <Button
              className="w-full h-[52px]"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="h-4 w-4 animate-spinner rounded-full border-2 border-t-2 border-t-primary ease-linear"></div>
              ) : (
                <>
                  Submit <ChevronRight />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
