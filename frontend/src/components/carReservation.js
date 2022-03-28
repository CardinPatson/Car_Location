import React from 'react'
import Header from './header'
import styled from "styled-components";


function CarReservation(){
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
            <Reservation>
                <Banner>Réservation de la voiture</Banner>
                <Information>
                    <Title>
                        <div>Résumé de la réservation</div>
                    </Title>
                    <Date>
                        <p>La voiture sera réservée pendant la période suivante:</p>
                        <div>
                            <p>Du</p>
                            <span>01/01/01</span>
                            <p>au</p>
                            <span>02/02/02</span>
                        </div>
                    </Date>
                    <Price>
                        <p>Le prix total de location sera:</p>
                        <div>
                            <p>Pour toute la durée:</p>
                            <span>1250€</span>
                        </div>
                        <div>
                            <p>Par jour:</p>
                            <span>70€</span>
                        </div>
                    </Price>
                    <Confirm>
                        <Check>
                            Je confirme vouloir louer cette voiture pendant la durée et pour le prix précisé.
                            <input type="checkbox"/>
                            <span></span>
                        </Check>
                        <button>Confirmer la location</button>
                    </Confirm>
                </Information>
            </Reservation>
        </Content>
    </Container>
        
  );
}

const Container = styled.div`
	max-width: 1300px;
	margin: auto;
    display: flex;
	justify-content: center;
`;
const Content = styled.div`
	/* border: solid black 1px; */
	margin-top: 5vh;
	display: flex;
	flex-direction: row;
    gap: 5vh;
	justify-content: flex-start;
	position: relative;
    top: 7vh;
`;

const Detail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #00a9ff;
    border-radius: 1vh;
    box-shadow: 0 0 1px black;
    margin: 1vh 1vh 1vh 5vh;
    width: 30%;
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
    width: 70%;
    div {
        border-top: 1px solid black;
        width: 70%;
    }
`;

const Specs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    max-width: 80%; 
    padding-bottom: 2vh;
    div {
        text-align: left;
        padding: 1vh;
        font-weight: bold;
    }
    p {
        text-align: left;
        padding: 0vh 1vh 0vh 1vh;
        color: #00a9ff;
    }
`;

const Reservation = styled.div`
    display: flex;
    border: 1px solid #00a9ff;
    flex-direction: column;
    margin: 1vh 1vh 1vh 1vh;
    box-shadow: 0 0 1px black;
    width: 70%; 
`;

const Banner = styled.div`
    padding: 1vh 1vh 1vh 1vh;
    border-bottom: solid #797979 1px;
    background-color: #00A9FF;
    color: #333333;
    text-align: center;
    font-size: 3.6vh;
`;

const Information = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    margin: 2vh;
    padding: 0.5vh;
    justify-content: center;
    div {
        font-size: 2.8vh;
        text-align: center;
        border-bottom: 1px solid black;
    }
`;

const Date = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 2vh;
    margin: 2vh; 
    p {
        text-align: left;
    }
    div {
        display: flex;
        gap: 2vh;
        margin: 1.5vh 1vh 1vh 2.5vh;
        align-items: center;
        font-size: 1.8vh;
        span {
            border: 2px solid #00a9ff;
            padding: 0.5vh;
            border-radius: 0.5vh;
        }
        p {
            font-weight: bold;
        }
    }
`;

const Price = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 2vh;
    margin: 2vh; 
    margin-top: 1vh;
    p {
        text-align: left;
    }
    div {
        display: flex;
        gap: 2vh;
        margin: 1.5vh 1vh 0vh 2.5vh;
        align-items: center;
        font-size: 1.8vh;
        span {
            border-bottom: 1px solid black;
        }
        p {
            font-weight: bold;
        }
    }
`;

const Confirm = styled.div`
    display: flex;
    margin: 4vh;
    flex-direction: column;
    align-items: center;
    button {
        font-size: 3vh;
        color: #333333;
        background-color: #00A9FF;
        border: 1.5px solid #00486D;
        border-radius: 1vh;
        width 40%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
        box-shadow: 0 0 1px black;
    }
    button:hover{
        color: white;
        background-color: #0078B5;
        border: 1.5px solid #00A9FF;
    }
    button:active {
        transform: scale(0.95);
    }
`

const Check = styled.label`
    display: block;
    position: relative;
    padding-left: 4vh;
    cursor: pointer;
    font-size: 2vh;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    top: 0%;
    left: 0%;
    height:5vh;
    color: #00a9ff;
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    span {
        position: absolute;
        top: 0px;
        left: 5px;
        height: 20px;
        width: 20px;
        background-color: white;
        border: 1px solid grey;
        border-radius: 15px;
    }
    &:hover input ~ span {
        background-color: #eee;
    }
    & input:checked ~ span {
        background-color: #2196F3;
    }
    span:after {
        content: "";
        position: absolute;
        display: none;
    }
    & input:checked ~ span:after {
        display: block;
    }
    & span:after {
        left: 6.5px;
        top: 2.8px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

export default CarReservation