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

export default function SectionDPart1() {
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
      guarantors: [
        {
          name: tenant.guarantors?.[0]?.name || "",
          email: tenant.guarantors?.[0]?.email || "",
          // age: tenant.guarantors?.[0]?.age || 0,
          // telephone: tenant.guarantors?.[0]?.telephone || "",
          // address: tenant.guarantors?.[0]?.address || "",
          // placeOfWorkAddress: tenant.guarantors?.[0]?.placeOfWorkAddress || "",
          // occupation: tenant.guarantors?.[0]?.occupation || "",
          // positionInCompany: tenant.guarantors?.[0]?.positionInCompany || "",
          // maritalStatus: tenant.guarantors?.[0]?.maritalStatus || "",
          // signature: tenant.guarantors?.[0]?.signature || "",
          // date: tenant.guarantors?.[0]?.date || "",
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setTenant(values);
    goToNextSubStep();
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section D
      </h2>

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
                      Signature (Your Government Name){"  "}
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
