import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export default function ExerciseTypeSelector({setSelectedExerciseType}) {


    const { data, error, isLoading } = useQuery({ queryKey: ['exercise_types'], queryFn: getExerciseTypes })

    function handleClickEvent(e){
        setSelectedExerciseType(e.target.value)
    }

    let inputField = null
    if(isLoading) {
        inputField = <input className="form-control" type="text" disabled placeholder="Loading..."></input>
    }else if(error){
        alert("error fetching workout types")
        inputField = <input className="form-control" type="text" disabled placeholder="Error Fetching WorkoutTypes"></input>
    }else{
        inputField = (
            <select className="form-select" id="exerciseType" onChange={handleClickEvent}>
                <option></option>
                {data.map((workoutType) => {
                    return <option value={workoutType.uid} key={workoutType.uid}>{workoutType.category_name}</option>
                })}
            </select>
        )
    }

    return (
        <>
            {inputField}
        </>
    )
}



async function getExerciseTypes() {
    const options = { method: 'GET', url: 'http://localhost:3030/exercise/type/active' };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        return false
    }
}
