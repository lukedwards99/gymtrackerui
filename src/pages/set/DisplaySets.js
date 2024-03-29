import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import { useState } from "react";

export default function DisplaySets({ exercise_selection_id }) {

    const [id, setId] = useState()
    if (exercise_selection_id !== undefined && id !== exercise_selection_id){
        setId(exercise_selection_id)
    }
    
    async function getSets(){
        const { data } = await axios.request({ method: 'GET', url: `http://localhost:3030/set/${id}` });
        //   console.log(data);
        return data;
    }

    const { data, error, isLoading, refetch} = useQuery({ queryKey: ['set_info_' + id], queryFn: getSets })
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    if (data.success === false) return <div>Sever Error set: {data.message}</div>

    return (
        <div>
            <div className="row mt-2">
                <div className="col-3">
                    <label className="text-secondary ">Reps</label>
                </div>
                <div className="col-3">
                    <label className="text-secondary ">Stimulation</label>
                </div>
                <div className="col-3">
                    <label className="text-secondary ">RPE</label>
                </div>
                <div className="col-3">
                </div>
            </div>
            {data.sets.map(set => {
                return <DisplaySets setData={set} key={set.uid}/>
            })}

        </div>
    )
}