import { UserRole } from '../../types/api-calls/backend-enums';

/**
 * Get all values from an enum type
 * @param enumType The enum type to get values from
 * @returns Array of enum values
 */
export function getEnumValues<T extends { [key: string]: string | number }>(
  enumType: T
): [string, ...string[]] {
  const values = Object.values(enumType).filter((v): v is string => typeof v === 'string');
  if (values.length === 0) {
    throw new Error('Enum must have at least one value');
  }
  return values as [string, ...string[]];
}

/**
 * Get all keys from an enum type
 * @param enumType The enum type to get keys from
 * @returns Array of enum keys
 */
export function getEnumKeys<T extends { [key: string]: string | number }>(
  enumType: T
): string[] {
  return Object.keys(enumType).filter(
    (key) => typeof enumType[key] === "string" || typeof enumType[key] === "number"
  );
}

/**
 * Convert a string to title case
 * @param str The string to convert
 * @returns The string in title case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get full name from user object
 */
export const getFullName = (
  user: { firstName: string; lastName: string; role?: UserRole | null }
): string => `${user.firstName} ${user.lastName}`;

/**
 * Generate a username from a full name
 */
export const generateUsername = (fullName: string): string => {
  const parts = fullName.toLowerCase().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts[1] || '';
  const randomNum = Math.floor(Math.random() * 90 + 10);
  return `${firstName.charAt(0)}${lastName}${randomNum}`.slice(0, 15);
};

/**
 * Generate an easy to remember password
 */
export const generateEasyPassword = (): string => {
  const adjectives = ['happy', 'sunny', 'bright', 'quick', 'smart'];
  const nouns = ['cat', 'dog', 'bird', 'fish', 'star'];
  const num = Math.floor(Math.random() * 90 + 10);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }${num}`;
};

/**
 * Sort an array of objects by date field
 */
export const sortByDate = <T>(items: T[], field: keyof T): T[] => {
  return [...items].sort(
    (a: any, b: any) =>
      new Date(b[field]).getTime() - new Date(a[field]).getTime()
  );
};

/**
 * Generate a random string of specified length
 */
export function generateRandomNumber(length: number = 8): string {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

/**
 * Format a number as ETB currency
 */
export const formatETB = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB'
  }).format(value);
};
