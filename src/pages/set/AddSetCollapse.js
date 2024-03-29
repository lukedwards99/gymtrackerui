import { useState } from "react"
import DisplaySets from "./DisplaySets"

export default function AddSetCollapse({ refetch, exercise_selection_id, showCollapse, toggleCollapse }) {
    const [reps, setReps] = useState(0)
    console.log("exercise selection id: " + exercise_selection_id)

    async function addSetCall() {

    }

    return (
        <>
            <DisplaySets exercise_selection_id={exercise_selection_id} />
            <div className={showCollapse ? 'collapse show' : 'collapse'}>
                <div className="row mt-2">
                    <div className="col-3">
                        <label htmlFor={`addSetReps_${exercise_selection_id}`} className="text-secondary ">Reps</label>
                    </div>
                    <div className="col-3">
                        <label htmlFor={`addSetStim_${exercise_selection_id}`} className="text-secondary ">Stimulation</label>
                    </div>
                    <div className="col-3">
                        <label htmlFor={`addSetDif_${exercise_selection_id}`} className="text-secondary ">RPE</label>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <input type="text" className="form-control" id={`addSetReps_${exercise_selection_id}`} />
                    </div>
                    <div className="col-3">
                        <input type="text" className="form-control" id={`addSetStim_${exercise_selection_id}`} />
                    </div>
                    <div className="col-3">
                        <input type="text" className="form-control" id={`addSetDif_${exercise_selection_id}`} />
                    </div>
                    <div className="col-3">
                        <button className="btn btn-outline-primary ">Add Set</button>
                    </div>
                </div>
                <button className="btn btn-link " onClick={toggleCollapse}>Hide</button>
            </div>
        </>
    )

}