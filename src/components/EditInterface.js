import './EditInterface.css'
import { useState } from 'react'

export default function EditInterface(props) {
    // const [selectedItem, setselectedItem] = useState({})

    // function editItem() {
    //     set(ref(database, "homeToCart/" + props.selectedItemId), {
    //         ...item,
    //         "inCart" : checked ? true : false,
    //       })
    // }

    return (
        <div className='edit-box'>
            <div>
                <input 
                className="edit-input" 
                // onChange={handleChangeAdd} 
                type="text" 
                id="edit-field" 
                // placeholder="Bread"
                // onKeyDown={searchEnter}
                // value={props.itemName}
                />
            </div>
            <div className='edit-confirm'>
                <button className='edit-button'>Ok</button>
                <button className='edit-button'>Cancel</button>
            </div>
        </div>
    )
}