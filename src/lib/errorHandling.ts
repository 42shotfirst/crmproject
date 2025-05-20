/**
 * Global error handler for fetch requests
 * @param response - The fetch response object
 * @returns The parsed response data
 */
export async function handleFetchResponse(response: Response) {
  if (!response.ok) {
    // Handle HTTP errors
    const errorText = await response.text();
    console.error(`API Error (${response.status}): ${errorText}`);
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Check content type to determine how to parse the response
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return await response.text();
}

/**
 * Wrapper for fetch that includes error handling and timeout
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns The parsed response
 */
export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return await handleFetchResponse(response);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timed out");
      throw new Error("Request timed out");
    }
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 * Global error boundary for React components
 */
export function setupGlobalErrorHandling() {
  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    // Prevent the default browser behavior
    event.preventDefault();
  });

  // Handle uncaught errors
  window.addEventListener("error", (event) => {
    // Filter out errors from extensions or third-party scripts
    if (event.filename && !event.filename.includes(window.location.origin)) {
      return;
    }
    console.error("Uncaught error:", event.error);
    // Prevent the default browser behavior
    event.preventDefault();
  });
}
