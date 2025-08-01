import { useEffect } from "react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";
import { usePromptContext } from "./PromptProvider";

export const usePrompt = (message: string, when: boolean) => {
  const blocker = useBlocker(when);
  const prompt = usePromptContext();

  useEffect(() => {
    if (blocker.state === "blocked") {
      prompt.show(
        message,
        () => blocker.proceed(), // allow navigation
        () => blocker.reset()    // cancel navigation
      );
    }
  }, [blocker, message, prompt, when]);
};
