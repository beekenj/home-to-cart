import "./HomeSection.css"

import HomeItem from "./HomeItem"

export default function HomeSection ({
    listFilter,
    handleChangeHome,
    menuClick,
    selectedItemId,
    sectionSelect,
}) {
    const homeList = listFilter.map(item => 
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
        <>
            {sectionSelect === "Home" &&
                <div>
                    {homeList}
                </div>
            }
        </>
    )
}