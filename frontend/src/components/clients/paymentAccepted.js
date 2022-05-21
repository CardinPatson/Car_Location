import React from "react";
import Header from "../header";
import styled from "styled-components";

function PaymentAccepted() {
	// Ceci est une fonction de type composant React pour la page paymentAccepted. Elle envoi un retour positif au client lorsqu'il a effectué son payement avec succès.
	// PRE: -
	// POST: Retourne la page PaymentAccepted.

	// Ici, c'est toute la structure de la page PaymentAccepted.
	return (
		<div>
			<Container>
				<Header />
				<Content>
					<Box>
						<Banner>Payement accepté !</Banner>
						<Info>
							<Validate>
								<img
									src="images\validation_green.svg"
									alt="Test"
								/>
							</Validate>
							<Text>
								Votre payement à été accepté et sera traité dans
								les plus brefs délais.
							</Text>
							<Details>
								<Line>
									<Left>Type de payement:</Left>
									<Right>VISA</Right>
								</Line>
								<Line>
									<Left>Nom de la banque:</Left>
									<Right>AymarASSURE</Right>
								</Line>
								<Line>
									<Left>Numéro du compte:</Left>
									<Right>BE15486611547</Right>
								</Line>
								<Line>
									<Left>Date du payement:</Left>
									<Right>21/03/22</Right>
								</Line>
							</Details>
							<Amount>
								<Left className="__bold">Montant:</Left>
								<Right className="__bold">5.000.000</Right>
							</Amount>
							<Details>
								<Line>
									<Left>Numéro de la transaction:</Left>
									<Right>413130567</Right>
								</Line>
							</Details>
							<Buttons>
								<button>Imprimmer</button>
								<button>Fermer</button>
							</Buttons>
							<Text>
								Un Email vous a été envoyer avec les
								informations de payement.
							</Text>
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
	color: #36cf52;
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

const Details = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 15px;
	margin-top: 30px;
	column-gap: 20px;
	row-gap: 20px;
`;

const Line = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
`;

const Left = styled.div`
	width: 50%;
	text-align: left;
	color: grey;
`;

const Right = styled.div`
	width: 50%;
	text-align: right;
	color: black;
`;

const Amount = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-top: 15px;
	.__bold {
		font-weight: bold;
	}
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
	gap: 20%;
	margin: 10px;
	margin-top: 15px;
	margin-bottom: 25px;
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

export default PaymentAccepted;
