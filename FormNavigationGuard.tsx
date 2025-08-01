// components/FormNavigationGuard.tsx
import { useFormikContext } from "formik";
import { usePrompt } from "../hooks/usePrompt";
import { useBeforeUnload } from "../hooks/useBeforeUnload";

export const FormNavigationGuard = ({ message = "You have unsaved changes. Leave anyway?" }) => {
  const { dirty } = useFormikContext();
  usePrompt(message, dirty);
  useBeforeUnload(dirty);
  return null;
};
