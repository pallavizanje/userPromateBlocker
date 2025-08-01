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

  const show = (
    msg: string,
    confirmCallback: () => void,
    cancelCallback: () => void
  ) => {
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="mb-4 text-gray-800">{message}</p>
            <div className="flex justify-end gap-2">
              <button onClick={cancel} className="px-4 py-2 text-sm text-gray-700 border rounded">
                Cancel
              </button>
              <button onClick={confirm} className="px-4 py-2 text-sm text-white bg-blue-600 rounded">
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </PromptContext.Provider>
  );
};
