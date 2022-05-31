import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { registerAdmin } from "../../action/userAction";
import Header from "../header";

function Connexion(props) {
	// Ceci est une fonction de type composant React pour la page addAdmin.
	// PRE: -
	// POST: retourne la page ajouter admin pour qu'elle soit affichée.

	// Ici, on observe les hooks qui sont utilisé pour stocker les valuers des champs. Ils sont mis à jour à chaque fois qu'on change une valeur d'un champ.
	const [emailAdmin, setEmailAdmin] = useState("");
	const [emailUser, setEmailUser] = useState("");
	const [passwordAdmin, setPasswordAdmin] = useState("");

	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	function clearErrors() {
		// Cette fonction permet, àchaque fois qu'on appuye sur le bouton pour envoiyer le formulaire, de nettoyer les précédents messages d'erreurs.
		// PRE: -
		// POST: Remet les précédents messages d'erreur à zéro.
		setEmailError("");
		setPasswordError("");
	}

	function checkValues() {
		// Cette fonction permet, avant l'envoi des données, de vérifier les champs du formulaire afin qu'aucune données erronnées ne soit envoyé au Backend.
		// PRE: Utilise les valeurs des champs du formulaire.
		// POST: Retroune 1 et set une erreur si un champ n'est pas remplis correctement.
		if (!emailAdmin && !emailUser) {
			setEmailError("* Veuillez compléter le champ email");
			return 1;
		}
		if (!passwordAdmin) {
			setPasswordError("* Veuillez compléter le champ mot de passe");
			return 1;
		}
		if (emailAdmin !== props.email) {
			setEmailError("* Email administrateur incorrect");
			return 1;
		}
	}

	const handleConnexion = async (e) => {
		// Cette fonction est exécutée à chaque fois que le bouton d'envoi du formulaire est cliqué.
		// PRE: Récupère les valeurs des champs du formulaire.
		// POST: Si tous les champs sont correctes, la fonction envoi les données à la DB.
		e.preventDefault();
		// On crée un objet avec les valeurs des champs.
		const connexionProperty = {
			emailAdmin,
			passwordAdmin,
			emailUser,
			token: props.token,
		};
		// On effectue une vérification sur les champs du formulaire.
		// Si tous les champs sont correctes on passe à la suite, sinon, on quitte la fonction handleConnexion.
		if (checkValues() === 1) {
			clearErrors();
			return;
		}
		// Ici, on essaye d'ajouter l'administrateur à la db.
		const admin = await props.addAdmin(connexionProperty);
		// Si l'insertion à échouée, on affiche un message d'erreur et on quitte la fonction handleConnexion.
		if (!admin)
			setError(
				"Une erreur est survenue lors de l'insertion de l'administrateur! Veuillez réessayer!!"
			);
		return;
	};
	// Ici, c'est toute la structure de la page addAdmin.
	return (
		<SuperContainer>
			<Header />
			<SuperContent>
				<Container>
					<Content>
						<Banner>Ajouter un administrateur</Banner>
						{error ? (
							<p style={{ color: "red" }}>{error}</p>
						) : (
							<></>
						)}
						<Form>
							<Login>
								<p>Votre email</p>
								<input
									type="email"
									value={emailAdmin}
									onChange={(e) => {
										setEmailAdmin(e.target.value);
									}}
								/>
								{emailError ? (
									<p className="error">{emailError}</p>
								) : (
									""
								)}
							</Login>
							<Password>
								<p>Votre Mot de passe</p>
								<input
									type="password"
									value={passwordAdmin}
									onChange={(e) => {
										setPasswordAdmin(e.target.value);
									}}
								/>
								{passwordError ? (
									<p className="error">{passwordError}</p>
								) : (
									""
								)}
							</Password>
							<Login>
								<p>Email du nouvel administrateur</p>
								<input
									type="email"
									value={emailUser}
									onChange={(e) => {
										setEmailUser(e.target.value);
									}}
								/>
								{emailError ? (
									<p className="error">{emailError}</p>
								) : (
									""
								)}
							</Login>
							<Confirm>
								<button
									onClick={(e) => {
										handleConnexion(e);
									}}
								>
									Envoyer
								</button>
							</Confirm>
							<p style={{ color: "red" }}>
								⚠️Le nouvel administrateur doit posséder un
								compte
							</p>
						</Form>
					</Content>
				</Container>
			</SuperContent>
		</SuperContainer>
	);
}

const SuperContainer = styled.div`
	margin: 0 auto;
	max-width: 1600px;
	top: 0;
	display: flex;
	flex-direction: column;
	position: relative;
	height: 100vh;
`;
const SuperContent = styled.div`
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
const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 80px;
	position: relative;
	margin-bottom: 20px;
	width: 30%;
	@media (max-width: 1400px) {
		width: 500px;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 3px;
	background-color: rgb(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	padding: 15px;
`;

const Banner = styled.div`
	border-radius: 3px 3px 0 0;
	padding: 20px;
	/* border-bottom: solid #797979 1px; */
	/* background-color: #00a9ff; */
	color: #333333;
	text-align: center;
	font-size: 22px;
	font-weight: bold;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin: 10px;
	p {
		text-align: left;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.65);
	}
	input {
		border: none;
		border-bottom: 1px solid #797979;
		border-radius: 0.5vh;
		height: 32px;
		font-size: 16px;
		outline: none;
		padding: 5px;
		&:focus {
			box-shadow: 2px 2px 12px #00a9ff;
			/* border-radius: 5px 5px 0px 0px; */
		}
	}
	button {
		font-size: 22px;
		color: #333333;
		background-color: #00a9ff;
		border: 0px;
		border-radius: 5px;
		padding: 10px;
		margin: 15px 10px 15px 10px;
		cursor: pointer;
		width: 100%;
	}
	button:hover {
		color: white;
		background-color: #0078b5;
		border: 0;
	}
	button:active {
		transform: scale(0.95);
	}
	.error {
		color: red;
		font-size: 15px;
	}
`;

const Login = styled.div`
	margin: 10px;
	display: flex;
	gap: 5px;
	justify-content: flex-start;
	flex-direction: column;
`;

const Password = styled.div`
	margin: 10px;
	display: flex;
	gap: 5px;
	justify-content: flex-start;
	flex-direction: column;
`;

const Confirm = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 35px;
	button {
		align-self: center;
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
 * Récupère les actions dont la page à besoin
 *
 * @param {Object} dispatch object
 * @returns {Object} object
 */
const mapStateToDispatch = (dispatch) => {
	return {
		addAdmin: async (payload) => {
			await dispatch(registerAdmin(payload));
		},
	};
};
//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Connexion);
