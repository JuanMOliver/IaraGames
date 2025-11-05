import React, { useState } from 'react';

function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const usuarioValido = data.find(
      (user) => user.username === usuario && user.email === senha
    );
    if (usuarioValido) {
      alert('Login bem-sucedido');
    } else {
      setErro('Credenciais inválidas');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={fazerLogin}>Login</button>
      {erro && <p>{erro}</p>}
    </div>
  );
}

export default LoginForm;
