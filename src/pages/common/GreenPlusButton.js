import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const GreenPlusButton = ({ onClickEvent }) => {

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <button type="button" className="btn w-100 btn-primary" onClick={onClickEvent}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default GreenPlusButton