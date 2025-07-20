"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import ApplicationSuccess from "@/components/ApplicationSuccess";
import { Stepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useApplicationStore } from "@/store/application";

import SectionAPart1 from "./section-a-part-1";
import SectionAPart2 from "./section-a-part-2";
import SectionBPart1 from "./section-b-part-1";
import SectionBPart2 from "./section-b-part-2";
import SectionCPart1 from "./section-c-part-1";
import SectionCPart2 from "./section-c-part-2";
import SectionD from "./section-d";

type Property = {
  amenities: {
    parking: boolean;
  };
  _id: string;
  userId: string;
  propertyTitle: string;
  propertyDescription: string;
  images: string[];
  category: string;
  type: string;
  subType: string;
  area: string;
  street: string;
  description: string;
  servicedApartment: boolean;
  serviceCharge: number | null;
  price: number;
  rent: number;
  frequency: string;
  created: string;
  lastUpdated: string;
  __v: number;
};

async function getPropertyById(id: string) {
  const res = await axios.get<{ property: Property }>(
    `https://check-my-tenant.vercel.app/api/property/get-by-id?id=${id}`,
  );

  return res.data;
}

export default function Home() {
  const params = useParams<{ id: string }>();
  const { step, subStep } = useApplicationStore((state) => ({
    step: state.step,
    subStep: state.subStep,
  }));

  const propertyQuery = useQuery({
    queryKey: ["property", params.id],
    queryFn: () => getPropertyById(params.id),
  });

  function renderContent(step: number, subStep: number) {
    switch (step) {
      case 1:
        return subStep === 1 ? <SectionAPart1 /> : <SectionAPart2 />;
      case 2:
        return subStep === 1 ? <SectionBPart1 /> : <SectionBPart2 />;
      case 3:
        return subStep === 1 ? <SectionCPart1 /> : <SectionCPart2 />;
      case 4:
        return (
          <SectionD
            propertyId={propertyQuery.data?.property._id!}
            landlordId={propertyQuery.data?.property.userId!}
          />
        );
      case 5:
        return <ApplicationSuccess />;
      default:
        return <SectionAPart1 />;
    }
  }

  if (propertyQuery.isError)
    return <div>Error: {propertyQuery.error.message}</div>;

  if (propertyQuery.data)
    return (
      <div className="mx-auto w-full max-w-3xl p-4 lg:p-8">
        {/* Header with Guarantor Button */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-black lg:text-3xl">
              Application form for {propertyQuery.data.property.propertyTitle}
            </h1>

            <p className="mt-4">
              Created:{" "}
              <span className="text-black">
                {formatDistanceToNow(
                  new Date(propertyQuery.data.property.created),
                  {
                    addSuffix: true,
                  },
                )}
              </span>
            </p>
          </div>

          {/* <Link href="/guarantor/signin">
            <Button className="bg-teal-600 text-white hover:bg-teal-700">
              Guarantor Sign In
            </Button>
          </Link> */}
        </div>

        <Stepper />

        {renderContent(step, subStep)}
      </div>
    );

  return (
    <main>
      <div>Loading...</div>
    </main>
  );
}
