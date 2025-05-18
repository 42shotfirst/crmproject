/**
 * Format a date according to the specified format.
 *
 * @param date The date to format
 * @param format The format string (default: 'MM/dd/yyyy')
 * @returns The formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date('2023-06-15')); // '06/15/2023'
 * formatDate(new Date('2023-06-15'), 'yyyy-MM-dd'); // '2023-06-15'
 * ```
 */
export function formatDate(date: Date, format: string = "MM/dd/yyyy"): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return format
    .replace("dd", day)
    .replace("MM", month)
    .replace("yyyy", year.toString())
    .replace("yy", year.toString().slice(-2));
}

/**
 * Format a currency amount.
 *
 * @param amount The amount to format
 * @param currency The currency code (default: 'USD')
 * @param locale The locale (default: 'en-US')
 * @returns The formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56); // '$1,234.56'
 * formatCurrency(1234.56, 'EUR', 'de-DE'); // '1.234,56 €'
 * ```
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format a number with the specified number of decimal places.
 *
 * @param value The number to format
 * @param decimals The number of decimal places (default: 2)
 * @param locale The locale (default: 'en-US')
 * @returns The formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234.56789); // '1,234.57'
 * formatNumber(1234.56789, 3); // '1,234.568'
 * ```
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a phone number in the specified format.
 *
 * @param phone The phone number to format
 * @param format The format string (default: '(###) ###-####')
 * @returns The formatted phone number
 *
 * @example
 * ```ts
 * formatPhoneNumber('1234567890'); // '(123) 456-7890'
 * formatPhoneNumber('1234567890', '###-###-####'); // '123-456-7890'
 * ```
 */
export function formatPhoneNumber(
  phone: string,
  format: string = "(###) ###-####",
): string {
  if (!phone) return "";

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Replace # with digits
  let result = format;
  for (let i = 0; i < digits.length && result.includes("#"); i++) {
    result = result.replace("#", digits[i]);
  }

  // Remove any remaining # placeholders
  result = result.replace(/#/g, "");

  return result;
}

/**
 * Truncate a string to the specified length and add an ellipsis if needed.
 *
 * @param str The string to truncate
 * @param length The maximum length (default: 50)
 * @param ellipsis The ellipsis string (default: '...')
 * @returns The truncated string
 *
 * @example
 * ```ts
 * truncateString('This is a long string that needs to be truncated', 20);
 * // 'This is a long stri...'
 * ```
 */
export function truncateString(
  str: string,
  length: number = 50,
  ellipsis: string = "...",
): string {
  if (!str) return "";
  if (str.length <= length) return str;

  return str.slice(0, length) + ellipsis;
}
