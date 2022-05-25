import React, { useState } from "react";
import Header from "../header";
import styled from "styled-components";
import Connexion from "./connexion";
import Register from "./register";
import { connect } from "react-redux";
import { signInUser } from "../../action/userAction";
function Connreg(props) {
	// C'est un fonction de type composant React qui va servir à l'utilisateur de se logger
	// PRE : -
	// Celle-ci va retourner une page qui va servir pour se connecter et aussi qui contient des liens qui menent vers (creation du compte et mot de passe oublié)
	const [connexion, setConnexion] = useState(true);
	const toggle = React.useCallback(() => {
		setConnexion(!connexion);
	}, [connexion]);

	return (
		<Container>
			<Header />
			<Content>
				{!connexion ? (
					<Register onSwap={toggle} />
				) : (
					<Connexion onSwap={toggle} />
				)}
			</Content>
		</Container>
	);
}

const Container = styled.div`
	margin: 0 auto;
	max-width: 1600px;
	top: 0;
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100vh;
`;

const Content = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url("./images/car_7.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

/**
 * Récupère les informations de l'état dont la page à besoin
 *
 * @param {Object} state object
 * @returns {Object} object
 */
const mapStateToProps = (state) => {
	return {};
};
/**
 * Récupère les actions(ceux qui font les appels) dont la page à besoin
 *
 * @param {Object} dispatch object
 * @returns {Object} object
 */
const mapStateToDispatch = (dispatch) => {
	return {
		signin: () => {
			dispatch(signInUser());
		},
	};
};
//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Connreg);
