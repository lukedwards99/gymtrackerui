import { useQuery } from '@tanstack/react-query'
import useAPI from '../../util/useAPI';
import axios from 'axios';

export default function WorkoutOverview() {
    const api = useAPI()

    const { data, error, isLoading } = useQuery({queryKey: 'dataKey', queryFn: async () => {
        console.log("loading data")
        const { data } = await axios.get('http://localhost:3030/workout');
        return data;
    }})

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;


    return (
        <>
            <h1>Workouts</h1>
            <div>
                {JSON.stringify(data)}
            </div>
        </>
    );
}