import { useState } from "react"
import DisplaySets from "./DisplaySets"
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

export default function SetCollapse({ exercise_selection_id, showCollapse, toggleCollapse }) {
    const [reps, setReps] = useState(0)
    const [difficulty, setDifficulty] = useState(0)
    const [stimulation, setStimulation] = useState(0)
    const { data, error, isLoading, refetch} = useQuery({ queryKey: ['set_info_' + exercise_selection_id], queryFn: getSets })
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    if (data.success === false) return <div>Sever Error set: {data.message}</div>

    console.log("exercise selection id: " + exercise_selection_id)

    async function getSets(){
        const { data } = await axios.request({ method: 'GET', url: `http://localhost:3030/set/${exercise_selection_id}` });
        //   console.log(data);
        return data;
    }

    async function addSetCall() {
        console.log(`Add Set Log: reps: ${reps} dif: ${difficulty} stim: ${stimulation}`)

        try {
            const { data } = await axios.request({
                method: 'PUT',
                url: 'http://localhost:3030/set/',
                data: {
                    exercise_selection_id: exercise_selection_id,
                    reps: reps,
                    difficulty_score: difficulty,
                    stimulation_score: stimulation
                }
            });
            setReps(0)
            setDifficulty(0)
            setStimulation(0)
            refetch()
            // console.log(data);
        } catch (error) {
            console.error(error);
            alert("Could not create set")
        }
    }

    return (
        <>
            <div className={showCollapse ? 'collapse show' : 'collapse'}>
                <DisplaySets sets={data.sets} refetch={refetch} />
                <div className="row mt-2">
                    <div className="col-3">
                        <input type="number" value={reps} onChange={e => setReps(e.target.value)} className="form-control" id={`addSetReps_${exercise_selection_id}`} />
                    </div>
                    <div className="col-3">
                        <input type="number" value={stimulation} onChange={e => setStimulation(e.target.value)} className="form-control" id={`addSetStim_${exercise_selection_id}`} />
                    </div>
                    <div className="col-3">
                        <input type="number" value={difficulty} onChange={e => setDifficulty(e.target.value)} className="form-control" id={`addSetDif_${exercise_selection_id}`} />
                    </div>
                    <div className="col-3">
                        <button className="btn btn-outline-primary " onClick={addSetCall}>Add Set</button>
                    </div>
                </div>
                <button className="btn btn-link " onClick={toggleCollapse}>Hide</button>
            </div>
        </>
    )

}