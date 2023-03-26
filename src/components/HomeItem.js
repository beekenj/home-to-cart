import "./HomeItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export default function HomeItem(props) {
    const MAXLENGTH = 25
    const itemName = props.item["name"]
    const itemInCart = props.item["inCart"]
    
    // console.log(typeof(itemInCart))
    return (
        <div className="container" style={{background: props.selected && "lightgray"}}>
            <div className="clickArea">
                <input 
                    type="checkbox" 
                    checked={itemInCart}
                    value={itemInCart}
                    onChange={props.handleChange}
                    id={props.id}
                    // item = {props.item}
                />
            </div>
            <div className="itemName">
                {itemName.length < MAXLENGTH ? 
                    itemName :
                    itemName.slice(0,MAXLENGTH) + "..."
                }
            </div>
            <div className="clickArea" onClick={() => props.menuClick(props.id)}>
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
        </div>
    )
}