import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    nome: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
  });

  const inputClasses =
    "p-3 border rounded-lg focus:ring-2 focus:ring-stone-500";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // 🛑 Validação: Garantir que os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.cep || !formData.endereco) {
      alert("Por favor, preencha todos os campos obrigatórios de envio.");
      return;
    }

    // Simulação de Pedido
    console.log("Pedido Enviado:", {
      user: user?.email,
      items: items,
      shipping: formData,
      total: totalPrice,
    });
    clearCart();
    alert(
      `🎉 Pedido de R$ ${totalPrice
        .toFixed(2)
        .replace(".", ",")} finalizado com sucesso!`
    );
    navigate("/", { replace: true });
  };

  // ✅ LÓGICA 1: EARLY RETURN (Se o carrinho estiver vazio)
  if (items.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-stone-700">Seu carrinho está vazio!</h1>
        <button
          onClick={() => navigate("/produtos")}
          className="mt-4 bg-stone-800 text-white py-2 px-4 rounded-md hover:bg-stone-700 transition-colors"
        >
          Voltar para a Loja
        </button>
      </div>
    );
  }
  // -------------------------------------------------------------------

  // ✅ LÓGICA 2: RENDERIZAÇÃO PRINCIPAL (Se o carrinho NÃO estiver vazio)
  // O código continua e retorna o JSX principal aqui.
  return (
    <div className="w-full max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8 mt-6">
      {/* Lado Esquerdo: Formulário */}
      <div className="lg:w-3/5 bg-white p-6 rounded-xl shadow-lg border border-stone-200">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">
          Informações de Envio
        </h2>

        <p className="mb-6 bg-stone-100 p-3 rounded-md text-stone-700">
          Você está finalizando a compra como:{" "}
          <strong className="font-semibold">{user?.email}</strong>
        </p>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* INPUTS - Certifique-se de que os 'name' estão corretos */}
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Nome Completo"
              required
            />
            <input
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Digite seu CEP"
              required
            />
            <input
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className={`${inputClasses} md:col-span-2`}
              placeholder="Endereço (Rua, Número, Bairro)"
              required
            />
            <input
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Cidade"
              required
            />
            <input
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Estado"
              required
            />
          </div>

          <h3 className="text-xl font-bold text-stone-800 mb-4 mt-8">
            Método de pagamento
          </h3>
          {/* Placeholder Pagamento */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-300">
            <label className="flex items-center space-x-3 text-stone-800">
              <input
                type="radio"
                name="payment"
                value="credit"
                defaultChecked
                className="h-4 w-4 text-stone-600 focus:ring-stone-500"
              />
              <span>Cartão de Crédito / Débito (Simulado)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md"
          >
            Pagar e Finalizar o pedido
          </button>
        </form>
      </div>

      {/* Lado Direito: Resumo do Pedido */}
      <div className="lg:w-2/5 sticky top-4 self-start bg-stone-50 p-6 rounded-xl shadow-lg border border-stone-200">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Seu Pedido</h2>

        <ul className="space-y-3 border-b pb-4 mb-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between text-stone-700 text-sm"
            >
              <span className="font-medium">
                {item.title} x {item.quantity}
              </span>
              <span>
                R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-stone-900 font-bold flex justify-between text-xl pt-2">
          <span>Total a Pagar:</span>
          <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
