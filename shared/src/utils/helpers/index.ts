// Export all helper functions here
// Example: export * from './common-helpers.js';

export function getEnumValues<T extends { [key: string]: string | number }>(enumObj: T): string[] {
  return Object.values(enumObj).filter((value) => typeof value === 'string');
}
