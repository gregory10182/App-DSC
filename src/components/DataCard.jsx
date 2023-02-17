import React from "react";



export default function DataCard(props){

    const { Name, Data, Img } = props




    return(
        <div className="DataCard">
            {parseInt(Data) < 0 ? <h1 style={{color: "rgba(170, 5, 5, 1)"}}>{Data}</h1> : <h1>{Data}</h1>}
            
            <p style={{color: "#eddf1c"}}>{Name}</p>

            
            <img src={Img} alt="" />
        </div>
    )
}