import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import UserProfile from './UserProfile';
import UserRepositories from './UserRepositories';
import InitialState from './InitialState';

import '../assets/styles/SearchForm.css';
import EmptyRepoList from './EmptyRepoList';


const githubIcon = <FontAwesomeIcon icon={faGithub} size="3x" />;
const searchIcon = <FontAwesomeIcon icon={faSearch}  />

function SearchForm() {
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);

    const [onLoadUser, setOnLoadUser] = useState(false);


    function handleError (resp) {
        if(!resp.ok) throw Error(resp.status);
        return resp
    }

    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.github.com/users/${inputValue}`).then(handleError).then(resp => resp.json()).then(resp => {
            console.log(resp);
            setUser(resp);
            
        }).catch(() => console.log('error'));
        fetch(`https://api.github.com/users/${inputValue}/repos?&per_page=100`).then(handleError).then(resp => resp.json()).then(resp => {
            console.log(resp);
            setRepos(resp)
        }).catch(() => console.log('error'))
        setInputValue('');
        
    }
    const onInputChange = (event) => {
        setInputValue(event.target.value)
    }

    // let initState = null;
    // if(onLoadUser == false){
    //      return <InitialState />
    // }

    return(
        <>
        <header>
        <form onSubmit={onSubmit}>
            <div className="icon">{githubIcon}</div>
            <input type="text" placeholder="Enter GitHub username" value={inputValue} onChange={onInputChange}></input>
            <div className="searchIcon">{searchIcon}</div>
        </form>
        </header>
        {Object.keys(user).length === 0 ? 
            <InitialState /> :
            <div className="content">
                <UserProfile user={user} repos={repos} /> 
                { repos.length === 0 ? <EmptyRepoList /> :
                <UserRepositories user={user} repos={repos} /> }
            </div>
        }
        </>
    )
}

{/* <div className="loader"></div> */}

export default SearchForm;