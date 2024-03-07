import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
let workoutIdParam = null

export default function Workout() {
    const navigate = useNavigate();
    const { id: workoutId } = useParams();
    console.log(workoutId)
    workoutIdParam = workoutId
    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['workout_overview'], queryFn: getWorkoutById })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    async function deleteWorkout(){
        const options = {
            method: 'DELETE',
            url: 'http://localhost:3030/workout/',
            data: {workout_id: workoutId}
          };
          
          try {
            const { data } = await axios.request(options);
            alert(JSON.stringify(data));
            navigate('/', {replace: true})
          } catch (error) {
            alert(error);
          }
    }

    //const workoutData = data.

    return (
        <div className="container">
            <h1>Workout: {workoutId}</h1>
            <p>{JSON.stringify(data)}</p>
            <div className="row justify-content-center ">
                <div className="col-12 col-lg-4">
                    <button className="btn btn-danger " onClick={deleteWorkout}>Delete Workout</button>
                </div>
            </div>
        </div>
    )
}

async function getWorkoutById() {
    const { data } = await axios.get(`http://localhost:3030/workout/${workoutIdParam}`);
    console.log("workouts: " + JSON.stringify(data))
    return data;
}