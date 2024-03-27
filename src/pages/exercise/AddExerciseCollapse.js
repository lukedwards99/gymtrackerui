import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GreenPlusButton from "../common/GreenPlusButton";
import ExerciseTypeSelector from "./ExerciseTypeSelector";
import axios from "axios";

function AddExerciseCollapse({ refetch }) {

    const { id: workoutId } = useParams();
    const [exerciseTypeID, setExerciseTypeID] = useState("")
    const navigate = useNavigate()
    const [showCollapse, setShowCollapse] = useState(false);
    const toggleCollapse = () => setShowCollapse(!showCollapse);


    async function submitHandler() {
        const options = {
            method: 'PUT',
            url: 'http://localhost:3030/exerciseselection/',
            data: { 
                exercise_name_id: exerciseTypeID, 
                workout_id: workoutId
            }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            refetch()
            toggleCollapse()
        } catch (error) {
            console.error(error);
            alert(JSON.stringify(error))
        }
    }

    return (
        <div className="mb-3">
            <div className="d-flex justify-content-center ">
                <div className="w-50 mb-3">
                    <GreenPlusButton onClickEvent={toggleCollapse} />
                </div>
            </div>
            <div className={showCollapse ? 'collapse show' : 'collapse'}>
                <form className="p-3">
                    <div className="input-group">
                            <label htmlFor="exerciseType" className="input-group-text ">Exercise Type</label>
                            <ExerciseTypeSelector id="exerciseType" setSelectedExerciseType={setExerciseTypeID} />

                        <button type="button" className="btn btn-primary" onClick={submitHandler}>Confirm</button>
                    </div>
                </form>

                <button type="button" className="btn btn-dark" onClick={() => { navigate("/exerciseTypeEdit") }}>Edit Types</button>
                <button type="button" className="btn btn-danger m-2" onClick={toggleCollapse}>Cancel</button>
            </div>

        </div>
    )
}

export default AddExerciseCollapse