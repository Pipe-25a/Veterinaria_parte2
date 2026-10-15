// Utilidad para formatear fechas
export function formatDate(iso) {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }
  return iso;
}

export default formatDate;
