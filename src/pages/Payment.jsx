import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment() {
  const location = useLocation();
  const { title, price } = location.state;

  const frais1 = Number((price / 10).toFixed(2));
  const frais2 = Number((price / 5).toFixed(2));
  const total = price + frais1 + frais2;

  const options = {
    mode: "payment",
    amount: Number((Math.abs(price) * 100).toFixed(0)),
    currency: "eur",
  };
  return (
    <div className="container">
      <div className="paymentbox">
        <div className="flexcheck">
          <div className="frais">
            <div className="frais1">
              <span>Commande</span>
              <span>Frais de protection acheteurs</span>
              <span>Frais de port</span>
            </div>
            <div className="frais1">
              <span>{price}€</span>
              <span>{frais1}€</span>
              <span>{frais2}€</span>
            </div>
          </div>
          <div id="divider2"></div>
          <div className="frais margintop">
            <span>Total</span>
            <span>{total}</span>
          </div>
          <p className="margintop">
            Il ne vous reste plus qu'un étape pour vous offrir {title}. Vous
            allez payer {total} € (frais de protection et frais de port inclus).
          </p>
          <div>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm total={total} title={title} price={price} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
