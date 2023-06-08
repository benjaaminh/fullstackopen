const Persons = ({filteredList}) => {
    return (
        <div>
        {filteredList.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
    )
}
export default Persons