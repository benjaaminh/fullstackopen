const Filter = ({handleFilterChange, filter}) => {
    return( <div>filter shown with <input value={filter}
    onChange={handleFilterChange}
    type="search"/></div>)
}
export default Filter
