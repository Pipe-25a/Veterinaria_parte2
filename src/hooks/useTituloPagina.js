import { useEffect } from 'react'

export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Tienda Demo`
    // El arreglo de abajo indica cuándo se repite el efecto: solo si "titulo" cambia.
  }, [titulo])
}