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
          <div>{data.product_price} €</div>
          <div>
            {data.product_details.map((detail) => {
              const keys = Object.keys(detail);
              const keyName = keys[0];
              return (
                <p key={keyName}>
                  {keyName} : {detail[keyName]}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
