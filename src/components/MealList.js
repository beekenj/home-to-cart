import './MealList.css'

export default function MealList(props) {
    return (
        <div className="meal-group">
          {props.dayMealList.map((elem, idx) => <div key={idx}>{<><div>{elem[0]}</div><div>{elem[1]}</div></>} </div>)}
        </div>
    )
}