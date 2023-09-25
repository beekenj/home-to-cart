import "./ColorSelector.css"
import ColorPanel from "./ColorPanel"

const colors = ["#acfcfc", "#78a4eb", "#c5fcd2", "#ffbafe", "#fafaa7"]

export default function ColorSelector(props) {
    return (
        <div className="color-selector">
            {colors.map((color, idx) => <ColorPanel key={idx} color={color} />)}
        </div>
    )
}