import NavBar from "../NavBar.tsx";
import axios from "axios";
import { useEffect, useState } from "react"; // useEffect allows you to run some code inside a component when something changes

const Shopping = () => {
  const [aisles, setAisles] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ position: "", name: "" });

  useEffect(() => {
    const fetchAisles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/aisles/");
        console.log("Succesfully got aisle data");
        setAisles(response.data);
      } catch (err) {
        setError(err.message);
        console.log("UnSuccesfully got aisle data");
      }
    };

    fetchAisles();
  }, []); // the [] here is the list of things that will trigger this code. passing an empty array means it will only run once, at the start

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted with:", formData); // Log form data

    try {
      const response = await axios.post("http://localhost:3000/aisles/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from server:", response.data);

      // Add the new aisle to the existing aisles state
      setAisles((prevAisles) => [...prevAisles, response.data]);

      // Reset the form
      setFormData({ position: "", name: "" });
      console.log("form reset");
    } catch (err) {
      console.error("Error adding aisle:", err.message);
      setError(err.message);
    }
  };

  const handleChange = (input) => {
    setFormData({ ...formData, [input.target.name]: input.target.value }); // start with what's already in there (a dict), then create or update the given key with the given value
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div>{formData.name}</div>
        <div>{formData.position}</div>

        <form onSubmit={handleSubmit}>
          <input type="number" name="position" value={formData.position} onChange={handleChange} />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="wrapper">
        <table>
          {aisles.map((aisle) => (
            <tr>
              <td>{aisle.position}</td>
              <td>{aisle.name}</td>
              <td>test</td>
            </tr>
          ))}
        </table>
      </div>
      <NavBar />
    </>
  );
};

export default Shopping;
