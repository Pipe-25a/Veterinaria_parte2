import { Navbar } from "../organisms/Navbar";

export function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}