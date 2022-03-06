import React from "react";
import Header from "./header";
import styled from "styled-components";
import Connexion from "./connexion"
import Register from "./register";

function Connreg(){
    return (
        <Container>
            <Header/>
            <Content>
                <Connexion/>
                <Register/>
            </Content>
        </Container>
    );
}

const Container = styled.div``;
const Content = styled.div`
    display: flex;
    justify-content: center;
    gap: 8vh;
`;

export default Connreg;