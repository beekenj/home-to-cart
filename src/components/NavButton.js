import './NavButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHome, faPlus, faCutlery, faIdCard } from '@fortawesome/free-solid-svg-icons'

export default function NavButton(props) {
    const iconObj = {
        "Cart":faShoppingCart,
        "Home":faHome,
        "Meals":faCutlery,
        "Add":faPlus,
        "Sams":faIdCard,
    }
    const style = {
        color: 
        (props.samsState === 0 && "white") || 
        (props.samsState === 1 && "#a2f3fc") ||
        (props.samsState === 2 && "red") ||
        (props.section === props.sectionSelect ? "#a2f3fc" : "white")
        }
    return (
        <button
            className="button"
            onClick={() => props.handleClick(props.section)}
            style={style}
        >
            <FontAwesomeIcon icon={iconObj[props.section]} />
        </button>
    )
}