import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import UserProfile from './UserProfile';
import UserRepositories from './UserRepositories';
import InitialState from './InitialState';
import '../assets/styles/SearchForm.css';

const githubIcon = <FontAwesomeIcon icon={faGithub} size="3x" />;
const searchIcon = <FontAwesomeIcon icon={faSearch}  />

function SearchForm() {
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState([]);
    const [repos, setRepos] = useState([])

    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.github.com/users/${inputValue}`).then(resp => resp.json()).then(resp => {
            console.log(resp);
            setUser(resp)
        });
        fetch(`https://api.github.com/users/${inputValue}/repos?per_page=100`).then(resp => resp.json()).then(resp => {
            console.log(resp);
            setRepos(resp)
        })
        setInputValue('');
    }
    const onInputChange = (event) => {
        setInputValue(event.target.value)
    }
    return(
        <>
        <header>
        <form onSubmit={onSubmit}>
            <div className="icon">{githubIcon}</div>
            <input type="text" placeholder="Enter GitHub username" value={inputValue} onChange={onInputChange}></input>
            <div className="searchIcon">{searchIcon}</div>
        </form>
        </header>
        {!user.length && !repos.length ? 
            <InitialState /> :
            <div className="content">
            {user ? <UserProfile user={user} repos={repos} /> : null}
            {repos ? <UserRepositories user={user} repos={repos} /> : null}
        </div>
        }
        
        
        </>
    )
}

export default SearchForm;