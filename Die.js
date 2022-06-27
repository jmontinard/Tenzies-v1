import React from "react"

 const Die = ({holdDice,innerHtml,isHeld})=> {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "black"
    }
    return (
        <div 
            className="die-face"
            style={styles}
            onClick={holdDice}
        >
          <div className="pip--container">{innerHtml}</div>
        </div>
    )
}
export default Die;
