//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);

  function scoreHandler(teamName, score)
  {
    if(teamName === "home")
      setHomeScore(homeScore + score);
    else if(teamName === "away")
      setAwayScore(awayScore + score); 
  };

  function quarterHandler()
  {
    if(quarter < 4)
      setQuarter(quarter + 1);
    else 
      setQuarter(1);
  };


  return (
    <div className="container">
      {ScoreBoard(homeScore, awayScore, quarter)};
      {Buttons(scoreHandler, quarterHandler)};
    </div>
  );
}

function ScoreBoard (homeScore, awayScore, quarter) {
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(0);

  function resetTime() {
    setMinute(15);
    setSecond(0);
  }
  
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if(second === 0 && minute > 0)
      {
        setMinute(minute - 1);
        setSecond(59);
      }
      else if(second > 0)
        setSecond(second - 1);
      else
        resetTime();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <section className="scoreboard">
    <div className="topRow">
      <div className="home">
        <h2 className="home__name">Lions</h2>
        <div className="home__score">{homeScore}</div>
      </div>
        {second > 0 ? <div className="timer">{minute}:{second}</div> : <div className="timer">{minute}:{second}0</div>}
      <div className="away">
        <h2 className="away__name">Tigers</h2>
        <div className="away__score">{awayScore}</div>
      </div>
    </div>
    {BottomRow(quarter)}
    </section>
  );
}

function Buttons(scoreHandler, quarterHandler) {
  return (
    <section className="buttons">
      {HomeButtons(scoreHandler)}
      {QuarterButton(quarterHandler)}
      {AwayButtons(scoreHandler)}
    </section>
  );
}

function HomeButtons(scoreHandler) {
  return (
    <div className="homeButtons">
      {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
      <button className="homeButtons__touchdown" onClick={ () => scoreHandler("home", 7)}>Home Touchdown</button>
      <button className="homeButtons__fieldGoal" onClick={ () => scoreHandler("home", 3)}>Home Field Goal</button>
    </div>
  );

}

function QuarterButton(quarterHandler) {
  return (
    <div className="quarterButton">
      <button className="quarterButton" onClick={ () => quarterHandler()}>Quarter</button>
    </div>
  );

}

function AwayButtons(scoreHandler) {
  return (
    <div className="awayButtons">
      <button className="awayButtons__touchdown" onClick={ () => scoreHandler("away", 7)}>Away Touchdown</button>
      <button className="awayButtons__fieldGoal" onClick={ () => scoreHandler("away", 3)} >Away Field Goal</button>
    </div>
  );
  
}





export default App;
