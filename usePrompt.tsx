import { useCallback, useEffect } from "react";
import {
  useBlocker,
  useNavigate,
  useLocation,
  unstable_useBlocker as useReactRouterBlocker,
} from "react-router-dom";

// Wrapper for newer versions (React Router v6.4+)
export function usePrompt(message: string, when: boolean) {
  const blocker = useCallback(
    (tx: any) => {
      if (window.confirm(message)) {
        tx.retry();
      }
    },
    [message]
  );

  useBlocker(when ? blocker : null);
}
