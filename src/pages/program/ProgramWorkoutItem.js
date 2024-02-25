
export default function ProgramWorkoutItem({ props }) {

    const buttonStyle = {
        backgroundColor: '#101624', // Bootstrap's success color
        borderColor: '#090d17',
        color: 'white',
        width: '90%'
    };

    return (
        <div role="button" className="btn" key="value.uid" style={buttonStyle}>
            Workout: {props.uid}, Time: {props.workout_time}
        </div>
    )
}