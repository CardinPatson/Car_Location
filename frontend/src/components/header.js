import React from "react";
import styled from "styled-components";

function Header() {
	return (
		<Container>
			<Content>
				<Logo>
					<div> Car Rental</div>
				</Logo>
				<div></div>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid 1px rgba(0, 0, 0, 0.08); */
	/* border-bottom: solid 1px rgba(0, 0, 0, 0.08); */
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	z-index: 100;
	/* padding: 0 24px; */
`;
const Content = styled.div`
	/* border: solid black 1px; */
	display: flex;
	align-items: center;
	background: white;
	margin: 0 auto;
	max-width: 1300px;
	height: 60px;
`;
const Logo = styled.div`
	/* border: solid red 1px; */
	height: 100%;
	width: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #00a9ff;
	div {
		/* border: solid blue 1px; */
		color: white;
		/* font-weight: bol; */
		font-size: 25px;
		text-align: center;
		transform: rotate(8deg);
		margin: 8px;
	}
	/* flex-direction: column; */
`;
export default Header;
