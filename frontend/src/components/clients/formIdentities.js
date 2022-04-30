import React, { useState, useEffect } from "react";
import { addCarsProperty } from "../../action/carAction";
import { connect } from "react-redux";
import Header from "../header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const FormIdentities = (props) => {
	const [identityImage, setIdenImage] = useState([]);
	const [permisImage, setPermImage] = useState([]);
	const [urlImage, setUrlImage] = useState([]);
	const [popUp, setPopUp] = useState(
		localStorage.getItem("popup", true) === "true"
	);

	// useEffect(()=>{
	// 	console.log(localStorage.getItem("popup" , true) === "true");
	// } , [])

	const removeImage = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	};

	const handleImage = (e) => {
		const url = e.target.files[0];
		// console.log(url);
		if (!identityImage || !permisImage) return;
		setIdenImage([...identityImage, URL.createObjectURL(url)]);
    	setUrlImage([...urlImage, url]);
		// console.log(urlImage);
	};

	const handleImagePermis = (e) => {
		const url = e.target.files[0];
		// console.log(url);
		if (!identityImage || !permisImage) return;
		setPermImage([...permisImage, URL.createObjectURL(url)]);
		setUrlImage([...urlImage, url]);
		// console.log(urlImage);
	};
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
										<input type="text" />
									</OneSpec>
									<OneSpec>
										<div>Civilité:</div>
										<input type="text" />
									</OneSpec>
									<OneSpec>
										<div>Address email:</div>
										<input
											type="text"
											placeholder="xyz@mail.com"
										/>
									</OneSpec>
									<OneSpec>
										<div>Code postal:</div>
										<input type="text" />
									</OneSpec>
								</SpecsColumn>
								<SpecsColumn>
									<OneSpec>
										<div>Prenom:</div>
										<input type="text" />
									</OneSpec>
									<OneSpec>
										<div>Tél:</div>
										<input type="text" placeholder="+32" />
									</OneSpec>
									<OneSpec>
										<div>Address:</div>
										<input type="text" placeholder="Rue" />
									</OneSpec>
									<OneSpec className="selectStyle">
										<div>Ville:</div>
										<select>
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
										<Form>
											<div className="add__detail__cars">
												<div className="add__photo__cars">
													<p></p>
													<input
														type="file"
														accept="image/gif , image/png , image/jpeg"
														name="image"
														id="file"
														multiple
														onChange={handleImage}
													/>
													<label htmlFor="file">
														<span>
															Ajouter les photos
														</span>
													</label>
												</div>
											</div>
											<div className="identite_photo">
												{identityImage.map((x) => {
													// console.log(<img className="cars__photo" alt="cars" src={x} />);
													return (
														<div
															key={x}
															className="identite__photo"
														>
															<img
																className="cars__photo"
																alt="cars"
																src={x}
															/>
															<button
																className="remove__photo__cars"
																onClick={() => {
																	removeImage(
																		x
																	);
																}}
																value={x}
															>
																Retirer
															</button>
														</div>
													);
												})}
											</div>
										</Form>
									</div>
									<div>
										Photo du permis de conduire
										<br />
										(Recto & Verso)
									</div>
									<div>
										<Form>
											<div className="add__detail__cars">
												<div className="add__photo__cars">
													<p></p>
													<input
														type="file"
														accept="image/gif , image/png , image/jpeg"
														name="image"
														id="file"
														multiple
														onChange={handleImagePermis}
													/>
													<label htmlFor="file">
														<span>
															Ajouter les photos
														</span>
													</label>
												</div>
											</div>
											<div className="permis_photo">
												{permisImage.map((x) => {
													// console.log(<img className="cars__photo" alt="cars" src={x} />);
													return (
														<div
															key={x}
															className="container__photo"
														>
															<img
																className="cars__photo"
																alt="cars"
																src={x}
															/>
															<button
																className="remove__photo__cars"
																onClick={() => {
																	removeImage(
																		x
																	);
																}}
																value={x}
															>
																Retirer
															</button>
														</div>
													);
												})}
											</div>
										</Form>
									</div>
								</Specs>
								<Specs>
								</Specs>
							</DetailTable>
						</Info>
					</Detail>
					<Buttons>
						<button className="__button__blue">Soumission</button>
					</Buttons>
				</Test>
			</Content>
			{popUp ? (
				<Popup>
					<Message>
						<div>
							Les données de la nouvelle voiture on été envoyées à
							la DB.
						</div>
						<img src="./images/validation.svg" alt="validé" />
						<Link to="/cars" className="__button">
							<button
								onClick={() => {
									localStorage.setItem("popup", false);
									setPopUp(false);
								}}
								to="/cars"
							>
								OK
							</button>
						</Link>
					</Message>
				</Popup>
			) : (
				""
			)}
		</Container>
	);
};
const Container = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	top: 0;
	display: flex;
	justify-content: center;
	background-image: url("./images/car_2.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;
const Content = styled.div`
	/* border : solid red 1px ; */
	width: 70%;
	@media (max-width: 768px) {
		width: 85%;
	}
	margin: 0 auto;
	margin-top: 100px;
	padding: 5px;
`;
const Form = styled.form`
	/* height: 100vh; */
	border-radius: 3px 3px 0 0;
	legend {
		font-size: 1.2em;
		font-weight: normal;
		padding: 5px;
		background-color: #00a9ff;
	}
	.add__detail__cars,
	.add__detail__cars__ {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px 0;
		padding: 0 10px;
		/* border: solid blue 1px; */
		/* select {
			width: 76.8%;
		} */
		#file {
			display: none;
		}
		.add__photo__cars {
			span {
				padding: 10px;
				border-radius: 3px;
				cursor: pointer;
				background-color: #00a9ff;
				display: in-line;
			}
		}
		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 80%;
			/* border: solid red 1px; */
			input,
			textarea {
				-ms-box-sizing: content-box;
				-moz-box-sizing: content-box;
				-webkit-box-sizing: content-box;
				box-sizing: content-box;
				width: 90%;
				padding: 8px;
				border: solid #00a9ff 1px;
				border-radius: 5px;
				outline: none;
				font-size: 15px;
				font-family: "Roboto";
				&:focus {
					box-shadow: 2px 2px 12px #00a9ff;
				}
			}
			p {
				color: red;
				font-weight: bold;
			}
		}
		.add__detail__cars__checkbox {
			/* border: solid red 1px; */
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 80%;
			p {
				color: red;
				font-weight: bold;
			}
			div {
				width: 10%;
			}
		}
		.add__detail__cars__select {
			appearance: none;
			-ms-box-sizing: content-box;
			-moz-box-sizing: content-box;
			-webkit-box-sizing: content-box;
			box-sizing: content-box;
			width: 90%;
			padding: 8px;
			border: solid #00a9ff 1px;
			border-radius: 5px;
			outline: none;
			font-size: 15px;
			font-family: "Roboto";
			background-image: url("./images/arrow.svg");
			background-repeat: no-repeat;
			background-position: 98.5%;
			background-size: 1.8%;
			cursor: pointer;
			&:focus {
				box-shadow: 2px 2px 12px #00a9ff;
				border-radius: 5px 5px 0px 0px;
			}
		}
		span {
			width: 24vh;
			text-align: left;
			padding-left: 10px;
		}
	}
	.identite_photo {
		/* border: solid red 1px; */
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		padding: 5px;
		.identite__photo {
			/* border: solid red 1px; */
			justify-self: center;
			align-self: center;
			width: 400%;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 5px;
			.cars__photo {
				/* border : solid red 1px; */
				/* padding: 5px; */
				max-width: 100%;
				height: auto;
				object-fit: content;
				border-radius: 3px;
				margin: 5px;
			}
			.remove__photo__cars {
				border: 1px solid #ed1b0d;
				margin-top: 15px;
				padding: 5px 10px;
				transition-duration: 0.5s;
				background-color: #fa5e5e;
				border-radius: 3px;
				&:hover {
					background-color: #ed1b0d;
				}
			}
		}
	}
	.permis_photo {
		/* border: solid red 1px; */
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		padding: 5px;
		.container__photo {
			/* border: solid red 1px; */
			justify-self: center;
			align-self: center;
			width: 300%;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 5px;
			.cars__photo {
				/* border : solid red 1px; */
				/* padding: 5px; */
				max-width: 100%;
				height: auto;
				object-fit: content;
				border-radius: 3px;
				margin: 5px;
			}
			.remove__photo__cars {
				border: 1px solid #ed1b0d;
				margin-top: 15px;
				padding: 5px 10px;
				transition-duration: 0.5s;
				background-color: #fa5e5e;
				border-radius: 3px;
				&:hover {
					background-color: #ed1b0d;
				}
			}
		}
	}
	.submit__detail__cars {
		display: flex;
		justify-content: flex-end;
		padding: 10px;
		button {
			padding: 5px 10px;
			font-size: 1em;
			cursor: pointer;
			border: solid #00a9ff 1px;
			border-radius: 5px;
			outline: none;
			background-color: #00a9ff;
		}
	}
	.submit__value__uncompleted {
		display: flex;
		margin: 1vh 2vh 2vh 2vh;
		justify-content: center;
		p {
			text-align: center;
			font-weight: bold;
			color: red;
			border-bottom: 1px solid red;
		}
	}
`;

const Popup = styled.div`
	position: absolute;
	min-width: 100%;
	min-height: 100vh;
	top: 0%;
	left: 0%;
	z-index: 101;
	background-color: rgb(189, 189, 189, 0.5);
	display: flex;
	justify-content: center;
`;

const Message = styled.div`
	margin: 28vh;
	z-index: 102;
	display: flex;
	position: fixed;
	flex-direction: column;
	justify-content: flex-start;
	align-content: center;
	align-items: center;
	width: 70vh;
	height: 35vh;
	border: 1px solid #00a9ff;
	border-radius: 3px;
	background-color: rgb(255, 255, 255, 0.9);
	div {
		padding: 3vh 2vh 2vh 2vh;
		font-size: 18px;
	}
	img {
		transform: rotate(9deg);
		object-fit: content;
		opacity: 1;
		width: auto;
		height: 32%;
		object-fit: content;
	}
	.__button {
		display: flex;
		text-decoration: none;
		width: 20%;
	}
	button {
		font-size: 3vh;
		color: #333333;
		background-color: rgb(0, 169, 255, 0.8);
		border: 1px solid #00486d;
		border-radius: 5px;
		width: 100%;
		height: auto;
		padding: 1vh;
		margin: 5vh 1vh 1vh 1vh;
		cursor: pointer;
	}
	button:hover {
		color: white;
		background-color: #0078b5;
		border: 1px solid #00a9ff;
	}
	button:active {
		transform: scale(0.95);
	}
`;
const Test = styled.div`
	border: 0.5px solid black;
	border-radius: 5px;
	border-style: none;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	background-color: rgb(245, 245, 245, 0.95);
	display: flex;
	flex-direction: column;
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
	margin: 2vh 2vh 2vh 2vh;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
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
		display: flex;
		margin-right: 5px;
		font-size: 1.2vw;
	}
	input[type="text"],
	[type="number"] {
		border-top-color: initial;
    border-right-color: initial;
    border-left-color: initial;
    border-bottom-color: rgb(100, 93, 82);
    outline-color: initial;
	border: none;
    border-bottom: 1px solid #797979;
    border-radius: 0.5vh;
    height: 40%;
    font-size: 16px;
    outline: none;
    padding: 5px;
	flex-grow: 1;
		//background: none;
		// border: none;
		// border-bottom: solid 1px #00a9ff;
		font-size: 1vw;
		letter-spacing: 2px;
		margin: 0em 0.8em 2.975em 0;
		padding: 0 0 0 0;
		text-align: left;
		//outline: none;
		// ::placeholder {
		// 	font-size: 1vw;
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
	/* color: #00a9ff; */
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
const ButtonPhoto = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
	padding: 0 10px;
	padding: 10px;
	border-radius: 3px;
	cursor: pointer;
	background-color: #00a9ff;
	color: black;
	#file {
		display: none;
	}
	// 		input {
	// 				-ms-box-sizing: content-box;
	// 				-moz-box-sizing: content-box;
	// 				-webkit-box-sizing: content-box;
	// 				box-sizing: content-box;
	// 				width: 90%;
	// 				padding: 8px;
	// 				border: solid #00a9ff 1px;
	// 				border-radius: 5px;
	// 				outline: none;
	// 				font-size: 15px;
	// 				font-family: "Roboto";
	// 				&:focus {
	// 					box-shadow: 2px 2px 12px #00a9ff;
	// 				}
	// 			}
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
const mapStateToProps = (state) => {
	return {
		//recuperation des propriétés nécessaires
	};
};
const mapStateToDispatch = (dispatch) => {
	return {
		//property est un objet contenant les propriétés du véhicule
		addCars: (property) => dispatch(addCarsProperty(property)),
	};
};
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(FormIdentities);
