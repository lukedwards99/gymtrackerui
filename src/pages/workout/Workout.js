import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ExerciseRow from "../exercise/ExerciseRow";
import GreenPlusButton from "../common/GreenPlusButton";
import { useState } from "react";
import AddExerciseModal from "../exercise/AddExerciseModal";
import EditWorkoutDetails from "./EditWorkoutDetails";
let workoutIdParam = null

export default function Workout() {
    const navigate = useNavigate();
    const { id: workoutId } = useParams();
    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['exercise_id_' + workoutId], queryFn: getWorkoutById })
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    async function getWorkoutById() {
        const { data } = await axios.get(`http://localhost:3030/workout/${workoutId}`);
        console.log("workouts: " + JSON.stringify(data))
        return data;
    }

    data.exercises.sort((a,b) => a.order - b.order)


    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate(-1)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <div>
                        <h1 className="h1">{data.title}</h1>
                        <p className="">{data.dayName}: {data.time.substring(0, 10)}</p>
                    </div>
                </div>
                <div className="row m-1">
                    <div className="col-3 fw-bold "> Exercise </div>
                    <div className="col-2 fw-bold "> Reps </div>
                    <div className="col-3 fw-bold "> Stimulation </div>
                    <div className="col-3 fw-bold "> Difficulty </div>
                    <div className="col-1"></div>
                </div>
                {data.exercises.map((exercise => {
                    return (
                        <ExerciseRow exercise={exercise} key={exercise.uid} refetch={refetch}/>
                    )
                }))}
                <div className="d-flex justify-content-center ">
                    <div className="w-50 mb-3">
                        <GreenPlusButton onClickEvent={toggleModal} />
                    </div>
                </div>

               <EditWorkoutDetails workoutId={workoutId}/> 
            </div>
            <AddExerciseModal
                showModal={showModal}
                toggleModal={toggleModal}
                refetch={refetch} />
        </>
    )
}
