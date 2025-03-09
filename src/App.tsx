import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./presentation/components/header/NavBar";
import Home from "./presentation/home/Home";
import MeasurementForm from "./presentation/home/MeasurementForm";
import Setting from "./presentation/home/Setting";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/measure" element={<MeasurementForm />} />
      </Routes>
    </>
  );
}

export default App;
