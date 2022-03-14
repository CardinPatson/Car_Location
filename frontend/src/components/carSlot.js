import React from 'react'
import styled from "styled-components";

function CarSlot () {
  return (
    <Container>
        <Content>
            <Pic>
                <img src="./images/car_3.jpg" />
            </Pic>
            <Info>
                <Name>Audi A4</Name>
                <Specs>
                    <div>Type</div>
                    <p>Sportive</p>
                    <div>Énergie</div>
                    <p>Électrique</p>
                    <div>Places</div>
                    <p>4</p>
                    <div>Automatique</div>
                    <p>Oui</p>
                </Specs>
            </Info>
            <Price>
                <Amount>
                    <p>Prix</p> 
                    <div>/jour</div>
                </Amount>
                <button>Détails</button>
            </Price>
        </Content>
    </Container>
  )
}



const Container = styled.div`
    margin: 5vh;
`;  

const Content = styled.div`
    border: 1px solid #00a9ff;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    box-shadow: 0 0 1px black;
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
    align-content: center;
    align-items: center;
    flex-grow: 2;
    button {
        font-size: 3vh;
        color: #333333;
        background-color: #00A9FF;
        border: 1.5px solid #00486D;
        border-radius: 10px;
        width 40%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
        box-shadow: 0 0 1px black;
    }
    button:hover{
        color: white;
        border: 1.5px solid #00A9FF;
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


export default CarSlot