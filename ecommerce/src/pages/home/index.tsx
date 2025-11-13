import React from "react";
import { Link } from "react-router-dom";
import cupcoffee from "../../assets/cupcoffee.jpeg";
const Home: React.FC = () => {
  return (
    <div
      className="relative h-[80vh] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${cupcoffee})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 p-8 max-w-2xl bg-white/10 backdrop-blur-sm rounded-xl">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Desperte Seus Sentidos
        </h1>
        <p className="text-xl text-gray-200 mb-8 font-light">
          Somos apaixonados por grãos de alta qualidade, torrados à perfeição
          para entregar a você a experiência mais rica em cada xícara. Descubra
          o sabor autêntico do nosso café especial.
        </p>

        <Link
          to="/products"
          className="bg-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-700 transition-colors shadow-lg"
        >
          Explorar Nossos Cafés
        </Link>
      </div>
    </div>
  );
};

export default Home;
