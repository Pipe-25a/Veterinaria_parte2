import { useEffect } from 'react'

export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Veterinaria San Marcos`
  }, [titulo])
}
