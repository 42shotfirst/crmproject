/**
 * Validate an email address.
 *
 * @param email The email address to validate
 * @returns Whether the email is valid
 *
 * @example
 * ```ts
 * isValidEmail('user@example.com'); // true
 * isValidEmail('invalid-email'); // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * Validate a phone number.
 *
 * @param phone The phone number to validate
 * @returns Whether the phone number is valid
 *
 * @example
 * ```ts
 * isValidPhone('123-456-7890'); // true
 * isValidPhone('(123) 456-7890'); // true
 * isValidPhone('123'); // false
 * ```
 */
export function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Check if the number of digits is valid (assuming US phone number)
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * Validate a password against common requirements.
 *
 * @param password The password to validate
 * @param options Options for validation
 * @returns An object with validation results
 *
 * @example
 * ```ts
 * isValidPassword('Abc123!@#');
 * // { isValid: true, errors: [] }
 *
 * isValidPassword('abc');
 * // {
 * //   isValid: false,
 * //   errors: ['Password must be at least 8 characters', 'Password must contain at least one uppercase letter', ...]
 * // }
 * ```
 */
export function isValidPassword(
  password: string,
  options = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < options.minLength) {
    errors.push(`Password must be at least ${options.minLength} characters`);
  }

  if (options.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (options.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (options.requireNumbers && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (options.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty object).
 *
 * @param value The value to check
 * @returns Whether the value is empty
 *
 * @example
 * ```ts
 * isEmpty(''); // true
 * isEmpty(null); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty('text'); // false
 * ```
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Validate a URL.
 *
 * @param url The URL to validate
 * @returns Whether the URL is valid
 *
 * @example
 * ```ts
 * isValidUrl('https://example.com'); // true
 * isValidUrl('example'); // false
 * ```
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
