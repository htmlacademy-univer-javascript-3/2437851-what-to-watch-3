export function buildClassName(baseClassName: string, additionalClassName?: string): string {
  return `${baseClassName}${additionalClassName !== undefined ? ` ${additionalClassName}` : ''}`;
}
