import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./header";
import styled from "styled-components";
import CarSlot from "./carSlot";
import { getCarsProperty, getCarsImages } from "../action/carAction";

function Cars(props) {
	useEffect(() => {
		props.getCars();
		props.getCarsImages();
	}, []);
	let carsImages = {};
	if (props.images && props.images.length) {
		for (let image of props.images) {
			console.log(image);
			if (image.id in carsImages) {
				carsImages[image.id].push(image.pic_name); //= [...carsImages[image.id], image.pic_name];
				continue;
			}
			carsImages[image.id] = [image.pic_name];
		}
	}
	return (
		<Container>
			<Content>
				<Header />

				<Filter
					onScroll={() => {
						window.scrollTo(0, 0);
					}}
				>
					<h2>Filtres</h2>
					<Price>
						<h5>Prix/jour</h5>
						<div>
							<span>Prix Min</span>
							<input
								type="range"
								min="200"
								max="400"
								// value="300"
								className="slider"
							/>
							<span>Prix Max</span>
						</div>
						<p>Valeur</p>
					</Price>
					<Brand>
						<h5>Marque et modèle</h5>
						<div>
							<select>
								<option value="Brand1">Marque 1</option>
								<option value="Brand2">Marque 2</option>
								<option value="Brand3">Marque 3</option>
							</select>
							<span>
								<span className="foo rectangle"></span>
								<span className="foo triangle-right"></span>
							</span>
							<select>
								<option value="Model">Modèle 1</option>
								<option value="Model 2">Modèle 2</option>
								<option value="Model 3">Modèle 3</option>
							</select>
						</div>
					</Brand>
					<Slot>
						<h5>Période de location</h5>
						<div className="slot__range">
							<div className="slot__time">
								<p>Du</p>
								<input type="date" onChange={(e) => {}} />
								<input type="time" onChange={(e) => {}} />
							</div>
							<div className="slot__time">
								<p>Au </p>
								<input type="date" onChange={(e) => {}} />
								<input type="time" onChange={(e) => {}} />
							</div>
						</div>
					</Slot>
					<button
						onClick={() => {
							/**Verifier les données du formulaire */
							// todo pour la date envoyer les données au composant slot
						}}
					>
						Valider
					</button>
				</Filter>
				<Available>
					<h2>Voitures disponibles</h2>

					<CarsPannel>
						{props.cars.map((car) => {
							return (
								<CarSlot key={car.id} car={car} images={carsImages[car.id]} />
							);
						})}
					</CarsPannel>
				</Available>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	max-width: 1500px;
	margin: 0 auto;
`;
const Content = styled.div`
	/* border: solid black 1px; */
	width: 100%;
	margin-top: 100px;
	display: flex;
	/* position : fixed ;  */
	flex-direction: row;
	justify-content: center;
	position: relative;
`;
const Filter = styled.div`
	border: solid #00a9ff 1px;
	/* PENSER A BLOQUER LE FILTRE LORS DU SCROLL */
	/* display: flex;
	flex-direction: column; */
	/* position: fixed;
	left: 20%; */
	flex: 0.3;
	overflow-y: hidden;
	margin-right: 15px;
	border-radius: 5px;
	box-shadow: 0 0 1px black;
	/* position: fixed; */

	h2,
	button {
		/* border: solid red 1px; */
		font-size: 1.3em;
		font-weight: normal;
		padding: 5px;
		background-color: #00a9ff;
	}
	button {
		width: 80%;
		font-size: 1em;
		border: none;
		border-radius: 5px;
		margin: 15px 0;
		padding: 8px;
		cursor: pointer;
		&:hover {
			color: white;
			background-color: #00b2f1;
		}
	}
`;
const Price = styled.div`
	h5 {
		padding: 15px 10px 15px 10px;
		font-size: 1.15em;
		font-weight: normal;
		background: #f3f3f3;
		margin-bottom: 30px;
	}
	div {
		/* border: solid red 1px; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px 0;
		width: 100%;
		span {
			padding: 3px;
		}
	}
	.slider {
		outline: none;
		opacity: 0.6;
		width: 60%;
		height: 3px;
		background: #d3d3d3;
		transition: opacity 0.2s;
		-webkit-transition: 0.2s;
	}
	.slider::-moz-range-thumb {
		cursor: pointer;
	}
	.slider::-webkit-slider-thumb {
		cursor: pointer;
	}
	.slider:hover {
		opacity: 0.8;
	}
	p {
		padding: 10px;
	}
	border-bottom: solid 1px rgba(0, 0, 0, 0.08);
`;
const Brand = styled(Price)`
	div {
		justify-content: space-around;
		margin-bottom: 20px;
		/* border: solid red 1px; */
		span {
			padding: 0;
		}
		.foo {
			display: inline-block;
			vertical-align: middle;
		}
		.rectangle {
			height: 3px;
			width: 20px;
			background-color: #555;
			@media (max-width: 768px) {
				height: 3px;
				width: 10px;
			}
		}

		.triangle-right {
			width: 0;
			height: 0;
			border-top: 5px solid transparent;
			border-left: 15px solid #555;
			border-bottom: 5px solid transparent;
			@media (max-width: 768px) {
				border-top: 1px solid transparent;
				border-left: 2px solid #555;
				border-bottom: 1px solid transparent;
			}
		}
	}
	select {
		border: solid #00a9ff 1px;
		padding: 8px;
		outline: none;
	}
`;
const Slot = styled(Brand)`
	.slot__range {
		padding: 0;
	}
	.slot__time {
		display: flex;
		flex-direction: column;
		input {
			background: #f3f3f3;
			border: solid #00a9ff 1px;
			font-family: "Roboto";
			padding: 5px;
			margin-bottom: 5px;
			width: 70%;
			border-radius: 5px;
		}
	}
`;

const Available = styled.div`
	/* border: solid red 1px; */
	flex: 0.65;
	border: solid #00a9ff 1px;
	border-radius: 5px;
	box-shadow: 0 0 1px black;
	h2,
	button {
		/* border: solid red 1px; */
		font-size: 1.3em;
		font-weight: normal;
		padding: 5px;
		background-color: #00a9ff;
	}
`;

const CarsPannel = styled.div`
	display: flex;
	flex-direction: column;
	height: 80vh;
	overflow-y: auto;
	scroll-behavior: smooth;
	overflow-x: hidden;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px #bfbfbf;
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb {
		background: #00a9ff;
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #0078b5;
	}
`;

const mapStateToProps = (state) => {
	return {
		cars: state.carState.cars,
		images: state.carState.images,
	};
};
const mapStateToDispatch = (dispatch) => {
	return {
		getCars: () => dispatch(getCarsProperty()),
		getCarsImages: () => dispatch(getCarsImages()),
	};
};
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(Cars);
