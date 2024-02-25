import { Link } from "react-router-dom";

export default function ProgramWorkoutItem({ props }) {

    const buttonStyle = {
        backgroundColor: '#101624', // Bootstrap's success color
        borderColor: '#090d17',
        color: 'white',
        width: '90%'
    };

    return (
        <Link to={"/workout/" + props.uid}>
            <div role="button" className="btn" style={buttonStyle}>
                Workout: {props.uid}, Time: {props.workout_time}
            </div>
        </Link>
    )
}