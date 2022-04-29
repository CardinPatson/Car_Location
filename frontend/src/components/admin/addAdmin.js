import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Checkbox } from "@mui/material";
import { connect } from "react-redux";
import {
	googleSignIn,
	registerAdmin,
	signInUser,
} from "../../action/userAction";
import Header from "../header";

function Connexion(props) {
	const [emailAdmin, setEmailAdmin] = useState("");
	const [emailUser, setEmailUser] = useState("");
	const [passwordAdmin, setPasswordAdmin] = useState("");
	const [passwordUser, setPasswordUser] = useState("");

	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	function clearErrors() {
		setEmailError("");
		setPasswordError("");
	}

	function checkValues() {
		if (!emailAdmin && !emailUser) {
			setEmailError("* Veuillez compléter le champ email");
			return 1;
		}
		if (!passwordAdmin && !passwordUser) {
			setPasswordError("* Veuillez compléter le champ mot de passe");
			return 1;
		}
		if (emailAdmin !== props.email) {
			setEmailError("* Email administrateur incorrect");
		}
	}

	const handleConnexion = async (e) => {
		e.preventDefault();
		clearErrors();
		const connexionProperty = {
			emailAdmin,
			passwordAdmin,
			emailUser,
			passwordUser,
			token: props.token,
		};
		if (checkValues() === 1) {
			return;
		}
		const admin = await props.addAdmin(connexionProperty);
		console.log(admin);
		if (!admin)
			setError(
				"Une erreur est survenue lors de l'insertion de l'administrateur! Veuillez réessayer!!"
			);
		return;
	};
	return (
		<SuperContainer>
			<Header />
			<SuperContent>
				<Container>
					<Content>
						<Banner>Ajouter un administrateur</Banner>
						{error ? <p style={{ color: "red" }}>{error}</p> : <></>}
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
								{emailError ? <p className="error">{emailError}</p> : ""}
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
								{passwordError ? <p className="error">{passwordError}</p> : ""}
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
								{emailError ? <p className="error">{emailError}</p> : ""}
							</Login>
							<Password>
								<p>Mot de passe du nouvel administrateur</p>
								<input
									type="password"
									value={passwordUser}
									onChange={(e) => {
										setPasswordUser(e.target.value);
									}}
								/>
								{passwordError ? <p className="error">{passwordError}</p> : ""}
							</Password>
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
								⚠️Le nouvel administrateur doit posséder un compte
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

const mapStateToProps = (state) => {
	return {
		token: state.userState.token,
		email: state.userState.email,
	};
};
const mapStateToDispatch = (dispatch) => {
	return {
		addAdmin: async (payload) => {
			await dispatch(registerAdmin(payload));
		},
	};
};

const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Connexion);
