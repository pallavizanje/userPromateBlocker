import { useEffect } from "react";

export const useBeforeUnload = (when: boolean, message = "You have unsaved changes.") => {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!when) return;
      e.preventDefault();
      e.returnValue = message;
    };

    if (when) {
      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
    }
  }, [when, message]);
};
