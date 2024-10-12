import React, { useState } from "react";

function MonthForm({ addMonth }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Por favor, preencha o nome do mês!");
      return;
    }

    addMonth({
      name,
      income: 1221.21,  // Valor fixo de 1221.21
      expenses: []
    });

    setName("");  // Reseta o campo de nome após submissão
  };

  return (
    <form onSubmit={handleSubmit} className="month-form">
      <input
        type="text"
        placeholder="Qual mês deseja adicionar? Ex: Novembro"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required  // Adiciona validação para campo obrigatório
      />
      <input
        type="number"
        value={1221.21}  // Valor fixo
        readOnly         // Campo só de leitura, o usuário não pode alterar
      />
      <button type="submit">Adicionar Mês</button>
    </form>
  );
}

export default MonthForm;
