import './ModBar.css'
import ModButton from './ModButton';

export default function ModBar({
    homeLocations, 
    editItem, 
    sectionSelect, 
    selectedItemId,
    obj,
    handleChangeHomeLoc,
    setViewColorSelector,
    deleteItem,
}) {
    return (
      <div>
        {selectedItemId &&
          <div className="mod-group">
            <ModButton 
              section={"Edit"} 
              handleClick={editItem} 
              sectionSelect={sectionSelect}
              selectedItemId={selectedItemId}
            />
            <select 
              className='select'
              id="homeLoc"
              value={obj[selectedItemId].homeLoc}
              onChange={handleChangeHomeLoc}
              name="homeLoc"
            >
              <option value={obj[selectedItemId].homeLoc}>{obj[selectedItemId].homeLoc}</option>
              {homeLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
            </select>
            <ModButton 
              section={"Color"} 
              handleClick={() => setViewColorSelector(prev => !prev)} 
              sectionSelect={sectionSelect}
              selectedItemId={selectedItemId}
            />
            <ModButton 
              section={"Delete"} 
              handleClick={deleteItem} 
              sectionSelect={sectionSelect}
              selectedItemId={selectedItemId}
            />
          </div>
        }
      </div>
    )
}