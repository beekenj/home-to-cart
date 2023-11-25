import "./TopBar.css"

import SearchBar from "./SearchBar"
import HomeFilter from "./HomeFilter"
import StoreSelect from "./StoreSelect"

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
}) {
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