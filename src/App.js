import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database"

import HomeItem from './components/HomeItem';
import CartItem from './components/CartItem';
import NavButton from './components/NavButton';
import ModButton from './components/ModButton';
import EditInterface from './components/EditInterface';
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


let then = Date.now()
let count = 0

function App() {
  const sections = ["Cart", "Home", "Add"]
  const [list, setList] = useState([])
  const [obj, setObj] = useState({})
  const [sectionSelect, setSectionSelect] = useState("Cart")
  const [query, setQuery] = useState("")
  const [addQuery, setAddQuery] = useState("")
  const [selectedItemId, setselectedItemId] = useState()
  const [editWindow, setEditWindow] = useState(false)
  
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
  }, [])
  
  function handleClick() {
    let inputFieldEl = document.getElementById("input-field")
    let inputValue = inputFieldEl.value
    let newEntry = {name:inputValue, inCart:true}
    push(shoppingListInDB, newEntry)
    inputFieldEl.value = ""
    setAddQuery("")
  }

  function handleChangeCart(event) {
    const {id, checked} = event.target
    const item = obj[id]

    if (Date.now() > then+3600000) {
      count = 0
      then = Date.now()
    }
    set(ref(database, "homeToCart/" + id), {
      ...item,
      "inCart" : checked ? false : true,
      "timeStamp" : Date.now(),
      "priority" : count,
    })
    count += 1
  }

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

  function handleChangeSearch(event) {
    const { value } = event.target;
    setQuery(value);
  }

  function handleChangeAdd(event) {
    const { value } = event.target;
    setAddQuery(value);
  }

  function sectionClick(section) {
    setSectionSelect(section)
  }

  function searchEnter(event) {
    // console.log(event.key)
    if (event.key === "Enter") {
      event.target.blur()
    }
  }

  function menuClick(id) {
    if (selectedItemId === id) {
      setselectedItemId()
    } else {
      setselectedItemId(id)
    }
  }

  function deleteItem(id) {
    if (window.confirm("Delete Item?")) {
      let exactLocationOfItemDB = ref(database, `homeToCart/${id}`)
        
      remove(exactLocationOfItemDB)
    }
    setselectedItemId()
  }

  function editItem() {
    const item = obj[selectedItemId]
    const newName = prompt("Name:", item.name) || item.name
    set(ref(database, "homeToCart/" + selectedItemId), {
      ...item,
      "name" : newName
    })
    setselectedItemId()
  }

  // window.addEventListener("click", function(){ alert("Hello World!"); });
  
  // function calcNewRunningAverage(newVal, oldAve, n) {
  //   return ((oldAve*(n-1) + newVal)/n)
  // }


  // Initialize search conditions
  const condition = new RegExp(query.toLowerCase())
  const listFilter = list.filter(elem => condition.test(elem[1].name.toLowerCase()))

  // Sort the filtered list
  listFilter.sort((i1, i2) => (i1[1].timeStamp < i2[1].timeStamp) ? 1 : (i1[1].timeStamp > i2[1].timeStamp) ? -1 : 0)


  // Initialize add conditions
  const conditionAdd = new RegExp(addQuery.toLowerCase())
  const listFilterAdd = list.filter(elem => conditionAdd.test(elem[1].name.toLowerCase()))

  // sort cart list by priority
  list.sort((i1, i2) => (i1[1].priority > i2[1].priority) ? 1 : (i1[1].priority < i2[1].priority) ? -1 : 0)
  
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
        <div style={{height:"25px"}} />
        {sectionSelect === "Add" &&
          <>
            <input 
              className="add-input" 
              onChange={handleChangeAdd} 
              type="text" 
              id="input-field" 
              placeholder="Bread"
              onKeyDown={searchEnter}
            />
            <button className="addButton" id="add-button" onClick={handleClick}>Add to DB</button>
            <div>
              {addQuery && addList}
            </div>
          </>
        }
        {sectionSelect === "Cart" &&
          <div>
            {cartList}
          </div>
        }
        
        {sectionSelect === "Home" &&
          <div>
            {homeList}
          </div>
        }
        {editWindow && 
          <EditInterface 
            // selectedItemId={selectedItemId}

            // db={database}
            itemName={obj[selectedItemId].name}
          />
        }
      </div>
      {/* bottom spacer */}
      <div style={{height:"85px"}} />
      <div className="navbar-group">
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
      {sectionSelect === "Home" && query && 
        <button 
          className="button" 
          onClick={() => setQuery("")}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>}
      </div>
      {selectedItemId &&
        <div className="mod-group">
            <ModButton 
              section={"Edit"} 
              handleClick={editItem} 
              sectionSelect={sectionSelect}
              selectedItemId={selectedItemId}
            />
            <ModButton 
              section={"Filter"} 
              handleClick={editItem} 
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
    </>
  );
}

export default App;




// the off click thingy...
// https://codeburst.io/the-off-click-7cbc08bb3df51