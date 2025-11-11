import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  cover: string;
  description: string;
  unit: string;
}

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, "produtos");
        const productSnapshot = await getDocs(productsCollectionRef);

        const productsList = productSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Product)
        );

        setProducts(productsList);
        setError(null);
      } catch (err: unknown) {
        console.error("Erro ao buscar produtos:", err);
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
