// hooks/usePrompt.ts
import {
  unstable_useBlocker as useBlocker,
} from "react-router-dom";
import { useEffect } from "react";

export const usePrompt = (message: string, when: boolean) => {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirm = window.confirm(message);
      if (confirm) {
        blocker.proceed(); // ✅ allow navigation
      } else {
        blocker.reset(); // ❌ cancel navigation
      }
    }
  }, [blocker, message, when]);
};
