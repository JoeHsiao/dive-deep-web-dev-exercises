import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import QueryResults from './components/QueryResults'
import shortId from 'shortid'

const App = () => {
  const [query, setQuery] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => response.data)
      .then(data => {
        setCountries(data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <>
      find countries: <input id={shortId.generate()} onChange={handleQueryChange} />
      <div>
        <QueryResults query={query} countries={countries} />
      </div>
    </>
  )
}

export default App
