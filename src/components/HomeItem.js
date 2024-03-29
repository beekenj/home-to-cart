import "./HomeItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export default function HomeItem(props) {
    const MAXLENGTH = 25
    const itemName = props.item["name"]
    const itemInCart = props.item["inCart"]
    const style = {
        background: 
                (props.selected && "lightgray") || 
                (!props.item.highlightColor && "white") ||
                (props.item.highlightColor)
    }
    
    // console.log(typeof(itemInCart))
    return (
        <div className="container" style={style}>
            <label className="clickArea">
                <input 
                    type="checkbox" 
                    checked={itemInCart}
                    value={itemInCart}
                    onChange={props.handleChange}
                    id={props.id}
                />
                <span className="checkmark" />
            </label>
            <div className="itemName">
                {itemName.length < MAXLENGTH ? 
                    itemName :
                    itemName.slice(0,MAXLENGTH) + "..."
                }
            </div>
            <div className="menuArea" onClick={() => props.menuClick(props.id)}>
                <FontAwesomeIcon icon={faEllipsisV} />
            </div>
        </div>
    )
}