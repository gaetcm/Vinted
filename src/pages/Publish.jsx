import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("picture", picture);
      formData.append("description", description);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("price", price);

      //   for (var key of formData.entries()) {
      //     console.log(key[0] + ", " + key[1]);
      //   }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      if (response.data._id) {
        navigate(`/offers/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bodyinfo">
      <div className="container">
        <h1 style={{ fontSize: "30px" }}>Sell your article</h1>
        <div className="formulaire">
          <form className="formsell" onSubmit={handleSubmit}>
            <div className="inputtext">
              <div className="boutton2">
                {picture && (
                  <img
                    className="imgfiche"
                    src={URL.createObjectURL(picture)}
                    alt="produit"
                  />
                )}
                <label htmlFor="picture-input" style={{ color: "#2db0ba" }}>
                  + Ajoute une photo
                </label>
                <input
                  style={{ display: "none" }}
                  id="picture-input"
                  type="file"
                  onChange={(event) => {
                    console.log(event);
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
              <div className="form-info">
                <input
                  type="text"
                  placeholder="Title"
                  nom="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  nom="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="form-info">
                <input
                  type="text"
                  placeholder="Condition"
                  nom="condition"
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="City"
                  nom="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Brand"
                  nom="brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Size"
                  nom="size"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Color"
                  nom="color"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                />
              </div>
              <div className="form-info">
                <input
                  type="number"
                  placeholder="Price"
                  nom="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className="flexxx">
                <button type="submit" value="Se connecter">
                  Publier l'offre
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publish;
