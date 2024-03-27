
import AddExerciseCollapse from "../exercise/AddExerciseCollapse";
import { useQuery } from "@tanstack/react-query";
import DisplayExercise from "./DisplayExercise";
import axios from "axios";

function WorkoutExercisePane({ workoutId }) {
    async function getExercises() {
        console.log("workoutID: " + workoutId)
        const { data } = await axios.request({
            method: 'GET',
            url: `http://localhost:3030/exerciseselection/${workoutId}`,
            // data: { "workout_id": workoutId }
        });
        return data
    }
    const { data, error, isLoading, refetch: refetchExercises } = useQuery({ queryKey: ['exercise_info_' + workoutId + workoutId], queryFn: getExercises })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    if (data.success === false) return <div>Sever Error: {data.message}</div>

    console.log("ExerciseData: " + JSON.stringify(data))
    const exercises = data.exercises
    exercises.sort((a,b) => a.order - b.order)

    return (
        <>
            {exercises.map(exercise => {
                return (
                    <DisplayExercise exercise={exercise} refetch={refetchExercises} key={exercise.workout_selection_id}/>
                )
            })}
            <AddExerciseCollapse refetch={refetchExercises} />
        </>
    )
}

export default WorkoutExercisePane