import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./presentation/components/header/NavBar";
import Home from "./presentation/home/Home";
import Setting from "./presentation/home/Setting";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
}

export default App;
