import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { FiTrash2 } from "react-icons/fi";
const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    items,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    getTotalPrice,
  } = useCart();

  const total = getTotalPrice();
  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="font-medium text-2xl text-center my-4 text-stone-800">
        Meu Carrinho ({items.length} {items.length === 1 ? "item" : "itens"})
      </h1>

      {items.length === 0 && (
        <div className="text-center my-10 text-stone-600">
          <p className="text-xl">Seu carrinho está vazio. ☕</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-stone-500 text-white py-2 px-4 rounded-md hover:bg-stone-600 transition-colors"
          >
            Ver Produtos
          </button>
        </div>
      )}

      {items.map((item) => (
        <section
          key={item.id}
          className="flex items-center justify-between border-b-2 border-stone-400 py-3 mb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.cover || "placeholder.jpg"}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md"
            />
            <strong className="text-stone-800">{item.title}</strong>
          </div>

          <div className="flex items-end gap-1 flex-shrink-0 w-[150px] justify-end">
            <strong className="text-stone-800 text-base font-semibold">
              R$ {item.price?.toFixed(2).replace(".", ",")}
            </strong>

            <span className="text-stone-500 text-xs mb-[1px]">{item.unit}</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => decrementQuantity(item.id)}
              className="bg-stone-800 px-2 rounded text-white font-medium flex items-center justify-center h-8 w-8 hover:bg-stone-700"
            >
              -
            </button>
            <span className="font-semibold">{item.quantity}</span>
            <button
              onClick={() => incrementQuantity(item.id)}
              className="bg-stone-800 px-2 rounded text-white font-medium flex items-center justify-center h-8 w-8 hover:bg-stone-700"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <strong className="text-stone-800">
              Subtotal: R${" "}
              {(item.price * item.quantity).toFixed(2).replace(".", ",")}
            </strong>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </section>
      ))}

      {items.length > 0 && (
        <>
          <p className="font-bold mt-6 text-stone-800 text-right text-xl">
            Total: R$ {total.toFixed(2).replace(".", ",")}
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition-colors shadow-lg"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
