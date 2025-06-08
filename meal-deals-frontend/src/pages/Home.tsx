import axios from "axios";
import { useEffect, useState } from "react"; // useEffect allows you to run some code inside a component when something changes
import { fetchInfo, patchInfo, deleteMultipleInfo } from "./common_functions.tsx";

import NavBar from "../NavBar.tsx";

function Home() {
  const [recipes, setRecipes] = useState<{ id: number; name: string; serves: number; source: string }[]>([]);
  const [mealDeals, setMealDeals] = useState<{ id: number; day: string; recipeID: number; serves: string }[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<{ id: number; quantity: number; unit: string; IngredientId: number; RecipeId: number }[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInfo("mealdeals", setMealDeals, setError);
    fetchInfo("recipes", setRecipes, setError);
    fetchInfo("recipeIngredients", setRecipeIngredients, setError);
  }, []);

  const createMultipleInfo = async (location: string, info) => {
    try {
      const response = await axios.post(`http://localhost:3000/${location}`, info);
      console.log(`Succesfully posted multiple ${location} data.`);
    } catch (err) {
      setError(err.message);
      console.error(`Failed to post multiple ${location} data.`);
    }
  };

  const handleServesChange = (mealDealID: number, input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;
    setMealDeals((prevMealDeals) => prevMealDeals.map((mealDeal) => (mealDealID === mealDeal.id ? { ...mealDeal, [name]: Number(value) } : mealDeal)));
    patchInfo(`mealdeals/${mealDealID}`, { [name]: Number(value) }, setError);
  };

  const handleRecipeChange = (mealDealID: number, input: React.ChangeEvent<HTMLSelectElement>) => {
    // update the local mealdeals information WHICH WON'T CHANGE UNTIL THE NEXT RENDER
    const { name, value } = input.target;
    setMealDeals((prevMealDeals) => prevMealDeals.map((mealDeal) => (mealDealID === mealDeal.id ? { ...mealDeal, [name]: Number(value) } : mealDeal)));

    // update the meal deals table
    patchInfo(`mealdeals/${mealDealID}`, { [name]: Number(value) }, setError);

    // delete all shopping entries that match the MealDealId
    deleteMultipleInfo(`shopping/${mealDealID}`, setError);

    // we need to get the current recipeID and serves, but the useState hasn't updated yet. so...
    const currentMealDeal = mealDeals.find((mealDeal) => mealDeal.id === mealDealID);
    let recipeID = 0;
    if (name === "recipeID") {
      recipeID = Number(value);
    } else if (name === "serves") {
      recipeID = Number(currentMealDeal?.recipeID);
    }

    // add all the RIs from the current meal, with the MealDealId
    const itemsToAdd = recipeIngredients
      .filter((RI) => RI.RecipeId === recipeID) // find all the ones that match the selected meal
      .map((RI) => ({ need: false, bought: false, MealDealId: mealDealID, RecipeIngredientId: RI.id })); // map them to a new row in Shopping
    console.log(itemsToAdd);
    createMultipleInfo(`shopping/${mealDealID}`, itemsToAdd);
  };

  return (
    <>
      <div>{error}</div>
      <div className="wrapper">
        <table>
          <tbody>
            {mealDeals.map(
              (mealdeal) =>
                !["Weekly", "Extras"].includes(mealdeal.day) && (
                  <tr key={mealdeal.id}>
                    <td>{mealdeal.day}</td>
                    <td>
                      <select name="recipeID" value={mealdeal.recipeID} onChange={(input) => handleRecipeChange(mealdeal.id, input)}>
                        {recipes.map(
                          (recipe) =>
                            !["Weekly", "Extras"].includes(mealdeal.day) && (
                              <option className="breakout" key={recipe.id} value={recipe.id}>
                                {recipe.name}
                              </option>
                            )
                        )}
                      </select>
                    </td>
                    <td>
                      <input name="serves" type="number" value={mealdeal.serves} onFocus={(e) => e.target.select()} onChange={(input) => handleServesChange(mealdeal.id, input)} />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="wrapper">
        <table>
          <tbody>
            {mealDeals.map(
              (mealdeal) =>
                mealdeal.day == "Weekly" && (
                  <tr key={mealdeal.id}>
                    <td>{mealdeal.day}</td>
                    <td>
                      <select name="recipeID" value={mealdeal.recipeID} onChange={(input) => handleRecipeChange(mealdeal.id, input)}>
                        {recipes.map((recipe) => (
                          <option className="breakout" key={recipe.id} value={recipe.id}>
                            {recipe.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input name="serves" type="number" value={mealdeal.serves} onFocus={(e) => e.target.select()} onChange={(input) => handleServesChange(mealdeal.id, input)} />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <NavBar />
    </>
  );
}

export default Home;
