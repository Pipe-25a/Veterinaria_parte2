// Página principal de la aplicación Veterinaria
import React from "react";
import MainLayout from "../components/templates/MainLayout";
import { useTituloPagina } from "../hooks/useTituloPagina";

function HomePage_nav() {
  const navigate = useNavigate()
  const HomePage_nav = useCart()
  
  useTituloPagina('Home');

   return (
    <PlantillaPublica>
      <h2 className="h3 mb-3">Tu carrito</h2>
      <ShoppingCart />
      {carrito.items.length === 0 && (
        <Button onClick={() => navigate('/Login')}>Registrarse</Button>
      )}
    </PlantillaPublica>
  )
}


//falta revisar y actualizar 
function HomePage() {
    useTituloPagina("Inicio");
    return (
        <MainLayout>
        <h1>Bienvenido a la Veterinaria</h1>
        </MainLayout>
    );}
export default HomePage;