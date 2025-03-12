import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo-sin-fondo.jpg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Pomodoro } from "../component/pomodoro";



export const Profile = () => {
  const [selected, setSelected] = useState("");
  const[date,setDate] = useState(new Date());

    return(
      <div className="parent mx-3 "> 
     
        <div className="calendar">
       <div className="title ">
      <h1 className='text-center'>Calendar</h1>
       </div>
      <div className='calendar-container pr-3'>
        <Calendar onChange={setDate} value={date} />
      
      <p className='text-center mt-3'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
      </div>
        </div>
        <div className="container mt-5 " style={{ justifyContent: "center", alignItems: 'center', textAlign:"center"}}>
          <h1> <b>How are you feeling today?</b></h1>



          
          

          <div className="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="muybien" autoComplete="off" onChange={() => setSelected("muybien")}/>
          <label className={`btn ${selected === "muybien" ? "btn-primary":"btn-outline-primary"}`} htmlFor="muybien">🤩</label>

          <input type="radio" className="btn-check" name="btnradio" id="bien" autoComplete="off" onChange={() => setSelected("bien")}/>
          <label className={`btn ${selected === "bien" ? "btn-primary":"btn-outline-primary"}`} htmlFor="bien">😄 </label>

          <input type="radio" className="btn-check" name="btnradio" id="enamorado" autoComplete="off" onChange={() => setSelected("enamorado")}/>
          <label className={`btn ${selected==="enamorado" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="enamorado">🥰</label>

          <input type="radio" className="btn-check" name="btnradio" id="regular" autoComplete="off" onChange={() => setSelected("regular")}/>
          <label className={`btn ${selected==="regular" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="regular">😑</label>

          <input type="radio" className="btn-check" name="btnradio" id="mal" autoComplete="off" onChange={() => setSelected("mal")}/>
          <label className={`btn ${selected==="mal" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="mal">😞</label>

          <input type="radio" className="btn-check" name="btnradio" id="enfadado" autoComplete="off" onChange={() => setSelected("enfadado")}/>
          <label className={`btn ${selected==="enfadado" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="enfadado">😡</label>

          <input type="radio" className="btn-check" name="btnradio" id="triste" autoComplete="off" onChange={() => setSelected("triste")}/>
          <label className={`btn ${selected==="triste" ? "btn-primary" : "btn-outline-primary"}`} htmlFor="triste">😭</label>
          </div>

          <p> here goes the avatar </p>
          <img src={ logo } alt="Logo sin fondo"/>

           <div className= "container mt-5 mb-5" >
              <button> Check my progress </button>
           </div>  

        </div>  

        

          <div className="pomodoro container">
        <Pomodoro/>


       </div>
        </div>
      )

}