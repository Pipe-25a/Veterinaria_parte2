import Heading from "../atoms/Heading";
import "./WelcomeBanner.css";

function WelcomeBanner() {
  return (
    <section className="welcome-banner">
      <Heading level={2}>Bienvenidos a nuestra clínica San Marcos</Heading>
    </section>
  );
}

export default WelcomeBanner;