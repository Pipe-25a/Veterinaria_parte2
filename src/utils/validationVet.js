export const validateVetHistory = (data = {}) => {
  const errors = {}

  const pet = String(data.pet ?? data.mascota ?? '').trim()
  const species = String(data.species ?? data.especie ?? '').trim()
  const dueno = String(data.dueno ?? data.duenoEmail ?? data.nombreDueno ?? '').trim()
  const type = String(data.type ?? data.tipo ?? '').trim()
  const date = String(data.date ?? data.fecha ?? '').trim()

  if (!pet) errors.pet = 'El nombre de la mascota es obligatorio'
  else if (pet.length < 2) errors.pet = 'El nombre debe tener al menos 2 caracteres'

  if (!species) errors.species = 'Debes seleccionar una especie'
  if (!dueno) errors.dueno = 'El dueño es obligatorio'
  if (!type) errors.type = 'Debes seleccionar el tipo de atención'
  if (!date) errors.date = 'La fecha de atención es obligatoria'

  return { errors, isValid: Object.keys(errors).length === 0 }
}

export const validateVetRecord = (data = {}) => {
  const errors = {}

  const pet = String(data.pet ?? data.mascota ?? '').trim()
  const dueno = String(data.dueno ?? data.duenoEmail ?? data.nombreDueno ?? '').trim()
  const species = String(data.species ?? data.especie ?? '').trim()
  const condition = String(data.condition ?? data.condicion ?? '').trim()
  const rawAge = data.age ?? data.edad
  const rawWeight = data.weight ?? data.peso

  if (!pet) errors.pet = 'El nombre de la mascota es obligatorio'
  else if (pet.length < 2) errors.pet = 'El nombre de la mascota debe tener al menos 2 caracteres'

  if (!dueno) errors.dueno = 'El nombre del dueño es obligatorio'
  if (!species) errors.species = 'Debes seleccionar una especie'
  if (!condition) errors.condition = 'Debes seleccionar una condición de salud'

  if (rawAge !== '' && rawAge !== undefined && rawAge !== null) {
    const ageNum = Number(rawAge)
    if (Number.isNaN(ageNum) || ageNum < 0) errors.age = 'La edad debe ser un número válido'
  }

  if (rawWeight !== '' && rawWeight !== undefined && rawWeight !== null) {
    const weightNum = Number(rawWeight)
    if (Number.isNaN(weightNum) || weightNum <= 0) errors.weight = 'El peso debe ser un número mayor a 0'
  }

  return { errors, isValid: Object.keys(errors).length === 0 }
}