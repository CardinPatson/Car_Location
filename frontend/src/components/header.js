import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
	return (
		<Container>
			<Content>
				<Logo>
					<a href="/">
						<img src="./images/logo.svg"/>
					</a>		
				</Logo>
				<Nav>
					<Link to="/" style={{ textDecoration: "none" }}>
						<p>Accueil</p>
					</Link>
					<Link to="/cars" style={{ textDecoration: "none" }}>
						<p>Voitures</p>
					</Link>
					<Link to="/add-cars" style={{ textDecoration: "none" }}>
						<p>Ajouter voitures</p>
					</Link>
				</Nav>
				<Login>
					{/* {//TODO Si déjà inscris mentionner son nom } */}
					<Link to="/connreg" style={{ textDecoration: "none" }}>
						<p>Connexion</p>
					</Link>
				</Login>
				<Menu>
					<div
						onClick={() => {
							//TODO AFFICHER LE MENU DE NAVIGATION
						}}
					>
						<img src="./images/list.svg" />
					</div>
				</Menu>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	border: solid 1px rgba(0, 0, 0, 0.08);
	max-width: 100%;
	margin: auto;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	z-index: 100;
`;
const Content = styled.div`
	/* border: solid black 1px; */
	box-shadow: 0 0 1px black;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #f5f5f5;
	height: 60px;
`;
const Logo = styled.div`
	/* border: solid red 1px; */
	height: 100%;
	width: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 2.5%;
	background: #f5f5f5;
	a {
		height: 100%;
		width: auto;
	}
	img {
		margin-top: -2%;
		height: 170%;
		width: auto;
	}
`;

const Nav = styled.div`
	/* border: solid red 1px; */
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-align: left;
	margin-left: 5%;
	flex: 1;

	p {
		/* border: solid blue 1px; */
		color: rgba(1, 1, 1, 0.7);
		text-decoration: none;
		margin: 0 auto;
		padding: 5px;
		padding-right: 12.5px;
		padding-left: 12.5px;
		font-size: 1.15em;
		&:hover {
			color: #00a9ff;
			cursor: pointer;
			padding-right: 11.25px;
			padding-left: 11.25px;
			font-size: 1.2em;
			border-bottom: 1px solid #00a9ff;
		}
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
const Login = styled.div`
	/* border: solid red 1px; */
	margin-right: 25px;
	padding: 5px;
	font-size: 1.15em;
	p {
		color: rgba(0, 0, 0, 0.7);
		&:hover {
			color: #00a9f5;
			cursor: pointer;
		}
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const Menu = styled.div`
	margin-right: 25px;
	padding: 5px;
	@media (min-width: 768px) {
		display: none;
	}
`;
export default Header;
