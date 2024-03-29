import "./ColorSelector.css"
import ColorPanel from "./ColorPanel"

const colors = [
        "#ffffff", 
        "#c5fcd2", 
        "#acfcfc", 
        "#78a4eb", 
        "#e5cafa",
        "#ffbafe", 
        "#fafaa7", 
        "#ffe49c",
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