
// 
function nextDays(n=7) {
    if (n > 7 || n < 0) return null
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date()
    return Array(7).fill().map((_, idx) => 
      today.getDay()+idx < 7 ? weekdays[today.getDay()+idx] : weekdays[today.getDay()+idx-7])
      .slice(0,n)
}

// clear inputs on enter key
function searchEnter(event) {
    if (event.key === "Enter") {
      event.target.blur()
    }
}

// calculate running average for store location of items
function calcNewRunningAverage(newVal, oldAve, n) {
  return ((oldAve*(n-1) + newVal)/n)
}

export { calcNewRunningAverage, searchEnter, nextDays }