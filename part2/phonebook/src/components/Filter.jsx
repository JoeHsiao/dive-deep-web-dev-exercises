const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange}>{filterName}</input>
    </div>
  )
}

export default Filter