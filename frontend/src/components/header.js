import React from "react";
import { clearUserInfo } from "../action/userAction";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import localforage from "localforage";

function Header(props) {
	// Ceci est une fonction de type composant React pour le composant Header. Elle permet à l'utilisateur de naviguer entre les pages.
	// PRE: -
	// POST:  Retourne le composant Header.

	//Ici, c'est toute la structure du composant Header.
	return (
		<Container>
			<Content>
				<Logo>
					<a href="/">
						<img
							src="/images/logo.svg"
							alt="Logo of car-rental's site"
						/>
					</a>
				</Logo>
				<Nav>
					<Link to="/" style={{ textDecoration: "none" }}>
						<p>Accueil</p>
					</Link>
					<Link to="/cars" style={{ textDecoration: "none" }}>
						<p>Voitures</p>
					</Link>
					{props.firstName && props.status === "admin" ? (
						<>
							<Link
								to="/add-cars"
								style={{ textDecoration: "none" }}
							>
								<p>Ajouter voitures</p>
							</Link>
							<Link
								to="/add-administrator"
								style={{ textDecoration: "none" }}
							>
								<p>Ajouter admin</p>
							</Link>
						</>
					) : (
						<></>
					)}
				</Nav>
				{props.firstName ? (
					<>
						<div> Bienvenue {props.firstName} </div>
						<Logout>
							<button
								onClick={() => {
									localforage.clear();
									props.signOut();
									setTimeout(() => {
										window.location.pathname = "/connreg";
									}, 2000);
								}}
								className="logout__button"
							>
								<img alt="logout" src="./images/logout.svg" />
							</button>
						</Logout>
					</>
				) : (
					<Login>
						<Link to="/connreg" style={{ textDecoration: "none" }}>
							<p>Connexion</p>
						</Link>
					</Login>
				)}
				<Menu>
					<div
						onClick={() => {
							//TODO AFFICHER LE MENU DE NAVIGATION
						}}
					>
						<img src="./images/list.svg" alt="hamburger" />
					</div>
				</Menu>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	border: solid 1px rgba(0, 0, 0, 0.08);
	border-top: solid 0px black;
	max-width: 1600px;
	margin: 0 auto;
	position: fixed;
	top: 0;
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
	.logout__button {
		border: "none";
	}
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
		width: max-content;
		position: relative;
		color: rgba(1, 1, 1, 0.7);
		text-decoration: none;
		padding: 5px;
		padding-right: 12.5px;
		padding-left: 12.5px;
		font-size: 1.15em;
	}
	p::before,
	p::after {
		content: "";
		left: 50%;
		top: 100%;
	}
	p::after,
	p::before {
		position: absolute;
		background: #00a9ff;
		display: block;
		width: 0px;
		height: 1px;
	}
	p:hover::after {
		color: #00a9ff;
		cursor: pointer;
		animation: test2 0.5s ease forwards;
	}
	p:hover::before {
		color: #00a9ff;
		cursor: pointer;
		animation: test 0.5s ease forwards;
	}
	p:hover {
		color: #00a9ff;
		transition: 0.5s ease;
	}
	@keyframes test {
		to {
			width: 50%;
			left: 0;
		}
	}
	@keyframes test2 {
		to {
			width: 50%;
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
		transition: all 0.2s linear;
		&:hover {
			color: #00a9f5;
			cursor: pointer;
		}
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
const Logout = styled(Login)``;
const Menu = styled.div`
	margin-right: 25px;
	padding: 5px;
	@media (min-width: 768px) {
		display: none;
	}
`;
/**
 * Récupère les informations de l'état dont la page à besoin
 *
 * @param {Object} state object
 * @returns {Object} object
 */
const mapStateToProps = (state) => {
	return {
		firstName: state.userState.firstName,
		status: state.userState.status,
	};
};

/**
 * Récupère les actions(ceux qui font les appels) dont la page à besoin
 *
 * @param {Object} dispatch object
 * @returns {Object} object
 */
const mapStateToDispatch = (dispatch) => {
	return {
		signOut: () => {
			dispatch(clearUserInfo());
		},
	};
};

//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);

export default connector(Header);
