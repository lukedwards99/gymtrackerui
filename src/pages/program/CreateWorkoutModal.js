import { useNavigate } from "react-router-dom";
import WorkoutTypeSelector from "../workout/WorkoutTypeSelector";

export default function CreateWorkoutModal ({showModal, toggleModal, date, setDate, createSubmit, setWorkoutType}) {
  const navigate = useNavigate()
  function optionsClick(){
    navigate("/workoutTypeEdit")
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
                    <input type="text" className="form-control" id="workoutTitle" />
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
                <button type="button" className="btn btn-primary" onClick={createSubmit}>Confirm</button>
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