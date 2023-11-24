import "./HomeFilter.css"

export default function HomeFilter({
    sectionSelect, 
    selectedLoc, 
    handleChangeHomeLocSelect,
    homeLocations,
}) {
    return (
        <>
        {sectionSelect === "Home" &&
            <select 
              className='select-home'
              id="homeLocSelect"
              value={selectedLoc}
              onChange={handleChangeHomeLocSelect}
              name="homeLocSelect"
            >
              <option value="">Home</option>
              {homeLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
              <option value="Unspecified">Unspecified</option>
            </select>
          }
        </>
    )
}