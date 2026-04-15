import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Customers from "./pages/Customers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
}

export default App;
