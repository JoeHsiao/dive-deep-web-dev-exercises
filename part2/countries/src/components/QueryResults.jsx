const QueryResults = ({ query, countries }) => {
  if (!query)
    return
  console.log('querying keyword', query);

  const results = countries.filter(c => c.name.common.toLowerCase().startsWith(query.toLowerCase()))
  if (results.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  } else if (results.length == 1) {

  } else if (results.length === 0) {
    return
  } else {
    return (
      <>
        {
          results.map(x => (
            <div key={x.name.common}>
              {x.name.common}
            </div>
          ))
        }
      </>
    )
  }
}

export default QueryResults