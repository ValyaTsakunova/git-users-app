import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/UserProfile.css';

const userIcon = <FontAwesomeIcon icon={faUser} />
const usersIcon = <FontAwesomeIcon icon={faUserFriends} />

function UserProfile({user}){
    return(
            <div className="userCard">
                <div className="avatar"><img src={user.avatar_url} alt=" " /></div>
                <div className="userName">{user.name}</div>
                <div className="userLogin"><a href={user.html_url} target="_blank" rel="noreferrer">{user.login}</a></div>
                <div className="followers">
                    <div><span>{usersIcon}</span>{Number(user.followers)}k followers</div>
                    <div><span>{userIcon}</span>{user.following} following</div>
                </div>
            </div>
    )
}

export default UserProfile;