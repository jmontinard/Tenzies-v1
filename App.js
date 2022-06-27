import React from "react"
import Die from "./Die"
import GameDisplay from "./GameDisplay"
import HomeDisplay from "./HomeDisplay"
import {nanoid} from "nanoid"
import { useElapsedTime } from "use-elapsed-time";
import Confetti from "react-confetti"

const App=()=> {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [btnCount, setBtnCount] = React.useState(0)
    const [inGame, setInGame] = React.useState(false)
    const [showRecords,setShowRecords] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [records, setRecords] = React.useState(
    JSON.parse(localStorage.getItem("records")) || []
  );
    const { elapsedTime } = useElapsedTime({ isPlaying });
    
React.useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);
  
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    const newRecord = () => {
   
    if (isPlaying) {
        const time = new Date(elapsedTime)
      const newRecord = {
        id: nanoid(),
        timeTaken: time >=100 ? `${time.getMinutes()}:${time.getSeconds()}s`:
         `${elapsedTime.toFixed(2)}s` ,
        // We will leave this as s for now then we will update in v2 to change for mins \
        // ${date.getMinutes()}:${date.getSeconds()}`
        // `${elapsedTime.toFixed(2)}s`
        // timeTaken: time >=100 ? `${time.getMinutes()}:${time.getSeconds()}s`:
        //  `${elapsedTime.toFixed(2)}s` ,
        rollsTaken: btnCount,
      };
      return setRecords((prevRec) => [newRecord, ...prevRec]);
    }
  };

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        setBtnCount(prevCount => prevCount + 1)
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
      setInGame(false)            
            setTenzies(false)
            setDice(allNewDice())
              newRecord() 
               setIsPlaying(false)
        }}
    
  const newGame = ()=>{
      setInGame(prevInGame => !prevInGame)
      setIsPlaying(prevIsPlaying => !prevIsPlaying)
  }
  
    const displayRecords = ()=> {setShowRecords(prevRecords => !prevRecords)}
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value}
            dieClassName = {`face${die.value}`}
            innerHtml ={[...Array(die.value)].map((dot, index) => <span className ="pip" key ={index}> </span>)} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div className="container">
             {!inGame 
            &&
            <HomeDisplay 
                tenzies = {tenzies} 
                newGame ={newGame}
                records ={showRecords} 
                record = {records}
                displayRecords ={displayRecords}
             />
            }
            {tenzies && <Confetti />}
            
            {inGame
            &&
            <GameDisplay 
                tenzies = {tenzies}
                diceElements = {diceElements}
                rollDice ={rollDice}
             />
            }
        </div>
    )
}
export default App