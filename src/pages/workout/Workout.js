import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
let workoutIdParam = null

export default function Workout() {
    const { id: workoutId } = useParams();
    console.log(workoutId)
    workoutIdParam = workoutId
    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['workout_overview'], queryFn: getWorkoutById })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    const workoutDate = data.

    return (
        <div className="container">
            <h1>Workout: {workoutId}</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}

async function getWorkoutById() {
    const { data } = await axios.get(`http://localhost:3030/workout/${workoutIdParam}`);
    //console.log("workouts: " + JSON.stringify(data))
    return data;
}