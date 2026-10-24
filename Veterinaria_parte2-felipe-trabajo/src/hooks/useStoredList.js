import { useState, useEffect } from 'react'

export function useStoredList(storageKey, initialData, idKey = 'id') {
    const [items, setItems] = useState([])

    // Cargar datos al iniciar
    useEffect(() => {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch {
                setItems(initialData)
            }
        } else {
            setItems(initialData)
            localStorage.setItem(storageKey, JSON.stringify(initialData))
        }
    }, [storageKey, initialData])

    // Guardar en localStorage cada vez que cambie la lista
    const save = (newItems) => {
        setItems(newItems)
        localStorage.setItem(storageKey, JSON.stringify(newItems))
    }

    const add = (item) => {
        const newItem = { ...item, [idKey]: Date.now().toString() }
        save([...items, newItem])
        return { ok: true, item: newItem }
    }

    const update = (id, updatedItem) => {
        save(items.map((item) => (item[idKey] === id ? { ...item, ...updatedItem } : item)))
        return { ok: true }
    }

    const remove = (id) => {
        save(items.filter((item) => item[idKey] !== id))
        return { ok: true }
    }

    return { items, add, update, remove }
}