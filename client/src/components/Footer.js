import logo from "../assets/3WA.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <img className="footer-img" src={logo} alt="Logo de la 3WA" />
        <div className="footer-copyright">
          Projet réalisé pour la 3WA - Victor BOLTA IDW03
        </div>
      </footer>
      <div className="clear"></div>
    </>
  );
};

export default Footer;
