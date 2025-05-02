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
    return (
        <button
            className="button"
            onClick={() => props.handleClick(props.section)}
            style={{color:props.section === props.sectionSelect ? '#a2f3fc' : 'white'}}
        >
            <FontAwesomeIcon icon={iconObj[props.section]} />
        </button>
    )
}