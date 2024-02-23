export default function ProgramWorkoutItem({ props }) {

    return (<li key="value.uid">
        Workout: {props.uid}, Time: {props.workout_time}
    </li>)
}