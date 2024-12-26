import './Search.css'
function Search(){
    return (
        <div className='search-wrapper'>
            {/*search bar*/}
            <input
                id='pokemon-name-search'
                type="text"
                placeholder="Pokemon name....."
            />
        </div>
    );
}

export default Search;