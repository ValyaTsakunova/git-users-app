import React from 'react';
import '../assets/styles/UserProfile.css';


function UserProfile({user}){
    return(
            <div className="userCard">
                <div className="avatar"><img src={user.avatar_url} alt=" " /></div>
                <div>{user.name}</div>
                <div>{user.login}</div>
                <div>
                <div>{user.followers}</div>
                <div>{user.following}</div>
                </div>
            </div>
    )
}

export default UserProfile;