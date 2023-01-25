import React, {useEffect, useState} from 'react'
import './Main.css';
import Canvas from '../../components/canvas/Canvas';
import Row from '../../components/Row';
import {validateY} from "../../scripts/validate";
import Button from "../../components/button/Button";
import shot from "../../api/shotAPI"
import ReactPaginate from "react-paginate";
import {Router, Route, Link, BrowserRouter, Routes, NavLink, Navigate, useNavigate} from 'react-router-dom';
import authAPI from "../../api/authAPI";

function Main() {
    let offset = 35;
    let tempX;
    let tempY;
    let [y, setY] = useState("0");
    let [x, setX] = useState("0");
    let [r, setR] = useState("1");
    let [count, setCount] = useState(0);
    let [stateButton, setStateButton] = useState(false);
    let [rows, setRows] = useState([

    ]);

    useEffect(()=>{
        shot.getEntries(localStorage.getItem("userToken")).then(response => {
            // console.log(response.data.reverse())
            const arr = response.data;
            console.log("Пришло с сервера")
            console.log(arr)
            for (let i = 0;i<arr.length;i++){
                //console.log("Добавляем строку " + i)
                rows.push(arr[i])
                //console.log(rows)
                setRows([...rows])
            }


            // this.setState({p:Math.ceil(arr.length/10)})
            // for(let i = 0; i < arr.length;i++){
            //     this.savePointFromJson(arr[i])
            // }
            // this.redrawCanvas()
            // this.drawTableFromSlice(this.points.slice(0,10))
        }).catch(err => {
            console.log(err)
        })
    },[])

    if (!localStorage.getItem("signIn")){
        return <Navigate to={"/start"} replace={true}/>
    }

    const sendPoint = (how) =>{
        console.log(x,y,r + "Отправка")
        if (how==="click"){
            shot.sendShot(tempX,tempY,r,localStorage.getItem("userToken")).then(response => {
                if (response.status === 200){
                    let ans = response.data;
                    ans.result = ans.result.toString()
                    //console.log(response.data)

                    //console.log(rows)
                    // this.savePointFromJson(response.data)
                    //
                    // this.drawTableFromSlice(this.points.slice(pageNum*10, 10+pageNum*10))
                    // this.redrawCanvas()
                    setRows([...rows,ans])
                }
                else {
                    console.log("ploho")
                }
            })
        }else {
            shot.sendShot(x,y,r,localStorage.getItem("userToken")).then(response => {
                if (response.status === 200){
                    let ans = response.data;
                    ans.result = ans.result.toString()
                    //console.log(response.data)

                    //console.log(rows)
                    // this.savePointFromJson(response.data)
                    //
                    // this.drawTableFromSlice(this.points.slice(pageNum*10, 10+pageNum*10))
                    // this.redrawCanvas()
                    setRows([...rows,ans])
                }
                else {
                    console.log("ploho")
                }
            })
        }

    }

    const handlePageClick = (event) =>{
        console.log(event.selected);
        setCount(event.selected);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const lOut = () => navigate("/start");


    const logout = () =>{
        localStorage.clear();
        console.log("Выйти")
        lOut();
        //return <Navigate to={"/start"} replace={true}/>
    }

    const clickEvent = (event) => {
        const rect = event.target.getBoundingClientRect();
        console.log(rect)
        // calculate click place
        let x1 = (event.clientX - rect.left) - 150;
        let y1 = 150 - (event.clientY - rect.top);

        // let x = event.clientX - 150;
        // let y = -(event.clientY - 150);
        console.log("x = " + x1);
        console.log("y = " + y1);
        x1 /= offset;
        x1 = x1.toFixed(2);
        y1 /= offset;
        y1 = y1.toFixed(2);
        console.log("x = " + x1);
        console.log("y = " + y1);

        tempX = x1;
        tempY = y1;
        //setTimeout(1000);
        setX(x1);
        setY(y1);
        //setY(y1);
        console.log("x = " + x);
        console.log("y = " + y);
        sendPoint("click");
    }

    return (
        <div className="Back">
            <button onClick={logout}>Выйти</button>
            <br/>
            <h2>X is {x} now</h2>
            <select defaultValue={x} onChange={event => setX(event.target.value)}>
                <option>-4</option>
                <option>-3</option>
                <option>-2</option>
                <option>-1</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
            <br/>
            <h2>Y is {y} now</h2>
            <input className={"InputForm"}
                onChange={event => {
                    setStateButton(validateY(event.target.value)[1]);
                    setY(validateY(event.target.value)[0])
                }}
                value={y}
            />
            <br/>
            <h2>R is {r} now</h2>
            <select defaultValue={r} onChange={event => setR(event.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <br/>
            <Canvas onClick={event => clickEvent(event)} height={300} width={300} r={r} points={rows} />
            <Button disabled={stateButton} onClick={sendPoint}>Отправить</Button>

            <div className={"tableDiv"}>
                <table className={"table_adaptive"}>
                    <tr className={"headTable"}>
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>Shot</td>
                        <td>Time</td>
                        <td>Script Time(µs)</td>
                    </tr>
                    <tbody>
                    {rows.slice(
                        count * 10,
                        (count + 1) * 10
                    ).map(row => (
                        <Row x={row.x} y={row.y} r={row.r} result={row.result}
                                 time={new Date(row.time).toLocaleString("ru-RU", {
                                    hour12: false
                                })} scriptTime={row.scriptTime}/>
                    ))}
                    {/*{*/}
                    {/*    rows.map((row) =>*/}
                    {/*        <Row x={row.x} y={row.y} r={row.r} result={row.result}*/}
                    {/*             time={new Date(row.time).toLocaleString("ru-RU", {*/}
                    {/*                 hour12: false*/}
                    {/*             })} scriptTime={row.scriptTime}/>*/}
                    {/*    )*/}
                    {/*}*/}
                    </tbody>
                    <ReactPaginate className={"pagination center-pag"}
                                   nextLabel=">"
                                   onPageChange={handlePageClick}
                                   pageRangeDisplayed={2}
                                   marginPagesDisplayed={1}
                                   pageCount={Math.ceil(rows.length / 10)}
                                   previousLabel="<"
                                   pageClassName="page-item"
                                   pageLinkClassName="page-link"
                                   previousClassName="page-item"
                                   previousLinkClassName="page-link"
                                   nextClassName="page-item"
                                   nextLinkClassName="page-link"
                        // breakLabel="..."
                                   breakClassName="page-item"
                                   breakLinkClassName="page-link"
                                   containerClassName="pagination"
                                   activeClassName="active"
                                   renderOnZeroPageCount={null}/>
                </table>

            </div>


        </div>
    );
}

export default Main;
