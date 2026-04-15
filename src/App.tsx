import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
