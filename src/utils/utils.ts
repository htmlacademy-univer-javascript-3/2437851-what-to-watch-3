import { DATE_FORMATTING_OPTIONS } from '../consts';

export function getInclusiveRange(start: number, end: number): number[] {
  return Array.from({length: end - start + 1}, (_, key) => start + key);
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-us', DATE_FORMATTING_OPTIONS);
}

export function formatRunTime(runTime: number): string {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;

  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

export function formatTimeLeft(secondsLeft: number): string {
  let minutes = Math.floor(secondsLeft / 60);
  const hours = Math.floor(minutes / 60);
  minutes %= 60;
  const seconds = secondsLeft % 60;
  let result = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (hours) {
    result = `${hours}:${result}`;
  }

  return `-${result}`;
}
