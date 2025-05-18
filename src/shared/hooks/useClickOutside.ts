import { useEffect, RefObject } from "react";

/**
 * A hook that detects clicks outside of the specified element.
 *
 * @param ref Reference to the element to detect clicks outside of
 * @param handler Function to call when a click outside is detected
 *
 * @example
 * ```tsx
 * const dropdownRef = useRef(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * useClickOutside(dropdownRef, () => {
 *   if (isOpen) setIsOpen(false);
 * });
 *
 * return (
 *   <div>
 *     <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
 *     {isOpen && (
 *       <div ref={dropdownRef}>
 *         Dropdown content
 *       </div>
 *     )}
 *   </div>
 * );
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
