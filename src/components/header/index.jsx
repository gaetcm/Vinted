import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Pic from "../../assets/img/vinted-logo.png";
import "../header/Header.css";
import { Range } from "react-range";

const Header = ({
  token,
  search,
  handleToken,
  setSearch,
  min,
  max,
  sort,
  setSort,
  setMax,
  setMin,
}) => {
  const location = useLocation();

  const handleSort = () => {
    setSort(!sort);
  };

  const handlePriceChange = (values) => {
    setMin(values[0]);
    setMax(values[1]);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <header>
        <div className="container">
          <div className="topbar">
            <Link to="/">
              <img src={Pic} alt="logo"></img>
            </Link>
            <div className="searchbar">
              <div>
                <input
                  id="search1"
                  value={search}
                  type="text"
                  name="search"
                  placeholder="Recherchez des articles"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                ></input>
              </div>
              <div className="range">
                <p style={{ fontSize: "15px", color: "black" }}>
                  Trier par prix
                </p>
                <div>
                  <input id="checktop" type="checkbox" onClick={handleSort} />
                </div>

                <Range
                  step={1}
                  min={0}
                  max={1000}
                  values={[min, max]}
                  onChange={(values) => handlePriceChange(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "250px",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "16px",
                        width: "16px",
                        backgroundColor: "#2db0ba",
                        borderRadius: "50%",
                        outline: "none",
                      }}
                    />
                  )}
                />
                <div>
                  {min} - {max}
                </div>
              </div>
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
