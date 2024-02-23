import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import ProgramWorkoutItem from './ProgramWorkoutItem';

export default function ProgramOverview() {

    const { data, error, isLoading } = useQuery({ queryKey: 'workout_overview', queryFn: getWorkoutData })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <>
            <h1>Workouts</h1>
            <div>
                <ul>
                    {data.map((value) => {
                        return <ProgramWorkoutItem props={value}/>;
                    })}
                </ul>
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