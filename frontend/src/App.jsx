import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { pages } from "./pages.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {pages.map(p => (
        <Route key={p.path} path={p.path} element={<p.component />} />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
