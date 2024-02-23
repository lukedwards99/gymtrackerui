import {useParams} from "react-router-dom";

export default function Workout(){
    const {id} = useParams();

    return <h1>Workout: {id}</h1>
}