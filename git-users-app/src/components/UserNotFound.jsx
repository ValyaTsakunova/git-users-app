import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const user = <FontAwesomeIcon icon={faUser} size="3x" />;

function UserNotFound() {
    return (
        <div className="emptyContent">
            {user}
            <p>User is not found</p>
        </div>
    )
}

export default UserNotFound;