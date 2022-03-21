import React, { useState } from "react";
import { addCarsProperty } from "../../action/carAction";
import { connect } from "react-redux";
import Header from "../header";
import styled from "styled-components";



const AddCars = (props) => {
	const [name, setName] = useState("");
	const [image, setImage] = useState([]);
	const [brand, setBrand] = useState("Mercedes");
	const [model, setModel] = useState("Classe A");
	const [color, setColor] = useState("Rouge");
	const [doors, setDoors] = useState(0);
	const [bootSize, setBootSize] = useState(0);
	const [energy, setEnergy] = useState("Essence");
	const [passengers, setPassenger] = useState(0);
	const [type, setType] = useState("SUV");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [airCondition, setAirCondition] = useState(true);
	const [isAutomatic, setIsAutomatic] = useState(true);
	const [urlImage, setUrlImage] = useState([]);
	const removeImage = (e) => {
		e.preventDefault();
		e.stopPropagation();
  		e.nativeEvent.stopImmediatePropagation();
	};

	const handleImage = (e) => {
		const url = e.target.files[0];
		console.log(url);
		if (!image) return;
		setImage([...image, URL.createObjectURL(url)]);
		setUrlImage([...urlImage, url]);
	};

	const handeSubmit = (e) => {
		//TODO Les verifications des champ du formulaire doivent être faite avant insertion
		e.preventDefault();

		//supprime tous les messages d'erreur précédent
		for (
			let i = 0;
			i < document.getElementsByClassName("add__detail__cars").length;
			i++
		) {
			let div = document.getElementsByClassName("add__detail__cars")[i];
			let input_div = div.childNodes[1].childNodes;
			if (input_div[0].innerHTML) input_div[0].innerHTML = "";
		}
		console.log(energy);
		console.log(e);
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
			image: urlImage,
		};
		// console.log(carProperty);
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
		props.addCars(carProperty);
		window.location.reload();
	};
	//INSERTION DE VOITURE DANS LA BASE DE DONNEES

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
									console.log(e.target.value);
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
							<input
								type="text"
								value={type}
								onChange={(e) => {
									setType(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Automatique</span>
						<div>
							<p></p>
							<select
								value={isAutomatic}
								onChange={(e) => {
									setIsAutomatic(e.target.value);
								}}
							>
								<option value="true">Vrai</option>
								<option>Faux</option>
							</select>
						</div>
					</div>
					<div className="add__detail__cars">
						<span>Air Conditionné</span>
						<div>
							<p></p>
							<select
								value={airCondition}
								onChange={(e) => {
									setAirCondition(e.target.value);
								}}
							>
								<option value="true">Vrai</option>
								<option>Faux</option>
							</select>
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
							// console.log(<img className="cars__photo" alt="cars" src={x} />);
							return (
								<div key={x} className="container__photo">
									<img className="cars__photo" alt="cars" src={x} />
									<button
										className="remove__photo__cars"
										onClick={() => {
											removeImage(x);
										}}
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
		</Container>
	);
};
const Container = styled.div`
	max-width: 1300px;
	margin: 0 auto;
`;
const Content = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	margin-top: 85px;
`;
const Form = styled.form`
	border: solid #00a9ff 1px;
	background-color: #f5f5f5;
	/* height: 100vh; */
	border-radius: 3px 3px 0 0;
	legend {
		font-size: 1.2em;
		font-weight: normal;
		padding: 5px;
		background-color: #00a9ff;
	}
	.add__detail__cars {
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
			select,
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
export default connector(AddCars);
