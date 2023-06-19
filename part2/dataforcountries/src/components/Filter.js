const Filter = ({ handleFilterChange, filter }) => {
    return (<div>Find countries <input value={filter}
        onChange={handleFilterChange}
        type="search" /></div>)
}
export default Filter
