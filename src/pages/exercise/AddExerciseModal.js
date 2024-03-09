import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseTypeSelector from "./ExerciseTypeSelector";
import axios from "axios";

function AddExerciseModal({ showModal, toggleModal, refetch }) {

    const { id: workoutId } = useParams();
    const [exerciseTypeID, setExerciseTypeID] = useState("")
    const [reps, setReps] = useState("")
    const [rpe, setRPE] = useState("")
    const [stimulation, setStimulation] = useState("")
    const navigate = useNavigate()

    async function submitHandler() {
        const options = {
            method: 'PUT',
            url: 'http://localhost:3030/exerciseselection/'+workoutId,
            data: { exercise_name_id: exerciseTypeID, reps: reps, difficulty: rpe, stimulation: stimulation }
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            refetch()
            toggleModal()
        } catch (error) {
            console.error(error);
            alert(JSON.stringify(error))
        }
    }

    return (
        <>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Exercise</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exerciseType" className="form-label">Exercise Type</label>
                                        <ExerciseTypeSelector id="exerciseType" setSelectedExerciseType={setExerciseTypeID} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="repInput" className="form-label">Reps</label>
                                        <input id="repInput" type="number" className="form-control " onChange={(e) => { setReps(e.target.value) }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="difficultyInput" className="form-label">RPE</label>
                                        <input id="difficultyInput" type="number" max={10} min={0} className="form-control " onChange={(e) => { setRPE(e.target.value) }} />
                                        <div className="text-muted">Score between 1-10</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stimulationInput" className="form-label">Stimulation</label>
                                        <input id="stimulationInput" type="number" max={10} min={0} className="form-control" onChange={(e) => { setStimulation(e.target.value) }} />
                                        <div className="text-muted">Score between 1-10</div>
                                    </div>
                                </form>
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" onClick={() => { navigate("/exerciseTypeEdit") }}>Options</button>
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={submitHandler}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {showModal && <div className="modal-backdrop show"></div>}
        </>
    )
}

export default AddExerciseModal