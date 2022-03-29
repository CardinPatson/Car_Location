import React from "react";
import Header from "./header";
import Slot from "./slot";
import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import { useState } from "react";

function Home() {

	function Item(item) {
		return (
			<div className="__img__div">
				<img src={item.item["url"]}/>
			</div>
		);
	  }

	var items = [
		{
		  	pos: 0,
		  	url:"./images/car_4.jpg"
		},
		{
			pos: 1,
		  	url:"./images/car_6.jpg"
		},
		{
			pos: 2,
		  	url:"./images/car_7.jpg"
		},
		{
			pos: 3,
		  	url:"./images/car_8.jpg"
		},
		{
			pos: 4,
		  	url:"./images/car_9.jpg"
		},
		{
			pos: 5,
		  	url:"./images/car_1.jpg"
		},
		{
			pos: 6,
		  	url:"./images/car_2.jpg"
		},
		{
			pos: 7,
		  	url:"./images/car_5.jpg"
		}
	  ];

	const [index, setIndex] = useState(0);
	
	const handleChange = (cur, prev) => {
		setIndex(cur);
		console.log(cur, prev);
	};

	return (
		<Container>
			<Header />
			<Content>
				<Slot />
				<Info>
					<Questions>
						<Part>
							<span>Qu'est ce que Car Rental ?</span>
							<div>
								<p>
									Pro-CarRental est un site de location de voiture dont
									l'entreprise est basée à Bruxelles. Ce site vous propose une
									large variétée de véhicules pour toutes les gammes de prix. De
									la sportive à la citadine, il y en pour tous les goûts et
									budgets !
								</p>
							</div>
						</Part>
						<Part>
							<span>Comment louer ?</span>
							<div>
								<p>
									Pour louer une voiture, rien de plus simple ! Une fois votre
									voiture choisie, il vous suffit de fournir votre carte
									d'identité et votre permit de conduire. Un mail vous sera alors
									envoyé pour confirmer la location.
								</p>
							</div>
						</Part>
					</Questions>
					<Carousel
						arrows={false}
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
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: 10;
`;

const Part = styled.div`
	margin: 15px;
	margin-top: 25%;
	display: flex;
	flex-direction: column;
	border: 0.5px solid grey;
	border-radius: 1%;
	width: 30%;
	height: 30%;
	z-index: 10;
	@media (max-width: 1300px) {
		height: 30%;
	}
	@media (max-width: 900px) {
		width: 40%;
		height: 40%;
	}
	/* word-break: break-all; */
	white-space: normal;

	overflow: hidden;
	background: white;
	background: rgba(255, 255, 255, 0.75);
	backdrop-filter: blur(6px);
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
`;

export default Home;
