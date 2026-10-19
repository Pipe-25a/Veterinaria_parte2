import Heading from "../atoms/Heading";
import ContactItem from "../molecules/ContactItem";


function Footer() {
  return (
    //esto es el footer que ba en la parte de abjo de cada pagina
    <footer id="contacto">
      <section className="informacion-contacto">
        <Heading level={3}>Información de contacto</Heading>
        <ul>
          <ContactItem label="" value="" />
          <ContactItem label="" value="" />
        </ul>
      </section>
    </footer>
  );
}
export default Footer;