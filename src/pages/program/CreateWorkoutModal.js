import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WorkoutTypeSelector from "../workout/WorkoutTypeSelector";
import axios from "axios";

export default function CreateWorkoutModal ({showModal, toggleModal, refetch}) {
  const [workoutType, setWorkoutType] = useState("")
  const [workoutTitle, setWorkoutTitle] = useState("")
  const [date, setDate] = useState("");
  const navigate = useNavigate()

  function optionsClick(){
    navigate("/workoutTypeEdit")
  }

  function createClickHandler() {
      putWorkout(date, workoutTitle, workoutType).then(res => {
          setDate("")
          setWorkoutType(null)
          setWorkoutTitle("")
          toggleModal()
          refetch()
      }).catch(reason => {
          alert("error: " + reason)
      })
  }

  return (
    <>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">Add New Workout</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <form>
                  {/* Workout Title */}
                  <div className="mb-3">
                    <label htmlFor="workoutTitle" className="form-label">Workout Title</label>
                    <input type="text" className="form-control" id="workoutTitle" value={workoutTitle} onChange={(e)=>{setWorkoutTitle(e.target.value)}}/>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="workoutType" className="form-label">Workout Type</label>
                    <WorkoutTypeSelector setSelectedWorkoutType={setWorkoutType}/>
                  </div>

                  {/* Date Time Picker */}
                  <div className="mb-3">
                    <label htmlFor="dateTimePicker" className="form-label">Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="form-control" 
                      id="dateTimePicker" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                    />
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" onClick={optionsClick}>Options</button>
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={createClickHandler}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop show"></div>}
    </>
  );
};

async function putWorkout(workoutTime, workoutTitle, workoutTypeId) {

    const options = {
        method: 'PUT',
        url: 'http://localhost:3030/workout/',
        data: {
            workout_time: workoutTime, //'2023-01-01T15:00:00.000Z',
            workout_title: workoutTitle,
            workouttype_id: workoutTypeId
        }
    };

    alert(JSON.stringify(options))

    try {
        const { data } = await axios.request(options);
        console.log(data);
    } catch (error) {
        console.error(error);
        alert(JSON.stringify(error))
    }
}