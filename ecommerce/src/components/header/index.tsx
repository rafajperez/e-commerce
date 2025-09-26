import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full px-1 bg-stone-500">
      <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
        <Link
          className="font-bold bg-white w-28  text-3x1 pl-2.5 rounded-sm"
          to="/"
        >
          Coffee Shop
        </Link>

        <Link to="/cart">
          <FiShoppingCart size={24} color="#121212" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
