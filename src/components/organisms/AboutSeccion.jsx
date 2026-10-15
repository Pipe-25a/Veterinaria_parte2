import Heading from "../atoms/Heading";
import Text from "../atoms/Text";

function AboutSection() {
  return (
    <section className="about-section">
      <Heading level={3}>Clínica Veterinaria</Heading>
      <Text>
        Escribe aquí la descripción real de la clínica.
      </Text>
    </section>
  );
}

export default AboutSection;