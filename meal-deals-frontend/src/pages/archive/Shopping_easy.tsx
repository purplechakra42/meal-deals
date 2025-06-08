import NavBar from "../NavBar.tsx";
import axios from "axios";
import { useEffect, useState } from "react"; // useEffect allows you to run some code inside a component when something changes

const Shopping = () => {
  const [aisles, setAisles] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="wrapper">
        <form action="http://localhost:3000/aisles/">
          <input type="number" name="position" id="position" />
          <input type="text" name="name" id="name" />
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
