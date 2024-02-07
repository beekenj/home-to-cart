import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database"

// React Components
import ModBar from './components/ModBar';
import ColorSelector from './components/ColorSelector';
import MealList from './components/MealList';
import NavBar from './components/NavBar';
import ListSections from './components/ListSections';
import TopBar from './components/TopBar';

// Stylesheet
import './App.css';

// Utility functions
import { calcNewRunningAverage, searchEnter, nextDays } from './js/utilities'

// firebase stuff
const appSettings = {
  databaseURL: "https://realtime-database-aef6c-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "homeToCart")
const mealPlanInDB = ref(database, "mealPlan")
const mealsInDB = ref(database, "meals")

let then = Date.now()

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
    "Gunberrel Kings",
    "Longmont Kings",
    "Boulder Safeway",
    "Boulder Kings",
    "Sam's Club",
  ]
  const sections = ["Cart", "Home", "Add"]

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
  const [count, setCount] = useState(1)
  const [viewColorSelector, setViewColorSelector] = useState(false)
  const [mealObj, setMealObj] = useState({})
  const [allMealsObj, setAllMealsObj] = useState({})
  const [mealList, setMealList] = useState([])
  const [dayMealList, setDayMealList] = useState([])
  
  // useEffect hooks
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
  
  /* ---------------------

    Utility functions

     ---------------------*/ 
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

      if (!item[selectedStore] || !item[selectedStore].numChecks) {
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

  // Initialize search conditions and location filter
  const condition = new RegExp(query.toLowerCase())
  const listSearch = list.filter(elem => condition.test(elem[1].name.toLowerCase()) || 
    (elem[1].homeLoc && condition.test(elem[1].homeLoc.toLowerCase())))
  const listFilter = listSearch.filter(elem => {
    if (!selectedLoc) return elem
    else if (selectedLoc === "Unspecified") return elem[1].homeLoc === undefined || 
      elem[1].homeLoc === "Unspecified"
    else return elem[1].homeLoc === selectedLoc
  })

  // Sort the filtered list
  listFilter.sort((i1, i2) => (i1[1].timeStamp < i2[1].timeStamp) ? 
    1 : (i1[1].timeStamp > i2[1].timeStamp) ? -1 : 0)

  // Initialize add conditions
  const conditionAdd = new RegExp(addQuery.toLowerCase())
  const listFilterAdd = list.filter(elem => conditionAdd.test(elem[1].name.toLowerCase()))

  // sort cart list by running average
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

  
  // function update(store) {
  //   list.forEach((elem, idx) => {
  //     // console.log(elem[0])
  //     elem[1][store] = {...elem[1][store], "sortNum" : idx}
  //     set(ref(database, "homeToCart/" + elem[0]), {
  //       ...elem[1],
  //     })
  // })
  // }
  
  // update(selectedStore)
  // console.log(list.map((elem, idx)=>elem[1][selectedStore]))
  return (
    <>
      <ListSections
        sectionSelect = {sectionSelect}
        handleChangeAdd = {handleChangeAdd}
        searchEnter = {searchEnter}
        handleChangeNewHomeLocation = {handleChangeNewHomeLocation}
        newSelectedLoc = {newSelectedLoc}
        homeLocations = {homeLocations}
        addClick = {addClick}
        addQuery = {addQuery}
        listFilterAdd = {listFilterAdd}
        handleChangeHome = {handleChangeHome}
        menuClick = {menuClick}
        selectedItemId = {selectedItemId}
        list = {list}
        handleChangeCart = {handleChangeCart}
        listFilter = {listFilter}
      />
      <TopBar
        handleChangeSearch = {handleChangeSearch}
        query = {query}
        sectionSelect = {sectionSelect}
        setQuery = {setQuery}
        list = {list}
        searchEnter = {searchEnter}
        selectedLoc = {selectedLoc}
        handleChangeHomeLocSelect = {handleChangeHomeLocSelect}
        homeLocations = {homeLocations}
        selectedStore = {selectedStore}
        handleChangeStoreSelect = {handleChangeStoreSelect}
        stores = {stores}
      />
      <MealList 
        dayMealList={dayMealList} 
      />
      <ModBar 
        homeLocations = {homeLocations}
        editItem = {editItem} 
        sectionSelect = {sectionSelect} 
        selectedItemId = {selectedItemId}
        obj = {obj}
        handleChangeHomeLoc = {handleChangeHomeLoc}
        setViewColorSelector = {setViewColorSelector}
        deleteItem = {deleteItem}
      />
      <NavBar
        selectedItemId = {selectedItemId}
        sections = {sections}
        sectionClick = {sectionClick}
        sectionSelect = {sectionSelect}
      />
      <ColorSelector 
        clickHandle={colorClick} 
        selectedItemColor={obj[selectedItemId]} 
        viewColorSelector = {viewColorSelector}
      />
    </>
  )
}

export default App;

// the off click thingy...
// https://codeburst.io/the-off-click-7cbc08bb3df51