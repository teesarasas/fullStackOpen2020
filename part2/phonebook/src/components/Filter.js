import React from 'react';

const Filter = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with<input onInput={() => nameFilter} type="text" onChange={handleFilterChange}/>
    </div>
  );
};

export default Filter;