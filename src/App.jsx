import { useState } from 'react'
import './App.css'

function App() {
  const name = "Oliver";
  const breed = "Golden Retriever";
  const weight = "50 lbs";
  const age = "2 years";
  const country = "United States";

  return (
    <>
      <div className="seen-list">
        <h2>Discovered Breeds</h2>
      </div>
      <div className="discover-tab">
        <h1>Discover unique dogs!</h1>
        <div className="discover-container">
          <div className="entry-container">
            <h2>{name}</h2>
            <img className="entry-image"/>
            <div className="entry-details">
              <button className="attribute-button">{breed}</button>
              <button className="attribute-button">{weight}</button>
              <button className="attribute-button">{age}</button>
              <button className="attribute-button">{country}</button>
            </div>
          </div>
        </div>
        <button className="discover-button">Discover</button>
      </div>
      <div className="ban-list">
        <h2>Ban List</h2>
      </div>
    </>
  )
}

export default App
