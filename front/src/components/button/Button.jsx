import React from 'react';
import "./Button.css"

const Button = (props) => {
    return (
        <div>
            <button className={"SendButton"} {...props}/>
        </div>
    );
};

export default Button;