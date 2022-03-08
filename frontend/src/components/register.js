import React from "react";
import styled from "styled-components";

function Register(props) {
	return (
		<Container>
			<Content>
				<Banner>Créer un nouveau compte</Banner>
				<Form>
					<Login>
						<Ajust>
							<p>Nom</p>
							<input type="text" />
						</Ajust>
						<Ajust>
							<p>Prénom</p>
							<input type="text" />
						</Ajust>
					</Login>
					<Email>
						<p>Email</p>
						<input type="text" />
					</Email>
					<Password>
						<p>Mot de passe</p>
						<input type="text" />
					</Password>
					<Confirm>
						<button onClick={() => {}}>S'inscrire</button>
					</Confirm>
					<Account>
						<span onClick={props.onSwap} style={{ color: "#00A9FF" }}>Déjà inscrit ?</span>
					</Account>
				</Form>
			</Content>
		</Container>
	);
}

const Container = styled.div`
`;
const Content = styled.div`
	box-shadow: 0 0 1px black;
	border: solid #777777 1px;
	display: flex;
	flex-direction: column;
	position: relative;
	margin: 25% 0% 0% 0%;
	width: 55vh;
`;

const Banner = styled.div`
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
    p{
        text-align: left;
        font-size: 3vh;
    }
    input {
        border: 1px solid #797979;
        border-radius:0.5vh;
        height: 4vh;
        font-size: 2.5vh;
        width: 40vh;
    }
    button {
        font-size: 3vh;
        color: white;
        background-color: #00A9FF;
        border: 2px solid #00486D;
        border-radius: 1vh;
        width 40%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
    }
    button:hover{
        background-color: #00486D;
        border: 2px solid #00A9FF;
    }
`;
const Login = styled.div`
	margin: 1vh;
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	gap: 1vh;
`;
const Ajust = styled.div`
	display: flex;
	flex-direction: Column;
	input {
		width: 25vh;
	}
`;
const Email = styled.div`
	margin: 1vh;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
`;
const Password = styled.div`
	margin: 1vh;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
`;
const Confirm = styled.div`
	display: flex;
	justify-content: center;
	margin: 2vh;
`;
const Account = styled.label`
	display: flex;
	margin: 1vh 1vh 2vh 2vh;
	cursor: pointer;
	text-decoration: underline #00A9FF;
`;

export default Register;
