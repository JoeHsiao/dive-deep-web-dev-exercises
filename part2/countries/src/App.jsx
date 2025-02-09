import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import QueryResults from './components/QueryResults'

const App = () => {
  const [query, setQuery] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => response.data)
      .then(data => {
        console.log(data)
        setCountries(data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <>
      find countries: <input onChange={handleQueryChange} />
      <div>
        <QueryResults query={query} countries={countries} />
      </div>
    </>
  )
}

export default App
