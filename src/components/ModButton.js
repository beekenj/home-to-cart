import './ModButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faFilter, faEyeDropper } from '@fortawesome/free-solid-svg-icons'

export default function NavButton(props) {
    const iconObj = {
        "Edit":faPencil,
        "Filter":faFilter,
        "Delete":faTrash,
        "Color":faEyeDropper,
    }
    return (
        <button
            className="button"
            onClick={() => props.handleClick(props.selectedItemId)}
            style={{color:props.section === props.sectionSelect ? '#a2f3fc' : 'white'}}
        >
            <FontAwesomeIcon icon={iconObj[props.section]} />
        </button>
    )
}