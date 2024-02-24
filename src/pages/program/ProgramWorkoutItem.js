import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProgramWorkoutItem({ props }) {

    return (<div class="workout-panel border border-dark p-3" key="value.uid">
        Workout: {props.uid}, Time: {props.workout_time}
    </div>)
}