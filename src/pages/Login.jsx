import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="container">
      <div className="formulaire">
        <form className="formsignup" onSubmit={handleSubmit}>
          <div className="inputtext">
            <input
              type="email"
              placeholder="email"
              nom="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              nom="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" value="Se connecter">
            Se connecter
          </button>
        </form>
        <Link to="/signup">Tu as déjà un compte ? connecte-toi</Link>
      </div>
    </div>
  );
};

export default Login;
