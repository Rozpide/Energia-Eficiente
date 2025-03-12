import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/pomodoro.css";

export const Pomodoro = () => {
    const work_time = 25*60; //25min en seg
    const break_time = 5*60; //5 min en seg 

    const{store, actions} = useContext(Context);

    const [workTime, setWorkTime] = useState (true); // true = working false = descanso
    const [completedCycles, setCompletedCycles] = useState(Number(localStorage.getItem("cycles")) || 0);
    const [timeLeft, setTimeLeft] = useState(25 * 60);//25 min en seg
    const [started, setStarted] = useState(false);

    useEffect(() => {
        let timer;
        if (started && timeLeft > 0 ) {
            timer = setInterval(() => {
                setTimeLeft((time) => time - 1);

            }, 1000);
        
        } else if (timeLeft===0) {
            if (workTime) {
                alert ("Break time!");
                setWorkTime(false);
                setTimeLeft(break_time);

            } else {
                 alert ("Session completed!");
                 setWorkTime(true);
                 setTimeLeft(work_time);
                 const newCycle = completedCycles + 1;
                 setCompletedCycles(newCycle);
                 localStorage.setItem("cycles", newCycle);
            }
            setStarted(false);
           
        }

        return () => clearInterval(timer);

    }, [started, setTimeLeft, workTime, completedCycles, timeLeft]);

    const timeFormat = (seconds) => {
        const minutes = Math.floor (seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString() .padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;

    }



return (

<div className="pomodoro container">
<h1>Pomodoro</h1>
{/* // Full screen modal */}
<div class="modal-dialog modal-fullscreen-sm-down">
    <h2>{timeFormat(timeLeft)}</h2>
    <p>{workTime ? "Work" : "Break" }</p>
    <button onClick={ ()=> setStarted(!started)}>
        {started ? "Stop" : "Start"}
    </button>
    <button onClick={()=> {setTimeLeft(workTime ? work_time : break_time); setStarted(false);}}>
        Start Again
    </button>
    <h3>Completed Sessions: {completedCycles}</h3></div>
</div>
)

};