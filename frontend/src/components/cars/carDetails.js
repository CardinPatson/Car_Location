import React from "react";
import Header from "../header";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useState } from "react";

function CarDetails(props) {
	const location = useLocation();

	console.log(location);
	const { from } = location.state;
	console.log(from);

	function Item(item) {
		return (
			<div className="__img__div">
				<img src={item["item"]} alt="Caroussel"/>
			</div>
		);
	}

	
	
	var items = from.images
	const test = () => {
		if(items.length <= 1){
			return false;
		};
		return true;
	}
	const [index, setIndex] = useState(0);
	const [swapIndicators, setSwapIndicators] = useState(test);

	const handleChange = (cur, prev) => {
		setIndex(cur);
		console.log(cur, prev);
	};
	return (
		<Container>
			<Header />
			<Content>
				<Test>
					<Banner>
						<span>Caractéristiques</span>
					</Banner>
					<Detail>
						<Info>
							<Name>
								<div>
									{from.car["cars_brands"].brand ? from.car["cars_brands"].brand : "Marque voiture"}{" "}
									{from.car["cars_brands"].model ? from.car["cars_brands"].model : "Modèle voiture"}
								</div>
								<LineRight>
									<div>
										<p>{from.car.type ? from.car.type : "Sportive"}</p>
									</div>
								</LineRight>
							</Name>
							<DetailTable>
								<Specs>
									<div>
										<img src="./images/icons/door.svg" alt="door_icon" />
										{from.car.doors ? from.car.doors : "5"} portes
									</div>
									<div>
										<img
											src="./images/icons/suitcase.svg"
											alt="suitcase icon"
										/>
										{from.car.boot_size ? from.car.boot_size : "100"}L pour le
										coffre
									</div>
									<div>
										<img
											src="./images/icons/lightning.svg"
											alt="lightning_icon"
										/>
										{from.car.energy ? from.car.energy : "Électrique"}
									</div>
								</Specs>
								<Specs>
									<div>
										<img src="./images/icons/stick.svg" alt="stick_icon" />
										{from.car.is_automatic ? "Automatique" : "Manuelle"}
									</div>
									<div>
										<img src="./images/icons/seat.svg" alt="seat_icon" />
										{from.car.passengers ? from.car.passengers : "3"}
									</div>
									<div>
										<img src="./images/icons/air.svg" alt="air_icon" />
										{from.car.air_conditioning ? "Oui" : "Non"}
									</div>
								</Specs>
							</DetailTable>
						</Info>
						<Photo>
							<Carousel
								index={index}
								onChange={handleChange}
								interval={50000}
								animation="fade"
								navButtonsAlwaysInvisible={!swapIndicators}
								indicators={swapIndicators}
								swipe
								className="__carousel"
							>
								{items.map((item, i) => (
									<Item key={i} item={item} />
								))}
							</Carousel>
							<Price>
								<p>{from.car.price ? from.car.price : "100"}€</p>
								<div>/jour</div>
								<Link
									to="/carReservation"
									className="__button"
									state={{ data: from }}
								>
									<button to="/carReservation">Louer</button>
								</Link>
							</Price>
						</Photo>
					</Detail>
				</Test>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	max-width: 1600px;
	margin: 0 auto;
	top: 0;
	height: 100vh;
	display: flex;
	background-image: url("./images/car_9.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

const Content = styled.div`
	/* border : solid red 1px ; */
	margin: 0 auto;
	margin-top: 100px;
	padding: 5px;
`;

const Test = styled.div`
	border: 0.5px solid grey;
	border-radius: 5px;
	background-color: rgb(245, 245, 245, 0.9);
	display: flex;
	justify-content: center;
	flex-direction: column;
	max-width: 85%;
	margin-top: 40px;
	margin-left: 8%;
`;

const Banner = styled.div`
	font-size: 2.2vw;
	text-align: left;
	background: rgb(0, 169, 245, 0.9);
	border: 1px black;
	padding: 6px;
	border-radius: 5px 5px 0 0;
`;

const Detail = styled.div`
	display: flex;
	flex-direction: row;
	/* //flex-grow: 1; */
	/*border-radius: 1vh; */
	/* box-shadow: 0 0 1px black; */
	margin: 2vh 2vh 2vh 5vh;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	width: 45%;
	/* flex : 0.6; */
	/* border : solid red 1px;  */
`;

const DetailTable = styled.div`
	display: flex;
	flex-direction: row;
	height: 75%;
	align-items: center;
`;

const Name = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 30px 0px 0px;
	color: #333333;
	font-size: 2.5vw;
	text-align: left;
	p {
		font: bold;
		color: grey;
		margin: 1px;
		font-size: 2.4vw;
	}
`;

const LineRight = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 30px;
	div {
		border-left: 1px solid black;
		margin-left: 10px;
		padding-left: 5px;
	}
`;

const Specs = styled.div`
	text-align: left;
	/* margin: auto; */
	width: 50%;
	color: #00a9ff;
	div {
		display: flex;
		align-items: center;
		text-align: left;
		margin: 1vh;
		margin-left: 0;
		font-weight: bold;
		font-size: 1.2vw;
		img {
			padding: 5px;
			padding-right: 10px;
			height: auto;
			width: 18%;
		}
	}
`;

// const Ligne = styled.div`
//   display: flex;
//   padding: 1vh;
//   div {
//     border-left: 1px solid black;
//   }
// `;

const Photo = styled.div`
	border-left: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 55%;
	.__carousel {
		gap: 40px;
		height: 80%;
		width: 80%;
		overflow: visible;
		.__img__div {
			display: flex;
			width: 100%;
			height: 35vh;
		}
		img {
			width: 100%;
			height: auto;
			object-fit: contain;
			object-position: center;
		}
	}
`;

const Price = styled.div`
	display: flex;
	flex-direction: row;
	margin: 3vh 0vh 1vh 0vh;
	p {
		font-weight: bold;
		font-size: 3vw;
		color: #00a9f5;
		text-align: bottom;
	}
	div {
		display: flex;
		align-items: flex-end;
		font-weight: bold;
		margin-right: 20px;
		font-size: 1vw;
	}
	.__button {
		display: flex;
		text-decoration: none;
		button {
			font-size: 1.5vw;
			color: #333333;
			background-color: #00a9ff;
			border: 0px;
			border-radius: 1vh;
			padding: 0px 20px 0px 20px;
			margin: 0vh 0vh 0vh 2vh;
			cursor: pointer;
		}
		button:hover {
			color: white;
			background-color: #0078b5;
			/* border: 0px solid #00A9FF; */
		}
		button:active {
			transform: scale(0.95);
		}
	}
`;

export default CarDetails;
