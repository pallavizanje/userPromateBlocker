// hooks/usePrompt.ts
import {
  unstable_useBlocker as useBlocker,
  Transition,
} from "react-router-dom";
import { useEffect } from "react";

export const usePrompt = (message: string, when: boolean) => {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (!blocker.state === "blocked") return;

    if (when && blocker.state === "blocked") {
      const confirm = window.confirm(message);
      if (confirm) {
        blocker.proceed(); // <- THIS is what navigates programmatically
      } else {
        blocker.reset(); // cancel the transition
      }
    }
  }, [blocker, when, message]);
};
