import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { translateFirebaseError } from "../../utils";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signup(email, password);

      navigate("/produtos");
    } catch (err) {
      console.error(err);

      const firebaseError = err as { code?: string; message?: string };
      let errorMessage = "Ocorreu um erro desconhecido ao tentar registrar";
      if (firebaseError.code) {
        errorMessage = translateFirebaseError(firebaseError.code);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full p-3 mb-4 rounded-xl border border-stone-400 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-600 transition-shadow";
  const containerClasses =
    "bg-stone-300/90 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm text-center";
  const buttonBaseClasses =
    "w-full p-3 font-semibold rounded-xl transition-colors disabled:opacity-50";

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className={containerClasses}>
        <h2 className="text-3xl font-bold text-stone-900 mb-6">
          Cadastre-se na Coffee Shop! ☕
        </h2>

        {error && <p className="text-red-600 mb-4 font-bold">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="text-left mb-4">
            <label
              htmlFor="email"
              className="text-stone-700 font-medium block mb-1"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className={inputClasses}
            />
          </div>

          <div className="text-left mb-6">
            <label
              htmlFor="password"
              className="text-stone-700 font-medium block mb-1"
            >
              Senha:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            // ✅ Botão no tom de café (stone-700/800)
            className={`${buttonBaseClasses} bg-stone-700 text-white hover:bg-stone-800`}
          >
            {loading ? "Registrando..." : "Criar Conta"}
          </button>
        </form>

        <p className="mt-6 text-sm text-stone-700">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="underline text-stone-900 hover:text-stone-600 transition-colors"
          >
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignupPage;
