import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditWorkoutDetails({ workoutId, exerciseData}) {
    const navigate = useNavigate()
    const [workoutTitle, setWorkoutTitle] = useState(exerciseData.workoutTitle);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [isDelCollapseOpen, setIsDelCollapseOpen] = useState(false);
    const toggleMainCollapse = () => setIsCollapseOpen(!isCollapseOpen);
    const toggleDelCollapse = () => setIsDelCollapseOpen(!isDelCollapseOpen);

    async function deleteWorkout() {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:3030/workout/',
            data: { workout_id: workoutId }
        };

        try {
            const { data } = await axios.request(options);
            alert(JSON.stringify(data));
            navigate('/', { replace: true })
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <div className="row justify-content-center mb-3">
                <div className="col-12 col-lg-4">
                    <button className="btn btn-secondary " onClick={toggleMainCollapse}>Edit Workout Details</button>
                </div>
            </div>
            <div className={isCollapseOpen ? 'collapse show' : 'collapse'}>
                <div className="input-group w-100 mb-3">
                    <label className="input-group-text" htmlFor="workoutTitleInput" >Title</label>
                    <input className="form-control" id="workoutTitleInput" value={workoutTitle} onChange={(e) => {setWorkoutTitle(e.target.value)}}/>
                </div>
                <div className="input-group w-100 mb-3">
                    <label className="input-group-text" htmlFor="workoutTypeInput" >Type</label>
                    <input className="form-control" id="workoutTypeInput" />
                </div>
                <div className="input-group w-100 mb-3">
                    <label className="input-group-text" htmlFor="workoutDayInput" >Day #</label>
                    <input className="form-control" id="workoutDayInput" />
                </div>
                <div className="input-group w-100 mb-3">
                    <label className="input-group-text" htmlFor="workoutDateInput" >Date</label>
                    <input className="form-control" id="workoutDateInput" />
                </div>
                <div className="row justify-content-center ">
                    <div className="col-12 col-lg-4">
                        <button className="btn btn-danger " onClick={toggleDelCollapse}>Delete Workout</button>
                    </div>
                </div>
                <div className={isDelCollapseOpen ? 'collapse show' : 'collapse'}>
                    <button className="btn btn-outline-danger " onClick={deleteWorkout}>Confirm Delete</button>
                </div>
            </div>
        </>
    )

}

export default EditWorkoutDetails