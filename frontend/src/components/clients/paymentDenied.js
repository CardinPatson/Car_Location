import React from "react";
import styled from "styled-components";
import Header from "../header";

function PaymentDenied() {
	// Ceci est une fonction de type composant React pour la page paymentAccepted. Elle envoi un retour négatif au client lorsqu'il a effectué son payement sans succès.
	// PRE: -
	// POST: Retourne la page PaymentDenied.

	// Ici, c'est toute la structure de la page PaymentDenied.
	return (
		<div>
			<Container>
				<Header />
				<Content>
					<Box>
						<Banner>Payement refusé !</Banner>
						<Info>
							<Validate>
								<img src="images\forbidden.svg" alt="Test" />
							</Validate>
							<Text>
								Votre payement à été refusé, veuillez réessayer.
							</Text>
							<Text>
								Si le problème persiste, renseignez-vous au près
								de votre banque.
							</Text>
							<Buttons>
								<button>Accueil</button>
							</Buttons>
						</Info>
					</Box>
				</Content>
			</Container>
		</div>
	);
}

const Container = styled.div`
	max-width: 1600px;
	margin: 0 auto;
	top: 0;
	display: flex;
	justify-content: center;
`;

const Content = styled.div`
	/* border : solid red 1px ; */
	width: 70%;
	@media (max-width: 768px) {
		width: 85%;
	}
	margin: 0 auto;
	margin-top: 100px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	justify-content: center;
	align-items: center;
	width: auto;
	padding: 0 40px 10px 40px;
`;

const Banner = styled.div`
	font-size: 2vw;
	color: #ff0000;
	padding: 25px 15px 15px 15px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Validate = styled.div`
	width: 100%;
	img {
		height: auto;
		width: 15%;
	}
	padding: 25px;
	padding-top: 5px;
`;

const Text = styled.div`
	text-align: center;
	font-size: 1.2vw;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
	gap: 20%;
	margin: 10px;
	margin-top: 25px;
	button {
		box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
		height: 100%;
		padding: 10px;
		background-color: #00a9ff;
		border: 0;
		border-radius: 2px;
		color: white;
		cursor: pointer;
		font-size: 1.2vw;
	}
`;

export default PaymentDenied;
