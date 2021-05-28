import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Repository from './Repository';
import '../assets/styles/UserRepositories.css';

const prevArrow = <FontAwesomeIcon icon={faChevronLeft} />;
const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;

function UserRepositories({ repos, user }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    }

    const pages = [];
    for (let i = 1; i <= Math.round(repos.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <button key={number} id={number} onClick={handleClick} className={currentPage === number ? "active" : null}>
                    {number}
                </button>
            )
        } else {
            return null
        }

    })

    const clickNextButton = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const clickPrevButton = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrButton = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrButton = <button onClick={clickPrevButton} disabled={currentPage === 1 ? true : false}> &hellip; </button>
    }

    let pageDecrButton = null;
    if (pages.length > maxPageNumberLimit) {
        pageDecrButton = <button onClick={clickNextButton} disabled={currentPage === pages.length ? true : false}> &hellip; </button>
    }

    return (
        <div className="repoContainer">
            <div className="title">Repositories ({user.public_repos})</div>
            {currentItems.map((repository) => {
                return <Repository key={repository.id} repository={repository} />
            })}
            {pages.length > 1 ?
                <div className="pagination">
                    <div className="showItems">
                        <p>{indexOfFirstItem + 1}-{indexOfLastItem} of {repos.length} items</p>
                    </div>
                    <ul className="pageNumbers">
                        <li>
                            <button onClick={clickPrevButton} disabled={currentPage === 1 ? true : false}>{prevArrow}</button>
                        </li>
                            {pageIncrButton}
                            {renderPageNumbers}
                            {pageDecrButton}
                        <li>
                            <button onClick={clickNextButton} disabled={currentPage === pages.length ? true : false} >{nextArrow}</button>
                        </li>
                    </ul>
                </div>
                : null}
        </div>
    )
}

export default UserRepositories;