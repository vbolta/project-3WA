import logo from "../assets/3WA.png";

const Footer = () => {
  return (
    <footer className="footer fixed-bottom">
      <div className="col">
        <h1>Developers</h1>
      </div>
      <div className="col">
        <h1>Creation</h1>
      </div>
      <div className="col">
        <h1>About</h1>
      </div>
      <div className="col">
        <h1>Website</h1>
      </div>
      <div className="col">
        <h1>Support</h1>
      </div>
      <img className="footer-img" src={logo} alt="Logo de la 3WA" />
    </footer>
  );
};

export default Footer;
