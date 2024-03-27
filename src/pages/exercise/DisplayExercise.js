import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faArrowUp, faArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "../common/ConfimModal";
import { useState } from "react"

function DisplayExercise({ exercise, refetch }) {
    
    const [showModal, setShowModal] = useState(false)

    const toggleModal = ()=>{setShowModal(!showModal)}

    async function deleteClickHandler() {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:3030/exerciseselection/',
            data: { exercise_selection_id: exercise.uid }
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

    async function moveExercise(direction) {
        const options = {
            method: 'POST',
            url: 'http://localhost:3030/exerciseselection/' + direction,
            data: { exercise_selection_id: exercise.uid }
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

    return (
        <div className="row">

            <div className="col-2">
                <button className="btn btn-secondary btn-sm" onClick={() => moveExercise("up")}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
            <div className="col-2">
                <button className="btn btn-danger btn-sm" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <div className="col-2">
                <button className="btn btn-secondary btn-sm" onClick={() => moveExercise("down")}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            </div>
            <div className="col-4">
                <h1 className="h1 text-secondary ">
                    {exercise.category_name}
                </h1>
            </div>

            <ConfirmModal
                onConfirm={deleteClickHandler}
                showModal={showModal}
                toggleModal={toggleModal}
            >
                <p>
                    Are you sure you want to delete?
                </p>

            </ConfirmModal>

        </div>
    )
}

export default DisplayExercise