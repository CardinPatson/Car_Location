import React from "react";
import Header from "./header";
import styled from "styled-components";

function CarDetails(props) {
  return (
    <Container>
      <Content>
        <Header/>
        <Test>
          <Banner>
            <span>Caractéristiques</span>
          </Banner>
          <Detail>
            <Info>
              <Name>
                <div>Nom de la voiture</div>
                <Line_right>
                  <div>
                    <p>Berline</p>
                  </div>
                </Line_right>
              </Name>
              <DetailTable>
                <Specs_left>
                  <div><img src="./images/icons/door.svg"/>4</div>
                  <div><img src="./images/icons/suitcase.svg"/>800L</div>
                  <div><img src="./images/icons/lightning.svg"/>Diesel</div>
                </Specs_left>
                <Ligne>
                  <div></div>
                </Ligne>
                <Specs_right>
                  <div>Transmission</div>
                  <p>Manuelle</p>
                  <div>Nombre de places</div>
                  <p>5</p>
                  <div>Aire conditionnée</div>
                  <p>Non</p>
                </Specs_right>
              </DetailTable>
            </Info>
            <Photo>
              <img src="./images/car_3.jpg" />
              <Price>
                <p>Prix€</p>
                <div>/jour</div>
              </Price>
              <Louer>
                <button>Louer</button>
              </Louer>
            </Photo>
          </Detail>
        </Test>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  top: 0;
  max-width: 1600px;
  margin: auto;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  margin-top: 100px;
`; 
    
const Test = styled.div`
  border: 1px solid black;
  background : white;
  display: flex;
  flex-direction: column;
`; 

const Banner = styled.div`
  font-size: 1.6em;
  text-align: left;
  background: #00a9f5;
  border: 1px black;
  padding: 6px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8%;
  /* //flex-grow: 1; */
  /*border-radius: 1vh; */
  /* box-shadow: 0 0 1px black; */
  margin: 1vh 1vh 1vh 5vh;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  /* flex : 0.6; */
  /* border : solid red 1px;  */
`;

const DetailTable = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  margin: 30px;
  margin-left: 0px;
  color: #333333;
  font-size: 30px;
  text-align: left;
  p {
    font: bold;
    color: grey;
    margin: 1px;
  }
`;

const Line_right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  div {
    border-left: 1px solid black;
    margin-left: 10px;
    padding-left: 5px;
  }
`;

const Specs_left = styled.div`
  text-align: left;
   /* margin: auto; */
  background-size: 2.2em;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    text-align: left;
    margin: 1vh;
    margin-left: 0;
    font-weight: bold;
    img {
      padding: 5px;
      padding-right: 10px;
      height: auto;
      width: 8%;
    }
  }
`;

const Specs_right = styled.div`
  text-align: left;
  /* margin: auto; */
  background-size: 2.2em;
  div {
    text-align: left;
    margin: 1vh;
    width: 100%;
    font-weight: bold;
  }
  p {
    text-align: left;
    padding: 6px;
    margin: 1vh;
    color: grey;
  }
`;

const Ligne = styled.div`
  display: flex;
  padding: 1vh;
  div {
    border-left: 1px solid black;
  }
`;
const Photo = styled.div`
  border-left: 1px solid red;
  border-right: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  object-fit: content;
  width: 50%;
  img {
    height: auto;
    width: 100%;
  }
`;

const Price = styled.div`
  display: flex;
  p {
    font-weight: bold;
    font-size: 40px;
    color: #00a9f5;
    text-align: bottom;
  }

  div {
    display: flex;
    align-items: flex-end;
    font-weight: bold;
  }
`;

const Louer = styled.div`
  margin-top: 5px;
  font-weight: bold;
  button {
    font-size: 1.3em;
    cursor: pointer;
    background-color: #00a9ff;
    color: black;
    padding: 7px 35px;
    border-radius: 5px;
    border-color: #00a9ff;
    outline: none;
    margin: 5px;
  }
`;

export default CarDetails;
