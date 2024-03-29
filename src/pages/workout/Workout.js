import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EditWorkoutDetails from "./EditWorkoutDetails";
import WorkoutExercisePane from "../exercise/WorkoutExercisePane";

export default function Workout() {
    const navigate = useNavigate();
    const { id: workoutId } = useParams();
    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['workout_info_' + workoutId + workoutId], queryFn: getWorkoutById })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    async function getWorkoutById() {
        const { data } = await axios.get(`http://localhost:3030/workout/${workoutId}`);
        // console.log("workouts: " + JSON.stringify(data))
        return data.workoutData;
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <div>
                        <h1 className="h1">{data.workout_title}</h1>
                        <p className="">{data.day_name}: {data.workout_time.substring(0, 10)}</p>
                        <p className="">Day#:{data.day_number}</p>
                    </div>
                </div>

                <WorkoutExercisePane workoutId={workoutId}/>

                <EditWorkoutDetails workoutId={workoutId} exerciseData={data} />
            </div>
        </>
    )
}
