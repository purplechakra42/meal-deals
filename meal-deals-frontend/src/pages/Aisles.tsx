import axios from "axios";
import { useEffect, useState } from "react"; // useEffect allows you to run some code inside a component when something changes
import { fetchInfo } from "./common_functions.tsx";
import NavBar from "../NavBar.tsx";

const Aisles = () => {
  const [aisles, setAisles] = useState<{ id: number; position: string; name: string }[]>([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ position: "", name: "" }); // this is how we keep track of the information in the form

  useEffect(() => {
    fetchInfo("aisles", setAisles, setError);
  }, []);

  const handleChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [input.target.name]: input.target.value }); // start with what's already in there (a dict), then create or update the given key with the given value
  };

  // this syntax ( vs `async handleSubmit(input) {...}` ) is common practice for react functional components. it doesn't have a `this.`, whatever that means
  const handleSubmitAdd = async (input: React.FormEvent<HTMLFormElement>) => {
    input.preventDefault();
    console.log("form submitted with payload ", formData);

    try {
      const result = await axios.post("http://localhost:3000/aisles/", formData);
      console.log("Posted successfully", result.data);
      setAisles((prevAisles) => [...prevAisles, { id: result.data.id, ...formData }]); // the ... is a spread operator, which un-nests the data from formdata
      setFormData({ position: "", name: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAisle = async (id: number) => {
    console.log("deletion request logged with id ", id);
    try {
      await axios.delete(`http://localhost:3000/aisles/${id}`);
      console.log("deleted aisle with id ", id);
      setAisles((prevAisles) => prevAisles.filter((aisle) => aisle.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // if (!aisles.length) {
  //   console.log("returning nothing");
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>{error}</div>
      <div className="wrapper">
        <form onSubmit={handleSubmitAdd}>
          <input name="position" type="number" value={formData.position} onChange={handleChange} />
          <input name="name" type="text" value={formData.name} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="wrapper">
        <table>
          <tbody>
            {aisles.map((aisle) => (
              <tr key={String(aisle.id)}>
                <td>{aisle.position}</td>
                <td>{aisle.name}</td>
                {/* <td>
                  <button onClick={() => deleteAisle(aisle.id)}>X</button>
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

export default Aisles;
