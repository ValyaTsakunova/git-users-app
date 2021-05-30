import React, { useEffect, useState } from 'react';
import Repository from './Repository';

function UserRepositories({ user, page, repos }) {
    const [reposPerPage, setReposPerPage] = useState([...repos]);

    function handleError(resp) {
        if (!resp.ok) throw Error(resp.status);
        return resp
    }

    useEffect(() => {
        fetch(`https://api.github.com/users/${user.login}/repos?&page=${page}&per_page=4`).then(handleError).then(resp => resp.json()).then(resp => {
            setReposPerPage(resp);
        }).catch(() => console.log('error'));
    }, [page])

    const repoArray = reposPerPage.map((repository) => {
        return <Repository key={repository.id} repository={repository} />
    })

    return (
        <>
            {repoArray}
        </>
    )
}

export default UserRepositories;
