import React from 'react';

const Person = ({ name, number, clickToDelete }) => {
  return (
          <div>
            {name} {number} <button onClick={clickToDelete}>delete</button>
          </div>
  )
};

const Persons = ({ filterPerson, handleDelete }) => {
  return filterPerson.map(value => <Person key={value.name} name={value.name} number={value.number} clickToDelete={() => {handleDelete(value.id)}}/>)
}

export default Persons;