import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function entries<T extends { [key: string]: boolean | undefined }>(obj: T | null): [string, boolean | undefined][] {
  if (!obj) return [];
  return Object.entries(obj);
}
