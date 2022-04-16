import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { registerUser } from "../../action/userAction";
import { connect } from "react-redux";

function Register(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleRegister = () => {
		return;
	};
	return (
		<Container>
			<Content>
				<Banner>Créer un nouveau compte</Banner>
				<Form>
					<Login>
						<Ajust>
							<p>Nom</p>
							<input
								type="text"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
							/>
						</Ajust>
						<Ajust>
							<p>Prénom</p>
							<input type="text" value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							/>
							
						</Ajust>
					</Login>
					<Email>
						<p>Email</p>
						<input
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</Email>
					<Password>
						<p>Mot de passe</p>
						<input
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<br></br>
						<p>Répéter le mot de passe</p>
						<input type="password" />
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
					<Account>
						<span onClick={props.onSwap} style={{ color: "#00A9FF" }}>
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
	position: relative;
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
	padding: 1vh 1vh 1vh 1vh;
	border-bottom: solid #797979 1px;
	background-color: #00a9ff;
	color: #333333;
	text-align: center;
	font-size: 3.6vh;
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin: 10px;
	p {
		text-align: left;
		font-size: 3vh;
	}
	input {
		border: 1px solid #797979;
		border-radius: 0.5vh;
		height: 4.5vh;
		font-size: 3vh;
		width: 90%;
	}
	button {
		font-size: 3.5vh;
		color: #333333;
		background-color: #00a9ff;
		border: 0px;
		border-radius: 1vh;
		width: 40%;
		padding: 1vh;
		margin: 2vh 1vh 2vh 1vh;
		cursor: pointer;
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
	margin: 1vh;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	gap: 4vh;
`;
const Ajust = styled.div`
	display: flex;
	flex-direction: Column;
	gap: 5px;
	input {
		width: 25vh;
	}
`;
const Email = styled.div`
	margin: 1vh;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	gap: 5px;
`;
const Password = styled.div`
	margin: 1vh;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	gap: 5px;
`;
const Confirm = styled.div`
	display: flex;
	justify-content: center;
	margin: 2vh;
	margin-bottom: 1vh;
`;
const Account = styled.label`
	display: flex;
	margin: 0vh 1vh 2vh 2vh;
	cursor: pointer;
	text-decoration: underline #00a9ff;
	font-size: 2.25vh;
`;
const mapStateToProps = (state) => {
	return {};
};
const mapStateToDispatch = (dispatch) => {
	return {
		register: (payload) => {
			dispatch(registerUser(payload));
		},
	};
};

const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Register);
