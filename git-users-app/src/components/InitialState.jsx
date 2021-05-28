import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/InitialState.css';

const searchIcon = <FontAwesomeIcon icon={faSearch} size="3x" />;

function InitialState() {
    return (
        <div className="initialContent">
            <div className="initialState">
                {searchIcon}
                <p>Start with searching <br /> a GitHub user</p>
            </div>
        </div>
    )
}

export default InitialState;
