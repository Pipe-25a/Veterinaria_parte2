import petsMock from '../data/pets.json'

const KEY = 'pets'

const readPets = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem('mascotas'))
    return Array.isArray(saved) ? saved : petsMock
  } catch {
    return petsMock
  }
}

const savePets = (pets) =>
  localStorage.setItem(KEY, JSON.stringify(pets))

export const getPetsByDueno = (email) =>
  readPets().filter((pet) => pet.duenoEmail === email)

export const getPetById = (id) =>
  readPets().find((pet) => pet.id === Number(id)) ?? null

export const addPet = ({ duenoEmail, name, species, breed = '', age = 0 }) => {
  if (!name?.trim() || !species) {
    return { ok: false, error: 'El nombre y la especie son obligatorios' }
  }
  const ageNum = Number(age)
  if (age === '' || Number.isNaN(ageNum) || ageNum < 0) {
    return { ok: false, error: 'La edad debe ser un número válido' }
  }
  const pets = readPets()
  const isDuplicate = pets.some(
    (pet) =>
      pet.duenoEmail === duenoEmail &&
      pet.species === species &&
      (pet.name || pet.nombre || '').toLowerCase() === name.trim().toLowerCase()
  )
  if (isDuplicate) {
    return { ok: false, error: 'Ya tienes una mascota con ese nombre y especie' }
  }
  const newPet = {
    id: Date.now(),
    duenoEmail,
    name: name.trim(),
    species,
    breed: breed.trim(),
    age: ageNum,
  }
  savePets([...pets, newPet])
  return { ok: true, pet: newPet, mascota: newPet }
}
