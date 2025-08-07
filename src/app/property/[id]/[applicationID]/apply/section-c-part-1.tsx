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
  purpose: z.string().min(1, { message: "Purpose is required" }),
  desiredImprovement: z
    .string()
    .min(1, { message: "Desired Improvement is required" }),
  factorsStimulatingInterest: z
    .string()
    .min(1, { message: "Factors stimulating interest is required" }),
  initialRentAccepted: z
    .string()
    .min(1, { message: "Initial rent accepted is required" }),
  petsInfo: z.string().min(1, { message: "Pets information is required" }),
  numberOfVehicles: z
    .string()
    .min(1, { message: "Number of vehicles is required" }),
  presentResidenceAddress: z
    .string()
    .min(1, { message: "Present residence address is required" }),
  nameAndAddressOfPresentLandlord: z
    .string()
    .min(1, { message: "Name and Address of Present Landlord is required" }),
  reasonForLeavingPresentResidence: z
    .string()
    .min(1, { message: "Reason for Leaving Present Residence is required" }),
  numberOfOccupants: z
    .string()
    .min(1, { message: "Number of Occupants is required" }),
});

export default function SectionCPart1() {
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
      purpose: tenant.purpose?.residential
        ? "residential"
        : tenant.purpose?.commercial
          ? "commercial"
          : "",
      desiredImprovement: tenant.desiredImprovement || "",
      factorsStimulatingInterest: tenant.factorsStimulatingInterest || "",
      initialRentAccepted: tenant.initialRentAccepted || "",
      petsInfo: tenant.petsInfo || "",
      numberOfVehicles: tenant.numberOfVehicles || "",
      presentResidenceAddress: tenant.presentResidenceAddress || "",
      nameAndAddressOfPresentLandlord: tenant.nameAndAddressOfPresentLandlord,
      reasonForLeavingPresentResidence: tenant.reasonForLeavingPresentResidence,
      numberOfOccupants: tenant.numberOfOccupants?.toString() || "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    // Convert purpose back to object format for store
    const purposeObject = {
      residential: values.purpose === "residential",
      commercial: values.purpose === "commercial",
    };

    setTenant({
      ...values,
      purpose: purposeObject,
      numberOfOccupants: parseInt(values.numberOfOccupants) || 0,
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
            <h3 className="mb-4 text-lg font-semibold text-black">Purpose</h3>
            <div className="space-y-4">
              <FormItem>
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="residential"
                              className="radio-label"
                            >
                              Residential
                            </label>
                            <input
                              type="radio"
                              id="residential"
                              value="residential"
                              checked={field.value === "residential"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange("purpose", e.target.value);
                              }}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="commercial" className="radio-label">
                              Commercial
                            </label>
                            <input
                              type="radio"
                              id="commercial"
                              value="commercial"
                              checked={field.value === "commercial"}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                handleFieldChange("purpose", e.target.value);
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
              </FormItem>

              <FormField
                control={form.control}
                name="desiredImprovement"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Desired Improvement on apartment{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "desiredImprovement",
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
                name="factorsStimulatingInterest"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      What factors really stimulates your interest in the
                      property?{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "factorsStimulatingInterest",
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
                name="initialRentAccepted"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Initial rent accepted/Budget for desired location{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "initialRentAccepted",
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
                name="petsInfo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Do you keep pets? If yes, what kind?{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("petsInfo", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfVehicles"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Number of vehicles owned{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("numberOfVehicles", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presentResidenceAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Address of your present place of residence{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "presentResidenceAddress",
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
                name="nameAndAddressOfPresentLandlord"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Name and address of present landlord{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "nameAndAddressOfPresentLandlord",
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
                name="reasonForLeavingPresentResidence"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      Reason(s) for leaving present residence{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "reasonForLeavingPresentResidence",
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
                name="numberOfOccupants"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">
                      No. of intended occupants{"  "}
                      <span className="text-sm text-black">(Required*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "numberOfOccupants",
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

          <div className="mt-5 flex items-center justify-between gap-4">
            {/* {step > 1 || subStep > 1 ? (
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => {
                  const values = form.getValues();
                  // Convert purpose back to object format for store
                  const purposeObject = {
                    residential: values.purpose === "residential",
                    commercial: values.purpose === "commercial",
                  };

                  setTenant({
                    ...values,
                    purpose: purposeObject,
                    numberOfOccupants: parseInt(values.numberOfOccupants) || 0,
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

            <Button className="w-full h-[52px]" type="submit">
              Save & Go to next <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
