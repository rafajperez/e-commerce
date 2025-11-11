import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const { products, loading, error } = useFetchProducts();
  const { addItem } = useCart();

  if (loading) {
    return (
      <p className="text-center mt-20 text-stone-700 text-xl animate-pulse">
        Buscando os melhores grãos... ☕
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-600 font-bold">
        Erro ao carregar produtos: {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center mt-20 text-stone-700">
        Nenhum café encontrado no catálogo.
      </p>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="font-bold text-3xl mb-16 mt-10 text-center text-stone-800 tracking-wide">
        Nossos Cafés Especiais
      </h1>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <section
            key={product.id}
            className="w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-stone-100"
          >
            <Link
              to={`/produtos/${product.id}`}
              className="block cursor-pointer"
            >
              <img
                className="w-full h-56 object-cover"
                src={product.cover}
                alt={product.title}
              />

              <div className="p-4 bg-stone-50 border-t border-stone-200">
                <h2 className="font-bold text-xl text-stone-900 mb-1">
                  {product.title}
                </h2>

                <p className="text-stone-600 text-sm mb-3 line-clamp-2">
                  {product.subtitle}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between p-4 pt-2">
              <div className="flex items-end gap-2">
                <strong className="text-stone-900 text-2xl font-extrabold">
                  {product.price?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <span className="text-stone-500 text-sm font-semibold mb-0.5">
                  {product.unit}
                </span>
              </div>
              <button
                onClick={() => addItem(product)}
                className="flex items-center bg-stone-800 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-stone-700 transition-colors shadow-md"
              >
                <BsCartPlus size={18} color="#FFF" className="mr-2" />
                Adicionar
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Products;
