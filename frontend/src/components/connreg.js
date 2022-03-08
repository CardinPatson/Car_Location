import React from "react";
import Header from "./header";
import styled from "styled-components";
import Connexion from "./connexion";
import Register from "./register";

const swapPage = () => {
	return <Register/>
}

function Connreg() {
	return (
		<Container>
			<Header />
			<Content>
				<Connexion change={swapPage}/>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	margin: 0 auto;
	max-width: 1300px;
`;
const Content = styled.div`
	display: flex;
	justify-content: center;
	gap: 8vh;
`;

export default Connreg;
