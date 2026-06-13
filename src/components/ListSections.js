import "./ListSections.css"

import AddSection from "./AddSection"
import CartSection from "./CartSection"
import HomeSection from "./HomeSection"
// import { width } from "@fortawesome/free-solid-svg-icons/fa0"

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
    // split list into sections
    const colors = [
        "#c5fcd2", 
        "#ffe49c",
        "#ffbafe", 
        "#acfcfc", 
        "#e5cafa",
        "#78a4eb", 
        "#fafaa7", 
        "#ffffff", 
    ]
    // const sectionNames = [
    //     "Produce", 
    //     "Meat",
    //     "Bread/Pharm", 
    //     "Cold/Can", 
    //     "Cook/Clean",
    //     "Frozen", 
    //     "Dairy/Snacks", 
    //     "Unlisted", 
    // ]

    const unassigned = list.filter(elem => !elem[1].highlightColor)
    
    const segmentList = colors.map(color => list.filter(elem => elem[1].highlightColor === color))
    const segmentCart = segmentList.map((elem, idx) => 
            <div
                key = {idx}
            >
            {elem.filter(item => item[1].inCart).length && sectionSelect === "Cart" ? 
            <table style={{width:"100%", padding:"0px, 0px"}}>
                <tbody>
                    <tr>
                        <td style={{backgroundColor: colors[idx], width: "5px"}}></td>
                        <td>
                            <CartSection
                                list = {elem}  
                                handleChangeCart = {handleChangeCart}
                                menuClick = {menuClick}
                                selectedItemId = {selectedItemId}
                                sectionSelect = {sectionSelect}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            : <></>}
            </div>
        )

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
            {segmentCart}
            <CartSection
                list = {unassigned}
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