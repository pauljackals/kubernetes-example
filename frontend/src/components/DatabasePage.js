import axios from 'axios'
import {useState, useEffect, useCallback} from "react"

const DatabasePage = ({database}) => {
    const [people, setPeople] = useState([])
    const [error, setError] = useState(false)

    const getPeople = useCallback(async () => {
        const response = await axios.get(`/${database}`)
        const data = response.data
        setPeople(data.people)
    }, [database])

    useEffect(() => {
        getPeople()
    }, [getPeople])

    const postPerson = async name => {
        await axios.post(`/${database}`, {name})
        getPeople()
    }

    const deletePerson = async id => {
        await axios.delete(`/${database}/${id}`)
        getPeople()
    }

    const handleForm = event => {
        event.preventDefault()
        const name = event.target.name.value
        if(name.length && name.length <= 70) {
            postPerson(name)
            if(!error) {
                setError(false)
            }
            event.target.reset()
        } else {
            setError(true)
        }
    }

    return (
      <div className="DatabasePage">
        <h2>{database}</h2>
        <button onClick={getPeople}>refresh</button>
        {
            error ?
            <div>name must be between 1 and 70 characters</div> :
            ""
        }
        <form onSubmit={handleForm} onBlur={() => setError(false)}>
            <input name="name" placeholder="person name"/>
            <button type="submit">add</button>
        </form>
        <h3>People</h3>
        <ul>
            {people.map((person, index) => <li key={`${index}_${person.id ?? person._id}`}>
                {person.name}
                <button onClick={() => deletePerson(person.id ?? person._id)}>X</button>
            </li>)}
        </ul>
      </div>
    );
  }
  
  export default DatabasePage;