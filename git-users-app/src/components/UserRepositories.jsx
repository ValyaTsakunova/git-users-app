import React, { useState } from 'react';
import Repository from './Repository';
import '../assets/styles/UserRepositories.css';

function UserRepositories({repos}){
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const pages = [];
    for(let i = 1; i < Math.ceil(repos.length / itemsPerPage); i++){
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number => {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
           return(
            <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null }>
                {number}
            </li>
        ) 
        }else{
            return null
        }
        
    })

    const clickNextButton = () => {
        setCurrentPage(currentPage + 1);

        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const clickPrevButton = () => {
        setCurrentPage(currentPage - 1);

        if((currentPage -1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrButton = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrButton = <li onClick={clickPrevButton}> &hellip; </li>
    }

    let pageDecrButton = null;
    if(pages.length > maxPageNumberLimit){
        pageDecrButton = <li onClick={clickNextButton}> &hellip; </li>
    }

    return(
        <div className="repoContainer">
        <div className="title">Repositories ({repos.length})</div>
        {currentItems.map((repository) => {
            return <Repository key={repository.id} repository={repository}/>
        })}
        <ul className="pageNumbers">
            <li>
                <button onClick={clickPrevButton}>Prev</button>
            </li>
                {pageIncrButton}
                {renderPageNumbers}
                {pageDecrButton}
            <li>
                <button onClick={clickNextButton}>Next</button>
            </li>
        </ul>
        

        </div>
    )
}

export default UserRepositories;