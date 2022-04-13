import React, {useState} from 'react'
import styled from 'styled-components';
import Header from '../header';
import { useLocation } from "react-router-dom";
import { deleteCars, modifyCarsProperty } from "../../action/carAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
 
 function ModifyDetails(props){
    const location = useLocation();
    const { from } = location.state;

    const [name, setName] = useState("RS3_Gris-Nardo");
    //const [image, setImage] = useState([]);
    const [brand, setBrand] = useState(from.car["cars_brands"].brand);
    const [model, setModel] = useState(from.car["cars_brands"].model);
    const [color, setColor] = useState(from.car["color"]);
    const [doors, setDoors] = useState(from.car["doors"]);
    const [bootSize, setBootSize] = useState(from.car["boot_size"]);
    const [energy, setEnergy] = useState(from.car["energy"]);
    const [passengers, setPassenger] = useState(from.car["passengers"]);
    const [type, setType] = useState(from.car["type"]);
    const [price, setPrice] = useState(from.car["price"]);
    const [description, setDescription] = useState("");
    const [airCondition, setAirCondition] = useState(from.car["air_conditioning"]);
    const [isAutomatic, setIsAutomatic] = useState(from.car["is_automatic"]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [isEnableDelete, setIsEnableDelete] = useState(false);
    const [isEnableUpdate, setIsEnableUpdate] = useState(false);

    const cancelChanges = () => {
      setBrand(from.car["cars_brands"].brand);
      setModel(from.car["cars_brands"].model);
      setDoors(from.car["doors"]);
      setBootSize(from.car["boot_size"]);
      setEnergy(from.car["energy"]);
      setPassenger(from.car["passengers"]);
      setAirCondition(from.car["air_conditioning"]);
      setIsAutomatic(from.car["is_automatic"]);
      setType(from.car["type"]);
      setColor(from.car["color"]);
      setIsAvailable(from.car["is_available"]);
      setPrice(from.car["price"]);
    }

    const deleteCar = () => {
      setIsEnableDelete(false);
      console.log(from.car["id"]);
      props.deleteCars({"id": from.car["id"]});
    };

    const handleUpdate = () => {
      from.car["cars_brands"].brand = brand;
      from.car["cars_brands"].model = model;
      from.car["doors"] = doors;
      from.car["boot_size"] = bootSize;
      from.car["energy"] = energy;
      from.car["passengers"] = passengers;
      from.car["air_conditioning"] = airCondition;
      from.car["is_automatic"] = isAutomatic;
      from.car["type"] = type;
      from.car["color"] = color;
      from.car["is_available"] = isAvailable;
      from.car["price"] = price;
      console.log(from.car);
      props.modifyCarsProperty(from.car);
    };

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
                  <TopInfo>
                    <SpecsColumn>
                    
                      <OneSpec>
                        <div>Marque:</div>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                          
                      </OneSpec>
                    
                      <OneSpec>
                        <div>Prix:</div>
                        <input type="number" min={"10"} max={""}  value={price} onChange={(e) => setPrice(e.target.value)}/>
                      </OneSpec>
                    </SpecsColumn>
                    <SpecsColumn>
                      <OneSpec>
                        <div>Modéle:</div>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)}/> 
                      </OneSpec>
                      <OneSpec>
                        <div>Type:</div>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                      </OneSpec>
                    </SpecsColumn>
                    <SpecsColumn>
                      <OneSpec>
                        <div>Couleur:</div>
                        <input type="text" value={color} onChange={(e) => setColor(e.target.value)}/> 
                      </OneSpec>
                      <OneSpec>
                        <div>Disponible:</div>
                        <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)}/>
                      </OneSpec>
                    </SpecsColumn>                  
                    <Images onClick= {() => {}}>
                      <img src="images/images.svg" alt="cross to delete car" />
                      <p>Modifier les images</p>
                  </Images>
                  </TopInfo> 

                  <DetailTable>
                    <Specs>
                        <form action="" method="post">
                        <div>
                           <img src="./images/icons/door.svg" alt="door_icon"/><label>Nombre de portes:</label>  
                           <input type="number" min={"4"} max={"7"} value={doors} onChange={(e) => setDoors(e.target.value)}/>
                        </div>
                        <div>
                          <img src="./images/icons/suitcase.svg" alt="suitcase icon"/><label>Taille du coffre:</label>
                          <input type="text" value={bootSize} onChange={(e) => setBootSize(e.target.value)}/>
                        </div>
                        <div>
                          <img src="./images/icons/lightning.svg" alt="lightning_icon"/><label>Énergie:</label>  
                          <input type="text" id="" value={energy} onChange={(e) => setEnergy(e.target.value)}/> 
                          
                        </div>
                        </form>
                    </Specs>
                    {/* <Ligne>
                      <div></div>
                    </Ligne> */}
                    <Specs>
                        <form action="" method='post'>
                            <div>
                              <img src="./images/icons/stick.svg" alt="stick_icon"/><label>Transmission:</label>
                              <input type="checkbox" size={"30"} checked={isAutomatic} onChange={(e) => setIsAutomatic(e.target.checked)}/>
                              
                            </div>
                            <div>
                              <img src="./images/icons/seat.svg" alt="seat_icon"/><label>Nombre de places:</label>
                              <input type="number" min={"5"} max={"12"} value={passengers} onChange={(e) => setPassenger(e.target.value)}/>
                              
                            </div>
                            <div>
                              <img src="./images/icons/cool.svg" alt="air_icon"/><label>Aire conditionnée:</label>
                              <input type="checkbox" checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)}/>
                              
                            </div>
                        </form>
                    </Specs>
                  </DetailTable>
                </Info>
              </Detail>
            </Test>
            <Buttons>
              <button className="__button__green" onClick = {() => {setIsEnableUpdate(true);}}>Sauvegarder </button>
              <button className="__button__blue" onClick={cancelChanges} >Annuler les changements</button>
              <button className="__button__red" onClick = {() => {setIsEnableDelete(true);}}>Supprimer la voiture</button>
            </Buttons>
          </Content>
          {isEnableDelete ? (
            <Popup>
              <Message>
                <p>
                  Êtes-vous sûr de vouloir supprimer cette voiture ?
                </p>
                <Accept>
                  <Link to="/cars" className="__redirect">
                    <button 
                      className="__accept__button"
                      onClick={handleUpdate}
                      to="/cars"
                    >
                      Oui
                    </button>
                  </Link>
                    <button 
                      className="__cancel__button"
                      onClick={() => {setIsEnableDelete(false);}}
                    >
                      Anuller
                    </button>
                </Accept>
              </Message>
            </Popup>
            ) : (
              ""
          )}
          {isEnableUpdate ? (
            <Popup>
              <Message>
                <p>
                  Êtes-vous sûr de vouloir modifier les caractéristiques de la voiture ?
                </p>
                <Accept>
                  <Link to="/cars" className="__redirect">
                    <button 
                      className="__accept__button"
                      onClick={deleteCar}
                      to="/cars"
                    >
                      Oui
                    </button>
                  </Link>
                    <button 
                      className="__cancel__button"
                      onClick={() => {setIsEnableUpdate(false);}}
                    >
                      Anuller
                    </button>
                </Accept>
              </Message>
            </Popup>
            ) : (
              ""
          )}
        </Container>
      );
    }
    
    const Container = styled.div`
      top: 0;
      max-width: 1600px;
      height: 100vh;
      margin: auto;
      display: flex;
      justify-content: center;
      background-image: url("./images/car_9.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    `;

    const Content = styled.div`
      margin-top: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-bottom: 30px;
      width: 100%;
    `; 
    const Popup = styled.div`
      position: absolute;
      min-width: 100%;
      min-height: 100vh;
      top: 0%;
      left: 0%;
      z-index: 101;
      background-color: rgb(189, 189, 189, 0.5);
      display: flex;
      justify-content: center;
    `;
  
    const Message = styled.div`
      margin-top: 40vh;
      z-index: 102;
      display: flex;
      position: fixed;
      flex-direction: column;
      justify-content: center;
      /* align-content: center;
      align-items: center; */
      border: 1px solid #ff0f0f;
      border-radius: 3px;
      background-color: rgb(255, 255, 255, 1);
      max-width: 50%;
      p {
        margin: 3vh 2vh 2vh 2vh;
        font-size: 1.8vw;
        display: flex;
        gap: 10px;
      }
    `;  

    const Accept = styled.div`
      display: flex;
      justify-content: center;
      padding: 0px;
      gap: 8%;
      button {
        border: 2px solid #00486D;
        font-size: 1.5vw;
        border-radius: 1vh;
        width: 80%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
      }
      .__redirect {
        width: 40%;
      }
      .__accept__button {
        width: 100%;
        background-color: #0db520;
        border: 2px solid #0a7d17;
        font-size: 1.5vw;
        color: #333333;
        border-radius: 1vh;
        cursor: pointer;
      }
      .__accept__button:hover {
        color: white;
        background-color: #0a7d17;
        border: 2px solid #0db520;
      }
      .__accept__button:active {
        transform: scale(0.95);
      }
      .__cancel__button {
        width: 40%;
        background-color: #ff0f0f;
        border: 2px solid #820909;
        font-size: 1.5vw;
        color: #333333;
        border-radius: 1vh;
        cursor: pointer;
      }
      .__cancel__button:hover {
        color: white;
        background-color: #850101;
        border: 2px solid #ff0f0f;
      }
      .__cancel__button:active {
        transform: scale(0.95);
      }
    `;

    const Test = styled.div`
      border: 0.5px solid black;
      border-radius: 5px;
      background-color: rgb(245, 245, 245, 0.95);
      display: flex;
      flex-direction: column;
      width: 80%;
    `; 
    
    const Banner = styled.div`
      font: bold;
      font-size: 1.6em;
      text-align: left;
      background: #00a9f5;
      border: 1px black;
      padding: 6px;
      border-radius: 5px 5px 0 0;
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

    const Images = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 0;
      width: 30%;
      margin-left: 40px;
      padding: 2px;
      border: 2px solid #00A9FF;
      border-radius: 2px;
      p {
        color: #00A9FF;
        font-weight: bold;
        font-size: 1.2vw;
        margin-top: 5px;
      }
      &:hover {
        cursor: pointer;
        background-color: #dedede;
      }
      img {
        height: auto;
        width: 15%;
        margin-top: 5px;
      }
      &:hover img {
        transform: scale(1.1);
      }
    `;
    
    const DetailTable = styled.div`
      padding: 2%;
      padding-left: 0;
      display: flex;
      flex-direction: row;
    `;
    const TopInfo = styled.div`
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: 5px;
    `;

    const SpecsColumn = styled.div`
      display: flex;
      flex-direction: column;
      align-content: center; 
      margin: 20px 0 0 0;
      font-size: 1.5vw;
      text-align: left;
    `;

    const OneSpec = styled.div`
      display: flex;
      flex-direction: row;
      font-size: 3vh;
      margin-left: 5px;
      div {
        margin-right: 5px;
        font-size: 1.6vw;
      }
      input[type='text'], [type='number'] {
        background: none;
        border: none;
        border-bottom: solid 1px #00a9ff;
        font-size: 1.5vw;
        letter-spacing: 1px;
        margin: 0em 0.8em 0.875em 0;
        padding: 0 0 0 0;
        width: 100%;
        text-align : left;
        outline: none;
       }
       input[type='checkbox']{
         padding: 8px;
         margin-top: 3%;
         box-sizing: content-box;
         
       }
    `;
    
    const Specs = styled.div`
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
      }
      img {
        padding: 5px;
        padding-right: 10px;
        height: auto;
        width: 8%;
      }
      input[type='text'], [type='number'] {
        border: none;
        background: none;
        border-bottom: solid 1px #00a9ff;
        font-size: 1.5vw;
        letter-spacing: 1px;
        margin: 0em 0 0em 5px;
        padding: 0 0 0 0;
        width: 30%;	 
        outline: none;
      }
`;
    const Buttons = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 10px;
      height: 15vh;
      width: 80%;
      align-items: center;
      .__button__blue {
        font-size: 3vh;
        color: #333333;
        background-color: #00A9FF;
        border: 2px solid #00486D;
        font-size: 1.5vw;
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
        font-size: 1.5vw;
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
        font-size: 1.5vw;
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
    
    const mapStateToProps = (state) => {
      return {
        //recuperation des propriétés nécessaires
      };
    };
    const mapStateToDispatch = (dispatch) => {
      return {
        //property est un objet contenant les propriétés du véhicule
        deleteCars: (property) => dispatch(deleteCars(property)),
        modifyCarsProperty: (property) => dispatch(modifyCarsProperty(property)),
      };
    };
const connector = connect(mapStateToProps, mapStateToDispatch);
export default connector(ModifyDetails);