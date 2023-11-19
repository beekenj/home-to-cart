import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database"

import HomeItem from './components/HomeItem';
import CartItem from './components/CartItem';
import NavButton from './components/NavButton';
import ModButton from './components/ModButton';
import ColorSelector from './components/ColorSelector';
import MealList from './components/MealList';
import './App.css';

// put this stuff in component!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const appSettings = {
  databaseURL: "https://realtime-database-aef6c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "homeToCart")
const mealPlanInDB = ref(database, "mealPlan")
const mealsInDB = ref(database, "meals")


let then = Date.now()

// let count = 1

function App() {
  const homeLocations = [
    "Cabinet",
    "Freezer",
    "Pantry",
    "Containers",
    "Spices",
    "Snacks",
    "Bathroom",
    "Refridgerator",
    "Veggies",
    "Cleaning",
    "Misc",
  ]
  const stores = [
    // "Playground",
    "Gunberrel Kings",
    "Longmont Kings",
    "Boulder Safeway",
    "Boulder Kings",
    "Sam's Club",
  ]
  // const sections = ["Cart", "Home", "Meals", "Add"]
  const sections = ["Cart", "Home", "Add"]
  // const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  // const today = new Date()

  // console.log(today)

  
  
  // state
  const [list, setList] = useState([])
  const [obj, setObj] = useState({})
  const [sectionSelect, setSectionSelect] = useState("Cart")
  const [query, setQuery] = useState("")
  const [addQuery, setAddQuery] = useState("")
  const [selectedItemId, setselectedItemId] = useState()
  const [selectedLoc, setSelectedLoc] = useState("")
  const [newSelectedLoc, setNewSelectedLoc] = useState("Unspecified")
  const [selectedStore, setSelectedStore] = useState("Gunberrel Kings")
  // const [selectedStore, setSelectedStore] = useState("Playground")
  const [count, setCount] = useState(1)
  const [viewColorSelector, setViewColorSelector] = useState(false)
  // console.log(list.filter(item => item[1].inCart))
  const [mealObj, setMealObj] = useState({})
  const [allMealsObj, setAllMealsObj] = useState({})
  const [mealList, setMealList] = useState([])
  const [dayMealList, setDayMealList] = useState([])
  
  useEffect(() => {
    onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
      let shoppingListArray = Object.entries(snapshot.val())
      setList(shoppingListArray)
      setObj(snapshot.val())
    } else {
      alert("Failed to fetch db snapshot")
    }
    })
    onValue(mealPlanInDB, function(snapshot) {
      if (snapshot.exists()) {
        setMealObj(snapshot.val())
      } else {
        alert("Failed to fetch db snapshot")
      }
    })
    onValue(mealsInDB, function(snapshot) {
      if (snapshot.exists()) {
        setAllMealsObj(snapshot.val())
      } else {
        alert("Failed to fetch db snapshot")
      }
    })
  }, [])
  
  useEffect(() => {
    const weekStartingToday = nextDays(3)
    setMealList(weekStartingToday.map(day => allMealsObj[mealObj[day]]))
  }, [mealObj, allMealsObj])

  useEffect(() => {
    setDayMealList(mealList.map((elem, idx) => [nextDays()[idx], elem ? elem.name: "None"]))
  }, [mealList])

  function nextDays(n=7) {
    if (n > 7 || n < 0) return null
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date()
    return Array(7).fill().map((_, idx) => 
      today.getDay()+idx < 7 ? weekdays[today.getDay()+idx] : weekdays[today.getDay()+idx-7])
      .slice(0,n)
  }

  
  function addClick() {
    let inputFieldEl = document.getElementById("input-field")
    let inputValue = inputFieldEl.value
    if (!inputValue) {
      alert("Please give item a name!")
      return
    }
    let newEntry = {name:inputValue, inCart:true, homeLoc:newSelectedLoc}
    push(shoppingListInDB, newEntry)
    inputFieldEl.value = ""
    setAddQuery("")
    setNewSelectedLoc("Unspecified")
  }

  function handleChangeCart(event) {
    const {id, checked} = event.target
    const item = obj[id]
    let storeUpdate = {}
      
      // reset each hour
      if (Date.now() > then+3600000) {
        console.log("reset")
        setCount(1)
        then = Date.now()
      }

      if (!item[selectedStore]) {
        storeUpdate = {
          numChecks: 1, 
          ave: count
        }
      } else {
        const numChecks = item[selectedStore].numChecks + 1
        storeUpdate = {
          numChecks: numChecks, 
          ave: calcNewRunningAverage(count, item[selectedStore].ave, numChecks)
        }
      }
    set(ref(database, "homeToCart/" + id), {
      ...item,
      "inCart" : checked ? false : true,
      "timeStamp" : Date.now(),
      [selectedStore] : storeUpdate,
    })
    setCount(prev => prev+1)
  }
  // console.log("count", count)

  /* ---------------------

    Utility functions

     ---------------------*/ 
  
  // Check item change event
  function handleChangeHome(event) {
    const {id, checked} = event.target
    const item = obj[id]
    set(ref(database, "homeToCart/" + id), {
      ...item,
      "inCart" : checked ? true : false,
    })
    setQuery("")
    setAddQuery("")
  }

  // Search bar entry
  function handleChangeSearch(event) {
    const { value } = event.target;
    setQuery(value);
  }

  // Add input filter
  function handleChangeAdd(event) {
    const { value } = event.target;
    setAddQuery(value);
  }

  // change sections
  function sectionClick(section) {
    setSectionSelect(section)
  }

  // clear inputs on enter key
  function searchEnter(event) {
    if (event.key === "Enter") {
      event.target.blur()
    }
  }

  // toggle mod menu (dots)
  function menuClick(id) {
    if (selectedItemId === id) {
      setselectedItemId()
    } else {
      setselectedItemId(id)
    }
  }

  // select highlight color
  function colorClick(color) {
    const item = obj[selectedItemId]
    set(ref(database, `homeToCart/${selectedItemId}`), {
      ...item,
      "highlightColor" : color
    })
    setViewColorSelector(false)
    setselectedItemId()
  }

  /* ----------------   Mod menu funtions ------------------------*/

  // delete
  function deleteItem(id) {
    if (!id) return
    if (window.confirm("Remove Item?")) {
      let exactLocationOfItemDB = ref(database, `homeToCart/${id}`)
        
      remove(exactLocationOfItemDB)
    }
    setselectedItemId()
  }

  // edit name
  function editItem() {
    const item = obj[selectedItemId]
    const newName = prompt("Name:", item.name) || item.name
    set(ref(database, "homeToCart/" + selectedItemId), {
      ...item,
      "name" : newName
    })
    setselectedItemId()
  }

  // change home section from mod menu
  function handleChangeHomeLoc(event) {
    const {value} = event.target
    const item = obj[selectedItemId]
    set(ref(database, "homeToCart/" + selectedItemId), {
      ...item,
      "homeLoc" : value
    })
    setselectedItemId()
  }

  /* ----------------------------------------------------------*/

  // Select home location filter
  function handleChangeHomeLocSelect(event) {
    const {value} = event.target
    setSelectedLoc(value)
    event.target.blur()
  }

  // change home section for new item
  function handleChangeNewHomeLocation(event) {
    const {value} = event.target
    setNewSelectedLoc(value)
    event.target.blur()
  }

  // Select store
  function handleChangeStoreSelect(event) {
    const {value} = event.target
    setSelectedStore(value)
    event.target.blur()
  }
  
  // calculate running average for store location of items
  function calcNewRunningAverage(newVal, oldAve, n) {
    return ((oldAve*(n-1) + newVal)/n)
  }


  // Initialize search conditions and location filter
  const condition = new RegExp(query.toLowerCase())
  const listSearch = list.filter(elem => condition.test(elem[1].name.toLowerCase()) || 
                                         (elem[1].homeLoc && condition.test(elem[1].homeLoc.toLowerCase())))
  const listFilter = listSearch.filter(elem => {
    if (!selectedLoc) return elem
    else if (selectedLoc === "Unspecified") return elem[1].homeLoc === undefined || elem[1].homeLoc === "Unspecified"
    else return elem[1].homeLoc === selectedLoc
  })

  // Sort the filtered list
  listFilter.sort((i1, i2) => (i1[1].timeStamp < i2[1].timeStamp) ? 1 : (i1[1].timeStamp > i2[1].timeStamp) ? -1 : 0)

  // Initialize add conditions
  const conditionAdd = new RegExp(addQuery.toLowerCase())
  const listFilterAdd = list.filter(elem => conditionAdd.test(elem[1].name.toLowerCase()))

  // sort cart list by running average

  // useEffect(() => {
  list.sort((i1, i2) => {
    if (i1[1][selectedStore]) {
      if(i2[1][selectedStore]) {
        if (i1[1][selectedStore].ave > i2[1][selectedStore].ave) return 1
        else if (i1[1][selectedStore].ave < i2[1][selectedStore].ave) return -1
        else return 0
      } else {
        return -1
      }
    } else {
      return 1
    }
  })

  // }, [selectedStore])
  
  // Setup all section lists
  const cartList = list.map(item => item[1].inCart && 
    <CartItem 
      key={item[0]} 
      id={item[0]} 
      item={item[1]}
      handleChange={handleChangeCart}
      menuClick={menuClick}
      selected={selectedItemId===item[0]}
    />)

  const homeList = listFilter.map(item => 
    <HomeItem 
      key={item[0]} 
      id={item[0]} 
      item={item[1]}
      handleChange={handleChangeHome}
      menuClick={menuClick}
      selected={selectedItemId===item[0]}
    />)

  const addList = listFilterAdd.map(item => 
    <HomeItem 
      key={item[0]} 
      id={item[0]} 
      item={item[1]}
      handleChange={handleChangeHome}
      menuClick={menuClick}
      selected={selectedItemId===item[0]}
    />)

  return (
    <>
      <div className="App">
        {/* top spacer */}
        <div style={{height:"95px"}} />

        {/* -----Add section----- */}
        {sectionSelect === "Add" &&
          <>
            <input 
              className="add-input" 
              onChange={handleChangeAdd} 
              type="text" 
              id="input-field" 
              placeholder="Name"
              onKeyDown={searchEnter}
            />
            <select className="addSelect" onChange={handleChangeNewHomeLocation} value={newSelectedLoc}>
              <option value="Unspecified">Home Location</option>
              {homeLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
            </select>
            <button className="addButton" id="add-button" onClick={addClick}>Add Item</button>
            <div>
              {addQuery && addList}
            </div>
          </>
        }
        {/* -----Cart section----- */}
        {sectionSelect === "Cart" &&
          <div>
            {cartList}
          </div>
        }
        {/* -----Home section----- */}
        {sectionSelect === "Home" &&
          <div>
            {homeList}
          </div>
        }
      </div>
      {/* bottom spacer */}
      <div style={{height:"85px"}} />

      {/* Top bar */}
      <div className="navbar-group">
        <div className='navbar-search'>
          {sectionSelect === "Cart" &&
            <button className="button">
              {list.filter(item => item[1].inCart).length}
            </button>
          }
          {/* Search bar  */}
          {sectionSelect === "Home" &&
            <input 
              className="searchbar" 
              type="text" 
              id="search-field" 
              placeholder="Search" 
              onKeyDown={searchEnter}
              onChange={handleChangeSearch} 
              value={query}
            /> 
          }

          {/* Query cancel */}
          {sectionSelect === "Home" && query && 
            <button 
              className="button" 
              onClick={() => setQuery("")}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>}
        </div>
        <div>
          {/* Home filter */}
          {sectionSelect === "Home" &&
            <select 
              className='select-home'
              id="homeLocSelect"
              value={selectedLoc}
              onChange={handleChangeHomeLocSelect}
              name="homeLocSelect"
            >
              <option value="">Home</option>
              {homeLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
              <option value="Unspecified">Unspecified</option>
            </select>
          }

          {/* Store select */}
          {sectionSelect === "Cart" &&
            <>
            
            <select 
              className='select-store'
              id="homeLocSelect"
              value={selectedStore}
              onChange={handleChangeStoreSelect}
              name="storeLocSelect"
              >
              {stores.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
            </select>
            </>
          }
        </div>
      </div>

      {/* Mod bar */}
      {selectedItemId &&
        <div className="mod-group">
          <ModButton 
            section={"Edit"} 
            handleClick={editItem} 
            sectionSelect={sectionSelect}
            selectedItemId={selectedItemId}
          />
          <select 
            className='select'
            id="homeLoc"
            value={obj[selectedItemId].homeLoc}
            onChange={handleChangeHomeLoc}
            name="homeLoc"
          >
            <option value={obj[selectedItemId].homeLoc}>{obj[selectedItemId].homeLoc}</option>
            {homeLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
          </select>
          <ModButton 
            section={"Color"} 
            handleClick={() => setViewColorSelector(prev => !prev)} 
            sectionSelect={sectionSelect}
            selectedItemId={selectedItemId}
          />
          <ModButton 
            section={"Delete"} 
            handleClick={deleteItem} 
            sectionSelect={sectionSelect}
            selectedItemId={selectedItemId}
          />
        </div>}

      {/* Navigation bar */}
      {!selectedItemId &&
        <div className="btn-group">
          {sections.map((section, idx) => 
            <NavButton 
              key={idx} 
              section={section} 
              handleClick={sectionClick} 
              sectionSelect={sectionSelect}
            />)}
        </div>}
      {!selectedItemId && <MealList dayMealList={dayMealList} />}
      {viewColorSelector && <ColorSelector clickHandle={colorClick} selectedItemColor={obj[selectedItemId].highlightColor} />}
    </>
  );
}

export default App;




// the off click thingy...
// https://codeburst.io/the-off-click-7cbc08bb3df51
