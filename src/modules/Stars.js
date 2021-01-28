import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

const Stars = (props) => {
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <FontAwesomeIcon key={i} icon={faStar} />
            )}
        </div>
    );
};

export default Stars;