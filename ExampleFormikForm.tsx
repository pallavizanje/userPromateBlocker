import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { usePrompt } from "./hooks/usePrompt";
import { useBeforeUnload } from "./hooks/useBeforeUnload";

const ExampleFormikForm = () => {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({ name: Yup.string().required() })}
      onSubmit={(values) => {
        console.log("Submitted:", values);
      }}
    >
      {({ dirty }) => {
        usePrompt("You have unsaved changes. Do you really want to leave?", dirty);
        useBeforeUnload(dirty);

        return (
          <Form className="p-4 space-y-2">
            <Field name="name" className="border p-2 w-full" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
