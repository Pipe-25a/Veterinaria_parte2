export const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}
