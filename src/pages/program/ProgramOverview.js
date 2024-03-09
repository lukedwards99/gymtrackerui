import { useQuery } from '@tanstack/react-query'
import { useState, useContext, createContext } from 'react';
import axios from 'axios';
import ProgramWorkoutItem from './ProgramWorkoutItem';
import CreateWorkoutModal from './CreateWorkoutModal';
import GreenPlusButton from '../common/GreenPlusButton';


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
            <h1>Workouts</h1>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <GreenPlusButton onClickEvent={toggleModal} />
                    </div>
                </div>
                {workoutElems}
            </div>
            <CreateWorkoutModal
                showModal={showModal}
                toggleModal={toggleModal}
                refetch={refetch}
            />
        </>
    );
}


async function getWorkout() {
    const { data } = await axios.get('http://localhost:3030/workout');
    console.log("workouts: " + JSON.stringify(data))
    return data;
}
