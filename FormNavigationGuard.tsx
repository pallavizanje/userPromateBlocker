import { useFormikContext } from "formik";
import { usePrompt } from "../hooks/usePrompt";
import { useBeforeUnload } from "../hooks/useBeforeUnload";

export const FormNavigationGuard = ({ message = "You have unsaved changes. Leave anyway?" }) => {
  const formik = useFormikContext();
  const isDirty = formik.dirty;

  usePrompt(message, isDirty);
  useBeforeUnload(isDirty);

  return null;
};
