import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { usePrompt } from "./hooks/usePrompt";
import { useBeforeUnload } from "./hooks/useBeforeUnload";
import { useEffect, useState } from "react";

// This component reads Formik's dirty state and applies hooks
const FormNavigationBlocker = () => {
  const formik = useFormikContext();
  const [isDirty, setIsDirty] = useState(formik.dirty);

  useEffect(() => {
    setIsDirty(formik.dirty);
  }, [formik.dirty]);

  usePrompt("You have unsaved changes. Do you really want to leave?", isDirty);
  useBeforeUnload(isDirty);

  return null;
};

const ExampleFormikForm = () => {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({ name: Yup.string().required() })}
      onSubmit={(values) => {
        console.log("Submitted:", values);
      }}
    >
      <Form className="p-4 space-y-2">
        <FormNavigationBlocker />
        <Field name="name" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ExampleFormikForm;
