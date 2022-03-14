import React from "react";
import Header from "./header";
import styled from "styled-components";

function Car_detail() {
  return (
    <Container>
      <Header />
      <Content>
        <Test>
          <Banner>
          <span>Caractéristiques</span>
          </Banner>
          <Detail>
            <Info>
              <Name>
                <div>Ayamar</div>
                <Line_right>
                  <div>
                    <p>Etu. 2</p>
                  </div>
                </Line_right>
              </Name>
              <DetailTable>
                <Specs_left>
                  <div>Nombre de portes</div>
                  <p>4</p>
                  <div>Taille du coffre</div>
                  <p>Il est très grand</p>
                  <div>Energie</div>
                  <p>Diesel</p>
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
                <img src="./images/unknown.png" />
                <Price>
                  <p>1450€</p>
                  <div id>/jour</div>
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

const Louer = styled.div`
  margin-top : 5px ; 
  font-weight: bold;
  button {
    font-size: 1.3em;
    cursor: pointer;
    background-color: #00a9ff;
    color: black;
    padding: 7px 35px;
    border-radius : 5px ;
    border-color :  #00a9ff;
    outline : none ; 
    margin: 5px;
  }
`;

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
`;
const Content = styled.div`
  margin-top: 20vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 30px;
  top: 7vh;
`;

const Test = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  font: bold;
  font-size: 1.6em;
  text-align: left;
  background: #00a9f5;
  border: 1px black;
  padding: 6px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  /* //flex-grow: 1; */
  /* width: 100%; */
  /*border-radius: 1vh; */
  /* box-shadow: 0 0 1px black; */
  margin: 1vh 1vh 1vh 5vh;
`;

const Info = styled.div`
  /* flex : 0.6; */
  /* border : solid red 1px;  */

`;

const DetailTable = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: row;
`;

const Name = styled.div`
  display: flex;
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
  padding: 1vh;
  font-size: 3vh;
  div {
    border-left: 1px solid black;
  }
`;

const Specs_left = styled.div`
  text-align: left;
   /* margin: auto; */
  background-size: 2.2em;
  div {
    text-align: left;
    margin: 1vh;
    width: 32vh;
    font-weight: bold;
     
  }
  p {
     text-align: left;
     padding: 6px;
     margin: 1vh;
    color: grey;
`;

const Specs_right = styled.div`
  text-align: left;
  /* margin: auto; */
  background-size: 2.2em;
  div {
    text-align: left;
    margin: 1vh;
    width: 32vh;
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
  display: flex;
  flex-direction: column;
  align-items : center;
  object-fit: content;
  img {
    width: 38vh;
    height: 38vh;
    margin: 3vh;
    margin-top: 0%;
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
    font-weight: bold;
  }
`;
/* const Border = styled.div``;
// const Name = styled.div`
//   font-size: 4vh;
//   margin: 0vh 1vh 0vh 1vh;
// `; */

const Type = styled.div`
  font-size: 2vh;
  margin: 1vh 1vh 1vh 1vh;
  font-weight: bold;
`;

// const Specs = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   max-width: 80%;
//   padding-left: 20%;
//   padding-bottom: 2vh;
//   div {
//     text-align: left;
//     padding: 1vh;
//   }
//   p {
//     text-align: left;
//     padding: 0vh 1vh 0vh 1vh;
//     color: #00a9ff;
//   }
// `;

export default Car_detail;
