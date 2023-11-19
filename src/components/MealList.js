import './MealList.css'
import Meal from './Meal'

export default function MealList(props) {
    return (
        <div className="meal-group">
          {props.dayMealList.map((elem, idx) => <Meal key={idx} day={elem[0]} meal={elem[1]} />)}
        </div>
    )
}