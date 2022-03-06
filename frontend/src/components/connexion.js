import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


function Connexion() {
    return(
        <Container>
            <Banner>Connect to your account</Banner>
            <Form>
                <Login>
                    <p>Username or email</p>
                    <input type="text" />
                </Login>
                <Password>
                    <p>Password</p>
                    <input type="text" />
                </Password>
                <Confirm>
                    <button onClick={() => {}}>
                        Login
                    </button>
                    <Remember>
                        Remember Me
                        <input type="checkbox"/>
                        <span></span>
                    </Remember>
                </Confirm>
                <Forgotpassword>
                    <Link to="/" style={{ color: "#00A9FF" }}>Forgot password ?</Link> 
                </Forgotpassword>
            </Form>
        </Container>
    );
}


const Container = styled.div`
    box-shadow: 0 0 1px black;
    border: solid #777777 1px;
	display: flex;
    flex-direction: column;
	position: relative;
	top: 60px;
    margin: 3% 0% 3% 3%;
	width: 55vh;
    height: 42vh;
`;

const Banner = styled.div`
    padding: 1vh 1vh 1vh 1vh;
    border-bottom: solid #797979 1px;
    background-color: #00A9FF;
    color: #333333;
    text-align: center;
    font-size: 3.6vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    p{
        text-align: left;
        font-size: 3vh;
    }
    input {
        border: 1px solid #797979;
        border-radius:0.5vh;
        height: 4vh;
        font-size: 2.5vh;
        width: 40vh;
    }
    button {
        font-size: 3vh;
        color: white;
        background-color: #00A9FF;
        border: 2px solid #00486D;
        border-radius: 1vh;
        width 40%;
        padding: 1vh;
        margin: 2vh 1vh 2vh 1vh;
        cursor: pointer;
    }
    button:hover{
        background-color: #00486D;
        border: 2px solid #00A9FF;
    }
`;

const Login = styled.div`
    margin: 1vh; 
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

const Password = styled.div`
    margin: 1vh; 
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

const Confirm = styled.div`
    display: flex;
    flex-direction: row;
`;

const Forgotpassword = styled.div`
    display: flex;
    margin: 1vh 1vh 2vh 2vh;
    textDecoration: "none"
`;

const Remember = styled.label`
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 3vh;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    top: 35%;
    left: 5%;
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    span {
        position: absolute;
        top: -3px;
        left: 0px;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border: 1px solid grey;
        border-radius: 15px;
    }
    &:hover input ~ span {
        background-color: #ccc;
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
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

export default Connexion;