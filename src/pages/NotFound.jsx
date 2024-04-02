import { Link } from "react-router-dom";
import bonk from "../assets/img/bonk.avif";

const NotFound = () => {
  return (
    <main className="main__error">
      <div className="container">
        <div className="error_display">
          <p>404 : PAGE NOT FOUND</p>
          <img src={bonk} />
          <Link to="/">Retour à la page d'accueil</Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
