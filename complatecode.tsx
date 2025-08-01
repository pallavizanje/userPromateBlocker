// File: hooks/PromptProvider.tsx
import React, { createContext, useContext, useState } from "react";

type PromptContextType = {
  show: (message: string, onConfirm: () => void, onCancel: () => void) => void;
};

const PromptContext = createContext<PromptContextType | null>(null);

export const usePromptContext = () => {
  const ctx = useContext(PromptContext);
  if (!ctx) throw new Error("usePromptContext must be used within PromptProvider");
  return ctx;
};

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const show = (msg: string, confirmCallback: () => void, cancelCallback: () => void) => {
    setMessage(msg);
    setOnConfirm(() => confirmCallback);
    setOnCancel(() => cancelCallback);
    setVisible(true);
  };

  const confirm = () => {
    onConfirm();
    setVisible(false);
  };

  const cancel = () => {
    onCancel();
    setVisible(false);
  };

  return (
    <PromptContext.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <p className="text-gray-800 mb-4">{message}</p>
            <div className="flex justify-end gap-2">
              <button onClick={cancel} className="border px-4 py-2 rounded">Cancel</button>
              <button onClick={confirm} className="bg-blue-600 text-white px-4 py-2 rounded">Leave</button>
            </div>
          </div>
        </div>
      )}
    </PromptContext.Provider>
  );
};


// File: hooks/usePrompt.ts
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
        () => blocker.proceed(),
        () => blocker.reset()
      );
    }
  }, [blocker, message, prompt, when]);
};


// File: hooks/useBeforeUnload.ts
import { useEffect } from "react";

export const useBeforeUnload = (when: boolean, message = "Are you sure you want to leave?") => {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (when) {
        e.preventDefault();
        e.returnValue = message;
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when, message]);
};


// File: pages/ExampleFormikForm.tsx
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { usePrompt } from "../hooks/usePrompt";
import { useBeforeUnload } from "../hooks/useBeforeUnload";
import { useEffect, useState } from "react";

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
      validationSchema={Yup.object({ name: Yup.string().required("Required") })}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form className="p-4 space-y-4">
        <FormNavigationBlocker />
        <div>
          <label htmlFor="name" className="block font-semibold">Name:</label>
          <Field id="name" name="name" className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ExampleFormikForm;


// File: App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PromptProvider } from "./hooks/PromptProvider";
import ExampleFormikForm from "./pages/ExampleFormikForm";

const Home = () => <div className="p-4 text-xl">Home Page</div>;

function App() {
  return (
    <BrowserRouter>
      <PromptProvider>
        <nav className="p-4 bg-gray-100 space-x-4">
          <Link to="/">Home</Link>
          <Link to="/edit">Edit Form</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<ExampleFormikForm />} />
        </Routes>
      </PromptProvider>
    </BrowserRouter>
  );
}

export default App;
