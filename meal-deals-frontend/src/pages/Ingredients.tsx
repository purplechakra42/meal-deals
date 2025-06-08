import axios from "axios";
import { useEffect, useState } from "react"; // useEffect allows you to run some code inside a component when something changes
import { fetchInfo } from "./common_functions.tsx";

import "./Ingredients.css";
import NavBar from "../NavBar.tsx";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<{ id: number; name: string; buy: boolean; aisleID: number }[]>([]);
  const [aisles, setAisles] = useState<{ id: number; position: string; name: string }[]>([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "", buy: false, aisleID: "" }); // this is how we keep track of the information in the form

  useEffect(() => {
    fetchInfo("ingredients", setIngredients, setError);
    fetchInfo("aisles", setAisles, setError);
  }, []);

  const handleChange = (input) => {
    const { name, type, checked, value } = input.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmitAdd = async (input: React.FormEvent<HTMLFormElement>) => {
    input.preventDefault();
    console.log("form submitted with payload ", formData);

    try {
      const result = await axios.post("http://localhost:3000/ingredients/", formData);
      console.log("item successfully added", result.data);
      setIngredients((prevIngreds) => [...prevIngreds, { id: result.data.id, ...formData, aisleID: Number(formData.aisleID) }]); // html forms ALWAYS return strings, so we need to cast to a number
      setFormData({ name: "", buy: false, aisleID: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteIngredient = async (id: number) => {
    console.log("deletion request logged with id ", id);
    try {
      await axios.delete(`http://localhost:3000/ingredients/${id}`);
      console.log("deleted aisle with id ", id);
      setIngredients((prevIngreds) => prevIngreds.filter((ingredient) => ingredient.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // if (!ingredients.length || !aisles.length) {
  //   console.log("returning nothing");
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>{error}</div>
      <div className="wrapper">
        <form onSubmit={handleSubmitAdd}>
          <input name="name" type="text" value={formData.name} onFocus={(e) => e.target.select()} onChange={handleChange} />
          <input name="buy" type="checkbox" checked={formData.buy} onFocus={(e) => e.target.select()} onChange={handleChange} />
          {"("}
          <span className={formData.buy ? "toggleactive" : "toggleinactive"}>{formData.buy ? "--o" : "o--"}</span>
          {")"}
          <select name="aisleID" className="disabled" value={formData.aisleID || ""} onChange={handleChange}>
            <option value="" disabled>
              Aisle
            </option>
            {aisles.map((aisle) => (
              <option key={aisle.id} value={Number(aisle.id)}>
                {aisle.name}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="wrapper">
        <table>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={String(ingredient.id)}>
                <td>{ingredient.name}</td>
                <td>{ingredient.buy ? "Buy" : "Check"}</td>
                <td>{aisles.find((aisle) => aisle.id === ingredient.aisleID)?.name}</td>
                {/* <td>
                  <button onClick={() => deleteIngredient(ingredient.id)}>X</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavBar />
    </>
  );
};

export default Ingredients;
