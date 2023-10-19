import "./ColorPanel.css"

export default function ColorPanel(props) {
    const selectedItemColor = props.selectedItemColor ? props.selectedItemColor : "#ffffff"
    return (
        <div 
            style={
                {
                    margin:"0px", 
                    padding:"10px", 
                    border:selectedItemColor === props.color ? "solid" : "none", 
                    background:props.color
                }
            }
            onClick={() => props.clickHandle(props.color)} 
        />
    )
}