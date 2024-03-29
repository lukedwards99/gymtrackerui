import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faArrowUp, faArrowDown, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "../common/ConfimModal";
import { useState } from "react"
import AddSetCollapse from "../set/AddSetCollapse";
import DisplaySets from "../set/DisplaySets";

function DisplayExercise({ exercise, refetch }) {
    console.log(exercise)
    
    const [showModal, setShowModal] = useState(false)
    const toggleModal = ()=>{setShowModal(!showModal)}

    const [showCollapse, setShowCollapse] = useState(false)
    const toggleCollapse = () => {setShowCollapse(!showCollapse)}


    async function deleteClickHandler() {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:3030/exerciseselection/',
            data: { exercise_selection_id: exercise.workout_selection_id }
        }

        try {
            const { data } = await axios.request(options)
            console.log(data)
            refetch()
            toggleModal()
        } catch (error) {
            console.error(error)
            alert(JSON.stringify(error))
        }
    }

    async function moveExercise(direction) {
        const options = {
            method: 'POST',
            url: 'http://localhost:3030/exerciseselection/' + direction,
            data: { exercise_selection_id: exercise.workout_selection_id }
        }

        try {
            const { data } = await axios.request(options)
            console.log(data)
            refetch()
        } catch (error) {
            console.error(error)
            alert(JSON.stringify(error))
        }
    }

   console.log(exercise) 
    

    return (
        <div className="row justify-content-center ">

            <div className="col-4">
                <h2 className="h4 text-secondary ">
                    {exercise.category_name}
                </h2>
            </div>
            <div className="col-4">
                <button className="btn btn-primary btn-sm me-3" onClick={() => toggleCollapse()}>
                    <FontAwesomeIcon icon={faAdd} />
                </button>
                <button className="btn btn-secondary btn-sm me-3" onClick={() => moveExercise("up")}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => moveExercise("down")}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            </div>
            <div className="col-2">
                <button className="btn btn-danger btn-sm" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>


            <AddSetCollapse 
                refetch={refetch} 
                exercise_selection_id={exercise.workout_selection_id} 
                showCollapse={showCollapse} 
                toggleCollapse={toggleCollapse}/>

            <ConfirmModal
                onConfirm={deleteClickHandler}
                showModal={showModal}
                toggleModal={toggleModal} >
                <p> Are you sure you want to delete this exercise?  </p>
            </ConfirmModal>

        </div>
    )
}

export default DisplayExercise