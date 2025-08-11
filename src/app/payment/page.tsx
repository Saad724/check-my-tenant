"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import PaystackButton to avoid SSR issues
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => ({ default: mod.PaystackButton })),
  {
    ssr: false,
    loading: () => (
      <button className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-medium cursor-not-allowed">
        Loading Payment...
      </button>
    ),
  }
);

const Page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1000000); // Amount in kobo (₦10,000)
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: phone,
        },
      ],
    },
    publicKey: "pk_test_d9b608110f40b3befeb2fa1ff65b2a9b92cd2716",
    text: "Pay Now",
    onSuccess: (transaction: any) => {
      alert(`Payment successful! Reference: ${transaction.reference}`);
      console.log("Payment successful:", transaction);
    },
    onClose: () => {
      alert("Payment cancelled");
      console.log("Payment cancelled");
    },
    onError: (error: any) => {
      setError(error.message || "Payment failed");
      console.error("Payment error:", error);
    },
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Payment Page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Complete your payment securely</p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Product:</span>
            <span className="font-medium">Dancing Shoes</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-700">Amount:</span>
            <span className="font-bold text-lg">₦{(amount / 100).toLocaleString()}</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="pt-2">
            <PaystackButton
              {...componentProps}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              disabled={!email || !name || !phone}
            />
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Your payment is secured by Paystack</p>
          <p className="mt-1">Test Card: 4084 0840 8408 4081</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
