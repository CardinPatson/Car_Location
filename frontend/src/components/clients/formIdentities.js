import React, { useState } from "react";
import Header from "../header";
import styled from "styled-components";

function FormIdentities(props) {
	// Ceci est une fonction de type composant React pour la page formIdentities. Elle permet à l'utilisateur de modifier ou ajouter des informations personnelles.
	// PRE: -
	// POST:  Retourne la page formIdentities.

	// Ici on a tous les hooks utilisés pour stocker les valeurs des inputs
	const [name, setName] = useState("");
	const [secondName, setSecondName] = useState("");
	const [civility, setCivility] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [adress, setAdress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [location, setLocation] = useState("");

	// const [identCardLink, setIdentCardLink] = useState("");
	// const [drivingLincenseLink, setDrivingLincenseLink] = useState("");

	// Ici, c'est toute la structure de la page formIdentities.
	return (
		<Container>
			<Header />
			<Content>
				<Test>
					<Banner>
						<span>Données du client</span>
					</Banner>
					<Detail>
						<Info>
							<TopInfo>
								<SpecsColumn>
									<OneSpec>
										<div>Nom:</div>
										<input
											type="text"
											value={name}
											onChange={(e) => {
												setName(e.target.value);
											}}
										/>
									</OneSpec>
									<OneSpec>
										<div>Civilité:</div>
										<input
											type="text"
											value={civility}
											onChange={(e) => {
												setCivility(e.target.value);
											}}
										/>
									</OneSpec>
									<OneSpec>
										<div>Address email:</div>
										<input
											type="text"
											value={email}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</OneSpec>
									<OneSpec>
										<div>Code postal:</div>
										<input
											type="text"
											value={postalCode}
											onChange={(e) => {
												setPostalCode(e.target.value);
											}}
										/>
									</OneSpec>
								</SpecsColumn>
								<SpecsColumn>
									<OneSpec>
										<div>Prenom:</div>
										<input
											type="text"
											value={secondName}
											onChange={(e) => {
												setSecondName(e.target.value);
											}}
										/>
									</OneSpec>
									<OneSpec>
										<div>Tél:</div>
										<input
											type="text"
											placeholder="+32"
											value={phoneNumber}
											onChange={(e) => {
												setPhoneNumber(e.target.value);
											}}
										/>
									</OneSpec>
									<OneSpec>
										<div>Address:</div>
										<input
											type="text"
											placeholder="Rue"
											value={adress}
											onChange={(e) => {
												setAdress(e.target.value);
											}}
										/>
									</OneSpec>
									<OneSpec className="selectStyle">
										<div>Ville:</div>
										<select
											value={location}
											onChange={(e) => {
												setLocation(e.target.value);
											}}
										>
											<option>Namur</option>
											<option>Liège</option>
											<option>Luxembourg</option>
											<option>Brabant Wallon</option>
											<option>Hainaut</option>
											<option>Brabant Flamand</option>
											<option>Anvers</option>
											<option>Gent</option>
											<option>Flandre Orientale</option>
											<option>Flandre Occidentale</option>
											<option>Bruxelles</option>
										</select>
									</OneSpec>
								</SpecsColumn>
							</TopInfo>
							<DetailTable>
								<Specs>
									<div>
										Photo de la carte d'identité
										<br />
										(Recto & Verso)
									</div>
									<div>
										<input
											type="file"
											accept="image/gif , image/png , image/jpeg"
											name="image"
											id="file"
											multiple
										/>
									</div>
									<div>
										Photo du permis de conduire
										<br />
										(Recto & Verso)
									</div>
									<div>
										<input
											type="file"
											accept="image/gif , image/png , image/jpeg"
											name="image"
											id="file"
											multiple
										/>
									</div>
								</Specs>
								<Specs></Specs>
							</DetailTable>
						</Info>
					</Detail>
				</Test>
				<Buttons>
					<button className="__button__blue">Soumission</button>
				</Buttons>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	top: 0;
	background-size: 1600px;
	max-width: 800px;
	height: 110vh;
	margin: auto;
	display: flex;
	justify-content: center;
`;

const Content = styled.div`
	margin-top: 15%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding-bottom: 30px;
	width: 100%;
`;

const Test = styled.div`
	border: 0.5px solid black;
	border-radius: 5px;
	border-style: none;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	background-color: rgb(245, 245, 245, 0.95);
	display: flex;
	flex-direction: column;
	width: 80%;
`;

const Banner = styled.div`
	font: bold;
	font-size: 1.6em;
	text-align: left;
	background: #00a9f5;
	border: 1px black;
	padding: 6px;
	border-radius: 5px 5px 0 0;
`;

const Detail = styled.div`
	display: flex;
	flex-direction: row;
	/* //flex-grow: 1; */
	/* width: 100%; */
	/*border-radius: 1vh; */
	/* box-shadow: 0 0 1px black; */
	margin: 1vh 1vh 1vh 5vh;
`;

const Info = styled.div`
	/* flex : 0.6; */
	/* border : solid red 1px;  */
`;

const DetailTable = styled.div`
	padding: 2%;
	padding-left: 0;
	display: flex;
	flex-direction: row;
`;

const TopInfo = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 5px;
`;

const SpecsColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	margin: 20px 0 0 0;
	font-size: 1.5vw;
	text-align: left;
`;

const OneSpec = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 3vh;
	margin-left: 5px;
	div {
		margin-right: 5px;
		font-size: 1vw;
	}
	input[type="text"],
	[type="number"] {
		background: none;
		border: none;
		border-bottom: solid 1px #00a9ff;
		font-size: 1vw;
		letter-spacing: 2px;
		margin: 0em 0.8em 2.975em 0;
		padding: 0 0 0 0;
		width: 100%;
		text-align: left;
		outline: none;
		::placeholder {
			font-size: 1vw;
		}
	}
	input[type="checkbox"] {
		padding: 8px;
		margin-top: 3%;
		box-sizing: content-box;
	}
	.selectStyle {
		position: relative;
		font-size: 23px;
	}
`;

const Specs = styled.div`
	text-align: left;
	/* margin: auto; */
	width: 70%;
	color: #00a9ff;
	div {
		display: flex;
		align-items: center;
		text-align: left;
		margin: 1vh;
		margin-left: 0;
		font-weight: bold;
		font-size: 1vw;
		margin: 0em 0.8em 1.375em 0;
	}
	img {
		padding: 5px;
		padding-right: 10px;
		height: auto;
		width: 10%;
	}
	input[type="text"],
	[type="number"] {
		border: none;
		background: none;
		border-bottom: solid 1px #00a9ff;
		font-size: 1.5vw;
		letter-spacing: 1px;
		margin: 0em 0 0em 5px;
		padding: 0 0 0 0;
		width: 30%;
		outline: none;
	}
	input[type="file"] {
		color: black;
	}
	.__button__blue {
		font-size: 3vh;
		color: #333333;
		background-color: #00a9ff;
		border: 2px solid #00486d;
		font-size: 1.5vw;
		border-radius: 1vh;
		width: 80%;
		padding: 1vh;
		margin: 2vh 1vh 2vh 1vh;
		cursor: pointer;
	}
`;
const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 10px;
	height: 15vh;
	width: 80%;
	align-items: center;
	.__button__blue {
		font-size: 3vh;
		color: #333333;
		background-color: #00a9ff;
		border: 2px solid #00486d;
		border-style: none;
		font-size: 1.5vw;
		border-radius: 1vh;
		width: 50%;
		padding: 1vh;
		margin: 2vh 1vh 2vh 1vh;
		cursor: pointer;
	}
`;
export default FormIdentities;
