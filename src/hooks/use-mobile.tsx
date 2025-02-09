/**
 * `useIsMobile` Hook
 *
 * A custom React hook that determines if the current viewport width
 * is considered "mobile" based on a specified breakpoint.
 *
 * @constant {number} MOBILE_BREAKPOINT - The width in pixels defining the mobile breakpoint (default: 768px).
 *
 * @returns {boolean} `true` if the viewport width is less than the mobile breakpoint, otherwise `false`.
 *
 * @example
 * ```tsx
 * import { useIsMobile } from "@/hooks/useIsMobile";
 *
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? <p>📱 Mobile View</p> : <p>🖥️ Desktop View</p>}
 *     </div>
 *   );
 * }
 * ```
 */

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    /**
     * Updates the `isMobile` state based on the current window width.
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Listen for changes in screen width
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup event listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
