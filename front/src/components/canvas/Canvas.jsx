import React, {useRef, useEffect} from 'react';
import {redraw} from "../../scripts/diagramm";

const Canvas = (props) => {
    console.log("Redraw canvas")
    console.log(props)
    const canvasRef = useRef(null)

    const draw = (ctx, r, points) =>{
        redraw(ctx, r, points);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        draw(ctx, props.r, props.points)

    }, [draw])


    return (
        <div className={Canvas}>
            <canvas ref={canvasRef} {...props}/>
        </div>
    );
};

export default Canvas;