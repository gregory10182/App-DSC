import React from "react";



export default function DataCard(props){

    const { Name, Data, Img } = props




    return(
        <div className="DataCard">
            <h1>{Data}</h1>
            <p>{Name}</p>
            <img src={Img} alt="" />
        </div>
    )
}