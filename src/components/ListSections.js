import "./ListSections.css"

import AddSection from "./AddSection"
import CartSection from "./CartSection"
import HomeSection from "./HomeSection"

export default function ListSections ({
    sectionSelect,
    handleChangeAdd,
    searchEnter,
    handleChangeNewHomeLocation,
    newSelectedLoc,
    homeLocations,
    addClick,
    addQuery,
    listFilterAdd,
    handleChangeHome,
    menuClick,
    selectedItemId,
    list,
    handleChangeCart,
    listFilter,
}) {
    return (
        <div className="list-sections">
            {/* top spacer */}
            <div style={{height:"100px"}} />
            <AddSection 
                sectionSelect = {sectionSelect}
                handleChangeAdd = {handleChangeAdd}
                searchEnter = {searchEnter}
                handleChangeNewHomeLocation = {handleChangeNewHomeLocation}
                newSelectedLoc = {newSelectedLoc}
                homeLocations = {homeLocations}
                addClick = {addClick}
                addQuery = {addQuery}
                listFilterAdd = {listFilterAdd}
                handleChangeHome = {handleChangeHome}
                menuClick = {menuClick}
                selectedItemId = {selectedItemId}
            />
            <CartSection
                list = {list}
                handleChangeCart = {handleChangeCart}
                menuClick = {menuClick}
                selectedItemId = {selectedItemId}
                sectionSelect = {sectionSelect}
            />
            <HomeSection
                listFilter = {listFilter}
                handleChangeHome = {handleChangeHome}
                menuClick = {menuClick}
                selectedItemId = {selectedItemId}
                sectionSelect = {sectionSelect}
            />
            {/* bottom spacer */}
            <div style={{height:"85px"}} />
        </div>
    )
}