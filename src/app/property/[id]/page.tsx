"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { MapPin, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

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

export default function Page({ params }: { params: { id: string } }) {
  const propertyQuery = useQuery({
    queryKey: ["property", params.id],
    queryFn: () => getPropertyById(params.id),
  });

  if (propertyQuery.isError)
    return <div>Error: {propertyQuery.error.message}</div>;

  if (propertyQuery.data)
    return (
      <main>
        <div className="px-4">
          <h1 className="mt-4 text-2xl font-semibold text-black lg:text-3xl">
            Candidate application form for{" "}
            {propertyQuery.data.property.propertyTitle}
          </h1>

          <Button
            asChild
            className="mt-4 w-full items-center justify-center lg:flex lg:w-[500px]"
          >
            <Link href={`/property/${params.id}/apply`}>Apply</Link>
          </Button>

          <div className="mt-6">
            <div className="lg:h- relative min-h-64 w-full rounded-md">
              <Image alt="" src="/house.png" fill />
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="font-semibold text-black">
                {propertyQuery.data.property.propertyTitle}
              </h2>

              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />{" "}
                <p className="flex-1 text-sm font-medium">
                  {propertyQuery.data.property.street}{" "}
                  {propertyQuery.data.property.area}
                </p>
              </div>

              <p className="font-medium">
                <span className="font-semibold text-primary">
                  {propertyQuery.data.property.price.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>{" "}
                per annum
              </p>
            </div>

            <div className="mb-4 mt-8">
              <h3 className="mb-4 mt-8 text-2xl font-semibold text-black">
                Description
              </h3>

              <p className="text-sm">
                {propertyQuery.data.property.propertyDescription}
              </p>
            </div>

            <div className="mb-4 mt-8">
              <h3 className="text-2xl font-semibold text-black">Details</h3>

              <div className="mt-4 divide-y rounded-lg border border-[#222222]/10 bg-[#FAFAFA] p-3">
                <div className="space-y-2 py-2">
                  <p className="text-sm font-semibold">Property ID</p>
                  <p className="font-semibold text-black">
                    {propertyQuery.data.property._id}
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-sm font-semibold">Last updated</p>
                  <p className="font-semibold text-black">
                    {format(propertyQuery.data.property.lastUpdated, "PPP")}
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-sm font-semibold">Type</p>
                  <p className="font-semibold text-black">
                    {propertyQuery.data.property.type}
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-sm font-semibold">Sub Type</p>
                  <p className="font-semibold text-black">
                    {propertyQuery.data.property.subType}
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-sm font-semibold">Servicing</p>
                  <p className="font-semibold text-black">
                    {propertyQuery.data.property.servicedApartment
                      ? "Serviced"
                      : "Not Serviced"}
                  </p>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-sm font-semibold">Service Charge</p>
                  <p className="font-semibold text-black">
                    {propertyQuery.data.property.serviceCharge
                      ? propertyQuery.data.property.serviceCharge.toLocaleString(
                          "en-NG",
                          {
                            style: "currency",
                            currency: "NGN",
                          },
                        )
                      : "--"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 mt-8">
              <h3 className="text-2xl font-semibold text-black">Amenities</h3>

              {/* <div>
                <div className="grid grid-cols-2 divide-x">
                  <div>
                    Parking {propertyQuery.data.property.amenities.parking}
                  </div>
                  <div></div>
                </div>
              </div> */}
            </div>
          </div>

          <Button
            asChild
            className="mt-5 w-full items-center justify-center lg:flex lg:w-[500px]"
          >
            <Link href={`/property/${params.id}/apply`}>Apply</Link>
          </Button>
        </div>
      </main>
    );

  return (
    <main>
      <div>Loading...</div>
    </main>
  );
}
