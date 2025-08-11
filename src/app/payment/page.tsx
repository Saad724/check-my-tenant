'use client'
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import PaystackButton to avoid SSR issues
const PaystackButton = dynamic(() => import("react-paystack").then(mod => ({ default: mod.PaystackButton })), {
  ssr: false,
  loading: () => <button className="paystack-button">Loading...</button>
});

const Page = () => {
  const publicKey = "pk_test_d9b608110f40b3befeb2fa1ff65b2a9b92cd2716";
  const amount = 1000000;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isClient, setIsClient] = useState(false);

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
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <img alt="Product" />
          <div className="item-details">
            <p>Dancing Shoes</p>
            <p>{amount}</p>
          </div>
        </div>
        <div className="checkout-form">
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default Page;
