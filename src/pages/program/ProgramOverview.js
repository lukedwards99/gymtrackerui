import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import ProgramWorkoutItem from './ProgramWorkoutItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ProgramOverview() {

    const { data, error, isLoading } = useQuery({ queryKey: 'workout_overview', queryFn: getWorkoutData })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    
    let workoutElems = []
    for (let index = 0; index < data.length; index += 2) {
        const workout = data[index];
        workoutElems.push((
            <div></div>
        ))
    }
    return (
        <>
            <h1>Workouts</h1>
            <div className="container">
                <GreenPlusButton />
                <div className="row">
                    {
                        
                    // data.map((value) => {
                    //     return <ProgramWorkoutItem props={value}/>;
                    //})
                    }
                </div>
            </div>
        </>
    );
}

async function getWorkoutData() {
    console.log("loading data")
    const { data } = await axios.get('http://localhost:3030/workout');
    console.log("workouts: " + JSON.stringify(data))
    return JSON.parse(data);
}

const GreenPlusButton = () => {
    const buttonStyle = {
      backgroundColor: '#28a745', // Bootstrap's success color
      borderColor: '#28a745',
      color: 'white',
    };
  
    return (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-8 col-lg-6">
            <button type="button" className="btn w-100 " style={buttonStyle}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
    );
  };