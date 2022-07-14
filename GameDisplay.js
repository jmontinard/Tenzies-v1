import React from "react"

 function GameDisplay({tenzies,diceElements,rollDice,}) {
    return (
        <main className="game-display" >
          <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
    
 <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}

                {/* oh is this a change  */}
            </button>
        
            </main>
    )
}
export default GameDisplay
