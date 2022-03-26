import React from "react";
import Header from "./header";
import Slot from "./slot";
import styled from "styled-components";

function Home() {
	return (
		<Container>
			<Header />
			<Content>
				<Slot />
				<Info>
					<Part>
						<span>
							Qu'est ce que Pro-CarRental ?
						</span>
						<div >
							<p>
								Pro-CarRental est un site de location de voiture dont l'entreprise est basée à 
								Bruxelles.
								Ce site vous propose une large variétée de véhicules pour toutes les 
								gammes de prix. De la sportive à la citadine, il y en pour tous les goûts et budgets !
							</p>
						</div>
					</Part>
					<Part>
						<span>
							Comment louer ?
						</span>
						<div>
							<p>
								Pour louer une voiture, rien de plus simple ! Une fois votre voiture choisie, 
								il vous suffit de fournir votre carte d'identité et votre permit de conduire.
							</p>
						</div>
						
					</Part>

				</Info>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	width: 100%;
	margin: 0 auto;
`;

const Content = styled.div`
	/* border: solid red 1px; */
	width: 100%;
`;

const Info = styled.div`
	margin-top: 100px;
	display: flex;
	gap: 2.5%;
	width: 100%;
	height: 1000px;
	justify-content: center;
	background-image: url("./images/car_1.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position:center;	
`;

const Part = styled.div`
	margin: 15px;
	margin-top: 15%;
	display: flex;
	border: 0.5px solid grey;
	border-radius: 1%;
	max-width: 30%;
	max-height: 20%;
	height: 20%;
	overflow: hidden;
	flex-direction: column;
	background: white;
    background: rgba(255,255,255,0.3);
	backdrop-filter: blur(6px);
	p {
		text-align: left;
		padding: 10px;
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
