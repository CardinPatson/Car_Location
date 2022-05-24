import React from "react";
import Header from "./header";
import Slot from "./cars/slot";
import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import { useState } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@material-ui/core";

function Home() {
	// Ceci est une fonction de type composant React pour la page Home. C'est la première page sur laquelle n'importe quel utilisateur tombe quand il accède au site.
	// PRE: -
	// POST: Retourne la page Home.

	function Item(item) {
		// Cette fonction permet de créer une div avec les informations d'une image. Elle est utilisée par le caroussel.
		// PRE: Un item correspondant à l'url de l'image
		// POST: Retourne la div construite à partir de cette item
		return (
			<div className="__img__div">
				<img alt="url" src={item.item["url"]} />
			</div>
		);
	}

	// C'est la liste des images qui seront affichées dans le caroussel sur la page d'accueil.
	var items = [
		{
			pos: 0,
			url: "/images/car_10.jpg",
		},
		{
			pos: 1,
			url: "/images/car_6.jpg",
		},
		{
			pos: 2,
			url: "/images/car_7.jpg",
		},
		{
			pos: 3,
			url: "/images/car_8.jpg",
		},
		{
			pos: 4,
			url: "/images/car_9.jpg",
		},
		{
			pos: 5,
			url: "/images/car_1.jpg",
		},
		{
			pos: 6,
			url: "/images/car_2.jpg",
		},
		{
			pos: 7,
			url: "/images/car_5.jpg",
		},
		{
			pos: 8,
			url: "/images/car_4.jpg",
		},
		{
			pos: 9,
			url: "/images/car_11.jpg",
		},
	];

	const [index, setIndex] = useState(0);
	// Cette fonction est utilisée par le caroussel pour faire défiler les images
	const handleChange = (cur, prev) => {
		setIndex(cur);
	};

	// Ici, c'est toute la structure de la page home.
	return (
		<Container>
			<Header />
			<Content>
				<Slot className="slot" />
				<Info>
					<Questions>
						<Part>
							<Accordion>
								<AccordionSummary>
									Qu'est ce que Car Rental ?
								</AccordionSummary>
								<AccordionDetails>
									Pro-CarRental est un site de location de
									voiture dont l'entreprise est basée à
									Bruxelles. Ce site vous propose une large
									variétée de véhicules pour toutes les gammes
									de prix. De la sportive à la citadine, il y
									en pour tous les goûts et budgets !
								</AccordionDetails>
							</Accordion>
						</Part>
						<Part>
							<Accordion>
								<AccordionSummary>
									Comment louer ?
								</AccordionSummary>
								<AccordionDetails>
									Pour louer une voiture, rien de plus simple
									! Une fois votre voiture choisie, il vous
									suffit de fournir votre carte d'identité et
									votre permit de conduire. Un mail vous sera
									alors envoyé pour confirmer la location.
								</AccordionDetails>
							</Accordion>
						</Part>
						<Part>
							<Accordion>
								<AccordionSummary>
									Oû récupérer ma voiture ?
								</AccordionSummary>
								<AccordionDetails>
									Pour récupérer votre voiture, allez voir
									Aymar au garage.
								</AccordionDetails>
							</Accordion>
						</Part>
					</Questions>
					<Carousel
						index={index}
						onChange={handleChange}
						interval={4000}
						animation="fade"
						indicators={false}
						swipe
						className="__carousel"
					>
						{items.map((item, i) => (
							<Item key={i} item={item} />
						))}
					</Carousel>
				</Info>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	/* width: 100%; */
	margin: 0 auto;
	max-width: 1600px;
	display: flex;
	justify-content: center;
`;

const Content = styled.div`
	/* border: solid red 1px; */
	width: 100%;
`;

const Info = styled.div`
	/* border: solid red 1px; */
	margin-top: 100px;
	display: flex;
	gap: 5%;
	width: 100%;
	height: 1000px;
	justify-content: center;
	.__carousel {
		z-index: 9;
		height: 1000px;
		width: 100%;
		.__img__div {
			height: 1000px;
			width: 100%;
		}
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
	/* background-image: url("./images/car_1.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center; */
`;

const Questions = styled.div`
	display: flex;
	justify-content: center;
	width: 80%;
	position: absolute;
	z-index: 10;
`;

const Part = styled.div`
	margin: 15px;
	margin-top: 30%;
	display: flex;
	flex-direction: column;
	width: 35%;
	z-index: 10;
	/* @media (max-width: 1300px) {
		height: 30%;
	} */
	@media (max-width: 900px) {
		width: 40%;
		/* height: 40%; */
	}
	/* word-break: break-all; */
	white-space: normal;
	overflow: hidden;
	p {
		line-height: 1.5;
		text-align: left;
		padding: 10px;
		padding-top: 15px;
		font-size: 100%;
	}
	span {
		text-align: center;
		padding: 10px 0 10px 0;
		margin: 0px 15px 0px 15px;
		color: #00a9ff;
		font-size: 150%;
		border-bottom: 1px solid black;
	}
	.MuiAccordionSummary-content {
		display: flex;
		justify-content: center;
		color: #00a9ff;
		text-align: center;
		font-size: 22px;
		padding: 14px;
	}
	.MuiAccordionDetails-root {
		justify-content: flex-start;
		text-align: left;
		border-radius: 0px 0px 5px 5px;
		border-top: 1px solid rgba(0, 0, 0, 0.8);
		padding: 0;
		padding-top: 10px;
		margin: 10px;
		margin-top: 0;
		/* régler la taille de l'accordéon quand il est déroulé */
		/* height: 120px;  */
	}
	.MuiButtonBase-root {
		height: 20px;
		overflow: hidden;
		border-radius: 5px 5px 0px 0px;
	}
	.MuiAccordion-root {
		border: 0.5px solid grey;
		border-radius: 20px;
		box-shadow: none;
		background: rgba(255, 255, 255, 0.8);
	}
`;

export default Home;
