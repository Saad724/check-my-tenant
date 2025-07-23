"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { useApplicationStore } from "@/store/application";

const schema = z.object({
  purpose: z
    .object({
      residential: z.boolean().default(false),
      commercial: z.boolean().default(false),
    })
    .required(),
  bedroomPreference: z
    .string()
    .min(1, { message: "Bedroom Preference is required" }),
  rentPaymentFrequency: z
    .string()
    .min(1, { message: "Rent Payment Frequency is required" }),
  personResponsibleForRentPayment: z
    .string()
    .min(1, { message: "Person Responsible for Rent Payment is required" }),
  numberOfOccupants: z.coerce
    .number()
    .min(1, { message: "Number of Occupants is required" }),
  sourceOfIncome: z
    .string()
    .min(1, { message: "Source of Income is required" }),
  nameAndAddressOfPresentLandlord: z
    .string()
    .min(1, { message: "Name and Address of Present Landlord is required" }),
  reasonForLeavingPresentResidence: z
    .string()
    .min(1, { message: "Reason for Leaving Present Residence is required" }),
  listOfDependents: z.array(z.string()).optional(),
  religion: z.string().min(1, { message: "Religion is required" }),
  nameAndContactOfPastor: z
    .string()
    .min(1, { message: "Name and Contact of Pastor is required" }),
  placeOfWorship: z
    .string()
    .min(1, { message: "Place of Worship is required" }),
  possessionTiming: z
    .string()
    .min(1, { message: "Possession timing is required" }),
});

export default function SectionC() {
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
      purpose: {
        residential: false,
        commercial: false,
      },
      bedroomPreference: tenant.bedroomPreference,
      rentPaymentFrequency: tenant.rentPaymentFrequency,
      personResponsibleForRentPayment: tenant.personResponsibleForRentPayment,
      numberOfOccupants: 0,
      sourceOfIncome: tenant.sourceOfIncome,
      nameAndAddressOfPresentLandlord: tenant.nameAndAddressOfPresentLandlord,
      reasonForLeavingPresentResidence: tenant.reasonForLeavingPresentResidence,
      listOfDependents: [],
      religion: tenant.religion,
      nameAndContactOfPastor: tenant.nameAndContactOfPastor,
      placeOfWorship: tenant.placeOfWorship,
      possessionTiming: tenant.possessionTiming || "",
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
        Section C
      </h2>

      <Form {...form}>
        <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Purpose:</FormLabel>

                <FormField
                  control={form.control}
                  name="purpose.residential"
                  render={({ field }) => (
                    <FormItem className="flex justify-between">
                      <FormLabel className="radio-label">Residential</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purpose.commercial"
                  render={({ field }) => (
                    <FormItem className="flex justify-between">
                      <FormLabel className="radio-label">Commercial</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="bedroomPreference"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Bedroom Preference{" "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("bedroomPreference", value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition duration-150 ease-in-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-md border border-gray-300 bg-white shadow-lg">
                        <SelectItem
                          value="1bedroom"
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        >
                          1 Bedroom
                        </SelectItem>
                        <SelectItem
                          value="2bedroom"
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        >
                          2 Bedroom
                        </SelectItem>
                        <SelectItem
                          value="3bedroom"
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        >
                          3+ Bedroom
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rentPaymentFrequency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Rent Payment Frequency{" "}
                      <span className="text-xs text-black">(Required*)</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleFieldChange("rentPaymentFrequency", value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition duration-150 ease-in-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-md border border-gray-300 bg-white shadow-lg">
                        <SelectItem
                          value="Monthly"
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        >
                          Monthly
                        </SelectItem>
                        <SelectItem
                          value="Yearly"
                          className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        >
                          Yearly
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personResponsibleForRentPayment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Person Responsible for Rent Payment</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange(
                            "personResponsibleForRentPayment",
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
                name="sourceOfIncome"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Source of Income</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("sourceOfIncome", e.target.value);
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
                    <FormLabel>Name and Address of Present Landlord</FormLabel>
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
                    <FormLabel>
                      Reason(s) for leaving present residence
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
                    <FormLabel>No. of intended occupants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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

            <div>
              <h3 className="my-4 text-lg font-semibold text-black">
                Religion
              </h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Rent Payment Frequency{" "}
                        <span className="text-xs text-black">(Required*)</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleFieldChange("rentPaymentFrequency", value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition duration-150 ease-in-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Select Religion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md border border-gray-300 bg-white shadow-lg">
                          <SelectItem
                            value="Christian"
                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          >
                            Christian
                          </SelectItem>
                          <SelectItem
                            value="Islam"
                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          >
                            Islam
                          </SelectItem>
                          <SelectItem
                            value="Other"
                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                          >
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nameAndContactOfPastor"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Name & contact phone of Pastor/Imam (if any)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange(
                              "nameAndContactOfPastor",
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
                  name="placeOfWorship"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Place of Worship</FormLabel>
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
              <h3 className="my-4 text-lg font-semibold text-black">
                How soon do you want to take possession?
              </h3>

              <FormField
                control={form.control}
                name="possessionTiming"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="Immediately" className="radio-label">
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
                            In One Month
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
                          <label htmlFor="threeMonths" className="radio-label">
                            In Three Months
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

          <div className="mt-5 flex items-center justify-between gap-4">
            <Button className="w-full" type="button" onClick={handlePrevious}>
              <ChevronLeft />
              Section B
            </Button>

            <Button className="w-full" type="submit">
              Section D <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
