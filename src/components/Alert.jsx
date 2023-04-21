import React, { useEffect, useState } from "react";

export default function Alert({Alert, Message}) {

    const [cName, setCName] = useState("Alert")

    useEffect(() => {
        if(Alert === true & Message != ""){
            setCName("AlertEntrance")
        }else if(Alert === false & Message != ""){
            setCName("AlertExit")
        }else{
            setCName("Alert")
        }
    }, [Alert])



    return(
        <div className={cName}>
            <p>{Message}</p>
        </div>
    )
}