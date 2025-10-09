import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full px-1 bg-stone-800">
      <nav className="w-full pl-0  h-14 flex items-center justify-between px-5 ml-2 ">
        <Link
          className="font-bold bg-white w-28  text-3x1 pl-2.5 text-stone-800 rounded-sm"
          to="/"
        >
          Coffee Shop
        </Link>

        <Link to="/cart">
          <FiShoppingCart size={24} color="#ffff" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
