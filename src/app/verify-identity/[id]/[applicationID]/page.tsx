"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { apiRequest } from "@/lib/utils";
import { useApplicationStore } from "@/store/application";

const schema = z.object({
  nin: z.string().min(1, { message: "NIN is required" }),
  fullName: z.string().min(1, { message: "Full Name is required" }),
  telephone: z
    .string()
    .min(11, {
      message: "Mobile Number is required and should be atleast 11 numbers",
    })
    .max(11, { message: "Mobile Number cannot be more than 11 numbers" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export default function SectionA({
  params,
}: {
  params: { id: string; applicationID: string };
}) {
  const router = useRouter();
  const [verifyingNin, setVerifyingNin] = useState(false);
  const [consentCheck, setConsentCheck] = useState(false);
  const { tenant, actions } = useApplicationStore();
  const [
    tenantFreeIdentityVerificationExhausted,
    setTenantFreeIdentityVerificationExhausted,
  ] = useState<String>(
    localStorage.getItem("tenantFreeIdentityVerificationExhausted") || "false",
  );

  const handleFieldChange = (name: string, value: any) => {
    actions.setTenant({ [name]: value });
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nin: tenant.nin,
      fullName: tenant.fullName,
      email: tenant.email,
      telephone: tenant.telephone,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setVerifyingNin(true);
      if (tenantFreeIdentityVerificationExhausted === "false") {
        await handleVerifyNIN();
      }
    } catch (e: any) {
      toast.error(e.message || "Something went wrong!");
    } finally {
      setVerifyingNin(false);
    }
  }

  const componentProps = {
    email: form.getValues("email"),
    amount: 50000,
    metadata: {
      name: form.getValues("fullName"),
      phone: form.getValues("telephone"),
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: form.getValues("fullName"),
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: form.getValues("telephone"),
        },
      ],
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    onSuccess: async (transaction: any) => {
      await updateExhaustVerificationState();
      setTenantFreeIdentityVerificationExhausted("false");
      console.log(`Payment successful! Reference: ${transaction.reference}`);
      console.log("Payment successful:", transaction);
    },
    onClose: () => {
      alert("Payment cancelled");
      console.log("Payment cancelled");
    },
    onError: (error: any) => {
      console.error("Payment error:", error);
    },
  };

  const updateExhaustVerificationState = async () => {
    try {
      await apiRequest(`/api/tenants/application/${params.applicationID}`, {
        method: "POST",
        body: JSON.stringify({
          tenantFreeIdentityVerificationExhausted: true,
        }),
      });
      localStorage.setItem("tenantFreeIdentityVerificationExhausted", "false");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const payWithPayStack = async () => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: form.getValues("email"),
          amount: 50000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const checkoutUrl = response.data.data.authorization_url;
      window.location.href = checkoutUrl;
    } catch (e: any) {
      toast.error(e.message || "Error initializing payment");
    }
  };

  const [ninStatus, setNinStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  async function handleVerifyNIN() {
    setNinStatus(null);
    try {
      const nin = form.getValues("nin");
      const name = `${form.getValues("fullName")}`;
      const email = form.getValues("email");
      const phone = form.getValues("telephone");
      const res = await apiRequest("/api/accounts/verify-guest-identity", {
        method: "POST",
        body: JSON.stringify({ nin, name, email, phone }),
      });
      setNinStatus({ success: true, message: "NIN verified successfully." });
      router.push(`/property/${params.id}/${params.applicationID}/apply`);
    } catch (e: any) {
      toast.error(e.message || "NIN verification failed.");
      localStorage.setItem("tenantFreeIdentityVerificationExhausted", "true");
      setTenantFreeIdentityVerificationExhausted("true");
      setNinStatus({
        success: false,
        message: e.message || "NIN verification failed.",
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 lg:p-8">
      <div>
        <h2 className="text-lg font-semibold text-black lg:text-[24px]">
          Fill in the details
        </h2>

        <hr className="my-[24px] border-[#e7e7e7]" />

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-[24px] space-y-4">
              <FormField
                control={form.control}
                name="nin"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      NIN{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <div className="flex items-center gap-2">
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
                    </div>
                    {ninStatus && (
                      <div
                        className={`mt-1 text-sm ${ninStatus.success ? "text-green-600" : "text-red-600"}`}
                      >
                        {ninStatus.message}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Full Name{"  "}
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
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Email{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("email", e.target.value);
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
                    <FormLabel className="text-sm">
                      Phone{"  "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="tel"
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

              <div className="flex gap-2 pt-[4px]">
                <div className="mt-[4px]">
                  <Checkbox
                    checked={consentCheck}
                    onCheckedChange={() => setConsentCheck((prev) => !prev)}
                  />
                </div>
                <p
                  className="m-0 cursor-pointer p-0 text-[#222222]"
                  onClick={() => setConsentCheck((prev) => !prev)}
                >
                  I consent for a verification process and a record of my
                  interactions with my propestic landlord
                </p>
              </div>
            </div>

            <hr className="border-[#e7e7e7] pb-[24px]" />

            {tenantFreeIdentityVerificationExhausted === "true" ? (
              <PaystackButton
                {...componentProps}
                className="inline-flex h-[52px] w-full items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                disabled={verifyingNin || !consentCheck}
                text={verifyingNin ? "Verifying..." : "Confirm"}
              />
            ) : (
              <Button
                className="h-[52px] w-full"
                type="submit"
                disabled={verifyingNin || !consentCheck}
              >
                {verifyingNin ? "Verifying..." : "Confirm"}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
