import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import UserProfile from './UserProfile';
import UserRepositories from './UserRepositories';
import InitialState from './InitialState';
import EmptyRepoList from './EmptyRepoList';
import UserNotFound from './UserNotFound';

import '../assets/styles/SearchForm.css';

const githubIcon = <FontAwesomeIcon icon={faGithub} size="3x" />;
const searchIcon = <FontAwesomeIcon icon={faSearch} />;

function SearchForm() {
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [initState, setInitState] = useState(true);

    function handleError(resp) {
        if (!resp.ok) throw Error(resp.status);
        return resp
    }

    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.github.com/users/${inputValue}`).then(handleError).then(resp => resp.json()).then(resp => {
            setUser(resp)
        }).catch(() => console.log('error'));
        fetch(`https://api.github.com/users/${inputValue}/repos?&per_page=100`).then(handleError).then(resp => resp.json()).then(resp => {
            setRepos(resp)
        }).catch(() => console.log('error'))
        setInputValue('');
        setInitState(false);
    }
    const onInputChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <>
            <header>
                <form onSubmit={onSubmit}>
                    <div className="icon">{githubIcon}</div>
                    <input type="text" placeholder="Enter GitHub username" value={inputValue} onChange={onInputChange}></input>
                    <div className="searchIcon">{searchIcon}</div>
                </form>
            </header>
            {initState === true ?
                <InitialState /> :
                <div className="content">
                    {Object.keys(user).length === 0 ? <UserNotFound /> : <UserProfile user={user} repos={repos} />}
                    {user.public_repos === 0 ? <EmptyRepoList /> : null}
                    {!repos.length && user.public_repos > 0 ? <div className="loader"></div> : null}
                    {repos.length ? <UserRepositories user={user} repos={repos} /> : null}
                </div>
            }
        </>
    )
}

export default SearchForm;