import { useState } from 'react';
import './App.css';
const apiKey = import.meta.env.VITE_API_ACCESS_KEY;

function App() {
  const [currentEntry, setCurrentEntry] = useState(null);
  const [allBreedsList, setAllBreedsList] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [bannedList, setBannedList] = useState([]);

  const getBreeds = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      method: "GET",
      headers: {
        "x-api-key": apiKey
      }
    });
    const data = await response.json();

    if (!data || data.length === 0) {
      alert("Error fetching cat breeds");
      return;
    }

    const withImgOnly = data.filter(breed => Object.hasOwn(breed, "reference_image_id"))
    setAllBreedsList(withImgOnly);

    const random = Math.floor(Math.random() * withImgOnly.length);
    setCurrentEntry(withImgOnly[random]);
    console.log(withImgOnly[random]);
  };

  const handleDiscover = () => {
    if (!currentEntry || filteredBreeds.length === 0) {
      getBreeds();
    }
    else {
      const random = Math.floor(Math.random() * filteredBreeds.length);
      setCurrentEntry(filteredBreeds[random]);
      console.log(filteredBreeds[random]);
    }
  };

  const handleBan = (attribute) => {
    if (!bannedList.includes(attribute)) {
      const newBannedList = [...bannedList, attribute];
      setBannedList(newBannedList);

      const newBreedsList = allBreedsList.filter(breed => !newBannedList.includes(breed.origin));
      setFilteredBreeds(newBreedsList);
    }
  };

  const handleUnban = (attribute) => {
    const newBannedList = bannedList.filter(banned => banned !== attribute);
    const newBreedsList = allBreedsList.filter(breed => !newBannedList.includes(breed.origin));
    setBannedList(newBannedList);
    setFilteredBreeds(newBreedsList);
  };

  return (
    <>
      <div className="discover-tab">
        <h1>Browse through cat breeds!</h1>
        <div className="discover-container">
          {currentEntry ? 
            <div className="entry-container">
              <h2>{currentEntry.name}</h2>
              <img className="entry-image" src={`https://cdn2.thecatapi.com/images/${currentEntry.reference_image_id}.jpg`}/>
              <div className="entry-details">
                <button className="attribute" id="origin" onClick={() => handleBan(currentEntry.origin)}>{currentEntry.origin}</button>
                <button className="attribute">Weight in lbs: {currentEntry.weight.imperial}</button>
                <button className="attribute">Lifespan: {currentEntry.life_span} years</button>
                <button className="attribute">{currentEntry.indoor === 0 ? "Indoor" : "Outdoor"}</button>
              </div>
            </div>
          : null}
        </div>
        <button className="discover-button" onClick={handleDiscover}>Give Me a Random Cat</button>
      </div>
      <div className="ban-list">
        <h2>Ban List</h2>
        <h4>Click on the place of origin to filter it out of the set!</h4>
        {bannedList.map((attribute) => (
          <button key={attribute} className="banned" onClick={() => handleUnban(attribute)}>{attribute}</button>
        ))}
      </div>
    </>
  )
}

export default App;