import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CarSlot = (props) => {

	return (
		<Container>
			<Content>
				<Pic>
					{props.images && props.images.length ? (
						<img src={props.images[0]} />
					) : (
						<img src="./images/car_3.jpg" />
					)}
				</Pic>
				<Info>
					<Name>{props.car.name}</Name>
					<Specs>
						<div>Type</div>
						<p>{props.car.type}</p>
						<div>Énergie</div>
						<p>{props.car.energy}</p>
						<div>Places</div>
						<p>{props.car.passengers}</p>
						<div>{props.car.is_automatic ? "Automatique" : "Manuelle"}</div>
					</Specs>
				</Info>
				<Price>
					<Amount>
						<p>{props.car.price}€</p>
						<div>/jour</div>
					</Amount>
					<Details>
						<Link to="/carDetails">
							<button class="details__button">
								Détails
							</button>
						</Link>
						<Link to="/">
							<button  class="modify__button">
								Modifier
							</button>
						</Link>
					</Details>
				</Price>
			</Content>
		</Container>
	);
};

const Container = styled.div`
	margin: 1vh;
`;

const Content = styled.div`
	border: 1px solid #00a9ff;
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	box-shadow: 0 0 1px black;
	background-color: white;
`;

const Pic = styled.div`
	margin: 2vh;
	display: flex;
	object-fit: content;
	align-items: center;
	img {
		width: 42vh;
		height: 25vh;
	}
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2vh;
	min-width: 25%;
`;

const Name = styled.div`
	font-size: 3.5vh;
	margin-bottom: 2vh;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	padding: 2px;
`;

const Specs = styled.div`
	text-align: left;
	margin-left: 2.5vh;
	div {
		font-size: 20px;
	}
	p {
		color: #00a9ff;
	}
`;

const Price = styled.div`
    padding: 2vh;
    display: flex;
    flex-direction: column;
    gap: 10%;
    align-items: center;
    flex-grow: 2;
    button {
        font-size: 1.25em;
        border-radius: 10px;
        width 80%;
        padding: 0.75vh;
        margin: 1vh 0vh 1vh 0vh;
        cursor: pointer;
        box-shadow: 0 0 1px black;
    }
    button:active {
        transform: scale(0.95);
    }
`;

const Amount = styled.div`
	padding-top: 2vh;
	display: flex;
	align-items: flex-end;
	p {
		font-weight: bold;
		font-size: 45px;
		color: #00a9f5;
	}
	div {
		display: flex;
		align-items: flex-end;
		font-weight: bold;
	}
`;

const Details = styled.div`
	margin 1vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0px;
	.details__button {
		color: #333333;
        background-color: #00A9FF;
        border: 1.5px solid #00486D;
	}
	.details__button:hover {
		color: white;
		border: 1.5px solid #00A9FF;
    }
	.modify__button {
		color: #333333;
        background-color: #c4c4c4;
        border: 1.5px solid #00486D;
	}
	.modify__button:hover {
		color: white;
		border: 1.5px solid white;
    }
}
`

export default CarSlot;
