import "./NavBar.css"
import NavButton from "./NavButton"

export default function NavBar({
    selectedItemId,
    sections,
    sectionClick,
    sectionSelect,
}) {
    return (
        <>
            {!selectedItemId &&
                <div className="btn-group">
                {sections.map((section, idx) => 
                    <NavButton 
                        key={idx} 
                        section={section} 
                        handleClick={sectionClick} 
                        sectionSelect={sectionSelect}
                    />)}
                </div>
            }
        </>
    )
}