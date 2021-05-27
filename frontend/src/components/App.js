import {useState} from "react"
import DatabasePage from "./DatabasePage"

const App = () => {
  const [currentDatabase, setCurrentDatabase] = useState("")

  const setCurrentDatabaseHandler = db => {
    if(currentDatabase && currentDatabase===db) {
      setCurrentDatabase("")
    } else {
      setCurrentDatabase(db)
    }
  }

  return (
    <div className="App">
      <h1>Kubernetes Example</h1>
      {
        ["mongo", "redis"].map((db, index) =>
          <button key={index} onClick={() => setCurrentDatabaseHandler(db)}>{db}</button>
        )
      }
      {
        currentDatabase ? <DatabasePage key={currentDatabase} database={currentDatabase}/> : ""
      }
    </div>
  );
}

export default App;
