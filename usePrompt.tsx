import { useBlocker } from "react-router-dom";
import { useEffect } from "react";
import { usePromptContext } from "./PromptContext";

export const usePrompt = (message: string, when: boolean) => {
  const blocker = useBlocker(when);
  const { showPrompt } = usePromptContext();

  useEffect(() => {
    if (blocker.state === "blocked") {
      showPrompt(
        message,
        () => blocker.proceed(),
        () => blocker.reset()
      );
    }
  }, [blocker, showPrompt, message]);
};
