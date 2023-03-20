import "./ListItem.css"

export default function ListItem(props) {
    return (
        <div className="container">
            <div className="clickArea">
                <input type="checkbox" />
            </div>
            <div className="itemName">
                {props.itemName}
            </div>
            <div className="clickArea">
            {/* <i className="fa fa-ellipsis-v" aria-hidden="true"></i> */}
            </div>
        </div>
    )
}