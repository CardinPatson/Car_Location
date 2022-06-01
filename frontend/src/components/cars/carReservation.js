import React, { useEffect, useCallback, useRef } from "react";
import Header from "../header";
import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { postPaymentPage } from "../../action/orderAction";
import { connect } from "react-redux";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import { addOrderInfo } from "../../action/orderAction";

function CarReservation(props) {
	// Ceci est une fonction de type composant React pour la page carReservation.
	// PRE: -
	// POST: retourne la page réservation de la voiture pour qu'elle soit affichée.

	// Récupérer les données de la voiture réservé du composant parent.
	const location = useLocation();
	const { data } = location.state;

	// Voici les hooks pour les valeurs du filtre date.
	const [focusedStart, setFocusedStart] = useState(false);
	const [focusedEnd, setFocusedEnd] = useState(false);
	const [startDate, setStartDate] = useState(moment());
	const [endDate, setEndDate] = useState(moment());

	// Ce hooks "error" sera utilisé quand le filtre date est mal rempli.
	const [error, setError] = useState("");

	const [totalPrice, setTotalPrice] = useState(data.car.price);

	/**
	 * Verifie la plage horaire entré par l'utilisateur
	 *
	 * @returns {Object} slot object
	 */
	const verifDate = useCallback(() => {
		// PRE: Récupère les valeurs des filtres.
		// POST: Si les test sur les dites valeurs passent, la liste des voitures est triée.

		//date actuelle
		let currentDate = moment().format("D MMMM YYYY");
		let currentDay = new window.Date(currentDate);

		//date de début et de fin de location
		let startDateFormat = startDate.format("YYYY-MM-DD");
		let startDay = new window.Date(startDateFormat);
		let endDateFormat = endDate.format("YYYY-MM-DD");
		let endDay = new window.Date(endDateFormat);

		//si la date est aujourdhui l'heure de début ou de fin doit être supérieur à l'heure actuelle
		if (startDay.getTime() === currentDay.getTime()) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}
		if (endDay.getTime() === currentDay.getTime()) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}

		//si la date de début et de fin est aujourdhui , l'heure de fin de location doit être supérieur à celle de début
		if (startDay.getTime() === endDay.getTime()) {
			setError("Veuillez entrez une plage horaire valide !");
			return;
		}

		// Une fois les test passé on met les paramètres du filtres dans un objet "slot".
		const slot = {
			startDate: startDateFormat,
			endDate: endDateFormat,
		};
		return slot;
	}, [endDate, startDate]);
	const firstUpdate = useRef(true);
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		handleTotalPrice();
	}, [endDate, startDate]);

	/**
	 * Calcule le prix total de la réservation
	 */
	const handleTotalPrice = useCallback(() => {
		// PRE: Récupère le plage horaire entré par l'uitlisateur.
		// POST: Si les test sur les dites valeurs passent, le prix total de réservation.
		const slot = verifDate();
		if (!slot) {
			setTotalPrice(data.car.price);
			return;
		}

		//date de début et de fin de location
		else {
			let startDay = new window.Date(slot.startDate);
			let endDay = new window.Date(slot.endDate);
			const diffDays = Math.ceil(
				Math.abs(endDay - startDay) / (1000 * 60 * 60 * 24)
			);
			setTotalPrice(diffDays * data.car.price);
		}
	}, [data.car.price, verifDate]);

	const handleReservation = () => {
		// Enregistre la réservation et procède au paiement
		// PRE: vérifier la plage horaire entré par l'uitlisateur
		// POST: Redirige vers la page de payement
		const slot = verifDate();

		if (!props.email) {
			setError(
				"Veuillez vous connecter afin de confirmer votre réservation"
			);
			return;
		}
		if (!slot) {
			return;
		} else {
			const reservationInfo = {
				...slot,
				totalPrice,
				idCar: data.car.id,
				email: props.email,
				token: props.token,
			};
			props.makeReservation(reservationInfo);
			props.paymentPage({ token: props.token, email: props.email });
		}
	};

	//structure de la page carReservation.
	return (
		<Container>
			<Header />
			<Content>
				<ZoneLeft>
					<Detail>
						<Photo>
							<img alt="cars" src={data.images[0]} />
						</Photo>
						<Name>
							{data.car["cars_brands"].brand
								? data.car["cars_brands"].brand
								: "Marque voiture"}{" "}
							{data.car["cars_brands"].model
								? data.car["cars_brands"].model
								: "Modèle voiture"}
						</Name>
						<Type>
							{data.car.type ? data.car.type : "Sportive"}
						</Type>
						<Ligne>
							<div></div>
						</Ligne>
						<Specs>
							<div>Nombre de portes</div>
							<p id="">{data.car.doors ? data.car.doors : "5"}</p>
							<div>Taille du coffre</div>
							<p id="">
								{data.car.boot_size
									? data.car.boot_size
									: "100"}
								L
							</p>
							<div>Energie</div>
							<p id="">
								{data.car.energy
									? data.car.energy
									: "Électrique"}
							</p>
							<div>Transmission</div>
							<p id="">
								{data.car.is_automatic
									? "Automatique"
									: "Manuelle"}
							</p>
							<div>Nombre de places</div>
							<p id="">
								{data.car.passengers
									? data.car.passengers
									: "3"}
							</p>
							<div>Aire conditionnée</div>
							<p id="">
								{data.car.air_conditioning ? "Oui" : "Non"}
							</p>
						</Specs>
					</Detail>
				</ZoneLeft>
				<ZoneRight>
					<Reservation>
						<Banner>Résumé de la réservation</Banner>
						<Information>
							<p>
								La voiture sera réservée pendant la période
								suivante:
							</p>
							{error ? (
								<p style={{ color: "red" }}>{error}</p>
							) : (
								<></>
							)}
							<Date>
								{/* <Slot className="slot" /> */}

								<div className="date">
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
								</div>
								<div className="date">
									<p>au</p>
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
								</div>
							</Date>
							<Price>
								<p>Le prix total de location sera:</p>
								<div>
									<p>Pour toute la durée:</p>
									<span>{totalPrice}€</span>
								</div>
								<div>
									<p>Par jour:</p>
									<span>
										{data.car.price
											? data.car.price
											: "100"}
										€
									</span>
								</div>
							</Price>
							<Confirm>
								<Check>
									Je confirme vouloir louer cette voiture
									pendant la durée et pour le prix précisé.
									<input type="checkbox" />
									<span></span>
								</Check>
								<button onClick={handleReservation}>
									Confirmer la location
								</button>
								<img alt="logo" src="./images/logo.svg" />
							</Confirm>
						</Information>
					</Reservation>
				</ZoneRight>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	top: 0;
	margin: 0 auto;
	max-width: 1600px;
	height: 723px;
	display: flex;
	justify-content: center;
	background-image: url("./images/car_8.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;
const Content = styled.div`
	/* border: solid black 1px; */
	height: 90%;
	margin-top: 65px;
	display: flex;
	flex-direction: row;
	gap: 25px;
	justify-content: flex-start;
	position: relative;
`;

const ZoneLeft = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`;

const ZoneRight = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`;

const Detail = styled.div`
	display: flex;
	flex-grow: 0;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	overflow: hidden;
	border: 0px;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	margin: 1vh 1vh 1vh 5vh;
	background-color: rgb(255, 255, 255, 0.95);
`;

const Photo = styled.div`
	width: 250px;
	margin: 1vh 0vh 3vh 0vh;
	img {
		width: 90%;
		height: auto;
		object-fit: contain;
		object-position: center;
		border-radius: 2px;
	}
`;

const Name = styled.div`
	font-size: 30px;
	margin: 0vh 1vh 0vh 1vh;
`;

const Type = styled.div`
	font-size: 20px;
	margin: 1vh 1vh 1vh 1vh;
	font-weight: bold;
`;

const Ligne = styled.div`
	display: flex;
	justify-content: center;
	padding: 1vh 1vh 1vh 1vh;
	width: 70%;
	div {
		border-top: 1px solid black;
		width: 70%;
	}
`;

const Specs = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	max-width: 80%;
	padding-bottom: 2vh;
	div {
		text-align: left;
		padding: 1vh;
		font-weight: bold;
	}
	p {
		text-align: left;
		padding: 0vh 1vh 0vh 1vh;
		color: #00a9ff;
	}
`;

const Reservation = styled.div`
	background-color: rgb(255, 255, 255, 0.95);
	display: flex;
	border: 0px;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	flex-direction: column;
	margin: 1vh 1vh 1vh 1vh;
`;

const Banner = styled.div`
	padding: 1vh 1vh 1vh 1vh;
	border-bottom: solid #797979 1px;
	border-radius: 5px 5px 0 0;
	background-color: #00a9ff;
	color: #333333;
	text-align: center;
	font-size: 32px;
`;

const Information = styled.div`
	/* border: solid red 1px; */
	display: flex;
	flex-direction: column;
	padding-top: 20px;
`;

const Date = styled.div`
	/* border: solid red 1px; */
	margin-top: 20px;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	p {
		text-align: left;
	}
	.date {
		/* border: solid red 1px; */
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: auto;
		@media (max-width: 1000px) {
			flex-direction: column;
			input {
				margin-top: 5px;
			}
		}
		p {
			/* border : solid red 1px ; */
			padding-right: 10px;
		}
	}
`;
const StyledDatePickerWrapper = styled.div`
	& .SingleDatePicker,
	.SingleDatePickerInput {
		.DateInput {
			width: 100%;
			height: 40px;
			display: flex;
			/* border: solid blue 1px; */
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.DateInput_input {
				font-size: 1rem;
				border-bottom: 0;
				padding: 12px 16px 14px;
				/* border: solid blue 1px; */
			}
		}

		.SingleDatePickerInput__withBorder {
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
				/* border: solid blue 1px; */
			}
		}

		.SingleDatePicker_picker.SingleDatePicker_picker {
			top: 43px;
			left: 2px;
			/* border: solid red 1px; */
			/* top: 43px !important;
			left: 2px !important; */
		}
	}
`;
const Price = styled.div`
	/* border: solid red 1px; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	margin: 2vh;
	margin-top: 3vh;
	padding: 20px;
	border-bottom: 1px solid black;
	p {
		text-align: left;
		margin-bottom: 5px;
	}
	div {
		display: flex;
		gap: 2vh;
		margin: 1.5vh 1vh 0vh 2.5vh;
		align-items: center;
		font-size: 15px;
		span {
			text-align: center;
			border-bottom: 1px solid black;
		}
		p {
			margin: 0;
			text-align: center;
			font-weight: bold;
		}
	}
`;

const Confirm = styled.div`
	display: flex;
	margin: 25px;
	margin-bottom: 0;
	flex-direction: column;
	align-items: center;
	button {
		font-size: 28px;
		color: #333333;
		background-color: #00a9ff;
		border: 0;
		border-radius: 10px;
		padding: 10px;
		margin: 15px 10px 15px 10px;
		cursor: pointer;
		box-shadow: 0 0 1px black;
	}
	button:hover {
		color: white;
		background-color: #0078b5;
		border: 0;
	}
	button:active {
		transform: scale(0.95);
	}
	img {
		height: 120px;
		width: auto;
	}
`;

const Check = styled.label`
	display: block;
	position: relative;
	padding-left: 25px;
	cursor: pointer;
	font-size: 20px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	color: #00a9ff;
	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
	span {
		position: absolute;
		top: -2.5px;
		left: 0px;
		height: 20px;
		width: 20px;
		background-color: white;
		border: 1px solid grey;
		border-radius: 15px;
	}
	&:hover {
		text-decoration: underline;
	}
	&:hover input ~ span {
		background-color: #eee;
	}
	& input:checked ~ span {
		background-color: #2196f3;
	}
	span:after {
		content: "";
		position: absolute;
		display: none;
	}
	& input:checked ~ span:after {
		display: block;
	}
	& span:after {
		left: 6.5px;
		top: 2.8px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
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
		token: state.userState.token,
		email: state.userState.email,
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
		paymentPage: (payload) => dispatch(postPaymentPage(payload)),
		makeReservation: (payload) => dispatch(addOrderInfo(payload)),
	};
};

//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(CarReservation);
