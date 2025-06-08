import axios from "axios";
import { useState, useEffect } from "react";
import { fetchInfo, patchInfo } from "./common_functions.tsx";

import "./Recipes.css";
import NavBar from "../NavBar.tsx";

function Recipes() {
  const [recipes, setRecipes] = useState<{ id: number; name: string; serves: number; source: string }[]>([]);
  const [ingredients, setIngredients] = useState<{ id: number; name: string; buy: boolean; aisleID: number }[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<{ id: number; quantity: number; unit: string; IngredientId: number; RecipeId: number }[]>([]);

  const [addVisible, setAddVisible] = useState(false);
  const [formDataRecipe, setFormDataRecipe] = useState({ name: "", serves: "", source: "" });
  const [formDataIngredient, setFormDataIngredient] = useState({ IngredientId: 1, quantity: 0, unit: "" });
  const [error, setError] = useState(null);

  const [recipeVisible, setRecipeVisible] = useState(0);
  const [currentRecipeIngredientList, setCurrentRecipeIngredientList] = useState<{ id: number; quantity: number; unit: string; IngredientId: number }[]>([]);

  useEffect(() => {
    fetchInfo("recipes", setRecipes, setError);
    fetchInfo("ingredients", setIngredients, setError);
    fetchInfo(`recipeIngredients`, setRecipeIngredients, setError);
  }, []);

  const handleChangeRecipe = (input) => {
    const { name, type, checked, value } = input.target;
    setFormDataRecipe({ ...formDataRecipe, [name]: type === "checkbox" ? checked : value });
  };
  const handleChangeIngredient = (input) => {
    const { name, type, checked, value } = input.target;
    setFormDataIngredient({ ...formDataIngredient, [name]: type === "checkbox" ? checked : value });
  };

  const handleToggleRecipe = (recipeID) => {
    if (recipeID == recipeVisible) {
      setRecipeVisible(0);
      setCurrentRecipeIngredientList([]);
    } else {
      setRecipeVisible(recipeID);
      setCurrentRecipeIngredientList(() => recipeIngredients.filter((ingredient) => ingredient.RecipeId === recipeID));
    }
  };

  const handleSubmitRecipeAdd = async (input: React.FormEvent<HTMLFormElement>) => {
    input.preventDefault();
    console.log("adding recipe with info ", formDataRecipe);

    try {
      const result = await axios.post("http://localhost:3000/recipes/", formDataRecipe);
      console.log("recipe successfully added", result.data);
      setRecipes((prevRecipes) => [...prevRecipes, { id: result.data.id, ...formDataRecipe, serves: Number(formDataRecipe.serves) }]); // html forms ALWAYS return strings, so we need to cast to a number
      setFormDataRecipe({ name: "", serves: "", source: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitIngredientAdd = async () => {
    console.log("adding ingredient with info ", formDataIngredient);

    try {
      // get recipeID, post to recipeingredient, add to recipeingredients
      const result = await axios.post(`http://localhost:3000/recipeIngredients/${recipeVisible}`, { ...formDataIngredient, quantity: Number(formDataIngredient.quantity), RecipeId: recipeVisible });
      console.log("ingredient successfully added", result.data);

      setRecipeIngredients((currentRIs) => [...currentRIs, { id: result.data.id, ...formDataIngredient, quantity: Number(formDataIngredient.quantity), RecipeId: recipeVisible }]);
      setCurrentRecipeIngredientList((currentRIs) => [...currentRIs, { id: result.data.id, ...formDataIngredient, quantity: Number(formDataIngredient.quantity), RecipeId: recipeVisible }]);
      setFormDataIngredient({ IngredientId: 1, quantity: 0, unit: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePatchIngredient = async (RIid, input) => {
    let { name, value } = input.target;
    value = name === "quantity" ? String(value) : value;
    try {
      patchInfo(`recipeIngredients/${RIid}`, { [name]: value }, setError);
      console.log(`updating ${RIid} with ${name}:`, value);
      setRecipeIngredients((currentRIs) => currentRIs.map((currentRI) => (currentRI.id === RIid ? { ...currentRI, [name]: value } : currentRI)));
      setCurrentRecipeIngredientList((currentRIs) => currentRIs.map((currentRI) => (currentRI.id === RIid ? { ...currentRI, [name]: value } : currentRI)));
    } catch {}
  };

  const deleteIngredient = async (id: number) => {
    console.log("deletion request logged with id ", id);
    try {
      await axios.delete(`http://localhost:3000/recipeIngredients/${recipeVisible}/${id}`);
      console.log("deleted RI with id ", id);
      setRecipeIngredients((prevRIs) => prevRIs.filter((prevRIs) => prevRIs.id !== id));
      setCurrentRecipeIngredientList((prevRIs) => prevRIs.filter((prevRIs) => prevRIs.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>{error}</div>
      {addVisible && (
        <div className="test">
          <form onSubmit={handleSubmitRecipeAdd}>
            <input name="name" type="text" value={formDataRecipe.name} onFocus={(e) => e.target.select()} onChange={handleChangeRecipe} />
            <input name="serves" type="text" value={formDataRecipe.serves} onFocus={(e) => e.target.select()} onChange={handleChangeRecipe} />
            <input name="source" type="text" value={formDataRecipe.source} onFocus={(e) => e.target.select()} onChange={handleChangeRecipe} />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      <div className="wrapper">
        <table>
          {recipes.map((recipe) => (
            <>
              <tbody>
                {recipe.name !== "" && (
                  <tr key={String(recipe.id)} onClick={() => handleToggleRecipe(recipe.id)}>
                    <td colSpan={2}>{recipe.name}</td>
                    <td>{recipe.serves}</td>
                    <td>{recipe.source}</td>
                  </tr>
                )}
                {recipe.id == recipeVisible &&
                  currentRecipeIngredientList.map((RI) => (
                    <tr className={"diminished"} key={RI.id}>
                      <td>{ingredients.find((actualingredient) => actualingredient.id == RI.IngredientId)?.name}</td>
                      <td>
                        <input name="quantity" type="text" value={RI.quantity} onFocus={(e) => e.target.select()} onChange={(input) => handlePatchIngredient(RI.id, input)} />
                      </td>
                      <td>
                        <input name="unit" type="text" value={RI.unit} onFocus={(e) => e.target.select()} onChange={(input) => handlePatchIngredient(RI.id, input)} />
                      </td>
                      <td>
                        <button onClick={() => deleteIngredient(RI.id)}>X</button>
                      </td>
                    </tr>
                  ))}
                {recipe.id == recipeVisible && (
                  <tr
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmitIngredientAdd();
                      }
                    }}
                    className={"diminished"}
                    key="adder"
                  >
                    <td>
                      <select name="IngredientId" value={formDataIngredient.IngredientId} onChange={handleChangeIngredient}>
                        {ingredients.map((ingredient) => (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input name="quantity" type="number" value={formDataIngredient.quantity} onFocus={(e) => e.target.select()} onChange={handleChangeIngredient} />
                    </td>
                    <td>
                      <input name="unit" type="text" value={formDataIngredient.unit} onFocus={(e) => e.target.select()} onChange={handleChangeIngredient} />
                    </td>
                    <td>
                      {/* this displays weird because it has display:flex on it */}
                      <button onClick={handleSubmitIngredientAdd}>Add</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </>
          ))}
        </table>
      </div>
      <button className="toggler" onClick={() => setAddVisible((state) => !state)}></button>
      <NavBar />
    </>
  );
}

export default Recipes;
