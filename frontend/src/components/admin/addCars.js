import React, { useState } from "react";
import { addCarsProperty } from "../../action/carAction";
import { connect } from "react-redux";
import Header from "../header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const AddCars = (props) => {
	// Ceci est une fonction de type composant React pour la page AddCars.
	// PRE: -
	// POST: retourne la page ajouter voiture pour qu'elle soit affichée.

	// Voici tous les hooks de la page.
	// C'est dans ces derniers que l'on va stocker toutes les valeurs des champs, à chaque changement pour ces derniers.
	const [name, setName] = useState("RS3 Gris-Nardo");
	const [image, setImage] = useState([]);
	const [brand, setBrand] = useState("Audi");
	const [model, setModel] = useState("RS 3");
	const [color, setColor] = useState("Gris Nardo");
	const [doors, setDoors] = useState(5);
	const [bootSize, setBootSize] = useState(143);
	const [energy, setEnergy] = useState("Essence");
	const [passengers, setPassenger] = useState(5);
	const [type, setType] = useState("Berline");
	const [price, setPrice] = useState(290);
	const [description, setDescription] = useState("");
	const [airCondition, setAirCondition] = useState(true);
	const [isAutomatic, setIsAutomatic] = useState(true);
	const [isAvailable, setIsAvailable] = useState(true);

	// Dans se hooks, on stocke les url des images qui sont ajoutées par l'administrateur.
	const [urlImage, setUrlImage] = useState([]);

	// Ce hooks est utilisé pour l'affichage du popUp lorsqu'une voiture est ajoutée.
	const [popUp, setPopUp] = useState(
		localStorage.getItem("popup", true) === "true"
	);

	const removeImage = (e) => {
		// Cette fonction permet d'enlever une image de la liste de celles actuellement ajoutées par l'administrateur.
		// PRE: Récupère la liste des images.
		// POST: Supprime l'image de la liste.
		setImage(image.filter((x) => x !== e));
	};

	const handleImage = (e) => {
		// Cette fonction est appellée lorqu'une image est ajoutée.
		// PRE: Récupère la liste des url des images.
		// POST: Rajoute l'url de l'image qui a été ajoutée par l'administrateur dans la liste des images.
		const url = e.target.files[0];
		if (!image) return;
		setImage([...image, URL.createObjectURL(url)]);
		setUrlImage([...urlImage, url]);
	};

	const handeSubmit = (e) => {
		// Cette fonction est exécutée à chaque fois que le bouton "envoyer" est cliqué
		// PRE: Récupère les valeurs des champs du formulaire.
		// POST: Si aucune erreur n'est générée, elle envoie les données à la db pour ajouter la voiture.
		e.preventDefault();

		// Cette boucle permet de supprimer tous les messages d'erreur précédents.
		for (
			let i = 0;
			i < document.getElementsByClassName("add__detail__cars").length;
			i++
		) {
			let div = document.getElementsByClassName("add__detail__cars")[i];
			let input_div = div.childNodes[1].childNodes;
			if (input_div[0].innerHTML) input_div[0].innerHTML = "";
		}

		// Ici on stocke toutes les valeurs des hooks (et donc des champs) dans un objet.
		//Si tous les tests de vérification passent, c'est cet objet qui sera envoyé avec la requête POST cars
		const carProperty = {
			name,
			description,
			brand,
			model,
			color,
			doors,
			bootSize,
			energy,
			passengers,
			type,
			price,
			airCondition,
			isAutomatic,
			isAvailable,
			image: urlImage,
		};

		// Ici on vérifie que chaque champ a été compléter, si ce n'est pas le cas, on qui la fonction handeSubmit() et on affiche un message d'erreur au niveau du champ concerné
		for (
			let i = 0;
			i < document.getElementsByClassName("add__detail__cars").length;
			i++
		) {
			let div = document.getElementsByClassName("add__detail__cars")[i];
			let input_div = div.childNodes[1].childNodes;

			//Plus besoin de input_div != 0 car si la valeur est égale à 0 cela ne respecte pas la condition
			if (!input_div[1].value || input_div[1].value === "0") {
				input_div[0].innerHTML = "Veuillez compléter ce champ";
				return;
			}
		}

		// Ici on va mettre la valeur du popUp à true dans le localStorage, pour pouvoir l'affichée après le rechargement de la page.

		// C'est ici que l'on va envoyer les données à la DB. Le lien est fait avec REDUX.
		props.addCars(carProperty);
		// window.location.reload();
		localStorage.setItem("popup", !popUp);
		setPopUp(localStorage.getItem("popup"));

		setTimeout(() => {
			window.location.reload();
		}, 3000);
	};

	// structure de la page addCars
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<legend>Ajouter une voiture</legend>
					<div className="add__detail__cars">
						<span>Nom</span>
						<div>
							<p></p>
							<input
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Marque</span>
						<div>
							<p></p>
							<input
								type="text"
								value={brand}
								onChange={(e) => {
									setBrand(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Modèle</span>
						<div>
							<p></p>
							<input
								type="text"
								value={model}
								onChange={(e) => {
									setModel(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Couleur</span>
						<div>
							<p></p>
							<input
								type="text"
								value={color}
								onChange={(e) => {
									setColor(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Nombre de porte </span>
						<div>
							<p></p>
							<input
								type="number"
								value={doors}
								onChange={(e) => {
									setDoors(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Taille du coffre (L)</span>
						<div>
							<p></p>
							<input
								type="number"
								value={bootSize}
								onChange={(e) => {
									setBootSize(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Energie</span>
						<div>
							<p></p>
							<select
								className="add__detail__cars__select"
								value={energy}
								onChange={(e) => {
									setEnergy(e.target.value);
								}}
							>
								<option value="Essence">Essence</option>
								<option value="Diesel">Diesel</option>
								<option value="Electrique">Électrique</option>
								<option value="Hybride">Hybride</option>
								<option value="LPG">LPG</option>
								<option value="CNG">CNG</option>
							</select>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Nombre de place</span>
						<div>
							<p></p>
							<input
								type="number"
								placeholder="4"
								value={passengers}
								onChange={(e) => {
									setPassenger(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Type</span>
						<div>
							<p></p>
							<select
								className="add__detail__cars__select"
								value={type}
								onChange={(e) => {
									setType(e.target.value);
								}}
							>
								<option value="Berline">Berline</option>
								<option value="Sportive">Sportive</option>
								<option value="Break">Break</option>
								<option value="Coupe">Coupe</option>
								<option value="Cabriolet">Cabriolet</option>
								<option value="Monospace">Monospace</option>
								<option value="SUV">SUV</option>
								<option value="4x4">4x4</option>
								<option value="Fourgonnette">
									Fourgonnette
								</option>
							</select>
						</div>
					</div>
					<div className="add__detail__cars__">
						<span>Automatique</span>
						<div className="add__detail__cars__checkbox">
							<div>
								<Checkbox
									checked={isAutomatic}
									onChange={() => {
										setIsAutomatic(!isAutomatic);
									}}
									disableRipple={true}
									sx={{
										"& .MuiSvgIcon-root": { fontSize: 25 },
									}}
								/>
							</div>
						</div>
					</div>
					<div className="add__detail__cars__">
						<span>Air Conditionné</span>

						<div className="add__detail__cars__checkbox">
							<div>
								<Checkbox
									checked={airCondition}
									onChange={() => {
										setAirCondition(!airCondition);
									}}
									disableRipple={true}
									sx={{
										"& .MuiSvgIcon-root": { fontSize: 25 },
									}}
								/>
							</div>
						</div>
					</div>
					<div className="add__detail__cars__">
						<span>Disponible</span>

						<div className="add__detail__cars__checkbox">
							<div>
								<Checkbox
									checked={isAvailable}
									onChange={() => {
										setIsAvailable(!isAvailable);
									}}
									disableRipple={true}
									sx={{
										"& .MuiSvgIcon-root": { fontSize: 25 },
									}}
								/>
							</div>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Prix</span>
						<div>
							<p></p>
							<input
								type="number"
								placeholder="500€"
								value={price}
								onChange={(e) => {
									setPrice(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Description</span>
						<div>
							<p></p>
							<textarea
								placeholder="Déscription de la voiture..."
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Image</span>
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
								<span>Ajouter des Images</span>
							</label>
						</div>
					</div>
					<div className="photo__cars">
						{image.map((x) => {
							return (
								<div key={x} className="container__photo">
									<img
										className="cars__photo"
										alt="cars"
										src={x}
									/>
									<button
										className="remove__photo__cars"
										onClick={() => {
											removeImage(x);
										}}
										type="button"
										value={x}
									>
										Retirer
									</button>
								</div>
							);
						})}
					</div>
					<div className="submit__detail__cars">
						<button
							onClick={(e) => {
								handeSubmit(e);
							}}
						>
							Envoyer
						</button>
					</div>
				</Form>
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
	max-width: 1600px;
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
	border: solid #00a9ff 0.5px;
	background-color: rgb(245, 245, 245, 0.95);
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
			width: 90%;
			span {
				padding: 10px;
				border-radius: 3px;
				cursor: pointer;
				background-color: #00a9ff;
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
	.photo__cars {
		/* border: solid red 1px; */
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		padding: 5px;
		.container__photo {
			/* border: solid red 1px; */
			justify-self: center;
			align-self: center;
			width: 100%;
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

/**
 * Récupère les informations de l'état dont la page à besoin
 *
 * @param {Object} state object
 * @returns {Object} object
 */
const mapStateToProps = (state) => {
	return {
		//recuperation des propriétés nécessaires
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
		//payload est un objet contenant les propriétés du véhicule
		addCars: (payload) => dispatch(addCarsProperty(payload)),
	};
};

//connecter l'état aux actions pour observer les changements
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(AddCars);
