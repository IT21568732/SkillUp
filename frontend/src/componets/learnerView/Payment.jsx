import React from 'react';
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51PFbFKSEaCzE8vGJJsaasbl6zd4dAR7mfSJHgQiuAhNND9wxItJOzYH1luTZkWYecR5N9KKKuOJNcasYJM8nRV8V008RZFBdbW"
);

export default function payment() {
  const { id } = useParams();



  const fetchClientSecret = useCallback(async () => {
    const newToken = await localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `http://localhost:8005/payment/create-session/${id}`,
        null,
        { headers: { Authorization: `Bearer ${newToken}` } }
      );
      if (response.status === 200) {
        return response.data.clientSecret;
      } else {
        console.log("Error in fetching the client");
      }
    } catch (error) {
      console.log("Error in getting the sessoin ", error);
    }
  }, []);

  const options = { fetchClientSecret };

  return (
    <div>
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}