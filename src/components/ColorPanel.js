import "./ColorPanel.css"

export default function ColorPanel(props) {
    return (
        <div style={
            {
                margin:"10px", 
                padding:"5px", 
                border:"solid", 
                width:"50%",
                background:props.color
            }
            }>
                color
            </div>
    )
}