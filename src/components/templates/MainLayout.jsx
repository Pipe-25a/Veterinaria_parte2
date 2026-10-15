import Header from "../organisms/Header";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;