import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    (async() => {
      try {
        if (name) {
          const request = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
          setCountry({ found: true, data: request.data[0]})
        }
      }
      catch (error) {
        console.log(error)
        setCountry({ found: false, data: null})
      }
    })()
  }, [name])

  return country
}