// hooks/PromptContext.tsx
import React, { createContext, useContext, useState } from "react";

type Blocker = () => void;

interface PromptContextType {
  showPrompt: (message: string, proceed: Blocker, cancel: Blocker) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePromptContext = () => {
  const context = useContext(PromptContext);
  if (!context) throw new Error("usePromptContext must be used within PromptProvider");
  return context;
};

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [onProceed, setOnProceed] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const showPrompt = (msg: string, proceed: Blocker, cancel: Blocker) => {
    setMessage(msg);
    setOnProceed(() => proceed);
    setOnCancel(() => cancel);
    setShow(true);
  };

  const handleConfirm = () => {
    onProceed();
    setShow(false);
  };

  const handleCancel = () => {
    onCancel();
    setShow(false);
  };

  return (
    <PromptContext.Provider value={{ showPrompt }}>
      {children}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96 text-center">
            <p className="mb-4 text-lg">{message}</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded">
                Leave
              </button>
              <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </PromptContext.Provider>
  );
};
