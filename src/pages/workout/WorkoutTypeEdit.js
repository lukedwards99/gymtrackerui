import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddWorkoutType from "./AddWorkoutType";

export default function WorkoutTypeEdit() {
    const navigate = useNavigate()
    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['workout_types'], queryFn: getWorkoutTypes })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    
    function deleteType(uid){
        deleteWorkoutType(uid).then(()=>{refetch()})
    }


    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="d-flex justify-content-between align-items-center">
                            <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate(-1)}>
                                <FontAwesomeIcon icon={faBackward} />
                            </button>
                            Workout Days
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((type) => {
                        return (
                            <tr key={type.uid}>
                                <td className="d-flex justify-content-between align-items-center">
                                    {type.day_name || "***invalid day name***"}

                                    <button type="button" className="btn btn-sm btn-danger " onClick={() => deleteType(type.uid)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <AddWorkoutType refetch={refetch}/>
        </div>
    )
}

async function deleteWorkoutType(uid){
    const options = {
        method: 'DELETE',
        url: 'http://localhost:3030/workout/type',
        data: {workout_type_id: uid}
      };
      
      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
}

async function getWorkoutTypes() {
    const options = { method: 'GET', url: 'http://localhost:3030/workout/type/active' };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        return false
    }
}