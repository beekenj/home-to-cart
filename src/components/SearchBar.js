// stylesheet
import "./SearchBar.css"

// fafa
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({
    handleChangeSearch,
    query,
    sectionSelect,
    setQuery,
    list,
    searchEnter,
}) {
    return (
        <div className='navbar-search'>
          {sectionSelect === "Cart" &&
            <button className="button">
              {list.filter(item => item[1].inCart).length}
            </button>
          }
          {/* Search bar  */}
          {sectionSelect === "Home" &&
            <input 
              className="searchbar" 
              type="text" 
              id="search-field" 
              placeholder="Search" 
              onKeyDown={searchEnter}
              onChange={handleChangeSearch} 
              value={query}
            /> 
          }

          {/* Query cancel */}
          {sectionSelect === "Home" && query && 
            <button 
              className="button" 
              onClick={() => setQuery("")}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>}
        </div>
    )
}