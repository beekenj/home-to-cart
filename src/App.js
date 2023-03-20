// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, } from "firebase/database"
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, onValue, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// import("https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js").then(module => { initializeApp })
// import("https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js").then(module => { getDatabase, ref, onValue, })

import ListItem from './components/ListItem';
import './App.css';

const appSettings = {
  databaseURL: "https://realtime-database-aef6c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")



function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    onValue(shoppingListInDB, function(snapshot) {
      if (snapshot.exists()) {
          let shoppingListArray = Object.entries(snapshot.val())  
          // console.log(shoppingListArray)      
  
          // clearShoppingListEl()
          
          // shoppingListArray.map(item => appendListItem(shoppingListEl, item))
          setList(shoppingListArray)
      } else {
          // shoppingListEl.innerHTML = "No items here... yet"
      }
  })
  }, [])

  return (
    <div className="App">
      {/* <button id="add-button">Add to cart</button> */}
      {list.map(item => <ListItem key={item[0]} itemName={item[1]} />)}
    </div>
  );
}

export default App;
