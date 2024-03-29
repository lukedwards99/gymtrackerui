export default function DisplaySet({ setData }) {
    return (
        <div className="row mt-2">
            <div className="col-3">
                <label className="text-secondary ">{setData.reps}</label>
            </div>
            <div className="col-3">
                <label className="text-secondary ">{setData.perceived_stimulation_score}</label>
            </div>
            <div className="col-3">
                <label className="text-secondary ">{setData.difficulty_score}</label>
            </div>
            <div className="col-3">
            </div>
        </div>
    )
}