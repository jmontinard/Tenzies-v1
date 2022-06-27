import React from "react"
const Records = ({time,rolls})=> {
    return (
        <div className ='highScore--row' >
         <span>Time Taken: {time}</span>
         <br />
         <span> Rolls: {rolls}</span>
            </div>
    )
}
export default Records