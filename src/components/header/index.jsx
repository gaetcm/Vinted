import { Link } from "react-router-dom";
import Pic from "../../assets/img/vinted-logo.png";
import "../header/Header.css";

const Header = ({ token, search, handleToken, setSearch }) => {
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
                value={search}
                type="text"
                name="search"
                placeholder="Recherchez des articles"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              ></input>
            </div>

            <div className="buttonsheader">
              {token ? (
                <button
                  id="deco"
                  onClick={() => {
                    handleToken(null);
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <Link to="/signup">
                    <button>S'inscrire</button>
                  </Link>
                  <Link to="/login">
                    <button>Se connecter</button>
                  </Link>
                </>
              )}
              <Link to="/publish">
                <button className="sellbutton">Vends tes articles</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
