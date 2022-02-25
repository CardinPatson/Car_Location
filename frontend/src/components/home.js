import React from "react";
import Header from "./header";
import Slot from "./slot";
import styled from "styled-components";
function Home() {
	return (
		<Container>
			<Header />
			<Slot />
		</Container>
	);
}

const Container = styled.div``;
export default Home;
