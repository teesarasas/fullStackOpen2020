import React from 'react';

const FindCountries = ({ countryFilter , handleCountryChange }) => {
  return (
    <div>find countries<input value={countryFilter} type="text" onChange={handleCountryChange}></input></div>
  )
}

export default FindCountries;