import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import AddExerciseType from "./AddExerciseType";
import { useNavigate } from "react-router-dom";

function ExerciseTypeEdit () {
    const navigate = useNavigate()
    const { data, error, isLoading, refetch } = useQuery({ queryKey: ['exercise_types'], queryFn: getExerciseTypes })

    if (isLoading) return <div>Loading...</div>;
    if (error || data === false) return <div>An error occurred: {error.message}</div>;
    
    function deleteType(uid){
        deleteExerciseType(uid).then(()=>{refetch()})
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
                            Exercise Categories
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((type) => {
                        return (
                            <tr key={type.uid}>
                                <td className="d-flex justify-content-between align-items-center">
                                    {type.category_name || "***invalid type name***"}

                                    <button type="button" className="btn btn-sm btn-danger " onClick={() => deleteType(type.uid)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <AddExerciseType refetch={refetch}/>
        </div>
    )
}

export default ExerciseTypeEdit

async function deleteExerciseType(uid){
    const options = {
        method: 'DELETE',
        url: 'http://localhost:3030/exercise/type',
        data: {exercise_type_id: uid}
      };
      
      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
        alert(JSON.stringify(error));
        return false
      }
}

async function getExerciseTypes() {
    const options = { method: 'GET', url: 'http://localhost:3030/exercise/type/active' };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        alert(JSON.stringify(error));
        return false
    }
}