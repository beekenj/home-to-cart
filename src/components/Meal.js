import './Meal.css'

export default function Meal(props) {
    return (
      <div className='meal-elem'>
        <div className='day-elem'>{props.day}</div>
        <div className='name-elem'>{props.meal}</div>
      </div>
    )
  }