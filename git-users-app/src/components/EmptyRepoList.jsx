import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/EmptyRepoList.css';

const crossIcon = <FontAwesomeIcon icon={faTimesCircle} size="3x" />;

function EmptyRepoList (){
    return(
        <div className="emptyContent">
            {crossIcon}
            <p>Repository list is empty</p>
        </div>
    )
}

export default EmptyRepoList;
