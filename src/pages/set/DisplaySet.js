import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
        import axios from 'axios';

export default function DisplaySet({ setData, refetch }) {
    async function deleteSet() {
        try {
          const { data } = await axios.request({method: 'DELETE', url: 'http://localhost:3030/set/', data: {set_id: setData.uid}});
          console.log(data);
          refetch()
        } catch (error) {
          console.error(error);
          alert(JSON.stringify(error))
        }
    }

    // console.log(setData)
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
                <button className="btn btn-danger btn-sm" onClick={deleteSet}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}