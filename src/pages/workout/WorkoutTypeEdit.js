import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

export default function WorkoutTypeEdit() {

    const { data, error, isLoading } = useQuery({ queryKey: ['workout_types'], queryFn: getWorkoutTypes })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    
    function deleteType(){
        
    }


    const buttonStyle = {
        backgroundColor: '#0c8259', // Bootstrap's success color
        borderColor: '#086343',
        color: 'white',
    };

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Workout Days</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((type) => {
                        return (
                            <tr key={type.uid}>
                                <td className="d-flex justify-content-between align-items-center">
                                    {type.day_name}

                                    <button type="button" className="btn btn-sm " style={buttonStyle} onClick={() => deleteType(type.uid)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

async function getWorkoutTypes() {
    const options = { method: 'GET', url: 'http://localhost:3030/workout/type/' };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        return false
    }
}