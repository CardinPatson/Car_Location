import React from "react";
import Header from "./header";
import styled from "styled-components";
function Cars() {
	return (
		<Container>
			<Header />
			<Content>
				<Filter>left</Filter>
				<Available>right</Available>
			</Content>
		</Container>
	);
}

const Container = styled.div``;
const Content = styled.div`
	border: solid black 1px;
	margin-top: 70px;
	display: flex;
	flex-direction: row;
`;
const Filter = styled.div`
	border: solid red 1px;
	flex: 0.5;
	height: 100vh;
`;
const Available = styled.div`
	border: solid red 1px;
	flex: 1;
`;
export default Cars;
