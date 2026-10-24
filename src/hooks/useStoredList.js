import { useState } from 'react'

export function useStoredList(storageKey, initialData, idKey = 'id') {
    //  1. Inicializamos el estado leyendo del localStorage (esto lo tenías perfecto)
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return initialData
            }
        }
        // Si no hay datos guardados, guardamos los iniciales y los retornamos
        localStorage.setItem(storageKey, JSON.stringify(initialData))
        return initialData
    })

    //  2. La función save se mantiene por si la necesitas usar directamente
    const save = (newItems) => {
        setItems(newItems)
        localStorage.setItem(storageKey, JSON.stringify(newItems))
    }

    //  3. Funciones actualizadas para usar el estado previo (a prueba de balas)
    const add = (item) => {
        const newItem = { ...item, [idKey]: Date.now().toString() }
        setItems((prevItems) => {
            const updated = [...prevItems, newItem]
            localStorage.setItem(storageKey, JSON.stringify(updated))
            return updated
        })
        return { ok: true, item: newItem }
    }

    const update = (id, updatedItem) => {
        setItems((prevItems) => {
            const updated = prevItems.map((item) => (item[idKey] === id ? { ...item, ...updatedItem } : item))
            localStorage.setItem(storageKey, JSON.stringify(updated))
            return updated
        })
        return { ok: true }
    }

    const remove = (id) => {
        setItems((prevItems) => {
            const updated = prevItems.filter((item) => item[idKey] !== id)
            localStorage.setItem(storageKey, JSON.stringify(updated))
            return updated
        })
        return { ok: true }
    }

    // ✅ 4. Retornamos todo para que tus componentes lo puedan usar
    return { items, save, add, update, remove }
}