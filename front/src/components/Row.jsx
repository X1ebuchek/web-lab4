import React from 'react';

const Row = (props) => {
    return (
        <tr>
            <td>{props.x}</td>
            <td>{props.y}</td>
            <td>{props.r}</td>
            <td>{props.result.toString()}</td>
            <td>{props.time}</td>
            <td>{props.scriptTime}</td>
        </tr>
    );
};

export default Row;