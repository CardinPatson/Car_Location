import React from 'react'
import Header from './header'
import styled from "styled-components";


function Car_reservation(){
  return (
    <Container>
        <Header/>
        <Content>
            <Detail>
                    <Photo>
                        <img src="./images/car_3.jpg" />
                    </Photo>
                    <Name>Nom de la voiture</Name>
                    <Type>Type</Type>
                    <Ligne>
                        <div></div>
                    </Ligne>
                    <Specs>
                        <div>Nombre de portes</div>
                        <p id="">42</p>
                        <div>Taille du coffre</div>
                        <p id="">57L</p>
                        <div>Energie</div>
                        <p id="">Eau</p>
                        <div>Transmission</div>
                        <p id="">pate</p>
                        <div>Nombre de places</div>
                        <p id="">78</p>
                        <div>Aire conditionnée</div>
                        <p id="">Peut-être</p>
                    </Specs>
            </Detail>

        </Content>
    </Container>
        
  );
}

const Container = styled.div`
	max-width: 1300px;
	margin: auto;
`;
const Content = styled.div`
	/* border: solid black 1px; */
	margin-top: 5vh;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	position: relative;
    top: 7vh;
`;

const Detail = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #00a9ff;
    border-radius: 1vh;
    box-shadow: 0 0 1px black;
    margin: 1vh 1vh 1vh 5vh;
`;

const Photo = styled.div`
    object-fit: content;
    img {
        width: 32vh;
        height: 20vh;
        margin: 3vh;
    }
`;

const Name = styled.div`
    font-size: 4vh;
    margin: 0vh 1vh 0vh 1vh; 
`;

const Type = styled.div`
    font-size: 2vh;
    margin: 1vh 1vh 1vh 1vh; 
    font-weight: bold;
`

const Ligne = styled.div`
    display: flex;
    justify-content: center;
    padding: 1vh 1vh 1vh 1vh; 
    div {
        border-top: 1px solid black;
        width: 70%;
    }
`;

const Specs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 80%; 
    padding-left: 20%; 
    padding-bottom: 2vh;
    div {
        text-align: left;
        padding: 1vh;
    }
    p {
        text-align: left;
        padding: 0vh 1vh 0vh 1vh;
        color: #00a9ff;
    }
`;

export default Car_reservation