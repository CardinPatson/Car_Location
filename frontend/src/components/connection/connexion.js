import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Checkbox } from '@mui/material';

function Connexion(props) {
	const handleConnexion = () => {
		return;
	};
	return (
		<Container>
			<Content>
				<Banner>Connectez-vous à votre compte</Banner>
				<Form>
					<Login>
						<p>Email</p>
						<input type="email" />
					</Login>
					<Password>
						<p>Mot de passe</p>
						<input type="password" />
					</Password>
					<Confirm>
						<Remember>
							<Checkbox>
							</Checkbox>
							Se souvenir de moi
						</Remember>
						<button
							onClick={(e) => {
								handleConnexion(e);
							}}
						>
							Se connecter
						</button>
					</Confirm>
					<Options>
						<Forgotpassword>
							<Link to="/forgotPassword" style={{ color: "#00A9FF" }}>
								Mot de passe oublié ?
							</Link>
						</Forgotpassword>
						<NoAccount>
							<span onClick={props.onSwap} style={{ color: "#00A9FF" }}>
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
	position: relative;
`;

const Content = styled.div`
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	border-radius: 3px;
	background-color: rgb(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Banner = styled.div`
	border-radius: 3px 3px 0 0;
	padding: 8px;
	border-bottom: solid #797979 1px;
	background-color: #00a9ff;
	color: #333333;
	text-align: center;
	font-size: 25px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
	gap: 15px;
	margin: 10px;
    p{
        text-align: left;
        font-size: 22px;
    }
    input {
        border: 1px solid #797979;
        border-radius:0.5vh;
        height: 32px;
        font-size: 25px;
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
    }
    button:hover{
        color: white;
        background-color: #0078B5;
		border: 0;
    }
    button:active {
        transform: scale(0.95);
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

export default Connexion;
