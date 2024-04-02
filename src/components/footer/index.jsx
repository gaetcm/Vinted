// import { Link } from "react-router-dom";
import tear2 from "/Users/gaetan/LeReacteur/exos/react/Vinted/src/assets/img/tear2.svg";
import fb from "/Users/gaetan/LeReacteur/exos/react/Vinted/src/assets/img/facebook.svg";
import ink from "/Users/gaetan/LeReacteur/exos/react/Vinted/src/assets/img/linkedin.svg";
import ins from "/Users/gaetan/LeReacteur/exos/react/Vinted/src/assets/img/instagram.svg";
import apps from "/Users/gaetan/LeReacteur/exos/react/Vinted/src/assets/img/fr.svg";
import goo from "/Users/gaetan/LeReacteur/exos/react/Vinted/src/assets/img/fr2.svg";
import "../footer/Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="foot1">
            <img id="tear2" src={tear2} />
            <div className="textfoot">
              <h3>Vinted</h3>
              <p>A propos de Vinted</p>
              <p>Carrière</p>
              <p>Le développement durable</p>
              <p>Presse</p>
              <p>Publicités</p>
            </div>
            <div className="textfoot">
              <h3>Découvrir</h3>
              <p>Comment ça marche ?</p>
              <p>Vérification de l'article</p>
              <p>Applications mobiles</p>
              <p>Tableau de bord</p>
              <p>Vinted Pro</p>
            </div>
            <div className="textfoot">
              <h3>Aide</h3>
              <p>Centre d'aide</p>
              <p>Vendre</p>
              <p>Acheter</p>
              <p>Confiance et sécurité</p>
            </div>
          </div>
          <div className="divider3"></div>
          <div className="social">
            <div className="img10">
              <img src={fb} />
              <img src={ink} />
              <img src={ins} />
            </div>
            <div className="img20">
              <img src={apps} />
              <img src={goo} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
