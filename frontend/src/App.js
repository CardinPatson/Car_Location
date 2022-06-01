import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/home";
import Cars from "./components/cars/cars";
import AddCars from "./components/admin/addCars";
import Connreg from "./components/connection/connreg";
import ForgotPassword from "./components/clients/forgotPassword";
import CarReservation from "./components/cars/carReservation";
import CarDetails from "./components/cars/carDetails";
import ModifyDetails from "./components/cars/modifyDetails";
import PaymentAccepted from "./components/clients/paymentAccepted";
import PaymentDenied from "./components/clients/paymentDenied";
import FormIdentities from "./components/clients/formIdentities";
import AddAdmin from "./components/admin/addAdmin";

function App(props) {
	return (
		<Router>
			<Routes>
				{/* Route admin + user */}
				<Route path="/" element={<Home />} />
				<Route path="/cars" element={<Cars name="mercedes" />} />
				<Route path="/connreg" element={<Connreg />} />
				<Route path="/forgotPassword" element={<ForgotPassword />} />
				<Route path="/carReservation" element={<CarReservation />} />
				<Route path="/carDetails" element={<CarDetails />} />
				<Route path="/paymentAccepted" element={<PaymentAccepted />} />
				<Route path="/paymentDenied" element={<PaymentDenied />} />
				<Route path="/formIdentities" element={<FormIdentities />} />

				{/*Route admin */}
				{props.status === "admin" && (
					<>
						<Route path="/add-cars" element={<AddCars />} />
						<Route
							path="/modifyDetails"
							element={<ModifyDetails />}
						/>
						<Route
							path="/add-administrator"
							element={<AddAdmin />}
						/>
					</>
				)}
			</Routes>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		status: state.userState.status,
	};
};
const mapStateToDispatch = (dispatch) => {
	return {};
};
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(App);
