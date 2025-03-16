export function truncateWords(text: string, maxWords: number): string {
  if (!text) return '';

  // Eliminar todo después del primer salto de línea y espacios circundantes
  const cleanText = text.split(/[\r\n]/)[0].trim();

  const words = cleanText.split(/\s+/);

  if (words.length <= maxWords) {
    return cleanText;
  }

  return words.slice(0, maxWords).join(' ') + ' ...';
}