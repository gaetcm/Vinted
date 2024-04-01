import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = (handleToken) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrormessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrormessage("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log("===> la réponse", response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error.response.status);
      if (error.response.status === 409) {
        setErrormessage("This email already has an account");
      } else if (error.response.data.message === "Missing parameters") {
        setErrormessage("Please fill in all the fields");
      }
    }
  };

  return (
    <div className="container">
      <div className="formulaire">
        <form className="formsignup" onSubmit={handleSubmit}>
          <div className="inputtext">
            <input
              value={username}
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              value={email}
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              value={password}
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="newsletter">
            <input
              type="checkbox"
              name="newsletter"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
            <p>S'inscrire à la newsletter</p>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit" value="S'inscrire'">
            S'inscrire
          </button>
          {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
        </form>
        <Link to="/login">Tu as déjà un compte ? connecte-toi</Link>
      </div>
    </div>
  );
};

export default Signup;
