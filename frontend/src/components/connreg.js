import React, { useState } from "react";
import Header from "./header";
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
	display: flex;
	height: 723px;
	top: 0;
	justify-content: center;
	background-image: url("./images/car_7.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

const Content = styled.div`
	margin-top: 5%;
	width: 100%;
	display: flex;
	justify-content: center;
`;

export default Connreg;
