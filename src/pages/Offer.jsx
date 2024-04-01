import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="bodyoffer">
      <div className="offercontainer">
        <div className="imageoffer">
          <div>
            <img src={data.product_image.secure_url} alt="" />
          </div>
        </div>
        <div className="ficheproduit">
          <div id="prix">{data.product_price} €</div>
          <div className="detail">
            {data.product_details.map((detail) => {
              const keys = Object.keys(detail);
              const keyName = keys[0];
              return (
                <div className="details" key={keyName}>
                  <span>{keyName}</span>{" "}
                  <span style={{ color: "black" }}>{detail[keyName]}</span>
                </div>
              );
            })}
          </div>
          <div id="divider"></div>
          <div className="detail">
            <div className="desc">
              <span style={{ color: "black" }}>{data.product_name}</span>
              <span>{data.product_description}</span>
              <div id="infoaccount">
                <img
                  id="avatar2"
                  style={{ width: "60px", height: "60px" }}
                  src={data.owner.account.avatar?.secure_url}
                />
                <span style={{ color: "black" }}>
                  {data.owner.account.username}
                </span>
              </div>
            </div>
            <div id="buttonacheter">
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
