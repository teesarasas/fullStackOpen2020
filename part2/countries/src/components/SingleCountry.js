import React from 'react';
import Weather from './Weather';

const SingleCountry = ({ countryFilter }) => {
  return (
      <div>
        <h1>{countryFilter.name}</h1>
        <p>capital {countryFilter.capital} <br />population {countryFilter.population}</p>
        <h2>languages</h2>
        <ul>
          {countryFilter.languages.map(language => <li key={language.name}>{language.name}</li> )}
        </ul>
        <img src={countryFilter.flag} alt='nation flag' width="150px"/>
        <br />
        <Weather country={countryFilter} />
      </div>
      
  );
};

export default SingleCountry;