import axios from "axios";
import { useEffect, useState } from "react"; // useEffect allows you to run some code inside a component when something changes
import { fetchInfo, patchInfo } from "./common_functions.tsx";

import "./Shopping.css";
import NavBar from "../NavBar.tsx";

const Shopping = () => {
  const [ingredients, setIngredients] = useState<{ id: number; name: string; buy: boolean; aisleID: number }[]>([]);
  // const [shopping, setShopping] = useState<{ id: number; need: boolean; bought: boolean; MealDealId: number; RecipeIngredientId: number }[]>([]);
  const [extras, setExtras] = useState<{ id: number; name: string; quantity: number; bought: boolean }[]>([]);
  const [formData, setFormaData] = useState({ name: "", quantity: 1 });

  const [shoppingList, setShoppingList] = useState<
    { ingredientName: string; aisleName: number; aislePos: number; quantity: number; unit: string; need: boolean; bought: boolean; shoppingIDList: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllInfo = async () => {
      try {
        // setX only updates on render and we want to do things with the info first, so store them in local variables
        const taisles: { id: number; position: string; name: string }[] = (await axios.get(`http://localhost:3000/aisles/`)).data;
        const tingredients: { id: number; name: string; buy: boolean; aisleID: number }[] = (await axios.get(`http://localhost:3000/ingredients/`)).data;
        setIngredients(tingredients);
        const trecipeIngredients: { id: number; quantity: number; unit: string; IngredientId: number; RecipeId: number }[] = (await axios.get(`http://localhost:3000/recipeIngredients/`)).data;
        const trecipes: { id: number; name: string; serves: number; source: string }[] = (await axios.get(`http://localhost:3000/recipes/`)).data;
        const tmealDeals: { id: number; day: string; recipeID: number; serves: string }[] = (await axios.get(`http://localhost:3000/mealDeals/`)).data;
        const tshopping: { id: number; need: boolean; bought: boolean; MealDealId: number; RecipeIngredientId: number }[] = (await axios.get(`http://localhost:3000/shopping/`)).data;
        // setShopping(tshopping);

        // construct an array with {idlist, ingredname, aislename, aislepos, quantity, need, bought}
        let shoppingList = tshopping.map((shopItem) => {
          const mealDealID = shopItem.MealDealId;
          const shoppingID = shopItem.RecipeIngredientId;
          const recipeID = tmealDeals.find((mealDeal) => mealDeal.id === mealDealID)?.recipeID;
          const ingredientID = trecipeIngredients.find((RI) => RI.id === shoppingID)?.IngredientId;
          const aisleID = tingredients.find((ingredient) => ingredient.id === ingredientID)?.aisleID;

          const ingredientName = tingredients.find((ingredient) => ingredient.id === ingredientID)?.name;

          const aisleName = taisles.find((aisle) => aisle.id === aisleID)?.name;
          const aislePos = taisles.find((aisle) => aisle.id === aisleID)?.position;

          const mealServes = tmealDeals.find((mealDeal) => mealDeal.id === mealDealID)?.serves;
          const recipeServes = trecipes.find((recipe) => recipe.id === recipeID)?.serves;
          const RIQuant = trecipeIngredients.find((RI) => RI.id === shoppingID)?.quantity;
          const quantity = RIQuant * (mealServes / recipeServes);
          const unit = trecipeIngredients.find((RI) => RI.id === shoppingID)?.unit;

          const buy = tingredients.find((ingredient) => ingredient.id === ingredientID)?.buy;
          const need = buy ? true : shopItem.need;

          const bought = shopItem.bought;

          return { ingredientName: ingredientName, aisleName: aisleName, aislePos: aislePos, quantity: quantity, unit: unit, need: need, bought: bought, shoppingIDList: String(shopItem.id) };
        });

        // first combine the quantities in rows with same unit
        const intermediate1 = shoppingList.reduce((acc, row) => {
          const existingRow = acc.find((item) => item.ingredientName === row.ingredientName && item.unit === row.unit);
          if (existingRow) {
            console.log("new, existing", row, existingRow);
            existingRow.quantity = Math.round((existingRow.quantity + row.quantity + Number.EPSILON) * 100) / 100; // round to 2dp
            existingRow.shoppingIDList = `${existingRow.shoppingIDList},${row.shoppingIDList}`; // concatenate shoppingIDLists
          } else {
            acc.push({ ...row, quantity: Math.round((row.quantity + Number.EPSILON) * 100) / 100 });
          }
          return acc;
        }, []);
        // combine rows with the same ingredient name, and change the units to be a list of [quantity unit] strings
        const intermediate2 = intermediate1.reduce((acc, row) => {
          const existingRow = acc.find((item) => item.ingredientName === row.ingredientName);
          if (existingRow) {
            existingRow.unit = `${existingRow.unit}, ${row.quantity} ${row.unit}`;
            existingRow.shoppingIDList = `${existingRow.shoppingIDList},${row.shoppingIDList}`; // concatenate shoppingIDLists
          } else {
            acc.push({ ...row, unit: `${row.quantity} ${row.unit}` });
          }
          return acc;
        }, []);
        // sort by ingredientname
        intermediate2.sort((a, b) => a.ingredientName?.localeCompare(b.ingredientName));
        // then sort by aislepos
        intermediate2.sort((a, b) => a.aislePos - b.aislePos);

        setShoppingList(intermediate2);
      } catch (err) {
        setError(err.message);
        console.error(`Failed to get/process data.`);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo(`extras`, setExtras, setError);
    fetchAllInfo();
  }, []);

  const HandleNeedBought = (ingredientName: string, needbought: string) => {
    // change the needbought in shoppinglist
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((shopItem) => {
        if (shopItem.ingredientName === ingredientName) {
          // split shopItem.shoppingIDList by comma, then patch each with !shopItem.needbought
          for (let shoppingID of shopItem.shoppingIDList.split(",")) {
            patchInfo(`shopping/${shoppingID}`, { [needbought]: !shopItem[needbought] }, setError);
          }

          return { ...shopItem, [needbought]: !shopItem[needbought] };
        } else {
          return shopItem;
        }
      })
    );
  };

  const handleExtrasChange = (extraID: number) => {
    setExtras((prevExtras) =>
      prevExtras.map((extra) => {
        if (extra.id === extraID) {
          patchInfo(`extras/${extraID}`, { bought: !extra.bought }, setError);
          return { ...extra, bought: !extra.bought };
        } else {
          return extra;
        }
      })
    );
  };

  const handleFormData = (input) => {
    let { name, type, value } = input.target;
    if (type === "number") {
      value = Number(value);
    }
    setFormaData({ ...formData, [name]: value });
  };

  const handleAddExtra = async () => {
    try {
      const result = await axios.post("http://localhost:3000/extras/", formData);
      setExtras((prevExtras) => [...prevExtras, { id: result.data.id, ...formData }]);
      setFormaData({ name: "", quantity: 1 });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleDeleteExtra = async (extraID) => {
    try {
      await axios.delete(`http://localhost:3000/extras/${extraID}`);
      console.log("deleted extra with id ", extraID);

      setExtras((prevExtras) => prevExtras.filter((prevExtra) => prevExtra.id !== extraID));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleResetAll = async () => {
    try {
      await axios.patch("http://localhost:3000/shopping/reset");
      console.log("reset all shoppings");

      setShoppingList((prevShoppingList) =>
        prevShoppingList.map((shoppingListItem) => {
          // check if item is a buy item, in which case we don't don't want to reset need
          const buy = ingredients.find((ingredient) => ingredient.name === shoppingListItem.ingredientName)?.buy;
          return { ...shoppingListItem, need: buy ? true : false, bought: false };
        })
      );
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  if (loading) {
    return (
      <>
        <div className="wrapper">
          <table>
            <tbody></tbody>
          </table>
        </div>
        <div className="wrapper">
          <table>
            <tbody></tbody>
          </table>
        </div>
        <NavBar />
      </>
    );
  }

  return (
    <>
      <div>{error}</div>
      <div className="wrapper">
        <table>
          <tbody>
            {extras.map((extra) => (
              <tr key={extra.id} className={extra.bought ? "inactive" : "active"}>
                <td onClick={() => handleExtrasChange(extra.id)}>{extra.name}</td>
                <td onClick={() => handleExtrasChange(extra.id)}>{extra.quantity}</td>
                <td>
                  <button onClick={() => handleDeleteExtra(extra.id)}>X</button>
                </td>
              </tr>
            ))}
            <tr
              key="addextra"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddExtra();
                }
              }}
              className={"diminished"}
            >
              <td>
                <input name="name" type="text" value={formData.name} onFocus={(e) => e.target.select()} onChange={handleFormData} />
              </td>
              <td>
                <input name="quantity" type="number" value={formData.quantity} onFocus={(e) => e.target.select()} onChange={handleFormData} />
              </td>
              <td>
                <button onClick={handleAddExtra}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="wrapper">
        <table>
          <tbody>
            {shoppingList
              .filter((shopItem) => shopItem.need === true)
              .map((shopItem) => (
                <tr key={`buy${shopItem.ingredientName}`} className={shopItem.bought ? "inactive" : "active"} onClick={() => HandleNeedBought(shopItem.ingredientName, "bought")}>
                  <td>{shopItem.ingredientName}</td>
                  <td>{shopItem.aisleName}</td>
                  <td>{shopItem.unit}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="wrapper">
        <table>
          <tbody>
            {shoppingList
              .filter((shopItem) => {
                // return true if it's a check item. check item is stored in ingredients, so find the ingredient with the matching name and get the buy/check
                const buy = ingredients.find((ingredient) => ingredient.name === shopItem.ingredientName)?.buy;
                return buy ? false : true;
              })
              .map((shopItem) => (
                <tr key={`check${shopItem.ingredientName}`} className={shopItem.need ? "inactive" : "active"} onClick={() => HandleNeedBought(shopItem.ingredientName, "need")}>
                  <td>{shopItem.ingredientName}</td>
                  <td>{shopItem.aisleName}</td>
                  <td>{shopItem.unit}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="wrapper">
        <button onClick={handleResetAll}>Reset All</button>
      </div>
      <NavBar />
    </>
  );
};

export default Shopping;
