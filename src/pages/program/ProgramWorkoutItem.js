import { Link } from "react-router-dom";

export default function ProgramWorkoutItem({ props }) {

    return (
        <Link to={"/workout/" + props.uid}>
            <div role="button" className="btn btn-secondary" >
                Workout: {props.workout_title}, Time: {props.workout_time}
            </div>
        </Link>
    )
}