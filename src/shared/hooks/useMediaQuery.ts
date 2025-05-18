import { useState, useEffect } from "react";

/**
 * A hook that returns true if the current viewport matches the given media query.
 *
 * @param query The media query to match against
 * @returns Whether the media query matches
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * return (
 *   <div>
 *     {isMobile ? 'Mobile View' : 'Desktop View'}
 *   </div>
 * );
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Avoid running on the server
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      // Set initial value
      setMatches(media.matches);

      // Create event listener
      const listener = () => setMatches(media.matches);

      // Listen for changes
      media.addEventListener("change", listener);

      // Clean up
      return () => media.removeEventListener("change", listener);
    }
  }, [query]);

  return matches;
}
