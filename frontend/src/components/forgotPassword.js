import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";


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
                            Pour réinitialiser votre mot de passe, précisez l'adresse mail du compte:
                        </Instruction>
                        <Mail>
                            <input type="email" placeholder="Votre mail"/>
					    </Mail>
                        <Confirm>
                            <button type ="button" onClick={handleChanges} id="button">
                                Réinitialiser
                            </button>
                        </Confirm>
                        { message &&
                            <Message>
                                Un mail à été envoyer à cette adresse pour réinitialiser le mot de passe.
                            </Message>
                        }
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
`

const Box = styled.div`
	box-shadow: 0 0 1px black;
    border-radius: 3px;
	display: flex;
    justify-content: center;
	flex-direction: column;
    border: solid 0.5px rgba(0, 0, 0, 0.08);
    background-color: rgb(255, 255, 255, 0.9);
	margin: 10% 0% 0% 0%;
	width: 55vh;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    p {
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
        color: #333333;
        background-color: #00A9FF;
        border: 1.5px solid #00486D;
        border-radius: 1vh;
        width 40%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
    }
    button:hover{
        background-color: #0078B5;
        color: white;
        border: 1.5px solid #00A9FF;
    }
    button:active {
        transform: scale(0.95);
    }
    button:disabled,
    button[disabled]{
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;

const Instruction = styled.div`
    justify-content: center;
    text-align: center;
    margin: 2vh 1vh 2vh 1vh;
`;

const Mail = styled.div`
    margin: 1vh;
	display: flex;
    justify-content: center;
`;

const Confirm = styled.div`
    margin: 1vh;
	display: flex;
	justify-content: center;
`;

const Message = styled.div`
    margin: 2vh 1vh 2vh 1vh;
    padding: 1vh;
    border-top : 1px solid black;
    border-bottom : 1px solid black;
    color: #00a9ff;
`;

export default ForgotPassword
