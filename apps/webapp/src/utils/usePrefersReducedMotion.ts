import React from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

const usePrefersReducedMotion = () => {
  // Default to no-animations, since we don't know what the
  // user's preference is on the server.
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState<boolean>();

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    // Set the true initial value, now that we're on the client:
    setPrefersReducedMotion(!mediaQueryList.matches);

    // Register our event listener
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
