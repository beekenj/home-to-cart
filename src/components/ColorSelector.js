import "./ColorSelector.css"
import ColorPanel from "./ColorPanel"

const colors = [
        "#c5fcd2", 
        "#ffe49c",
        "#ffbafe", 
        "#acfcfc", 
        "#e5cafa",
        "#78a4eb", 
        "#fafaa7", 
        "#ffffff", 
    ]

export default function ColorSelector(props) {
    return (
        <div>
            {props.viewColorSelector && 
                <div className="color-selector">
                    {colors.map((color, idx) => <ColorPanel 
                        key={idx} 
                        color={color} 
                        clickHandle={props.clickHandle}
                        selectedItemColor={props.selectedItemColor.highlightColor}
                    />)}
                </div>
            }
        </div>
    )
}