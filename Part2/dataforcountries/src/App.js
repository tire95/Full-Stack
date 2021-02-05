import React, { useState, useEffect } from 'react'
import axios from 'axios'

import "./App.css"

const Countries = ({ countries, setNewSearch }) => {


  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        <div>{countries.map(country => <p key={country.name}> {country.name} <button onClick={() => setNewSearch(country.name)}>Show</button></p>)}</div>
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map(country => <div key={country.name}>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
              <p>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</p>
            </ul>
            <div>
             <img className="photo" src={country.flag} alt="Flag " />
            </div>
          </div>)}
      </div>
    )
  } else {
    return (
      <div>
        <p>No matches</p>
      </div>
    )
  }
}

const Search = ({ value, setNewSearch }) => {
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <form>
      <div>
        filter shown with:
        <input value={value} onChange={handleSearchChange}/>
      </div>
    </form>
  )
}

const App = () => {

  const [ countries, setCountries ] = useState([]) 
  const [ search, setNewSearch ] = useState('')


  const countriesToShow = search.length > 0 ? countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase())) : countries

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Find countries</h2>
      <Search value={search} setNewSearch={setNewSearch}/>
      <div>
        <Countries countries={countriesToShow} setNewSearch={setNewSearch}/>
      </div>
    </div>
  )
}

export default App;
