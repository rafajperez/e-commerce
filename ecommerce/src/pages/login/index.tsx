import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { translateFirebaseError } from "../../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      const firebaseError = err as { code?: string; message?: string };
      let errorMessage = "Ocorreu um erro desconhecido ao tentar fazer o login";

      if (firebaseError.code) {
        errorMessage = translateFirebaseError(firebaseError.code);
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-stone-900 to-stone-700">
      <form
        onSubmit={handleLogin}
        className="bg-stone-100/90 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm text-center"
      >
        <h1 className="text-3xl font-bold text-stone-900 mb-6">Coffee Shop</h1>
        <p className="text-stone-700 mb-6">Bem-vindo de volta! ☕</p>
        {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500"
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full p-3 bg-stone-700 text-stone-100 font-semibold rounded-xl hover:bg-stone-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Acessando..." : "Entrar"}
        </button>

        <p className="mt-6 text-sm text-stone-700">
          Ainda não tem conta?{" "}
          <Link
            to="/signup"
            className="underline hover:text-stone-900 transition-colors"
          >
            <span className="underline cursor-pointer">Cadastre-se</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
