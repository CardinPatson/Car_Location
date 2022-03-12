import React from "react";
import Header from "./header";
import Slot from "./slot";
import styled from "styled-components";

function Home() {
	return (
		<Container>
			<Header />
			<Content>
				<Slot />
				<Banner>
					<img src="./images/car_1.jpg" />
				</Banner>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	max-width: 1300px;
	margin: 0 auto;
`;
const Content = styled.div`
	/* border: solid red 1px; */
`;
const Banner = styled.div`
	/* border: solid red 1px; */
	margin-top: 80px;
	background: #f5f5f5;
	width: 100%;

	img {
		width: 90%;
		object-fit: content;
	}
`;

export default Home;
