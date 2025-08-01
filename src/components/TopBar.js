import "./TopBar.css"

import SearchBar from "./SearchBar"
import HomeFilter from "./HomeFilter"
import StoreSelect from "./StoreSelect"
import NavButton from "./NavButton"

export default function TopBar ({
    handleChangeSearch,
    query,
    sectionSelect,
    setQuery,
    list,
    searchEnter,
    selectedLoc,
    handleChangeHomeLocSelect,
    homeLocations,
    selectedStore,
    handleChangeStoreSelect,
    stores,
    samsToggle,
    samsState,
}) {
    // console.log(query)
    return (
        <div className="topbar-group">
            <SearchBar
                handleChangeSearch = {handleChangeSearch}
                query = {query}
                sectionSelect = {sectionSelect}
                setQuery = {setQuery}
                list = {list}
                searchEnter = {searchEnter}
            />

            {/* Sam's club toggle */}
            {!query &&
            <NavButton 
                section={"Sams"} 
                handleClick={samsToggle}
                samsState={samsState}
            />
            }
            <HomeFilter 
                sectionSelect = {sectionSelect}
                selectedLoc = {selectedLoc}
                handleChangeHomeLocSelect = {handleChangeHomeLocSelect}
                homeLocations = {homeLocations}
            />
            <StoreSelect
                sectionSelect = {sectionSelect}
                selectedStore = {selectedStore}
                handleChangeStoreSelect = {handleChangeStoreSelect}
                stores = {stores}
            />
        </div>
    )
}