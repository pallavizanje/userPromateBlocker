import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PromptProvider } from "./hooks/PromptContext";
import ExampleFormikForm from "./pages/ExampleFormikForm";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <PromptProvider>
        <nav className="flex gap-4 p-4 bg-gray-100">
          <Link to="/" className="text-blue-600">Form</Link>
          <Link to="/about" className="text-blue-600">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ExampleFormikForm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </PromptProvider>
    </BrowserRouter>
  );
}

export default App;
