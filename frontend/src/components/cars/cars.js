import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Header from "../header";
import styled from "styled-components";
import CarSlot from "./carSlot";
import { getCarsProperty, getCarsImages } from "../../action/carAction";
import { getOrdersInfoByDates } from "../../action/orderAction";
import { useLocation } from "react-router-dom";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";

function Cars(props) {
	// Ceci est une fonction de type composant React pour la page cars.
	// PRE: -
	// POST: retourne la page de la liste des voitures pour qu'elle soit affichée.

	// Ici, ce sont tous les hooks contenant les valeurs des filtres.

	// Voici les hooks pour les valeurs du filtre date.
	const [focusedStart, setFocusedStart] = useState(false);
	const [focusedEnd, setFocusedEnd] = useState(false);
	const [startDate, setStartDate] = useState(moment());
	const [startTime, setStartTime] = useState("");
	const [endDate, setEndDate] = useState(moment());
	const [endTime, setEndTime] = useState("");

	// Ce hooks "error" sera utilisé quand le filtre date est sera mal rempli.
	const [error, setError] = useState("");

	// Ici les hooks pour le filtre prix.
	const [maxPrice, setMaxPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const [sliderValue, setSliderValue] = useState(0);

	// Et ici, les hooks pour le filtre marque/modèle.
	const [fullBrandModel, setFullBrandModel] = useState([]);
	const [currentModel, setCurrentModel] = useState([
		{ model: "select a brand" },
	]);
	const [brandValue, setBrandValue] = useState("");
	const [modelValue, setModelValue] = useState("");

	const onChangeBrand = useCallback(
		(value) => {
			// Cette fonction permet de générer le select des modèles en focntion de la marque sélectionnée.
			// PRE: Récupère la valeur de la marque actuellement sélectionnée.
			// POST: Génère le select du modèle avec tous les modèles disponibles pour cette marque.
			function onChangeBrandSubFunction(car) {
				let test = [];
				for (let i = 0; i < car.length; i++) {
					if (
						car[i]["cars_brands"]["brand"] === value &&
						!test.some(
							(model) =>
								model["model"] ===
								car[i]["cars_brands"]["model"]
						)
					) {
						test.push({ model: car[i]["cars_brands"]["model"] });
					}
				}
				setCurrentModel(test);
				setBrandValue(value);
				setModelValue(test[0]["model"]);
			}
			if (props.carsByDates && props.carsByDates.length) {
				onChangeBrandSubFunction(props.carsByDates);
			} else {
				onChangeBrandSubFunction(props.cars);
			}
			return 1;
		},
		[props.cars, props.carsByDates]
	);

	// Dans le cas ou l'utilisateur arrive sur cette page par le biais de la page home et de son slot date, on récupère les dates préalablement sélectionnées.
	const location = useLocation();

	const manageBrandModal = useCallback(
		(cars) => {
			// Cette fonction gère les filtres en général.
			// PRE: Récupère la liste des voitures affichées.
			// POST: Règle les paramètres des filtres pour qu'ils soient adaptés aux voitures actuellement affichées.

			// Dans le cas ou l'utilisateur arrive sur cette page par le biais de la page home et de son slot date, on récupère les dates préalablement sélectionnées.
			// Ensuite on injecte ces données dans le filtre date.
			if (location["state"]) {
				let info = location["state"];
				setStartDate(moment(new Date(info["startDate"]).toISOString()));
				setStartTime(info["startTime"]);
				setEndDate(moment(new Date(info["endDate"]).toISOString()));
				setEndTime(info["endTime"]);
			}
			let brandModel = [];

			// Ici on gère la génération des select pour le filtre marque/modèle
			// On va générer le select des marques
			if (cars.length) {
				for (let a = 0; a < cars.length; a++) {
					if (
						!brandModel.some(
							(car) =>
								car.brand === cars[a]["cars_brands"]["brand"]
						)
					) {
						brandModel.push({
							brand: cars[a]["cars_brands"]["brand"],
						});
					}
				}
				setFullBrandModel(brandModel);
				setBrandValue(brandModel[0]["brand"]);
				onChangeBrand(brandModel[0]["brand"]);
			}
			if (cars.length) {
				let min = cars[0]["price"];
				let max = 0;
				for (let a = 0; a < cars.length; a++) {
					if (cars[a]["price"] > max) {
						max = cars[a]["price"];
					}
					if (cars[a]["price"] < min) {
						min = cars[a]["price"];
					}
				}
				setMinPrice(min);
				setMaxPrice(max);
			}
		},
		[location, onChangeBrand]
	);

	// fonction exécutée chaque fois qu'on a un changement dans la page
	useEffect(() => {
		// Cette fontion permet de récupérer la liste des voitures initiale.
		// PRE: -
		// POST: Effectue les requêtes pour réucpérer les voitures ainsi que les images de ces dernières.
		props.getCars();
		props.getCarsImages();
		console.log(props.carsByDates);
		if (props.carsByDates && props.carsByDates.length) {
			console.log("changement");
			manageBrandModal(props.carsByDates);
		} else {
			console.log("changement in else");
			manageBrandModal(props.cars);
		}
	}, []);

	let carsImages = {};
	if (props.images && props.images.length) {
		for (let image of props.images) {
			if (image.car_id) carsImages[image.car_id] = image.file_names;
		}
	}

	const handleClick = (e) => {
		// Cette fonction est appellée à chaque fois que l'on clique sur le bouton "Appliquer".
		// PRE: Récupère les valeurs des filtres.
		// POST: Si les test sur les dites valeurs passent, la liste des voitures est triée.

		// Le e.preventDefault() permet de contrer le comportement naturel de la page. Ce dernier impose un rafraichissement de la page une fois que le formulaire est complété.
		e.preventDefault();
		//date actuelle
		let currentDate = moment().format("D MMMM YYYY");
		let currentDay = new window.Date(currentDate);

		//date de début et de fin de location
		let startDateFormat = startDate.format("YYYY-MM-DD");
		let startDay = new window.Date(startDateFormat);
		let endDateFormat = endDate.format("YYYY-MM-DD");
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
		if (
			endDay.getTime() === currentDay.getTime() &&
			endHour <= currentHour
		) {
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

		// Une fois les test passé on met les paramètres du filtres dans un objet "filterInfo".
		const filterInfo = {
			startDate: startDateFormat,
			endDate: endDateFormat,
			startTime: startTime,
			endTime: endTime,
		};

		// Pour finir, on vas chercher les voitures triées selon les honoraires fournis.
		props.getCarsByDate(filterInfo);
	};

	// Ici, c'est toute la structure de la page cars.
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
							<span>{minPrice}</span>
							<input
								type="range"
								min={minPrice}
								max={maxPrice}
								value={sliderValue}
								onChange={(e) => {
									setSliderValue(e.target.value);
								}}
								className="slider"
							/>
							<span>{maxPrice}</span>
						</div>
						<p>Valeur</p>
					</Price>
					<Brand>
						<h5>Marque et modèle</h5>
						<div>
							<select
								onChange={(e) => onChangeBrand(e.target.value)}
								value={brandValue}
							>
								{fullBrandModel.length ? (
									fullBrandModel.map((info) => {
										return (
											<option
												value={info.brand}
												key={info.brand}
											>
												{info.brand}
											</option>
										);
									})
								) : (
									<></>
								)}
							</select>
							<span>
								<span className="foo rectangle"></span>
								<span className="foo triangle-right"></span>
							</span>
							<select
								value={modelValue}
								onChange={(e) => setModelValue(e.target.value)}
							>
								{currentModel.length ? (
									currentModel.map((info) => {
										return (
											<option
												value={info["model"]}
												key={info["model"]}
											>
												{info["model"]}
											</option>
										);
									})
								) : (
									<></>
								)}
							</select>
						</div>
					</Brand>
					<div className="slot">
						<h5>Période de location</h5>
						{error ? (
							<p style={{ color: "red" }}>{error}</p>
						) : (
							<></>
						)}
						<form className="slot__range">
							<div className="slot__time__left">
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
									value={startTime}
									type="time"
									onChange={(e) => {
										setError("");
										setStartTime(e.target.value);
									}}
								/>
							</div>
							<div className="slot__time__rigth">
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
									value={endTime}
									type="time"
									onChange={(e) => {
										setError("");
										setEndTime(e.target.value);
									}}
								/>
							</div>
						</form>
					</div>
					<button onClick={handleClick}>Appliquer</button>
				</Filter>
				<Available>
					<h2>Voitures disponibles</h2>

					<CarsPannel>
						{props.carsByDates && props.carsByDates.length ? (
							props.carsByDates.map((car) => {
								return (
									<CarSlot
										key={car.id}
										car={car}
										images={carsImages[car.id]}
									/>
								);
							})
						) : props.cars && props.cars.length ? (
							props.cars.map((car) => {
								return (
									<CarSlot
										key={car.id}
										car={car}
										images={carsImages[car.id]}
									/>
								);
							})
						) : (
							<></>
						)}
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

	.slot {
		padding-bottom: 15px;
		margin-bottom: 20px;
		h5 {
			padding: 15px 10px 15px 10px;
			font-size: 1.15em;
			font-weight: normal;
			background-color: rgb(243, 243, 243, 0.9);
			margin-bottom: 30px;
		}
		p {
			margin-bottom: 15px;
		}
		.slot__range {
			display: flex;
			justify-content: space-around;
			input {
				border: solid #00a9ff 1px;
				margin-right: 5px;
				font-family: "Roboto";
				border: none;
				padding: 5px;
				@media (min-width: 1000px) {
					margin-left: 10px;
				}
			}
		}
		.slot__time__left {
			display: flex;
			align-items: center;
			flex-direction: column;
			margin: 5px;
		}
		.slot__time__rigth {
			/* border: solid blue 1px; */
			display: flex;
			align-items: center;
			flex-direction: column;
			margin: 5px;
			.DayPicker {
				/* border: solid blue 1px; */
				position: relative;
				right: 110px;
				margin-bottom: 15px;
			}
		}
	}
`;
const Filter = styled.div`
	border: solid #00a9ff 0.5px;
	/* PENSER A BLOQUER LE FILTRE LORS DU SCROLL */
	/* display: flex;
	flex-direction: column; */
	/* position: fixed;
	left: 20%; */
	flex: 0.3;
	overflow-y: show;
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
		margin-bottom: 15px;
		.DateInput {
			margin-bottom: 15px;
			width: 100%;
			height: 40px;
			display: flex;
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
				border: 1px #00b2f1 1px;
			}

			.CalendarDay__selected {
				background: blue;
				border: blueviolet;
			}
		}

		.SingleDatePicker_picker.SingleDatePicker_picker {
			top: 43px !important;
			left: 2px !important;
		}
		.DayPickerKeyboardShortcuts_buttonReset {
			display: none;
		}
		.SingleDatePicker_picker_1 {
			background: none;
		}
	}
`;
/**
 * Récupère les informations de l'état dont la page à besoin
 *
 * @param {Object} state object
 * @returns {Object} object
 */
const mapStateToProps = (state) => {
	return {
		cars: state.carState.cars,
		images: state.carState.images,
		carsByDates: state.carState.filterCars,
	};
};
/**
 * Récupère les actions(ceux qui font les appels) dont la page à besoin
 *
 * @param {Object} dispatch object
 * @returns {Object} object
 */
const mapStateToDispatch = (dispatch) => {
	return {
		getCars: () => dispatch(getCarsProperty()),
		getCarsImages: () => dispatch(getCarsImages()),
		getCarsByDate: (payload) => dispatch(getOrdersInfoByDates(payload)),
	};
};
//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Cars);
