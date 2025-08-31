import "./HeroSection.scss";
import photo from "../../data/pexels-alexandr-podvalny-1227513.jpeg"; // імпорт фото

function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${photo})`
    }}
    >
      <div className="hero-content">
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className="hero-btn">Sign up</button>
      </div>
    </section>
  );
}

export default HeroSection;

