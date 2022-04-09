import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./header";
import styled from "styled-components";
import CarSlot from "./carSlot";
import { getCarsProperty, getCarsImages } from "../action/carAction";
import localForage from "localforage";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";

function Cars(props) {
	const [focusedStart, setFocusedStart] = useState(false);
	const [focusedEnd, setFocusedEnd] = useState(false);
	const [startDate, setStartDate] = useState(moment());
	const [startTime, setStartTime] = useState("");
	const [endDate, setEndDate] = useState(moment());
	const [endTime, setEndTime] = useState("");
	const [error, setError] = useState("");
	useEffect(() => {
		localForage
			.clear()
			.then(() => {
				console.log("clear");
			})
			.catch((e) => {
				console.log(e);
			});
		props.getCars();
		props.getCarsImages();
	}, []);
	let carsImages = {};
	if (props.images && props.images.length) {
		for (let image of props.images) {
			if (image.car_id) carsImages[image.car_id] = image.file_names;
		}
	}
	const handleClick = (e) => {
		e.preventDefault();
		//date actuelle
		let currentDate = moment().format("D MMMM YYYY");
		let currentDay = new window.Date(currentDate);

		//date de début et de fin de location
		let startDateFormat = startDate.format("D MMMM YYYY");
		let startDay = new window.Date(startDateFormat);
		let endDateFormat = endDate.format("D MMMM YYYY");
		let endDay = new window.Date(endDateFormat);

		//heure actuelle
		let currentHour = parseInt(startDate.format("LT").substring(0, 2));

		//heure de début et fin de location
		let startHour = parseInt(startTime.substring(0, 2));
		let endHour = parseInt(endTime.substring(0, 2));

		//CONDITION DE SOUMISSION
		//si pas heure de début ou de fin erreur
		if (!endTime || !startTime) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}

		//si la date est aujourdhui l'heure de début ou de fin doit être supérieur à l'heure actuelle
		if (
			startDay.getTime() === currentDay.getTime() &&
			startHour <= currentHour
		) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}
		if (endDay.getTime() === currentDay.getTime() && endHour <= currentHour) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}

		//si la date de début et de fin est aujourdhui , l'heure de fin de location doit être supérieur à celle de début
		if (startDay.getTime() === endDay.getTime() && startHour >= endHour) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}
		//Heure d'ouverture du magazin
		if (startHour < 8 || startHour > 19 || endHour < 8 || endHour > 19) {
			setError("L'heure d'ouverture du magazin est de 8:00 a 19:00 !!");
			return;
		}

		const filterInfo = {
			startDate: startDateFormat,
			endDate: endDateFormat,
			startTime: startTime,
			endTime: endTime,
		};
		//requête vers l'api
		props.getSlot(filterInfo);

		//si requête ok redirection vers la page /cars
	};
	return (
		<Container>
			<Content>
				<Header />

				<Filter
					onScroll={() => {
						window.scrollTo(0, 0);
					}}
				>
					<h2>Filtres</h2>
					<Price>
						<h5>Prix/jour</h5>
						<div>
							<span>Prix Min</span>
							<input
								type="range"
								min="200"
								max="400"
								// value="300"
								className="slider"
							/>
							<span>Prix Max</span>
						</div>
						<p>Valeur</p>
					</Price>
					<Brand>
						<h5>Marque et modèle</h5>
						<div>
							<select>
								<option value="Brand1">Marque 1</option>
								<option value="Brand2">Marque 2</option>
								<option value="Brand3">Marque 3</option>
							</select>
							<span>
								<span className="foo rectangle"></span>
								<span className="foo triangle-right"></span>
							</span>
							<select>
								<option value="Model">Modèle 1</option>
								<option value="Model 2">Modèle 2</option>
								<option value="Model 3">Modèle 3</option>
							</select>
						</div>
					</Brand>
					<Slot>
						<h5>Période de location</h5>
						<div className="slot__range">
							<div className="slot__time">
								<p>Du</p>
								<StyledDatePickerWrapper>
									<SingleDatePicker
										numberOfMonths={1}
										onDateChange={(date) => {
											setError("");
											setStartDate(date);
										}}
										onFocusChange={(focus) => {
											setFocusedStart(focus.focused);
										}}
										focused={focusedStart}
										date={startDate}
									/>
								</StyledDatePickerWrapper>
								<input
									type="time"
									onChange={(e) => {
										setError("");
										setStartTime(e.target.value);
									}}
								/>
							</div>
							<div className="slot__time">
								<p>Au </p>
								<StyledDatePickerWrapper>
									<SingleDatePicker
										numberOfMonths={1}
										onDateChange={(date) => {
											setError("");
											setEndDate(date);
										}}
										onFocusChange={(focus) => {
											setFocusedEnd(focus.focused);
										}}
										focused={focusedEnd}
										date={endDate}
									/>
								</StyledDatePickerWrapper>{" "}
								<input
									type="time"
									onChange={(e) => {
										setError("");
										setEndTime(e.target.value);
									}}
								/>
							</div>
						</div>
					</Slot>
					<button
						onClick={() => {
							/**Verifier les données du formulaire */
							// todo pour la date envoyer les données au composant slot
						}}
					>
						Valider
					</button>
				</Filter>
				<Available>
					<h2>Voitures disponibles</h2>

					<CarsPannel>
						{props.cars.length &&
							props.cars.map((car) => {
								return (
									<CarSlot
										key={car.car_id}
										car={car}
										images={carsImages[car.id]}
									/>
								);
							})}
					</CarsPannel>
				</Available>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	margin: 0 auto;
	max-width: 1600px;
	display: flex;
	justify-content: center;
`;
const Content = styled.div`
	/* border: solid black 1px; */
	width: 100%;
	margin-top: 75px;
	display: flex;
	/* position : fixed ;  */
	flex-direction: row;
	justify-content: center;
	position: relative;
	margin-bottom: 9px;
	background-image: url("./images/car_4.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	padding: 10px 0 15px 0;
`;
const Filter = styled.div`
	border: solid #00a9ff 0.5px;
	/* PENSER A BLOQUER LE FILTRE LORS DU SCROLL */
	/* display: flex;
	flex-direction: column; */
	/* position: fixed;
	left: 20%; */
	flex: 0.3;
	overflow-y: hidden;
	margin-right: 15px;
	border-radius: 5px;
	box-shadow: 0 0 1px black;
	background-color: rgb(255, 255, 255, 0.9);
	/* position: fixed; */

	h2,
	button {
		/* border: solid red 1px; */
		font-size: 1.3em;
		font-weight: normal;
		padding: 5px;
		background-color: #00a9ff;
	}
	button {
		width: 80%;
		font-size: 1em;
		border: none;
		border-radius: 5px;
		margin: 15px 0;
		padding: 8px;
		cursor: pointer;
		&:hover {
			color: white;
			background-color: #00b2f1;
		}
	}
`;
const Price = styled.div`
	h5 {
		padding: 15px 10px 15px 10px;
		font-size: 1.15em;
		font-weight: normal;
		background-color: rgb(243, 243, 243, 0.9);
		margin-bottom: 30px;
	}
	div {
		/* border: solid red 1px; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px 0;
		width: 100%;
		span {
			padding: 3px;
		}
	}
	.slider {
		outline: none;
		opacity: 0.6;
		width: 60%;
		height: 3px;
		background: #d3d3d3;
		transition: opacity 0.2s;
		-webkit-transition: 0.2s;
	}
	.slider::-moz-range-thumb {
		cursor: pointer;
	}
	.slider::-webkit-slider-thumb {
		cursor: pointer;
	}
	.slider:hover {
		opacity: 0.8;
	}
	p {
		padding: 10px;
	}
	border-bottom: solid 1px rgba(0, 0, 0, 0.08);
`;
const Brand = styled(Price)`
	div {
		justify-content: space-around;
		margin-bottom: 20px;
		/* border: solid red 1px; */
		span {
			padding: 0;
		}
		.foo {
			display: inline-block;
			vertical-align: middle;
		}
		.rectangle {
			height: 3px;
			width: 20px;
			background-color: #555;
			@media (max-width: 768px) {
				height: 3px;
				width: 10px;
			}
		}

		.triangle-right {
			width: 0;
			height: 0;
			border-top: 5px solid transparent;
			border-left: 15px solid #555;
			border-bottom: 5px solid transparent;
			@media (max-width: 768px) {
				border-top: 1px solid transparent;
				border-left: 2px solid #555;
				border-bottom: 1px solid transparent;
			}
		}
	}
	select {
		border: solid #00a9ff 1px;
		padding: 8px;
		outline: none;
	}
`;
const Slot = styled(Brand)`
	/* border: solid red 1px; */
	display: flex;
	flex-direction: column;
	.slot__range {
		padding: 0;
	}
	.slot__time {
		display: flex;
		align-items: center;
		/* border: solid red 1px; */
		flex-direction: column;
		input {
			/* background: #f3f3f3; */
			border: solid #00a9ff 1px;
			/*font-family: "Roboto";
			padding: 5px;
			width: 70%;
			border-radius: 5px; */
			margin-right: 5px;
			font-family: "Roboto";
			border: none;
			padding: 5px;
			/* font-size: 0.7em;
			border: none;
			/* background-color: #f3f3f3; */
			/* padding: 5px; */
			@media (min-width: 1000px) {
				margin-left: 10px;
			}
		}
	}
`;

const Available = styled.div`
	/* border: solid red 1px; */
	flex: 0.65;
	border: solid #00a9ff 0.5px;
	border-radius: 5px;
	box-shadow: 0 0 1px black;
	background-color: rgb(255, 255, 255, 0.9);
	h2,
	button {
		/* border: solid red 1px; */
		font-size: 1.3em;
		font-weight: normal;
		padding: 5px;
		background-color: #00a9ff;
	}
`;

const CarsPannel = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-y: auto;
	scroll-behavior: smooth;
	overflow-x: hidden;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px #bfbfbf;
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb {
		background: #00a9ff;
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #0078b5;
	}
`;

const StyledDatePickerWrapper = styled.div`
	& .SingleDatePicker,
	.SingleDatePickerInput {
		.DateInput {
			/* width: 50%: */
			height: 20px;
			display: flex;
			/* border: solid blue 1px; */
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.DateInput_input {
				font-size: 1em;
				border-bottom: 0;
				padding: 5px 5px 5px;
			}
		}

		.SingleDatePickerInput__withBorder {
			/* border: solid blue 1px; */
			border-radius: 4px;
			overflow: hidden;
			display: flex;

			:hover,
			.DateInput_input__focused {
				/* border: 1px solid red; */
			}

			.CalendarDay__selected {
				background: blue;
				border: blueviolet;
				border: solid blue 1px;
			}
		}

		.SingleDatePicker_picker.SingleDatePicker_picker {
			/* top: 43px;
			left: 2px; */
			border: solid red 1px;
			/* top: 43px !important;
			left: 2px !important; */
		}
	}
`;

const mapStateToProps = (state) => {
	return {
		cars: state.carState.cars,
		images: state.carState.images,
	};
};
const mapStateToDispatch = (dispatch) => {
	return {
		getCars: () => dispatch(getCarsProperty()),
		getCarsImages: () => dispatch(getCarsImages()),
	};
};
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Cars);
