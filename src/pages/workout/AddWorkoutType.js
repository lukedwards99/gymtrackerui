import axios from "axios"
import { useState } from "react"

function AddWorkoutType({refetch}) {

    const [newDayName, setNewDayName] = useState("")
    function addClickHandler(e){
        putWorkoutType(newDayName).then(()=>{
            setNewDayName("")
            refetch()
        })
    }

    return (
        <div className="input-group w-100">
            <label className="input-group-text" htmlFor="newWorkoutDayInput">Add Day</label>
            <input id="newWorkoutDayInput" className="form-control" value={newDayName} onChange={(e)=>{setNewDayName(e.target.value)}} />
            <button className="btn btn-primary" onClick={addClickHandler}>Add</button>
        </div>
    )
}

export default AddWorkoutType

async function putWorkoutType(day){

    const options = {
      method: 'PUT',
      url: 'http://localhost:3030/workout/type',
      data: {name: day}
    };
    
    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}