import { useQuery } from '@tanstack/react-query'
import { useState, useContext, createContext } from 'react';
import axios from 'axios';
import ProgramWorkoutItem from './ProgramWorkoutItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateWorkoutModal from './CreateWorkoutModal';

export const ProgramOverviewContext = createContext()

export default function ProgramOverview() {

    const { data, error, isLoading } = useQuery({ queryKey: ['workout_overview'], queryFn: getWorkoutData })

    const [showModal, setShowModal] = useState(false);
    const [createWorkoutDateTime, setCreateWorkoutDateTime] = useState("");

    // Function to toggle the modal display
    const toggleModal = () => setShowModal(!showModal);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

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
        // workoutElems.push((<>
        //     {(index && index % 2 === 0) ? <><div className='col-lg-3 col-md-2' key={"div_1_"+workout.uid}></div><div className='col-lg-3 col-md-2' key={"div_2_"+workout.uid}></div></>: ""}
        //     <div className='col-6 col-md-4 col-lg-3'><ProgramWorkoutItem props={workout} key={workout.uid}/></div>
        //     </>
        // ))
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
                    date={createWorkoutDateTime} 
                    setDate={setCreateWorkoutDateTime} 
                    toggleModal={toggleModal}
                />
            </ProgramOverviewContext.Provider>
        </>
    );
}

async function getWorkoutData() {
    console.log("loading data")
    const { data } = await axios.get('http://localhost:3030/workout');
    console.log("workouts: " + JSON.stringify(data))
    return JSON.parse(data);
}

const GreenPlusButton = ({ toggleModal }) => {

    //const {toggleModal} = useContext(ProgramOverviewContext)

    const buttonStyle = {
        backgroundColor: '#0c8259', // Bootstrap's success color
        borderColor: '#086343',
        color: 'white',
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <button type="button" className="btn w-100 " style={buttonStyle} onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};