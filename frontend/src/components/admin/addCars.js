import React from "react";
import Header from "../header";
import styled from "styled-components";
function AddCars() {
	return (
		<Container>
			<Header />
			<Content>
				<Form>
					<legend>Add Cars</legend>
					<div className="add__detail__cars">
						<span>Marque</span>
						{/* RECUPERER LES DIFFERENTES MARQUES DE VOITURE DANS LA DB */}
						<select>
							<option selected>Mercedes</option>
							<option></option>
							<option></option>
						</select>
					</div>
					<div className="add__detail__cars">
						<span>Modèle</span>
						{/* RECUPERER LES DIFFERENTS MODELES DE VOITURE DANS LA DB */}
						<select>
							<option selected>1981</option>
							<option></option>
							<option></option>
						</select>
					</div>
					<div className="add__detail__cars">
						<span>Couleur</span>
						<input type="text" placeholder="rouge" />
					</div>
					<div className="add__detail__cars">
						<span>Nombre de porte </span>
						<input type="number" placeholder="5" />
					</div>
					<div className="add__detail__cars">
						<span>Taille du coffre</span>
						<input type="number" placeholder="120kg" />
					</div>
					<div className="add__detail__cars">
						<span>Energie</span>
						<input type="text" placeholder="Essence" />
					</div>
					<div className="add__detail__cars">
						<span>Transmission</span>
						<input type="text" />
					</div>
					<div className="add__detail__cars">
						<span>Nombre de place</span>
						<input type="number" placeholder="4" />
					</div>
					<div className="add__detail__cars">
						<span>Type</span>
						<input type="text" />
					</div>
					<div className="add__detail__cars">
						<span>Automatique</span>
						<select>
							<option value="true" selected>
								Vrai
							</option>
							<option>Faux</option>
						</select>
					</div>
					<div className="add__detail__cars">
						<span>Air Conditionné</span>
						<select>
							<option value="true" selected>
								Vrai
							</option>
							<option>Faux</option>
						</select>
					</div>
					<div className="add__detail__cars">
						<span>Prix</span>
						<input type="number" placeholder="500€" />
					</div>
					<div className="add__detail__cars">
						<span>Photo</span>
						<div className="add__photo__cars">
							<input
								type="file"
								accept="image/gif , image/png , image/jpeg"
								name="image"
								id="file"
								placeholder="Cliquez pour selectionner des photos"
							/>
							<label htmlFor="file">
								<span>Ajouter des Photos</span>
							</label>
						</div>
					</div>
					<div className="submit__detail__cars">
						<button>Envoyer</button>
					</div>
				</Form>
			</Content>
		</Container>
	);
}
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
		select {
			width: 81.5%;
		}
		#file {
			display: none;
		}
		.add__photo__cars {
			width: 100%;
			span {
				padding: 10px;
				border-radius: 3px;
				cursor: pointer;
				background-color: #00a9ff;
			}
		}
	}
	input,
	select {
		width: 80%;
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
`;
export default AddCars;
