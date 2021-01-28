import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faRedo, faEquals } from '@fortawesome/free-solid-svg-icons'

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>;
            break;
        case false:
            button =
                <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTimes} />
                </button>;
            break;
        default:
            button =
                <button className="btn game-btn"
                    onClick={props.checkAnswer}
                    disabled={props.selectedNumbers.length === 0}>
                    <FontAwesomeIcon icon={faEquals} />
          </button>;
            break;
    }
    return (
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm" onClick={props.redraw}
                disabled={props.redraws === 0}>
                <FontAwesomeIcon icon={faRedo} /> {props.redraws}
            </button>
        </div>
    );
};

export default Button;