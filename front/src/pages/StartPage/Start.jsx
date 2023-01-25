import React from 'react';
import "./Start.css";
import Register from "../../components/RegistrationForm/Register";
import Auth from "../../components/AuthForm/Auth";

const Start = (props) => {
    return (
        <div className="Back1">
            <h4>Вагаев Артем P32312, вариант 1265</h4>
            {
                props.id==="auth"
                    ? <Auth/>
                    : <Register/>
            }
        </div>
    );
};

export default Start;