import React, { useState } from "react";
import styled from "styled-components";
import { googleSignIn, registerUser } from "../../action/userAction";
import { connect } from "react-redux";

function Register(props) {
	// C'est une fonction de type composant react pour la page Register.
	// PRE: -
	// POST: retourne une page qui sert pour la creation de compte pour le site.
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	function clearErrors() {
		// C'est une fonction qui va nous servir de consulter si tout les champs on était bien compléter.
		// PRE: -
		// POST: Renvoie un message d'erreur pour chaque champs.
		setFirstNameError("");
		setLastNameError("");
		setEmailError("");
		setPasswordError("");
		setConfirmPasswordError("");
	}

	function checkValues() {
		// Cette fonction va consulter les champs de la page Register.
		// PRE: -
		// POST: Retourne une erreur si le champ ne respect pas les conditions.
		if (firstName === "") {
			setFirstNameError("* Veuillez compléter le champ nom");
			return 1;
		}
		if (lastName === "") {
			setLastNameError("* Veuillez compléter le champ prénom");
			return 1;
		}
		if (email === "") {
			setEmailError("* Veuillez compléter le champ email");
			return 1;
		}
		if (!/[@]/.test(email) | !/[.]/.test(email)) {
			setEmailError("* Le mail doit être de la forme test@hello.be");
			return 1;
		}

		if (password === "") {
			setPasswordError("* Veuillez compléter le champ mot de passe");
			return 1;
		}
		if (confirmPassword === "") {
			setConfirmPasswordError("* Veuillez compléter ce champ");
			return 1;
		}
		if (confirmPassword !== password) {
			setPasswordError("* Les deux mots de passes ne correspondes pas");
			setConfirmPasswordError(
				"* Les deux mots de passes ne correspondes pas"
			);
			return 1;
		}
		if (password.length < 8) {
			setPasswordError(
				"* Le mot de passe doit contenir au moins 8 caractères"
			);
			return 1;
		}
		if (!/\d/.test(password)) {
			setPasswordError(
				"* Le mot de passe doit contenir au moins 1 chiffre"
			);
			return 1;
		}
		if (!/[A-Z]/.test(password)) {
			setPasswordError(
				"* Le mot de passe doit contenir au moins 1 majuscule"
			);
			return 1;
		}
		return 0;
	}

	const handleRegister = (e) => {
		// Cette fonction sert à verifier les informations entrées par le client et si elles sont correctes, à les envoyer à la DB.
		// PRE: Il va récupèrer les valeurs du champs du formulaire.
		// POST: Si les tests passent, l'utilisateur est ajouté à la base de donnée et il retourn à la page d'accueil.
		e.preventDefault();
		clearErrors();
		const clientProperty = {
			firstName,
			lastName,
			email,
			password,
		};
		if (checkValues() === 1) {
			return;
		}
		props.register(clientProperty);
		return;
	};
	return (
		<Container>
			<Content>
				<Banner>Créer un nouveau compte</Banner>
				<Form>
					<Login>
						<Ajust id="champ">
							<p>Nom</p>
							<input
								type="text"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
							/>
							{firstNameError ? (
								<p className="error">{firstNameError}</p>
							) : (
								""
							)}
						</Ajust>
						<Ajust id="champ">
							<p>Prénom</p>
							<input
								type="text"
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
								}}
							/>
							{lastNameError ? (
								<p className="error">{lastNameError}</p>
							) : (
								""
							)}
						</Ajust>
					</Login>
					<Email id="champ">
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
					</Email>
					<Password id="champ">
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
						<br></br>
						<p>Répéter le mot de passe</p>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
						{confirmPasswordError ? (
							<p className="error">{confirmPasswordError}</p>
						) : (
							""
						)}
					</Password>
					<Confirm>
						<button
							onClick={(e) => {
								handleRegister(e);
							}}
						>
							S'inscrire
						</button>
					</Confirm>
					<Google
						onClick={() => {
							/**A COMPLETER */
							props.googleSignIn();
							// window.location.pathname = "/";
						}}
					>
						<img src="/images/google.svg" alt=""></img>Se connecter
						avec google
					</Google>
					<Account>
						<span
							onClick={props.onSwap}
							style={{ color: "#00A9FF" }}
						>
							Déjà inscrit ?
						</span>
					</Account>
				</Form>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 75px;
	margin-bottom: 15px;
	height: 65%;
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	border: 0;
	border-radius: 3px;
	background-color: rgb(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

const Form = styled.div`
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
		height: 40%;
		font-size: 16px;
		outline: none;
		padding: 5px;
		&:focus {
			box-shadow: 2px 2px 12px #00a9ff;
			/* border-radius: 5px 5px 0px 0px; */
		}
	}
	.error {
		color: red;
		font-size: 15px;
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
`;
const Login = styled.div`
	margin: 10px;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	gap: 25px;
`;
const Ajust = styled.div`
	display: flex;
	flex-direction: Column;
	gap: 5px;
	input {
		width: 200px;
	}
`;
const Email = styled.div`
	margin: 10px;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	gap: 5px;
`;
const Password = styled.div`
	margin: 10px;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	gap: 5px;
`;
const Confirm = styled.div`
	display: flex;
	justify-content: center;
`;
const Account = styled.label`
	display: flex;
	margin: 0vh 10px 10px 10px;
	cursor: pointer;
	text-decoration: underline #00a9ff;
	font-size: 18px;
`;
const Google = styled.div`
	@media (max-width: 768px) {
		height: 56px;
		padding: 10px;
	}
	margin: 0 10px 0 10px;
	margin-bottom: 30px;

	display: flex;
	justify-content: center;
	background-color: #fff;
	align-items: center;
	/* width: 100%; */
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
		register: (payload) => {
			dispatch(registerUser(payload));
		},
		googleSignIn: () => {
			dispatch(googleSignIn());
		},
	};
};

//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Register);
