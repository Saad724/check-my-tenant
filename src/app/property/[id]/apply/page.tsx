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

import SectionA from "./section-a";
import SectionB from "./section-b";
import SectionC from "./section-c";
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
  const currentStep = useApplicationStore((state) => state.step);

  const propertyQuery = useQuery({
    queryKey: ["property", params.id],
    queryFn: () => getPropertyById(params.id),
  });

  function renderContent(step: number) {
    switch (step) {
      case 1:
        return <SectionA />;
      case 2:
        return <SectionB />;
      case 3:
        return <SectionC />;
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
        return <SectionA />;
    }
  }

  if (propertyQuery.isError)
    return <div>Error: {propertyQuery.error.message}</div>;

  if (propertyQuery.data)
    return (
      <div className="mx-auto w-full max-w-3xl p-4 lg:p-8">
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

        <Stepper />

        {renderContent(currentStep)}
      </div>
    );

  return (
    <main>
      <div>Loading...</div>
    </main>
  );
}
