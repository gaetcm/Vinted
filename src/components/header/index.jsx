import { Link } from "react-router-dom";
import Pic from "../../assets/img/vinted-logo.png";
import "../header/Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="topbar">
            <Link to="/">
              <img src={Pic} alt="logo"></img>
            </Link>
            <div className="searchbar">
              <input
                type="search"
                name="search"
                placeholder="Recherchez des articles"
              ></input>
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1000"
              />
            </div>
            <div className="buttonsheader">
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>
              <button>Se connecter</button>
              <button className="sellbutton">Vends tes articles</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
