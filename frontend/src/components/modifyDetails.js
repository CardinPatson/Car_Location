import { StylesContext } from '@material-ui/styles';
import { style } from '@mui/system';
import React from 'react'
import styled from 'styled-components';
import Header from './header';
 
 function ModifyDetails(props){
    return (
        <Container>
          <Header/>
          <Content>
            <Test>
              <Banner>
                <span>Modification voiture</span>
              </Banner>
              <Detail>
                <Info>
                  <Marque>
                    <div>Marque:</div>
                    <Line_right>
                        <input type="text"/>
                    </Line_right>
                  </Marque>
                  <Model>
                    <div>Modéle:</div>
                    <Line_right>
                        <input type="text"/>
                    </Line_right>
                  </Model>
                  <DetailTable>
                    <Specs_left>
                        <from action="" method="post">
                        <div>
                           <img src="./images/icons/door.svg" alt="door_icon"/><label for="porte">Nombre de portes:</label>  
                           <input type="number" min={"4"} max={"7"}/>
                        </div>
                        <div>
                          <img src="./images/icons/suitcase.svg" alt="suitcase icon"/><label for="coffre">Taille du coffre:</label>
                          <input type="text"/> 
                        </div>
                        <div>
                          <img src="./images/icons/lightning.svg" alt="lightning_icon"/><label for="energie">Energie:</label>  
                          <input type="text" id=""/> 
                        </div>
                        </from>
                    </Specs_left>
                    {/* <Ligne>
                      <div></div>
                    </Ligne> */}
                    <Specs_right>
                        <form action="" method='post'>
                            <div>
                              <img src="./images/icons/stick.svg" alt="stick_icon"/><label for="trans">Transmission:</label>
                              <input type="text" size={"30"}/>
                            </div>
                            <div>
                              <img src="./images/icons/seat.svg" alt="seat_icon"/><label for="trans">Nombre de places:</label>
                              <input type="number" min={"5"} max={"12"}/>
                            </div>
                            <div>
                              <img src="./images/icons/air.svg" alt="air_icon"/><label for="trans">Aire conditionnée:</label>
                              <input type="text"/>
                            </div>
                        </form>
                       
                    </Specs_right>
                  </DetailTable>
                </Info>
              </Detail>
            </Test>
            <Buttons>
              <button className="__button__green">Sauvegarder </button>
              <button className="__button__red">Annuler les changements</button>
              <button className="__button__blue">Modifier les images</button>
            </Buttons>
          </Content>
        </Container>
      );
    }


    const Portes = styled.div`

    `;

    const Energie = styled.div`

    `;

    const Coffre = styled.div`

    `;
    
    const Container = styled.div`
      top: 0;
      max-width: 1000px;
      height: 500px;
      margin: auto;
      display: flex;
      justify-content: center;
    `;
    const Content = styled.div`
      margin-top: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-bottom: 30px;
      width: 100%;
      height: 100%;
    `; 
    
    const Test = styled.div`
      border: 1px solid black;
      background : white;
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 100%;
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
      padding: 2%;
      display: flex;
      flex-direction: row;
    `;
    
    const Marque = styled.div`
      display: flex;
      margin: 20px;
      margin-left: 0px;
      font-size: 20px;
      text-align: left;
    `;
    const Model = styled.div`
    display: flex;
    margin: 30px;
    margin-left: 0px;
    color: #333333;
    font-size: 20px;
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
        border-width: 5em
      }
      input[type='text'], [type='number'] {
        background: none;
        border: none;
        border-bottom: solid 1px #00a9ff;
        font-size: 1.000em;
        font-weight: 400;
        letter-spacing: 1px;
        margin: 0em 0.8em 0.875em 0;
        padding: 0 0 0 0;
        width: 60%;
        text-align : center;
       }   
    `;
    
    const Specs_left = styled.div`
      /* text-align: left; */
       /* margin: auto; */
      /* background-size: 2.2em;
      align-items: center;
      margin: 0%;
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
      } */
      text-align: left;
      /* margin: auto; */
      width: 50%;
      color: #00a9ff;
     div {
      display: flex;
      align-items: center;
      text-align: left;
      margin: 1vh;
      margin-left: 0;
      font-weight: bold;
      font-size: 1.2vw;
     img {
      padding: 5px;
      padding-right: 10px;
      height: auto;
      width: 15%;
    }
      input[type='text'], [type='number'] {
        background: none;
        border: none;
        border-bottom: solid 1px #00a9ff;
        font-size: 1.000em;
        font-weight: 400;
        letter-spacing: 1px;
        margin: 0em 0 0.875em 0;
        padding: 0 0 0 0;
        width: 30%;	 
      }
`;
    
    const Specs_right = styled.div`
    text-align: left;
      /* margin: auto; */
      width: 50%;
      color: #00a9ff;
     div {
      display: flex;
      align-items: center;
      text-align: left;
      margin: 1vh;
      margin-left: 0;
      font-weight: bold;
      font-size: 1.2vw;
     img {
      padding: 5px;
      padding-right: 10px;
      height: auto;
      width: 15%;
    }

      input[type='text'], [type='number'] {
        background: none;
        border: none;
	      border-bottom: solid 1px #00a9ff;
	      font-size: 1.000em;
        font-weight: 400;
        letter-spacing: 1px;
	      margin: 0em 0 0.875em 0;
	      padding: 0 0 0 0;
	      width: 40%; 
      }
      img {
      padding: 5px;
      padding-right: 10px;
      height: auto;
      width: 15%;
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
      align-items: center;
      object-fit: content;
      img {
        height: auto;
        width: 70%;
      }
    `;
    const Buttons = styled.div`
       display: flex; 
        flex-direction: row; 
        justify-content: center;
        padding: 10px;
        height: 100%;
        width: 80%;
        align-items: center;
      .__button__blue {
        font-size: 3vh;
        color: #333333;
        background-color: #00A9FF;
        border: 2px solid #00486D;
        border-radius: 1vh;
        width: 80%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
      }
      .__button__blue:hover {
        color: white;
        background-color: #0078B5;
        border: 2px solid #00A9FF;
      }
      .__button__blue:active {
        transform: scale(0.95);
      }
      .__button__red {
        background-color: #ff0f0f;
        border: 2px solid #820909;
        font-size: 3vh;
        color: #333333;
        border-radius: 1vh;
        width: 80%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
      }
      .__button__red:hover {
        color: white;
        background-color: #850101;
        border: 2px solid #ff0f0f;
      }
      .__button__red:active {
        transform: scale(0.95);
      }
      .__button__green {
        background-color: #0db520;
        border: 2px solid #0a7d17;
        font-size: 3vh;
        color: #333333;
        border-radius: 1vh;
        width: 80%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
      }
      .__button__green:hover {
        color: white;
        background-color: #0a7d17;
        border: 2px solid #0db520;
      }
      .__button__green:active {
        transform: scale(0.95);
      }
    `;
    
    /* const Border = styled.div``;
    // const Name = styled.div`
    //   font-size: 4vh;
    //   margin: 0vh 1vh 0vh 1vh;
    // `; */
    
 export default ModifyDetails;