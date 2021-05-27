import axios from 'axios'
import {useState, useEffect, useCallback} from "react"

const DatabasePage = ({database}) => {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST

    const [people, setPeople] = useState([])

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

    const handleForm = event => {
        event.preventDefault()
        const name = event.target.name.value
        postPerson(name)
        event.target.reset()
    }

    return (
      <div className="DatabasePage">
        <h2>{database}</h2>
        <button onClick={getPeople}>GET</button>
        <form onSubmit={handleForm}>
            <input name="name" placeholder="person name"/>
            <button type="submit">POST</button>
        </form>
        <h3>People</h3>
        <ul>
            {people.map((person, index) => <li key={index}>{person.name} ({person.id ?? person._id})</li>)}
        </ul>
      </div>
    );
  }
  
  export default DatabasePage;