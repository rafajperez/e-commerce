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
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 className="font-bold text-center ">Cadastre-se na Coffee Shop!</h2>

      {/* Exibe o erro se houver */}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "#22150d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Registrando..." : "Criar Conta"}
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Já tem uma conta? <Link to="/login">Faça Login</Link>
      </p>
    </div>
  );
};
export default SignupPage;
