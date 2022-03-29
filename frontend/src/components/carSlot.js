import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CarDetails from "./carDetails"

const CarSlot = (props) => {
	const handleDetail = ()=>{

	}
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
						<div>

							<button class="details__button" onClick={(e)=>{handleDetail()}}>Détails</button>

						</div>
						
						<Link to="/">
							<button class="modify__button">Modifier</button>
						</Link>
						<div className="car__detail" style={{display : "none"}}>
							<CarDetails/>
						</div>
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
		object-fit: content;
	}
	@media(max-width : 1200px){
		img{
			width : 27vh
		}
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
        padding: 6px;
        margin: 5px 0 5px 0;
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
	.car__detail{
		position: absolute;
		min-width: 100%;
		min-height: 138%;
		top: 0;
		left: 0;
		z-index: 101;
		background-color: rgb(189, 189, 189, 0.5);
		/* display: flex;
		justify-content: center; */
	}
}
`;

export default CarSlot;
