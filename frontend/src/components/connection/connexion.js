import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Checkbox } from "@mui/material";
import { connect } from "react-redux";
import { googleSignIn, signInUser } from "../../action/userAction";

function Connexion(props) {
	// C'est un composant  REACT qui va nous servir de trouver les options de connection.
	// PRE: -
	// POST: Il va retourner la page de connexion qui va être affiché sur le navigateur.

	// On voit ici les HOOKS qui vont nous servir à stocker les informations de l'utilisateur.
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	function clearErrors() {
		// Cette fonction sert à test erreur qui pourrait se trouver dans Email et password.
		// PRE: -
		// POST: Il va renvoyer un message d'erreur si les champs ne respect pas les conditions.
		setEmailError("");
		setPasswordError("");
	}

	function checkValues() {
		// Cette fonction sert pour consulter si le mail et le mot de passe entré par l'utilisateur sont correct.
		// PRE: Récupère les valeurs des champs
		// POST: Renvoie une erreur si un des champs est vide ou s'ils ne respectent pas les conditions.
		if (email === "") {
			setEmailError("* Veuillez compléter le champ email");
			return 1;
		}
		if (password === "") {
			setPasswordError("* Veuillez compléter le champ mot de passe");
			return 1;
		}
	}

	const handleConnexion = (e) => {
		// C'est une fonction qui va nous servir lorsqu'on click sur le bouton se connecter.
		// PRE:
		// POST: Renvoie une autre page après un click sur le bouton.
		e.preventDefault();
		clearErrors();
		const connexionProperty = {
			email,
			password,
		};
		if (checkValues() === 1) {
			return;
		}
		props.signIn(connexionProperty);
		return;
	};
	return (
		<Container>
			<Content>
				<Banner>Connectez-vous à votre compte</Banner>
				<Form>
					<Login>
						<p>Email</p>
						<input
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						{emailError ? (
							<p className="error">{emailError}</p>
						) : (
							""
						)}
					</Login>
					<Password>
						<p>Mot de passe</p>
						<input
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						{passwordError ? (
							<p className="error">{passwordError}</p>
						) : (
							""
						)}
					</Password>
					<Confirm>
						<Remember>
							<Checkbox
								checked={remember}
								onChange={(e) => setRemember(!remember)}
								disableRipple={true}
							/>
							Se souvenir de moi
						</Remember>
						<button
							onClick={(e) => {
								handleConnexion(e);
							}}
						>
							Se connecter
						</button>
						<Google
							onClick={() => {
								props.googleSignIn();
							}}
						>
							<img src="/images/google.svg" alt=""></img>Se
							connecter avec google
						</Google>
					</Confirm>
					<Options>
						<Forgotpassword>
							<Link
								to="/forgotPassword"
								style={{ color: "#00A9FF" }}
							>
								Mot de passe oublié ?
							</Link>
						</Forgotpassword>
						<NoAccount>
							<span
								onClick={props.onSwap}
								style={{ color: "#00A9FF" }}
							>
								Créer un compte
							</span>
						</NoAccount>
					</Options>
				</Form>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 80px;
	position: relative;
	margin-bottom: 20px;
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

const Remember = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 15px;
`;

const Options = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 40px;
`;
const Google = styled.div`
	@media (max-width: 768px) {
		height: 56px;
		padding: 10px;
	}
	display: flex;
	justify-content: center;
	background-color: #fff;
	align-items: center;
	width: 100%;
	height: 56px;
	border-radius: 5px;
	box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
		inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0%);

	/**BOX SHADOW INSET NOUS PERMET DAVOIR UN EFFET INTERIEUR SUR LES BORDURE */
	vertical-align: middle;
	z-index: 0;
	transition-duration: 167ms;
	font-size: 20px;
	color: rgba(0, 0, 0, 0.6);
	&:hover {
		background-color: rgba(207, 207, 207, 0.25);
		color: rgba(0, 0, 0, 0.75);
	}
	cursor: pointer;
`;
const Forgotpassword = styled.div`
	display: flex;
	align-items: center;
	margin: 10px;
	cursor: pointer;
	text-decoration: none;
	font-size: 18px;
`;

const NoAccount = styled.label`
	display: flex;
	align-items: center;
	margin: 10px;
	cursor: pointer;
	text-decoration: underline #00a9ff;
	font-size: 18px;
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
		signIn: (payload) => {
			dispatch(signInUser(payload));
		},
		googleSignIn: () => {
			dispatch(googleSignIn());
		},
	};
};

//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Connexion);
