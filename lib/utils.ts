type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean | undefined };

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean)
    .map((input) => {
      if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') return input.toString();
      if (typeof input === 'object') {
        return Object.entries(input || {})
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ');
}

export function entries<T extends { [key: string]: boolean | undefined }>(obj: T | null): [string, boolean | undefined][] {
  if (!obj) return [];
  return Object.entries(obj);
}
