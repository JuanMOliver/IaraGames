import React, { useState } from 'react';

function CEPForm() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const buscarEndereco = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    setEndereco(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={buscarEndereco}>Buscar Endereço</button>
      {endereco && (
        <div>
          <p>Rua: {endereco.logradouro}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Cidade: {endereco.localidade}</p>
        </div>
      )}
    </div>
  );
}

export default CEPForm;
