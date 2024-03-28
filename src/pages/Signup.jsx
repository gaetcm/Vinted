import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { name, email, password, newsletter: subscribed }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="formulaire">
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            type="text"
            name="name"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            value={email}
            type="email"
            name="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            value={password}
            type="password"
            name="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="newsletter">
            <input
              type="checkbox"
              name="checkbox"
              checked={subscribed}
              onChange={(event) => setSubscribed(event.target.checked)}
            />
            <p>S'inscrire à la newsletter</p>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      {isLoading && <p>Loading ...</p>}
    </div>
  );
};

export default Signup;
