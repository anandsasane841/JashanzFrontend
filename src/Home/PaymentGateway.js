// Inside PaymentGateway component
import React from "react";
import { v4 as uuidv4 } from 'uuid';

const PaymentGateway = ({ paymentStatus, handlePaymentStatus, eventType, onPaymentIdGenerated }) => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are Offline... Failed to load Razorpay SDK");
      handlePaymentStatus("failed");
      return;
    }

    const amountInPaise = Math.max(Math.round(amount * 100), 100);

    const options = {
      key: "rzp_test_TePVpeRulx3OMR",
      currency: "INR",
      amount: amountInPaise,
      name: "Jashanz.com",
      description: "Thank For Choosing Our Service",
      paymentId: uuidv4(), // Generating a new paymentId
      image: "https://res.cloudinary.com/dvqxcqg2n/image/upload/v1699425006/icdhtflmuxuqafm5wxht.png",
      handler: function (response) {
        handlePaymentStatus("success");
        if (onPaymentIdGenerated) {
          onPaymentIdGenerated(response.razorpay_payment_id);
        }
      },
      prefill: {
        name: "Jashanz.com",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const getAmountForEventType = (eventType) => {
    const eventTypeAmounts = {
      "Birthday": 99,
      "Marriage Ceremony": 499,
      "Disc Jockey": 399,
      "Occasion Organizers": 499,
      "Get Together or Party": 499,
    };
  
    return eventTypeAmounts[eventType] || 0; 
  };
  

  return (
    <div>
      <button
        className="btn btn-block"
        onClick={() => displayRazorpay(getAmountForEventType(eventType))}
      >
        Pay {getAmountForEventType(eventType)} INR
      </button>
    </div>
  );
};

export default PaymentGateway;
