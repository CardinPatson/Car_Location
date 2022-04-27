import React, { useState } from "react";
import styled from "styled-components";
import Header from "../header";

function ForgotPassword() {
	const [message, setMessage] = useState(false);
	const handleChanges = () => {
		setMessage(!message);
		document.getElementById("button").disabled = true;
	};

	return (
		<Container>
			<Header />
			<Content>
				<Box>
					<Banner>Mot de passe oublié ?</Banner>
					<Form>
						<Instruction>
							<p>
								Pour réinitialiser votre mot de passe, précisez l'adresse mail
								du compte:
							</p>
						</Instruction>
						<Mail>
							<input type="email" placeholder="Email" />
						</Mail>
						<Confirm>
							<button type="button" onClick={handleChanges} id="button">
								Réinitialiser
							</button>
						</Confirm>
						{message && (
							<Message>
								Un mail à été envoyer à cette adresse pour réinitialiser le mot
								de passe.
							</Message>
						)}
					</Form>
				</Box>
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
	align-items: flex-start;
	justify-content: center;
	height: 100%;
	background-image: url("./images/car_10.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

const Box = styled.div`
	box-shadow: 0 0 1px black;
	border-radius: 3px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	border: 0;
	background-color: rgb(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	margin-top: 150px;
`;

const Banner = styled.div`
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
	text-align: center;
	p {
		font-size: 16px;
		color: rgba(0, 0, 0, 0.75);
	}
	input {
		border: none;
		border-bottom: 1px solid #797979;
		border-radius: 2px;
		height: 22px;
		font-size: 16px;
		width: 50%;
		padding: 5px;
		outline: none;
		width: 100%;
		&:focus {
			box-shadow: 2px 2px 12px #00a9ff;
			/* border-radius: 5px 5px 0px 0px; */
		}
		margin: 0 1vh 0 1vh;
	}
	button {
		font-size: 18px;
		color: #333333;
		background-color: #00a9ff;
		border: 0;
		border-radius: 5px;
		width: 100%;
		padding: 1vh;
		margin: 2vh 1vh 2vh 1vh;
		cursor: pointer;
	}
	button:hover {
		background-color: #0078b5;
		color: white;
		border: 0;
	}
	button:active {
		transform: scale(0.95);
	}
	button:disabled,
	button[disabled] {
		border: 0;
		background-color: #cccccc;
		color: #666666;
		cursor: not-allowed;
	}
`;

const Instruction = styled.div`
	justify-content: center;
	text-align: center;
	margin: 15px 10px 15px 10px;
	width: 400px;
	font-size: 15px;
`;

const Mail = styled.div`
	margin: 10px;
	display: flex;
	justify-content: center;
`;

const Confirm = styled.div`
	margin: 10px;
	display: flex;
	justify-content: center;
`;

const Message = styled.div`
	margin: 15px 10px 15px 10px;
	padding: 10px;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	color: #00a9ff;
`;

export default ForgotPassword;
