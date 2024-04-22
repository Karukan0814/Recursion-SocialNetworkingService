export function truncateText(text: string, maxWordLength: number) {
  if (text.length > maxWordLength) {
    return text.substring(0, maxWordLength) + "...";
  }
  return text;
}
