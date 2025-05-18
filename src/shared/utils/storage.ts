/**
 * Set an item in localStorage with optional expiration.
 *
 * @param key The key to store the value under
 * @param value The value to store
 * @param expirationMinutes Optional expiration time in minutes
 *
 * @example
 * ```ts
 * // Store for session
 * setLocalStorageItem('user', { id: 1, name: 'John' });
 *
 * // Store with 60 minute expiration
 * setLocalStorageItem('authToken', 'token123', 60);
 * ```
 */
export function setLocalStorageItem<T>(
  key: string,
  value: T,
  expirationMinutes?: number,
): void {
  try {
    const item = {
      value,
      expiration: expirationMinutes
        ? new Date().getTime() + expirationMinutes * 60 * 1000
        : null,
    };

    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
}

/**
 * Get an item from localStorage, respecting expiration if set.
 *
 * @param key The key to retrieve
 * @returns The stored value, or null if expired or not found
 *
 * @example
 * ```ts
 * const user = getLocalStorageItem('user');
 * if (user) {
 *   console.log(user.name);
 * }
 * ```
 */
export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);

    // Check for expiration
    if (item.expiration && new Date().getTime() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value as T;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return null;
  }
}

/**
 * Remove an item from localStorage.
 *
 * @param key The key to remove
 *
 * @example
 * ```ts
 * removeLocalStorageItem('authToken');
 * ```
 */
export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item ${key}:`, error);
  }
}

/**
 * Clear all items from localStorage.
 *
 * @example
 * ```ts
 * clearLocalStorage();
 * ```
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Set an item in sessionStorage.
 *
 * @param key The key to store the value under
 * @param value The value to store
 *
 * @example
 * ```ts
 * setSessionStorageItem('searchFilters', { status: 'active', sort: 'name' });
 * ```
 */
export function setSessionStorageItem<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage item ${key}:`, error);
  }
}

/**
 * Get an item from sessionStorage.
 *
 * @param key The key to retrieve
 * @returns The stored value, or null if not found
 *
 * @example
 * ```ts
 * const filters = getSessionStorageItem('searchFilters');
 * if (filters) {
 *   applyFilters(filters);
 * }
 * ```
 */
export function getSessionStorageItem<T>(key: string): T | null {
  try {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return null;

    return JSON.parse(itemStr) as T;
  } catch (error) {
    console.error(`Error getting sessionStorage item ${key}:`, error);
    return null;
  }
}
