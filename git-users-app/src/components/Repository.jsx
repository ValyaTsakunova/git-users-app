import React from 'react';
import '../assets/styles/Repository.css';

function Repository({ repository }) {
    return (
        <div className="repoCard">
            <div className="cardTitle"><a href={repository.html_url} target="_blank" rel="noreferrer">{repository.name}</a></div>
            <div className="description">{repository.description}</div>
        </div>
    )
}

export default Repository;
