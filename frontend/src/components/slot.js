import React, { useState } from "react";

// import "rsuite/dist/rsuite.min.css";
// import { Calendar } from "rsuite";
import styled from "styled-components";

function Slot() {
	const [startDate, setStartDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endDate, setEndDate] = useState("");
	const [endTime, setEndTime] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		//TODO verifier les informations du formulaire
		//TODO rechercher comment bloquer les anciennes date du calendrier
	};
	return (
		<Container>
			<Content>
				<Head>Louer</Head>
				<Form>
					<legend>Choisissez une date</legend>
					<StartDate>
						<p>Du</p>
						<input type="date" onChange={(e) => {}} />
						<input type="time" onChange={(e) => {}} />
					</StartDate>
					<EndDate>
						<p>Au </p>
						<input type="date" onChange={(e) => {}} />
						<input type="time" onChange={(e) => {}} />
					</EndDate>
					<button
						onClick={() => {
							/**Verifier les données du formulaire */
						}}
					>
						Valider
					</button>
				</Form>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	display: flex;
	position: relative;
	top: 60px;
	margin: auto;
	margin-top: 35px;
	height: 150px;
	width: 950px;
	@media (max-width: 1000px) {
		width: 600px;
	}
`;
const Content = styled.div`
	border: solid black 1px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 100%;
`;
const Head = styled.div`
	/* border: solid black 1px; */
	border-radius: 5px 0 5px 0;
	display: flex;
	justify-content: center;
	text-align: center;
	font-size: 1.25em;
	background-color: #00a9ff;
	width: 200px;
	height: 30px;
	padding: 8px;
`;
const Form = styled.form`
	/* border: solid red 1px; */
	margin-top: 15px;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	legend {
		/* border: solid red 1px; */
		width: 200px;
	}
	input {
		font-size: 1.25em;
		border: none;
		background-color: #f3f3f3;
		padding: 5px;
		@media (min-width: 1000px) {
			margin-left: 10px;
		}
	}
	button {
		margin-left: 10px;
		background-color: #00a9f0;
		border-radius: 3px;
		border: none;
		font-size: 1em;
		padding: 5px;
		cursor: pointer;
		&:hover {
			background-color: #00a9ff;
		}
	}
`;
const StartDate = styled.div`
	/* border: solid black 1px; */
	display: flex;
	align-items: center;
	text-align: center;
	margin-left: 20px;
	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;
const EndDate = styled(StartDate)`
	/* border: solid red 1px; */
	padding: 5px;
`;
const Date = styled.div`
	/* border: solid black 1px; */
	/* display: inline-block; */
	position: absolute;
	width: 280px;
	display: none;
	/* height : 2; */
`;

export default Slot;
