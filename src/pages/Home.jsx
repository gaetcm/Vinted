import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import photo from "../assets/img/download.jpg";
import axios from "axios";
import tear from "../assets/img/download.svg";

const Home = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <div className="homepageheader">
        <img className="img2" src={photo} alt="cover" />
        <img className="img3" src={tear} alt="tear" />
        <div className="bloctri">
          Prêts à faire du tri dans vos placards ?
          <button>Commencer à vendre</button>
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
                      <img
                        className="avatar"
                        src={elem.owner.account.avatar?.secure_url}
                        alt="user photo"
                      />
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
    </>
  );
};

export default Home;
