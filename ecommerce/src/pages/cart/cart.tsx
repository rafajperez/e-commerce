import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartHasItems = true;
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4 text-stone-800">
        Meu carrinho
      </h1>
      <section className="flex items-center justify-between border-b-2 border-stone-400">
        <img src="" alt="Logo produto" className="w-28" />
        <strong className="text-stone-800">Preço:</strong>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-stone-800 px-2 rounded text-white font-medium flex items-center justify-center">
            -
          </button>
          2
          <button className="bg-stone-800 px-2 rounded text-white font-medium flex items-center justify-center">
            +
          </button>
        </div>
        <strong className="float-right text-stone-800">Subtotal:</strong>
      </section>
      <p className="font-bold mt-4 text-stone-800">Total: R$</p>
      {cartHasItems && (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
