import React, {useState} from 'react';
import auth from "../../api/authAPI";
import {Router, Route, Link, BrowserRouter, Routes, NavLink, Navigate} from 'react-router-dom';

const Auth = () => {

    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [accept, setAccept] = useState(false);
    let [stateButton, setStateButton] = useState(true);

    const loginRequest = () => {
        console.log("login  " + login)
        console.log("passw  " + password)
        console.log("do req")
        auth.login(login, password).then(response => {
            if (response.status === 200) {
                localStorage.setItem("userLogin", response.data.username)
                localStorage.setItem("userToken", response.data.jwt)
                localStorage.setItem("signIn","true")
                setAccept(true);
            } else {
                alert("хз чо здесь писать")
            }
        }).catch(err => {
            setError(err.response.data)
            //alert(err.response.data)
        })

    }

    const validate = (login,password) =>{
        if (login.isEmpty || login.length < 3 || password.isEmpty || password.length < 3){
            setStateButton(true);
        }else setStateButton(false);
    }


    console.log(localStorage.getItem("signIn"))
    if (localStorage.getItem("signIn") && localStorage.getItem("userToken")!="undefined"){
        console.log(localStorage.getItem("userToken"))
        return <Navigate to={"/main"} replace={true}/>
    }

    return (
        <div>
            <div className={"AuthDiv"}>
                <h1>Авторизация</h1>
                <h6>{error}</h6>
                <h3>Логин:</h3>
                <input maxLength={12} className="AuthInputs" onChange={
                    event => {
                        setLogin(event.target.value)
                        validate(event.target.value,password);
                    }
                } value={login}/>
                <h3>Пароль:</h3>
                <input type={"password"} maxLength={12} className={"AuthInputs"} onChange={
                    event => {
                        setPassword(event.target.value);
                        validate(login,event.target.value)
                    }
                } value={password}/>
                <br/>
                <button disabled={stateButton} type={"button"} className={"AuthButton"} onClick={
                    loginRequest
                }>Войти</button>
                <h5>Ещё нет аккаунта? </h5>
                <NavLink to={"/register"} className={"current"}>
                    <li>Зарегистрироваться</li>
                </NavLink>
                {/*<Link to={"/register"}>Зарегистрироваться</Link>*/}
            </div>
        </div>
    );
};

export default Auth;