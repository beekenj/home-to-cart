import "./AddSection.css"

import HomeItem from "./HomeItem"

export default function AddSection ({
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
}) {
    const addList = listFilterAdd.map(item => 
        <HomeItem 
          key={item[0]} 
          id={item[0]} 
          item={item[1]}
          handleChange={handleChangeHome}
          menuClick={menuClick}
          selected={selectedItemId===item[0]}
        />
    )

    return (
        <div>
            {sectionSelect === "Add" &&
                <>
                    <input 
                        className="add-input" 
                        onChange={handleChangeAdd} 
                        type="text" 
                        id="input-field" 
                        placeholder="Name"
                        onKeyDown={searchEnter}
                    />
                    <div>
                        <select className="add-select" onChange={handleChangeNewHomeLocation} value={newSelectedLoc}>
                            <option value="Unspecified">Home Location</option>
                            {homeLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                    <div>
                        <button className="add-button" id="add-button" onClick={addClick}>
                            Add Item
                        </button>
                    </div>
                    <div>
                        {addQuery && addList}
                    </div>
                </>
            }
        </div>
    )
}