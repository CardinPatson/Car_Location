import React, { useState } from "react";
import Header from "../header";
import styled from "styled-components";
function AddCars() {
  const [photo, setPhoto] = useState([]);

  const removePhoto = (e) => {};
  const handlePhoto = (e) => {
    const url = e.target.files[0];
    console.log(url);
    if (!photo) return;
    setPhoto([...photo, URL.createObjectURL(url)]);
    console.log(photo);
  };
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <legend>Add Cars</legend>
          <div className="add__detail__cars">
            <span>Marque</span>
            {/* RECUPERER LES DIFFERENTES MARQUES DE VOITURE DANS LA DB */}
            <input type="text" />
          </div>
          <div className="add__detail__cars">
            <span>Modèle</span>
            {/* RECUPERER LES DIFFERENTS MODELES DE VOITURE DANS LA DB */}
            <input type="text" />
          </div>
          <div className="add__detail__cars">
            <span>Couleur</span>
            <input type="text" placeholder="rouge" />
          </div>
          <div className="add__detail__cars">
            <span>Nombre de porte </span>
            <input type="number" placeholder="5" />
          </div>
          <div className="add__detail__cars">
            <span>Taille du coffre (L)</span>
            <input type="number" placeholder="120L" />
          </div>
          <div className="add__detail__cars">
            <span>Energie</span>
            <select>
              <option value="true" selected>
                Essence
              </option>
              <option>Diesel</option>
              <option>Électrique</option>
              <option>Hybride</option>
              <option>LPG</option>
              <option>CNG</option>
            </select>
          </div>
          <div className="add__detail__cars">
            <span>Nombre de place</span>
            <input type="number" placeholder="4" />
          </div>
          <div className="add__detail__cars">
            <span>Type</span>
            <input type="text" />
          </div>
          <div className="add__detail__cars">
            <span>Automatique</span>
            <select>
              <option value="true" selected>
                Vrai
              </option>
              <option>Faux</option>
            </select>
          </div>
          <div className="add__detail__cars">
            <span>Air Conditionné</span>
            <select>
              <option value="true" selected>
                Vrai
              </option>
              <option>Faux</option>
            </select>
          </div>
          <div className="add__detail__cars">
            <span>Prix</span>
            <input type="number" placeholder="500€" />
          </div>
          <div className="add__detail__cars">
            <span>Photo</span>
            <div className="add__photo__cars">
              <input
                type="file"
                accept="image/gif , image/png , image/jpeg"
                name="image"
                id="file"
                onChange={handlePhoto}
              />
              <label htmlFor="file">
                <span>Ajouter des Photos</span>
              </label>
            </div>
          </div>
          <div className="photo__cars">
            {photo.map((x) => {
              // console.log(<img className="cars__photo" alt="cars" src={x} />);
              return (
                <div key={x} className="container__photo">
                  <img className="cars__photo" alt="cars" src={x} />
                  <button
                    className="remove__photo__cars"
                    onClick={() => {
                      removePhoto(x);
                    }}
                    value={x}
                  >
                    Retirer
                  </button>
                </div>
              );
            })}
          </div>
          <div className="submit__detail__cars">
            <button>Envoyer</button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;
const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 85px;
`;
const Form = styled.form`
  border: solid #00a9ff 1px;
  background-color: #f5f5f5;
  /* height: 100vh; */
  border-radius: 3px 3px 0 0;
  legend {
    font-size: 1.2em;
    font-weight: normal;
    padding: 5px;
    background-color: #00a9ff;
  }
  .add__detail__cars {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding: 0 10px;
    /* select {
			width: 76.8%;
		} */
    #file {
      display: none;
    }
    .add__photo__cars {
      width: 100%;
      span {
        padding: 10px;
        border-radius: 3px;
        cursor: pointer;
        background-color: #00a9ff;
      }
    }
    input,
    select {
      -ms-box-sizing: content-box;
      -moz-box-sizing: content-box;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      width: 75%;
      padding: 8px;
      border: solid #00a9ff 1px;
      border-radius: 5px;
      outline: none;
      font-size: 15px;
      font-family: "Roboto";
      &:focus {
        box-shadow: 2px 2px 12px #00a9ff;
      }
    }
  }
  .photo__cars {
    /* border: solid red 1px; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5px;
    .container__photo {
      /* border: solid red 1px; */
      justify-self: center;
      align-self: center;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 5px;
      .cars__photo {
        /* border : solid red 1px; */
        /* padding: 5px; */
        max-width: 100%;
        height: auto;
        object-fit: content;
        border-radius: 3px;
        margin: 5px;
      }
      .remove__photo__cars {
        border: 1px solid #ed1b0d;
        margin-top: 15px;
        padding: 5px 10px;
        transition-duration: 0.5s;
        background-color: #fa5e5e;
        border-radius: 3px;
        &:hover {
          background-color: #ed1b0d;
        }
      }
    }
  }
  .submit__detail__cars {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    button {
      padding: 5px 10px;
      font-size: 1em;
      cursor: pointer;
      border: solid #00a9ff 1px;
      border-radius: 5px;
      outline: none;
      background-color: #00a9ff;
    }
  }
`;
export default AddCars;
