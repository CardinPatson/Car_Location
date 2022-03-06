import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Cars from "./components/cars";
import AddCars from "./components/admin/addCars";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cars" element={<Cars name="mercedes" />} />
				<Route path="/add-cars" element={<AddCars />} />
			</Routes>
		</Router>
	);
}

export default App;
//IN REACT DOM V6 SWITCH IS REPLACE BY Routes
//IMPORoute