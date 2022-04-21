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
<<<<<<< HEAD
	margin-top: 100px;
=======
	margin-top: 30%;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
	display: flex;
	flex-direction: column;
	border-radius: 3px;
	background-color: rgb(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Banner = styled.div`
	border-radius: 3px 3px 0 0;
<<<<<<< HEAD
	padding: 8px;
=======
	padding: 1vh 1vh 1vh 1vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
	border-bottom: solid #797979 1px;
	background-color: #00a9ff;
	color: #333333;
	text-align: center;
<<<<<<< HEAD
	font-size: 25px;
=======
	font-size: 3.6vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
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
<<<<<<< HEAD
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
=======
        height: 4.5vh;
        font-size: 3vh;
        width: 90%;
    }
    button {
        font-size: 3.5vh;
        color: #333333;
		border: 0;
        background-color: #00A9FF;
        border-radius: 1vh;
        width: 50%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
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
<<<<<<< HEAD
	margin: 10px;
=======
	margin: 1vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
	display: flex;
	gap: 5px;
	justify-content: flex-start;
	flex-direction: column;
`;

const Password = styled.div`
<<<<<<< HEAD
	margin: 10px;
=======
	margin: 1vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
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
<<<<<<< HEAD
	font-size: 15px;
=======
	font-size: 1vw;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
`;

const Options = styled.label`
	display: flex;
	flex-direction: row;
	align-items: center;
<<<<<<< HEAD
	gap: 40px;
=======
	gap: 7vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
`;

const Forgotpassword = styled.div`
	display: flex;
	align-items: center;
<<<<<<< HEAD
	margin: 10px;
	cursor: pointer;
	text-decoration: none;
	font-size: 18px;
=======
	margin: 1vh 1vh 1vh 1vh;
	cursor: pointer;
	text-decoration: none;
	font-size: 2.25vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
`;

const NoAccount = styled.label`
	display: flex;
	align-items: center;
<<<<<<< HEAD
	margin: 10px;
	cursor: pointer;
	text-decoration: underline #00a9ff;
	font-size: 18px;
=======
	margin: 1vh 1vh 1vh 2vh;
	cursor: pointer;
	text-decoration: underline #00a9ff;
	font-size: 2.25vh;
>>>>>>> b025bdb09575ef597817c5a4b79f4350323ebdbe
`;

export default Connexion;
