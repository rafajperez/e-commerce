import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { BsCartPlus } from "react-icons/bs";

interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

const Home = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  return (
    <div>
      <main className="w-full max-w-7x1 px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
          Produtos mais vendidos
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <section key={product.id} className="w-full">
              <img
                className="w-full rounded-lg max-h-70 mb-2"
                src={product.cover}
                alt={product.title}
              />
              <p className="font-medium mt-1 mb-2">{product.title} </p>
              <div>
                <strong className="text-zinc-700/90">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button className="bg-zinc-900 p-1 rounded">
                  <BsCartPlus size={20} color="#FFF" />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
