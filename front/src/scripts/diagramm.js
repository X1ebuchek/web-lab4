// const canvas = document.getElementById("canvas");
// const context.canvas = canvas.getContext("2d");
const offset = 35;
//let points = [];
let state = 0;
// context.canvas.translate(150, 150);
// context.canvas.scale(1,-1);

function stateTranslate(ctx){
    if (state===0){
        ctx.translate(150, 150);
        ctx.scale(1,-1);
        state++;
    }
}
function drawSquare(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-150, -150, 300, 300);
    ctx.closePath();
}
function drawAxes(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 0);

    const lineLen = 2;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.moveTo(-150, 0);
    ctx.lineTo(150, 0);
    ctx.stroke();

    ctx.moveTo(0, -150);
    ctx.lineTo(0,150);
    ctx.stroke();

    ctx.fillStyle = "#000000";
    let start = -150 + 10

    for (let i = 0 ; i < 300; i += 35){
        ctx.moveTo(start + i, lineLen)
        ctx.lineTo(start  + i, -lineLen)
        ctx.stroke()
    }

    let k = -4;
    ctx.scale(1,-1);
    for (let i = 0 ; i < 300; i += 35){
        if (k!=0) {
            ctx.fillText(k.toString(), start + i, -5);
        }
        k++;
    }
    ctx.scale(1,-1);

    ctx.moveTo(0,150);
    ctx.lineTo(0, -150);
    ctx.stroke()
    start = -140;
    k = 4;
    for (let i = 0 ; i < 300; i += 35){
        ctx.moveTo(lineLen,start + i)
        ctx.lineTo(-lineLen, start + i)
        ctx.stroke()
    }

    ctx.scale(1,-1);
    for (let i = 0 ; i < 300; i += 35){
        if (k!=0) {
            ctx.fillText(k.toString(), 5, start + i);
        }
        k--;
    }
    ctx.scale(1,-1);

    ctx.fillStyle = "#000000"
    ctx.moveTo(150,0);
    ctx.lineTo(145,5);
    ctx.stroke()
    ctx.moveTo(150,0);
    ctx.lineTo(145,-5);
    ctx.stroke();
    ctx.fillText("X",143,-15);

    ctx.moveTo(0,150);
    ctx.lineTo(5,145);
    ctx.stroke()
    ctx.moveTo(0,150);
    ctx.lineTo(-5,145);
    ctx.stroke();
    ctx.scale(1,-1);
    ctx.fillText("y",-15,-143);
    ctx.scale(1,-1);
    ctx.closePath();
}
function drawFigures(ctx,r){
    ctx.beginPath();
    ctx.fillStyle = "#5996e0";

    ctx.moveTo(0,0);
    ctx.fillRect(-r/2*offset, -r*offset, r/2*offset, r*offset);

    ctx.moveTo(0,0);
    ctx.lineTo(0,-r*offset/2);
    ctx.lineTo(r*offset/2,0);
    ctx.lineTo(0,0);
    ctx.fill();

    ctx.arc(0,0,r*offset,0,Math.PI/2);
    ctx.fill();
    ctx.closePath();
}
// function Point(x,y,color){
//     this.x = x;
//     this.y = y;
//     this.color = color;
// }
export function drawPoint(ctx, point){
    //console.log(point);
    ctx.beginPath();
    ctx.fillStyle = point.result === true || point.result==="true" ? "#33de33" : "#ff0000"
    //ctx.fillStyle = point.color;
    ctx.arc(point.x*offset,point.y*offset,3,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}
export function drawPoints(ctx, points){
    for (let i = 0;i<points.length;i++){
        //console.log("Точка: " + points[i].r + "Result: " + points[i].result + "typeof: " + typeof(points[i].result))
        drawPoint(ctx, points[i]);
    }
}
export function redraw(ctx, r, points){
    console.log("redraw");
    console.log(points);
    stateTranslate(ctx);
    drawSquare(ctx);
    drawFigures(ctx, r);
    drawAxes(ctx);
    if (points === undefined || points===null || points.length===0){
        return
    }
    drawPoints(ctx, points);
}
// function drawFirst(ctx){
//     points = [];
//     let lines = document.getElementById("mainTB").getElementsByTagName("tr");
//     for (let i = 0;i<lines.length;i++){
//         let elements = lines[i].getElementsByTagName("td");
//         let color = "#525252";
//         // if (elements[3].innerText==="true") color = "#58ff00";
//         // else color = "#ff0000";
//         let point = new Point(elements[0].innerText,elements[1].innerText,color);
//         points.push(point);
//         drawPoint(point);
//     }
// }
function clickEvent(event){
    let x = event.offsetX - 150;
    let y = -(event.offsetY - 150);
    x /= offset;
    x = x.toFixed(2);
    y /= offset;
    y = y.toFixed(2);
    console.log("x = " + x);
    console.log("y = " + y);
    document.getElementById("x_value").value = x;
    document.getElementById("y_field").value = y;
}
// window.onload = function (){
//     drawFirst(ctx);
//     document.getElementById("canvas").addEventListener("click",function (event){
//         console.log(event);
//         clickEvent(event);
//     })
// };
//redraw(4);

