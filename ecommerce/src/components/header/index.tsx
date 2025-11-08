import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import UserStatus from "../../components/userStatus.tsx";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const logoClasses = `font-script font-bold bg-white w-28 text-2xl pl-1.5 text-stone-800 rounded-sm 
                       ${
                         isHomePage
                           ? "cursor-default opacity-90"
                           : "hover:opacity-75 transition-opacity"
                       }`;

  return (
    <header className="w-full px-1 bg-stone-800">
      <nav className="w-full h-14 flex items-center justify-between px-5 ml-2">
        <div className="flex items-center space-x-6">
          <Link
            className={logoClasses}
            to="/"
            onClick={(e) => isHomePage && e.preventDefault()}
          >
            Coffee Shop
          </Link>
          <Link
            to="/products"
            className="text-white font-semibold hover:text-gray-300 transition-colors"
          >
            Produtos
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <UserStatus />

          <Link to="/cart">
            <FiShoppingCart size={24} color="#ffff" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
