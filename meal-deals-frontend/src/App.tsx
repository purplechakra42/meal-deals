import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import Shopping from "./pages/Shopping.tsx";
import Recipes from "./pages/Recipes.tsx";
import Ingredients from "./pages/Ingredients.tsx";
import Aisles from "./pages/Aisles.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mealdeals" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/aisles" element={<Aisles />} />
      </Routes>
    </div>
  );
}

export default App;
