export function getInclusiveRange(start: number, end: number): number[] {
  return Array.from({length: end - start}, (_, key) => start + key);
}
