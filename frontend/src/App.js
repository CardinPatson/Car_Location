import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Cars from "./components/cars";
import AddCars from "./components/admin/addCars";
import Connreg from "./components/connreg";
import ForgotPassword from "./components/forgotPassword";
import Car_reservation from "./components/carReservation";
import Car_Details from "./components/cardetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars name="mercedes" />} />
        <Route path="/add-cars" element={<AddCars />} />
        <Route path="/connreg" element={<Connreg />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/CarReservation" element={<Car_reservation />} />
        <Route path="/cardetails" element={<Car_Details />} />
      </Routes>
    </Router>
  );
}

export default App;
//IN REACT DOM V6 SWITCH IS REPLACE BY Routes
//IMPORoute
