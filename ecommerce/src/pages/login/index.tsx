import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);
    alert(`Login enviado!\nEmail: ${email}\nSenha: ${password}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-stone-900 to-stone-700">
      <form
        onSubmit={handleLogin}
        className="bg-stone-100/90 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm text-center"
      >
        <h1 className="text-3xl font-bold text-stone-900 mb-6">Coffee Shop</h1>
        <p className="text-stone-700 mb-6">Bem-vindo de volta! ☕</p>

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500"
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500"
          required
        />

        <button
          type="submit"
          className="w-full p-3 bg-stone-700 text-stone-100 font-semibold rounded-xl hover:bg-stone-800 transition-colors"
        >
          Entrar
        </button>

        <p className="mt-6 text-sm text-stone-700">
          Ainda não tem conta?{" "}
          <span className="underline cursor-pointer">Cadastre-se</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
