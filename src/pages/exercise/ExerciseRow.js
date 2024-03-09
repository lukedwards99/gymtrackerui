import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faArrowUp, faArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function ExerciseRow({ exercise, refetch }) {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [isDelCollapseOpen, setIsDelCollapseOpen] = useState(false);
    const { id: workoutId } = useParams();

    const toggleMainCollapse = () => setIsCollapseOpen(!isCollapseOpen);
    const toggleDeleteCollapse = () => setIsDelCollapseOpen(!isDelCollapseOpen);

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

    return (
        <div className="row border border-2 border-secondary m-1 mb-3">
            <div className="col-3 bg-secondary-subtle ">{exercise.name}</div>
            <div className="col-2 bg-primary-subtle ">{exercise.reps}</div>
            <div className="col-3 bg-secondary-subtle ">{exercise.simulationScore}</div>
            <div className="col-3 bg-primary-subtle ">{exercise.difficultyScore}</div>
            <div className="col-1 bg-secondary-subtle ">
                <div role="button" onClick={toggleMainCollapse}>
                    <FontAwesomeIcon className="text-primary " icon={faInfoCircle} />
                </div>
            </div>
            <div className={isCollapseOpen ? 'collapse show' : 'collapse'}>
                <div className="row justify-content-between m-2">
                    <div className="col-2">
                        <button className="btn btn-secondary btn-sm">
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-danger btn-sm" onClick={toggleDeleteCollapse}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-secondary btn-sm">
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                </div> 
                <div className={isDelCollapseOpen ? 'collapse show' : 'collapse'}>
                    <button className="btn btn-outline-danger btn-sm mb-2" onClick={deleteClickHandler}>Confirm Delete</button>
                </div>
            </div>
        </div>
    )

}

export default ExerciseRow