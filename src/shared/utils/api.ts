/**
 * API response interface
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  status: number;
  success: boolean;
}

/**
 * API error interface
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Fetch options with timeout
 */
export interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Fetch data from an API with timeout and error handling.
 *
 * @param url The URL to fetch from
 * @param options Fetch options
 * @returns A promise that resolves to the API response
 *
 * @example
 * ```ts
 * const response = await fetchWithTimeout('/api/users', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ name: 'John' }),
 *   timeout: 5000
 * });
 *
 * if (response.success) {
 *   console.log(response.data);
 * } else {
 *   console.error(response.error);
 * }
 * ```
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { timeout = 10000, ...fetchOptions } = options;

  try {
    // Create an abort controller to handle timeout
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(id);

    // Parse the response
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      return {
        error: {
          code: `HTTP_${response.status}`,
          message: response.statusText || "An error occurred",
          details: data,
        },
        status: response.status,
        success: false,
      };
    }

    return {
      data: data as T,
      status: response.status,
      success: true,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        error: {
          code: "TIMEOUT",
          message: `Request timed out after ${timeout}ms`,
        },
        status: 408, // Request Timeout
        success: false,
      };
    }

    return {
      error: {
        code: "NETWORK_ERROR",
        message: error.message || "Network error",
        details: error,
      },
      status: 0,
      success: false,
    };
  }
}

/**
 * Handle API errors consistently.
 *
 * @param error The API error to handle
 * @param fallbackMessage A fallback message if the error doesn't have one
 * @returns A user-friendly error message
 *
 * @example
 * ```ts
 * try {
 *   // API call
 * } catch (error) {
 *   const message = handleApiError(error, 'Failed to fetch users');
 *   showErrorNotification(message);
 * }
 * ```
 */
export function handleApiError(
  error: any,
  fallbackMessage: string = "An unexpected error occurred",
): string {
  // Handle ApiError objects
  if (error && error.code && error.message) {
    return error.message;
  }

  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Fallback
  return fallbackMessage;
}
