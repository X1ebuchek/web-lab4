import React, {useState} from 'react';
import {Router, Route, Link, BrowserRouter, Routes, NavLink, Navigate} from 'react-router-dom';
import auth from "../../api/authAPI";

const Register = () => {

    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [accept, setAccept] = useState(false);
    let [stateButton, setStateButton] = useState(true);

    const regRequest = () => {
        console.log("login  " + login)
        console.log("passw  " + password)
        console.log("do req")
        auth.register(login, password).then(response => {
            if (response.status === 200) {
                localStorage.setItem("userLogin", response.data.username)
                localStorage.setItem("userToken", response.data.jwt)
                localStorage.setItem("signIn", "true")
                setAccept(true);
                setError("Успешно! Теперь авторизуйтесь")
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

    console.log(localStorage.getItem("userToken"))
    if (localStorage.getItem("signIn") && localStorage.getItem("userToken")!="undefined"){
        console.log(localStorage.getItem("userToken"))
        return <Navigate to={"/main"} replace={true}/>
    }

    return (
        <div className={"RegisterDiv"}>
            <h1>Регистрация</h1>
            <h6>{error}</h6>
            <h3>Логин:</h3>
            <input minLength={3} maxLength={12} className="RegistrationInputs" onChange={
                event => {
                    setLogin(event.target.value)
                    validate(event.target.value,password);
                }
            } value={login}/>
            <h3>Пароль:</h3>
            <input minLength={8} maxLength={12} type={"password"} className={"RegistrationInputs"} onChange={
                event => {
                    setPassword(event.target.value);
                    validate(login,event.target.value)
                }
            } value={password}/>
            <br/>
            <button disabled={stateButton} className={"RegisterButton"} onClick={regRequest}>Зарегистрироваться</button>
            <h5>Уже есть аккаунт?</h5>
            <NavLink to={"/start"} className={"current"}>
                <li>Войти</li>
            </NavLink>
        </div>
    );
};

export default Register;