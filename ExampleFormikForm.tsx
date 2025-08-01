import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormNavigationGuard } from "../components/FormNavigationGuard";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

export default function ExampleFormikForm() {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      {({ errors, touched }) => (
        <Form className="p-4">
          <FormNavigationGuard />
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">
              Name
            </label>
            <Field id="name" name="name" className="border p-2 w-full" />
            {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
