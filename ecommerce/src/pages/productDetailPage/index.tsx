import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; // Verifique o caminho
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../hooks/useFetchProducts";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [showNotification, setShowNotification] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Se o ID não existir, pare

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "produtos", id); // Referencia o documento pelo ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          setError("Produto não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Ocorreu um erro ao carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };
  if (loading) {
    return (
      <p className="text-center mt-20 text-stone-700">
        Carregando detalhes do café...
      </p>
    );
  }
  if (error || !product) {
    return (
      <p className="text-center mt-20 text-red-600 font-bold">
        {error || "Produto não encontrado."}
      </p>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8 mt-20 bg-white rounded-xl shadow-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.cover}
            alt={product.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold text-stone-900 mb-4">
            {product.title}
          </h1>

          <p className="text-stone-600 text-lg mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-end gap-3 mb-6">
            <strong className="text-green-700 text-4xl font-extrabold ">
              {product.price?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <span className="text-stone-600 text-xl font-bold">
              {product.unit}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-stone-800 text-white font-bold rounded-xl hover:bg-stone-700 transition-colors shadow-md flex items-center justify-center text-lg"
          >
            Adicionar ao Carrinho
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full mt-3 py-2 bg-gray-200 text-stone-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
          >
            Voltar para o Catálogo
          </button>
        </div>
      </div>
      {showNotification && product && (
        <div className="fixed bottom-10 right-10 bg-green-700 text-white py-3 px-6 rounded-lg shadow-2xl z-50 transition-all duration-300">
          <p className="font-semibold text-lg flex items-center gap-2">
            <span>✅</span> "{product.title}" adicionado!
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="text-yellow-300 text-sm mt-1 hover:text-yellow-100 underline"
          >
            Ver Carrinho
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
