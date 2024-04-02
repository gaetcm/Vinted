import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import photo from "../assets/img/download.jpg";
import axios from "axios";
import tear from "../assets/img/download.svg";
import Footer from "../components/footer/index";

const Home = ({ search, min, max, sort }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //
  let order = "";
  if (sort === true) {
    order = "price-desc";
  } else {
    order = "price-asc";
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://lereacteur-vinted-api.herokuapp.com/offers?sort=${order}&title=${search}&priceMin=${min}&priceMax=${max}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, min, max, sort]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <div className="homepageheader">
        <img className="img2" src={photo} alt="cover" />
        <img className="img3" src={tear} alt="tear" />
        <div className="bloctri">
          <span>Prêts à faire du tri dans vos placards ?</span>
          <Link to="/publish">
            <span style={{ fontSize: "17px" }}>Commencer à vendre</span>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="offre">
          {console.log(data.offers)}
          {data.offers.map((elem) => {
            // {console.log(elem.owner);}
            return (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/offer/${elem._id}`}
                >
                  <article>
                    <div className="avatardiv">
                      {elem.owner.account.avatar?.secure_url ? (
                        <img
                          className="avatar"
                          src={elem.owner.account.avatar?.secure_url}
                          alt="user photo"
                        />
                      ) : null}
                      <p>{elem.owner.account.username}</p>
                    </div>
                    <div>
                      <img
                        className="imageproduit"
                        src={elem.product_image?.secure_url}
                        alt="product name"
                      />
                      <div style={{ "margin-top": "10px" }}>
                        <p style={{ color: "black" }}>{elem.product_price} €</p>
                        <p>{elem.product_details[1].TAILLE}</p>
                        <p>{elem.product_details[0].MARQUE}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
