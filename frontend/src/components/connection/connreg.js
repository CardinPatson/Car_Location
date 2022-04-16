import React, { useState } from "react";
import Header from "../header";
import styled from "styled-components";
import Connexion from "./connexion";
import Register from "./register";



function Connreg() {
	const [connexion, setConnexion] = useState(true);
	const toggle = React.useCallback(() => setConnexion(!connexion));

	return (
		<Container>
			<Header />
			<Content>
				{!connexion
						? <Register onSwap={toggle}/>
						: <Connexion onSwap={toggle}/>}
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
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url("./images/car_7.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

export default Connreg;
