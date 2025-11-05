import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserStatus: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Não foi possível sair no momento. Tente novamente.");
    }
  };
  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ color: "#fff", fontSize: "0.9rem" }}>
          Olá, **{user?.email || "Usuário"}**!
        </span>
        <button
          onClick={handleLogout}
          className="bg-stone-700 hover:bg-stone-800 text-white font-semibold py-1 px-3 rounded-md transition-colors"
        >
          Sair
        </button>
      </div>
    );
  }
  return (
    <div>
      <Link
        to="/login"
        className="text-white hover:text-gray-300 transition-colors mr-4"
      >
        Login /
      </Link>
      <Link
        to="/signup"
        className="text-white hover:text-gray-300 transition-colors"
      >
        Cadastrar
      </Link>
    </div>
  );
};
export default UserStatus;
