import React, { useState } from "react";
import { usePrompt } from "./hooks/usePrompt";

const EditFormPage: React.FC = () => {
  const [text, setText] = useState("");
  const isDirty = text.trim().length > 0;

  usePrompt("You have unsaved changes. Do you really want to leave?", isDirty);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Edit Page</h2>
      <textarea
        className="border w-full p-2"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default EditFormPage;
