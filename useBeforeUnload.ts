import { useEffect } from "react";

export const useBeforeUnload = (when: boolean, message = "Are you sure you want to leave?") => {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (when) {
        e.preventDefault();
        e.returnValue = message; // Required for modern browsers
      }
    };

    if (when) {
      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
    }
  }, [when, message]);
};
