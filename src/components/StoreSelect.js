import "./StoreSelect.css"

export default function StoreSelect({
    sectionSelect,
    selectedStore,
    handleChangeStoreSelect,
    stores,
}) {
    return (
        <>
            {sectionSelect === "Cart" &&
                <select 
                className='select-store'
                id="homeLocSelect"
                value={selectedStore}
                onChange={handleChangeStoreSelect}
                name="storeLocSelect"
                >
                {stores.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
                </select>
            }
        </>
    )
}