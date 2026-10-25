export const formatDate = (iso) => {
    if (!iso) return '—'

    // Si la fecha viene como "YYYY-MM-DD" (formato ISO de input type="date"),
    // la parseamos como fecha local para evitar el salto de zona horaria.
    if (typeof iso === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(iso)) {
        const [year, month, day] = iso.split('-').map(Number)
        return new Date(year, month - 1, day).toLocaleDateString('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    // Fallback para fechas completas (ISO con hora) o timestamps
    const date = new Date(iso)
    if (isNaN(date.getTime())) return '—'

    return date.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}