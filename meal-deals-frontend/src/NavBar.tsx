import { Link } from "react-router";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="left"></div>
      <div className="middle">
        <Link to="/mealdeals">Meals</Link>
        <Link to="/shopping">Shopping</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/ingredients">Ingredients</Link>
      </div>
      <div className="right"></div>
    </nav>
  );
};

export default NavBar;
