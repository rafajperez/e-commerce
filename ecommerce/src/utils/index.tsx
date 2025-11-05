export const translateFirebaseError = (code: string): string => {
  switch (code) {
    //Erros de login e senha (signInWithEmailAndPassword)
    case "auth/user-not-found":
      return "Nenhuma conta encontrada com este e-mail";
    case "auth/wrong-password":
      return "A senha fornecida está incorreta";
    case "auth/invalid-credential":
      return "Credenciais inválidas. Verifique o e-mail e a senha ";

    //Erros de registro (createUserWithEmailAndPassword)
    case "auth/email-already-in-use":
      return "Este endereço de e-mail já está em uso por outra conta";
    case "auth/weak-password":
      return "A senha é muito fraca. Ela deve ter pelo menos 6 caracteres";
    // Erros gerais de E-mail/Senha
    case "auth/invalid-email":
      return "O endereço de e-mail fornecido é inválido.";
    case "auth/operation-not-allowed":
      return "Login com e-mail/senha não está ativado no Firebase Console.";
    case "auth/too-many-requests":
      return "Muitas tentativas de login falharam. Tente novamente mais tarde.";
    case "auth/network-request-failed":
      return "Falha na conexão de rede. Verifique sua internet e tente novamente.";
    default:
      // Se for um código de erro desconhecido, mostra uma mensagem genérica e o código original
      // para facilitar a depuração.
      console.error(`Código de erro do Firebase não mapeado: ${code}`);
      return "Ocorreu um erro desconhecido na autenticação. Tente novamente.";
  }
};
