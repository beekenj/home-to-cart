import "./ColorPanel.css"

export default function ColorPanel(props) {
    return (
        <div 
            style={
                {
                    margin:"10px", 
                    padding:"5px", 
                    border:props.selectedItemColor === props.color ? "solid" : "none", 
                    width:"50%",
                    background:props.color
                }
            }
            onClick={() => props.clickHandle(props.color)} 
        />
    )
}