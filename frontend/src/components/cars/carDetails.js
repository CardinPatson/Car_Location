import React from "react";
import Header from "../header";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useState } from "react";

function CarDetails(props) {
	// Ceci est une fonction de type composant React pour la page carDetails.
	// PRE: -
	// POST: retourne la page détails de la voiture pour qu'elle soit affichée.

	// Ces deux lignes permettent de récupérer les données transmisent pas le composant parent. Dans ce cas si, il transmet les données de la voiture de laquelle le client à souhaité voir les détails.
	const location = useLocation();
	const { from } = location.state;

	function Item(item) {
		// Cette fonction permet de créer une div avec les informations d'une image. Elle est utilisée par le caroussel.
		// PRE: Un item correspondant à l'url de l'image
		// POST: Retourne la div construite à partir de cette item
		return (
			<div className="__img__div">
				<img src={item["item"]} alt="Caroussel" />
			</div>
		);
	}

	// On récupère les images de la v oiture transmises par le parent.
	var items = from.images;

	const test = () => {
		// Cette fonction test permet de tester si la liste des images est vide ou pas. Le but étant de ne pas afficher d'images si la liste est vide et de ne pas utiliser le défilement du caroussel si la liste ne contient qu'une image.
		// PRE: Utilise la liste des images
		// POST: Retourne false si la liste contient 1 ou 0 images, et retourne true dans le cas contraire
		if (items) {
			if (items.length <= 1) {
				return false;
			}
			return true;
		}
	};

	const [index, setIndex] = useState(0);

	// Donc ici, on désactive le défilement du caroussel si il y a aucune ou 1 seule image.
	let swapIndicators = test;

	// Cette fonction est utilisée par le caroussel pour faire défiler les images
	const handleChange = (cur, prev) => {
		setIndex(cur);
	};

	// Ici, c'est toute la structure de la page carDetails.
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
									{from.car["cars_brands"].brand
										? from.car["cars_brands"].brand
										: "Marque voiture"}{" "}
									{from.car["cars_brands"].model
										? from.car["cars_brands"].model
										: "Modèle voiture"}
								</div>
								<LineRight>
									<div>
										<p>
											{from.car.type
												? from.car.type
												: "Sportive"}
										</p>
									</div>
								</LineRight>
							</Name>
							<DetailTable>
								<Specs>
									<div>
										<img
											src="./images/icons/door.svg"
											alt="door_icon"
										/>
										<p>
											{from.car.doors
												? from.car.doors
												: "5"}{" "}
											portes
										</p>
									</div>
									<div>
										<img
											src="./images/icons/suitcase.svg"
											alt="suitcase icon"
										/>
										<p>
											{from.car.boot_size
												? from.car.boot_size
												: "100"}
											L pour le coffre
										</p>
									</div>
									<div>
										<img
											src="./images/icons/lightning.svg"
											alt="lightning_icon"
										/>
										<p>
											{from.car.energy
												? from.car.energy
												: "Électrique"}
										</p>
									</div>
								</Specs>
								<Specs>
									<div>
										<img
											src="./images/icons/stick.svg"
											alt="stick_icon"
										/>
										<p>
											{from.car.is_automatic
												? "Automatique"
												: "Manuelle"}
										</p>
									</div>
									<div>
										<img
											src="./images/icons/seat.svg"
											alt="seat_icon"
										/>
										<p>
											{from.car.passengers
												? from.car.passengers
												: "3"}
										</p>
									</div>
									<div>
										<img
											src="./images/icons/air.svg"
											alt="air_icon"
										/>
										<p>
											{from.car.air_conditioning
												? "Oui"
												: "Non"}
										</p>
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
								{items &&
									items.map((item, i) => (
										<Item key={i} item={item} />
									))}
							</Carousel>
							<Price>
								<p>
									{from.car.price ? from.car.price : "100"}€
								</p>
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
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Test = styled.div`
	border: 0;
	border-radius: 5px;
	background-color: rgb(245, 245, 245, 0.9);
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-top: 40px;
	margin-left: 8%;
`;

const Banner = styled.div`
	font-size: 35px;
	text-align: left;
	background: rgb(0, 169, 245, 0.9);
	border: 1px black;
	padding: 6px;
	border-radius: 5px 5px 0 0;
`;

const Detail = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	/* //flex-grow: 1; */
	/*border-radius: 1vh; */
	/* box-shadow: 0 0 1px black; */
	margin: 20px 20px 20px 30px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	/* flex : 0.6; */
	/* border : solid red 1px;  */
`;

const DetailTable = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 25px;
	margin-right: 25px;
	flex-grow: 1;
	gap: 50px;
`;

const Name = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 10px 0px 0px 10px;
	color: #333333;
	font-size: 40px;
	text-align: left;
	p {
		font: bold;
		color: grey;
		margin: 1px;
		font-size: 25px;
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
	display: flex;
	flex-direction: column;
	text-align: left;
	/* margin: auto; */
	color: #00a9ff;
	div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		text-align: left;
		margin: 10px;
		font-weight: bold;
		font-size: 18px;
		img {
			padding: 5px;
			padding-right: 10px;
			height: 50px;
		}
		p {
			width: 180px;
		}
	}
`;

const Photo = styled.div`
	border-left: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding-left: 30px;
	padding-right: 30px;
	.__carousel {
		flex-grow: 1;
		gap: 40px;
		width: 400px;
		overflow: hidden;
		.__img__div {
			display: flex;
			width: 100%;
			height: 280px;
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
	margin: 20px 0 10px 0;
	p {
		font-weight: bold;
		font-size: 35px;
		color: #00a9f5;
		text-align: bottom;
	}
	div {
		display: flex;
		align-items: flex-end;
		font-weight: bold;
		margin-right: 20px;
		font-size: 15px;
	}
	.__button {
		display: flex;
		text-decoration: none;
		button {
			font-size: 20px;
			color: #333333;
			background-color: #00a9ff;
			border: 0px;
			border-radius: 5px;
			padding: 0px 20px 0px 20px;
			margin-left: 15px;
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
