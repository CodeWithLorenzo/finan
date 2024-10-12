import React, { useState } from "react";

function TransactionForm({ monthId, addTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    addTransaction(monthId, {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    });

    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        type="text"
        placeholder='Ex: "Compras do mês"'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Adicionar Compra</button>
    </form>
  );
}

export default TransactionForm;
