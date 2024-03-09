import axios from "axios"
import { useState } from "react"

function AddExerciseType({refetch}) {

    const [exerciseName, setExerciseName] = useState("")
    function addClickHandler(e){
        putExerciseType(exerciseName).then(()=>{
            setExerciseName("")
            refetch()
        })
    }

    return (
        <div className="input-group w-100">
            <label className="input-group-text" htmlFor="newWorkoutDayInput">Add Exercise</label>
            <input id="newWorkoutDayInput" className="form-control" value={exerciseName} onChange={(e)=>{setExerciseName(e.target.value)}} />
            <button className="btn btn-primary" onClick={addClickHandler}>Add</button>
        </div>
    )
}

export default AddExerciseType

async function putExerciseType(day){

    const options = {
      method: 'PUT',
      url: 'http://localhost:3030/exercise/type',
      data: {name: day}
    };
    
    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
}