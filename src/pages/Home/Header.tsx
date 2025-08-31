import "./Hero.scss";
import logo from "../../data/Logo.svg"

function Hero() {
  return (
    <header className="hero">
      <div className="hero__logo"><img  className="hero__logo-img" src={logo} alt="Logo" /></div>
      <div className="hero__buttons">
        <button className="btn">Users</button>
        <button className="btn">Sign up</button>
      </div>
    </header>
  );
}

export default Hero;
