import React from "react"
import Records from "./Records"
const HomeDisplay = ({record,records,displayRecords,newGame})=> {
    const highScores = record.map(rec=> (
        <Records 
                key= {rec.id}
                rolls ={rec.rollsTaken}
                time ={rec.timeTaken}
        />
        
    ))
  const  noScores = <p className="no--records">You gotta play a game first to be in the History books!!!</p>
   
        
    return (
        <main className="home-display" >
          <h1 className="title">Welcome to Tenzies 🎲</h1>
           {!records && <p className="instructions">Start a new game by pressing start new game, or check out your 🏆 High scores 🏆 by pressing records</p>}
               
                {records &&  record.length < 1 && noScores }
                {records &&  record.length >= 1 &&  <div className="record--Box">{highScores}</div>}
            
           <div className="home-display-btn-row"> 
         <button 
                className="roll-dice" 
                onClick= {newGame}
            > New Game </button>
            
         <button 
                className="roll-dice" 
                onClick={displayRecords}
            >
          {records ? "Home": "Records" } 
            </button>
            </div> 
            </main>
    )
}
export default HomeDisplay;

