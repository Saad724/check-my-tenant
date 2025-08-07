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
import { useParams } from 'next/navigation';

const schema = z.object({
  guarantors: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Valid email is required" }),
      }),
    )
    .length(2),
});

export default function SectionD({
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
          name: tenant.guarantors?.[0]?.name || "",
          email: tenant.guarantors?.[0]?.email || "",
        },
        {
          name: tenant.guarantors?.[1]?.name || "",
          email: tenant.guarantors?.[1]?.email || "",
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
    // Add missing fields for both guarantors
    const updatedGuarantors = values.guarantors.map((guarantor) => ({
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
    }));

    const finalData = {
      ...tenant,
      landlordId,
      propertyId,
      applicationId: applicationID,
      guarantors: updatedGuarantors,
    };

    // Comprehensive logging of all form data before API call
    console.log("=== FINAL APPLICATION DATA ===");
    console.log("Property ID:", propertyId);
    console.log("Landlord ID:", landlordId);
    console.log("Current Step:", useApplicationStore.getState().step);
    console.log("Current SubStep:", useApplicationStore.getState().subStep);

    console.log("=== SECTION A - PERSONAL INFORMATION ===");
    console.log("NIN:", tenant.nin);
    console.log("Surname:", tenant.surname);
    console.log("Other Names:", tenant.otherNames);
    console.log("Contact Address:", tenant.contactAddress);
    console.log("Nationality:", tenant.nationality);
    console.log("Passport No:", tenant.passportNo);
    console.log("State of Origin:", tenant.stateOfOrigin);
    console.log("Local Government:", tenant.localGovernment);
    console.log("Town of Origin:", tenant.townOfOrigin);
    console.log("Date of Birth:", tenant.dateOfBirth);
    console.log("Marital Status:", tenant.maritalStatus);
    console.log("Number of Children:", tenant.numberOfChildren);
    console.log("List of Dependents:", tenant.listOfDependents);
    console.log("Telephone:", tenant.telephone);
    console.log("Personal Email:", tenant.personalEmail);
    console.log("Domicile Email:", tenant.domicileEmail);
    console.log("Profession:", tenant.profession);
    console.log("Position:", tenant.position);
    console.log("Office Address:", tenant.officeAddress);
    console.log("Form of Identification:", tenant.formOfIdentification);
    console.log("Office Phone:", tenant.officePhone);

    console.log("=== SECTION B - SPOUSE & NEXT OF KIN ===");
    console.log("Spouse Surname:", tenant.spouse.surname);
    console.log("Spouse Other Names:", tenant.spouse.otherNames);
    console.log("Spouse Address:", tenant.spouse.address);
    console.log("Spouse Telephone:", tenant.spouse.telephone);
    console.log("Spouse Place of Work:", tenant.spouse.placeOfWork);
    console.log("Next of Kin Name:", tenant.nextOfKin.name);
    console.log("Next of Kin Relationship:", tenant.nextOfKin.relationship);
    console.log("Next of Kin Address:", tenant.nextOfKin.address);
    console.log("Next of Kin Telephone:", tenant.nextOfKin.telephone);
    console.log("Next of Kin Place of Work:", tenant.nextOfKin.placeOfWork);

    console.log("=== SECTION C - PROPERTY & RELIGION ===");
    console.log("Purpose:", tenant.purpose);
    console.log("Desired Improvement:", tenant.desiredImprovement);
    console.log(
      "Factors Stimulating Interest:",
      tenant.factorsStimulatingInterest,
    );
    console.log("Initial Rent Accepted:", tenant.initialRentAccepted);
    console.log("Pets Info:", tenant.petsInfo);
    console.log("Number of Vehicles:", tenant.numberOfVehicles);
    console.log("Present Residence Address:", tenant.presentResidenceAddress);
    console.log(
      "Name and Address of Present Landlord:",
      tenant.nameAndAddressOfPresentLandlord,
    );
    console.log(
      "Reason for Leaving Present Residence:",
      tenant.reasonForLeavingPresentResidence,
    );
    console.log("Number of Occupants:", tenant.numberOfOccupants);
    console.log("Religion:", tenant.religion);
    console.log("Other Religion:", tenant.otherReligion);
    console.log("Place of Worship:", tenant.placeOfWorship);
    console.log("Possession Timing:", tenant.possessionTiming);
    console.log("Applicant Signature:", tenant.applicantSignature);
    console.log("Application Date:", tenant.applicationDate);

    console.log("=== SECTION D - GUARANTORS ===");
    console.log("Guarantor A - Name:", values.guarantors[0]?.name);
    console.log("Guarantor A - Email:", values.guarantors[0]?.email);
    console.log("Guarantor B - Name:", values.guarantors[1]?.name);
    console.log("Guarantor B - Email:", values.guarantors[1]?.email);

    console.log("=== COMPLETE FINAL DATA ===");
    console.log(finalData);

    // Check for missing required fields
    console.log("=== VALIDATION CHECK ===");
    const missingFields = [];

    if (!tenant.nin) missingFields.push("NIN");
    if (!tenant.surname) missingFields.push("Surname");
    if (!tenant.otherNames) missingFields.push("Other Names");
    if (!tenant.contactAddress) missingFields.push("Contact Address");
    if (!tenant.nationality) missingFields.push("Nationality");
    if (!tenant.passportNo) missingFields.push("Passport No");
    if (!tenant.stateOfOrigin) missingFields.push("State of Origin");
    if (!tenant.localGovernment) missingFields.push("Local Government");
    if (!tenant.townOfOrigin) missingFields.push("Town of Origin");
    if (!tenant.dateOfBirth) missingFields.push("Date of Birth");
    if (!tenant.maritalStatus) missingFields.push("Marital Status");
    if (!tenant.telephone) missingFields.push("Telephone");
    if (!tenant.personalEmail) missingFields.push("Personal Email");
    if (!tenant.profession) missingFields.push("Profession");
    if (!tenant.position) missingFields.push("Position");
    if (!tenant.officeAddress) missingFields.push("Office Address");
    if (!tenant.formOfIdentification)
      missingFields.push("Form of Identification");
    if (!tenant.officePhone) missingFields.push("Office Phone");

    // Check spouse fields
    if (!tenant.spouse.surname) missingFields.push("Spouse Surname");
    if (!tenant.spouse.otherNames) missingFields.push("Spouse Other Names");
    if (!tenant.spouse.address) missingFields.push("Spouse Address");
    if (!tenant.spouse.telephone) missingFields.push("Spouse Telephone");
    if (!tenant.spouse.placeOfWork) missingFields.push("Spouse Place of Work");

    // Check next of kin fields
    if (!tenant.nextOfKin.name) missingFields.push("Next of Kin Name");
    if (!tenant.nextOfKin.relationship)
      missingFields.push("Next of Kin Relationship");
    if (!tenant.nextOfKin.address) missingFields.push("Next of Kin Address");
    if (!tenant.nextOfKin.telephone)
      missingFields.push("Next of Kin Telephone");
    if (!tenant.nextOfKin.placeOfWork)
      missingFields.push("Next of Kin Place of Work");

    // Check Section C fields
    if (!tenant.purpose.residential && !tenant.purpose.commercial)
      missingFields.push("Purpose");
    if (!tenant.desiredImprovement) missingFields.push("Desired Improvement");
    if (!tenant.factorsStimulatingInterest)
      missingFields.push("Factors Stimulating Interest");
    if (!tenant.initialRentAccepted)
      missingFields.push("Initial Rent Accepted");
    if (!tenant.petsInfo) missingFields.push("Pets Info");
    if (!tenant.numberOfVehicles) missingFields.push("Number of Vehicles");
    if (!tenant.presentResidenceAddress)
      missingFields.push("Present Residence Address");
    if (!tenant.nameAndAddressOfPresentLandlord)
      missingFields.push("Name and Address of Present Landlord");
    if (!tenant.reasonForLeavingPresentResidence)
      missingFields.push("Reason for Leaving Present Residence");
    if (!tenant.numberOfOccupants) missingFields.push("Number of Occupants");
    if (!tenant.religion) missingFields.push("Religion");
    if (!tenant.placeOfWorship) missingFields.push("Place of Worship");
    if (!tenant.possessionTiming) missingFields.push("Possession Timing");
    if (!tenant.applicantSignature) missingFields.push("Applicant Signature");
    if (!tenant.applicationDate) missingFields.push("Application Date");

    // Check guarantor fields
    if (!values.guarantors[0]?.name) missingFields.push("Guarantor A Name");
    if (!values.guarantors[0]?.email) missingFields.push("Guarantor A Email");
    if (!values.guarantors[1]?.name) missingFields.push("Guarantor B Name");
    if (!values.guarantors[1]?.email) missingFields.push("Guarantor B Email");

    if (missingFields.length > 0) {
      console.warn("⚠️ MISSING REQUIRED FIELDS:", missingFields);
    } else {
      console.log("✅ ALL REQUIRED FIELDS ARE FILLED");
    }

    console.log("=== END OF APPLICATION DATA ===");

    mutation.mutate(finalData);
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary lg:text-xl">
        Section D - Guarantors
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h3 className="my-4 text-sm font-semibold uppercase text-black">
              Guarantors
            </h3>
            <p className="text-sm">
              (Please give names and emails of 2 persons; who shall be required
              to provide a letter of guarantee/recommendation on letter headed
              paper).
            </p>
          </div>

          <div className="space-y-8">
            {/* Guarantor A */}
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
              </div>
            </div>

            {/* Guarantor B */}
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
                  name={`guarantors.1.email`}
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
              </div>
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
