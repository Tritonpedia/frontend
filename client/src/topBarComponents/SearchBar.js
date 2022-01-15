import React, { useEffect, useRef, useState } from 'react';
import SearchResults from './SearchResults';
import './TopBar.css';

const SearchBar = () => {
    const targetRef = useRef();
    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentValue, setCurrentValue] = useState("");
    const [displayResults, setDisplayResults] = useState(false);
    const [currentSearchValue, setCurrentSearchValue] = useState("");


    const handleInput = event => {
        setQuery(event.target.value);
        setCurrentValue(event.target.value);
    }

    const handleClick = event => {
        if (event.current) {
            setDisplayResults(true);
            // updateClickOnInput(true);
        }
    }

    function toggleResultsDropdown(event) {
        if (!event.relatedTarget) {
            setDisplayResults(!displayResults);
        }
    }

    function showResults(){
        setDisplayResults(true);
    }

    useEffect(() => {
        if (searchQuery && searchQuery !== "") {
            setDisplayResults(true);
        }
    }, [searchQuery])


    function updateShowResults(showResults) {
        setDisplayResults(showResults);
    }

    function updateSearchValue(value) {
        setCurrentSearchValue(value);
    }

    useEffect(() => {
        setSearchQuery(query);
    }, [query]);

    useEffect(() => {
        if (currentSearchValue) {
            setCurrentValue(currentSearchValue);
        }
    }, [currentSearchValue])

    return (
        <div>
            <div onBlur={toggleResultsDropdown} onFocus={showResults} tabIndex="2">
                <input
                    type="text"
                    id="search-input"
                    className={displayResults ? "search-input-top-borders bg-gray p-2" : "search-input-all-borders bg-gray p-2"}
                    ref={targetRef}
                    placeholder="search"
                    name="search-input"
                    value={currentValue}
                    onInput={handleInput}
                    onClick={handleClick}
                />
            </div>
            {displayResults && <div className='relative'>
                <SearchResults query={searchQuery} updateShowResults={updateShowResults} updateSearchValue={updateSearchValue} />
                </div>
            }
        </div>
    );
}

export default SearchBar
