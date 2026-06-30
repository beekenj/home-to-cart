import './ModButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faFilter, faEyeDropper, faIdCard } from '@fortawesome/free-solid-svg-icons'

export default function NavButton(props) {
    const iconObj = {
        "Edit":faPencil,
        "Filter":faFilter,
        "Delete":faTrash,
        "Color":faEyeDropper,
        "Sams":faIdCard,
    }
    const color = () => {
        if (props.highlight) return '#a2f3fc'
        else if (props.highlightColor) return props.highlightColor
        else return 'white'
    }
    return (
        <button
            className="button"
            onClick={() => props.handleClick(props.selectedItemId)}
            // style={{color:props.section === props.sectionSelect ? '#a2f3fc' : 'white'}}
            style={{color:color()}}
        >
            <FontAwesomeIcon icon={iconObj[props.section]} />
        </button>
    )
}