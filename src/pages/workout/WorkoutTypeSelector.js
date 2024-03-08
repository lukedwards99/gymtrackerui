import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export default function WorkoutTypeSelector({setSelectedWorkoutType}) {


    const { data, error, isLoading } = useQuery({ queryKey: ['workout_types'], queryFn: getWorkoutTypes })

    function handleClickEvent(e){
        setSelectedWorkoutType(e.target.value)
    }

    let inputField = null
    if(isLoading) {
        inputField = <input className="form-control" type="text" disabled placeholder="Loading..."></input>
    }else if(error){
        alert("error fetching workout types")
        inputField = <input className="form-control" type="text" disabled placeholder="Error Fetching WorkoutTypes"></input>
    }else{
        inputField = (
            <select className="form-select" onChange={handleClickEvent}>
                <option></option>
                {data.map((workoutType) => {
                    return <option value={workoutType.uid} key={workoutType.uid}>{workoutType.day_name}</option>
                })}
            </select>
        )
    }

    return (
        <div>
            {inputField}
        </div>
    )
}



async function getWorkoutTypes() {
    const options = { method: 'GET', url: 'http://localhost:3030/workout/type/active' };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        return false
    }
}
