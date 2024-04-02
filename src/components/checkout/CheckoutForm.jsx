import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // On commence à charger
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(error.message);
      return;
    }
    let response;
    try {
      response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: Number((Math.abs(price) * 100).toFixed(0)),
        }
      );
    } catch (error) {
      console.log(error.response);
    }
    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
      elements,
      clientSecret,

      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
      // On la montre au client
      setErrorMessage(stripeResponse.error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }

    setIsLoading(false);
  };
  return completed ? (
    <p>good !</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        id="bouttonpayment"
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
