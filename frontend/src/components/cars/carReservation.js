import React from "react";
import Header from "../header";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { postPaymentPage } from "../../action/orderAction";
import { connect } from "react-redux";

function CarReservation(props) {
	const location = useLocation();

	console.log(location);
	const { data } = location.state;
	console.log(data);
	console.log(data.car.name);

	const handleReservation = () => {
		console.log("hello");
		props.paymentPage();
	};
	return (
		<Container>
			<Header />
			<Content>
				<Detail>
					<Photo>
						<img src={data.images[0]} />
					</Photo>
					<Name>
						{data.car["cars_brands"].brand
							? data.car["cars_brands"].brand
							: "Marque voiture"}{" "}
						{data.car["cars_brands"].model
							? data.car["cars_brands"].model
							: "Modèle voiture"}
					</Name>
					<Type>{data.car.type ? data.car.type : "Sportive"}</Type>
					<Ligne>
						<div></div>
					</Ligne>
					<Specs>
						<div>Nombre de portes</div>
						<p id="">{data.car.doors ? data.car.doors : "5"}</p>
						<div>Taille du coffre</div>
						<p id="">
							{data.car.boot_size ? data.car.boot_size : "100"}L
						</p>
						<div>Energie</div>
						<p id="">
							{data.car.energy ? data.car.energy : "Électrique"}
						</p>
						<div>Transmission</div>
						<p id="">
							{data.car.is_automatic ? "Automatique" : "Manuelle"}
						</p>
						<div>Nombre de places</div>
						<p id="">
							{data.car.passengers ? data.car.passengers : "3"}
						</p>
						<div>Aire conditionnée</div>
						<p id="">{data.car.air_conditioning ? "Oui" : "Non"}</p>
					</Specs>
				</Detail>
				<Reservation>
					<Banner>Résumé de la réservation</Banner>
					<Information>
						<Date>
							<p>
								La voiture sera réservée pendant la période
								suivante:
							</p>
							<div>
								<p>Du</p>
								<span>01/01/01</span>
								<p>au</p>
								<span>02/02/02</span>
							</div>
						</Date>
						<Price>
							<p>Le prix total de location sera:</p>
							<div>
								<p>Pour toute la durée:</p>
								<span>1250€</span>
							</div>
							<div>
								<p>Par jour:</p>
								<span>
									{data.car.price ? data.car.price : "100"}€
								</span>
							</div>
						</Price>
						<Confirm>
							<Check>
								Je confirme vouloir louer cette voiture pendant
								la durée et pour le prix précisé.
								<input type="checkbox" />
								<span></span>
							</Check>
							<button onClick={handleReservation}>
								Confirmer la location
							</button>
							<img src="./images/logo.svg" />
						</Confirm>
					</Information>
				</Reservation>
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
	width: 80%;
	height: 85%;
	margin-top: 80px;
	display: flex;
	flex-direction: row;
	gap: 5vh;
	justify-content: flex-start;
	position: relative;
`;

const Detail = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border: 1px solid #00a9ff;
	border-radius: 5px;
	box-shadow: 0 0 1px black;
	margin: 1vh 1vh 1vh 5vh;
	width: 30%;
	background-color: rgb(255, 255, 255, 0.95);
`;

const Photo = styled.div`
	width: 100%;
	height: 25%;
	margin: 0vh 0vh 3vh 0vh;
	img {
		width: 90%;
		height: auto;
		object-fit: contain;
		object-position: center;
		border-radius: 2px;
	}
`;

const Name = styled.div`
	font-size: 4vh;
	margin: 0vh 1vh 0vh 1vh;
`;

const Type = styled.div`
	font-size: 2vh;
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
	border: 1px solid #00a9ff;
	border-radius: 5px;
	flex-direction: column;
	margin: 1vh 1vh 1vh 1vh;
	box-shadow: 0 0 1px black;
	width: 100%;
`;

const Banner = styled.div`
	padding: 1vh 1vh 1vh 1vh;
	border-bottom: solid #797979 1px;
	background-color: #00a9ff;
	color: #333333;
	text-align: center;
	font-size: 3.6vh;
`;

const Information = styled.div`
	display: flex;
	flex-direction: column;
`;

const Date = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 2vh;
	margin: 2vh;
	margin-top: 3vh;
	padding-bottom: 15px;
	border-bottom: 1px solid black;
	p {
		text-align: left;
	}
	div {
		display: flex;
		gap: 2vh;
		margin: 2vh 1vh 1vh 2.5vh;
		align-items: center;
		font-size: 1.8vh;
		span {
			border: 2px solid #00a9ff;
			padding: 0.5vh;
			border-radius: 0.5vh;
		}
		p {
			font-weight: bold;
		}
	}
`;

const Price = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 2vh;
	margin: 2vh;
	margin-top: 2vh;
	padding-bottom: 20px;
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
		font-size: 1.8vh;
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
    margin: 4vh;
    margin-bottom: 0;
    flex-direction: column;
    align-items: center;
    button {
        font-size: 3vh;
        color: #333333;
        background-color: #00A9FF;
        border: 1.5px solid #00486D;
        border-radius: 15px;
        width 40%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
        box-shadow: 0 0 1px black;
    }
    button:hover{
        color: white;
        background-color: #0078B5;
        border: 1.5px solid #00A9FF;
    }
    button:active {
        transform: scale(0.95);
    }
    img {
        height: auto;
        width: 20%;
    }
`;

const Check = styled.label`
	display: block;
	position: relative;
	padding-left: 4vh;
	cursor: pointer;
	font-size: 2vh;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	top: 0%;
	left: 0%;
	height: 5vh;
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

const mapStateToProps = (state) => {
	return {};
};
const mapStateToDispatch = (dispatch) => {
	return {
		paymentPage: () => dispatch(postPaymentPage()),
	};
};

const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(CarReservation);
