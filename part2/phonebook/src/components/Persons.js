const Persons = ({filteredList, toggleDelete}) => {
    return (
        <div>
        {filteredList.map((person) => <div key={person.id}>{person.name} {person.number}
        <button onClick={toggleDelete}> delete </button>
        </div>)}
      </div>
    )
}
export default Persons