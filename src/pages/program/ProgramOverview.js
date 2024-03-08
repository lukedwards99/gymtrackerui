import { useQuery } from '@tanstack/react-query'
import { useState, useContext, createContext } from 'react';
import axios from 'axios';
import ProgramWorkoutItem from './ProgramWorkoutItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateWorkoutModal from './CreateWorkoutModal';

export const ProgramOverviewContext = createContext()

export default function ProgramOverview() {

    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['workout_overview'], queryFn: getWorkout })
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    //create workout elements to display. Done row by row
    let workoutElems = []
    for (let index = 0; index < data.length; index += 2) {
        workoutElems.push((
            <div className='row' key={index}>
                <div className='col-md-2'></div>
                <div className='col-6 col-md-4 col-lg-3 p-2'><ProgramWorkoutItem props={data[index]} /></div>
                <div className='col-6 col-md-4 col-lg-3 p-2'>{data[index + 1] ? <ProgramWorkoutItem props={data[index + 1]} /> : ""}</div>
                <div className='col-md-2'></div>
            </div>
        ))
    }
    return (
        <>
            <ProgramOverviewContext.Provider value={{ toggleModal }} >
                <h1>Workouts</h1>
                <div className="container">
                    <GreenPlusButton toggleModal={toggleModal} />
                    {workoutElems}
                </div>
                <CreateWorkoutModal
                    showModal={showModal}
                    toggleModal={toggleModal}
                    refetch={refetch}
                />
            </ProgramOverviewContext.Provider>
        </>
    );
}


async function getWorkout() {
    const { data } = await axios.get('http://localhost:3030/workout');
    console.log("workouts: " + JSON.stringify(data))
    return data;
}

const GreenPlusButton = ({ toggleModal }) => {

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <button type="button" className="btn w-100 btn-primary" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

