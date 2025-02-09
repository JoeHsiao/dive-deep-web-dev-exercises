import SingleCountryView from './SinglCountryView'

import { useState, useEffect } from 'react'

const QueryResults = ({ query, countries }) => {
  const [shownCountry, setShownCountry] = useState(null)

  const handleShowCountry = (country) => {
    setShownCountry(country)
  }

  useEffect(() => {
    setShownCountry(null)
  }, [query])

  if (!query)
    return null

  const results = countries.filter(c => c.name.common.toLowerCase().startsWith(query.toLowerCase()))
  if (results.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  } else if (results.length == 1) {
    const country = results[0]
    return (
      <div>
        <SingleCountryView country={country} />
      </div>
    )
  } else if (results.length === 0) {
    return null
  } else {
    return (
      <>
        {
          results.map(x => (
            <div key={x.name.common}>
              {x.name.common}<button onClick={() => handleShowCountry(x)}>show</button>
            </div>
          ))
        }
        <SingleCountryView country={shownCountry} />
      </>
    )
  }
}

export default QueryResults