import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  const foodsToDisplay = foods.filter((food) => {
    if(filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  })
  function handleFilterChange(event) {
    setFilterBy(event.target.value)
  }
  // use map to add item.
  const foodList = foodsToDisplay.map((food) => (
    <li key ={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ))

  function handleLiClick(id){
    // filter food id that is not the id. so if you click on the food id; it will filter out that id and return the new array with food that is not the id. 

    // remove item use filter
    // const newFoodArray = foods.filter((food) => food.id !== id)

    // update item use ...array ; spread operator
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          // return ...array, headLevel: food.heatLevel + 1 will be added to the exisiting array.
          ...food,
          heatLevel: food.heatLevel +1,
        }
      }else {
        return food;
      }
    })
    setFoods(newFoodArray);
  }
  function handleAddFood() {
    const newFood = getNewSpicyFood();
    // [...array, newArray] ; add array of food from newArray to [...array] old array
    // this is updating the state;/ array
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
    console.log(newFood);
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
        <select name="filter" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
