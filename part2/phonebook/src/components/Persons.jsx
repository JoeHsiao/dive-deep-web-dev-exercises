const Persons = ({ persons, handleRemove }) => {

  return (
    <div>
      {persons.map(p =>
        <div key={p.id}>
          {p.name} {p.number} <button onClick={() => handleRemove(p.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons