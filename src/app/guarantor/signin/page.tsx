"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function GuarantorSignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        {/* Header/Title */}
        <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900">
          Dwight Schrute has named you as a Guarantor for his apartment rental
          application
        </h1>

        {/* Body Text/Explanation */}
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          As a Guarantor, you are responsible for Dwight Schrute's apartment
          rental obligations
        </p>

        {/* Call to Action Button */}
        <Link href="/guarantor/form" className="block w-full">
          <Button className="w-full rounded-md bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700">
            Sign Form
          </Button>
        </Link>
      </div>
    </div>
  );
}
