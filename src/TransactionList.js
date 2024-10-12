import React, { useState } from "react";

function TransactionList({ monthId, transactions, deleteTransaction, updateTransaction, addTransaction }) {
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedValue, setUpdatedValue] = useState("");

  // Para adicionar nova transação
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleEditClick = (transaction) => {
    setEditingTransactionId(transaction.id);
    setUpdatedDescription(transaction.description);
    setUpdatedValue(transaction.amount);
  };

  const handleUpdateTransaction = () => {
    if (updatedDescription && updatedValue) {
      const updatedTransaction = {
        id: editingTransactionId,
        description: updatedDescription,
        amount: parseFloat(updatedValue),
      };
      updateTransaction(monthId, updatedTransaction); // Chamando a função de atualização
      setEditingTransactionId(null);
      setUpdatedDescription("");
      setUpdatedValue("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Função para adicionar nova transação
  const handleAddTransaction = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    if (!newDescription || !newValue) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newTransaction = {
      id: transactions.length + 1, // A lógica pode ser melhorada para garantir IDs únicos
      description: newDescription,
      amount: parseFloat(newValue),
    };
    addTransaction(monthId, newTransaction); // Chamando a função para adicionar transação
    setNewDescription("");
    setNewValue("");
  };

  return (
    <>
      <form onSubmit={handleAddTransaction} className="transaction-form">
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Compra do mês"
        />
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          step="0.01"
          placeholder="Valor"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {editingTransactionId === transaction.id ? (
              <>
                <input
                  type="text"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Descrição"
                />
                <input
                  type="number"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  step="0.01"
                  placeholder="Valor"
                />
                <button onClick={handleUpdateTransaction}>
                  <i className="bi bi-check"></i> {/* Ícone de check */}
                  
                </button>
              </>
            ) : (
              <>
                {transaction.description} - R$ {transaction.amount.toFixed(2)}
                <div className="button-group">
                  <button className="botaoEditar" onClick={() => handleEditClick(transaction)}>
                    <i className="bi bi-pencil"></i> {/* Ícone de caneta */}
                  </button>
                  <button className="botaoExcluir" onClick={() => deleteTransaction(monthId, transaction.id)}>
                    <i className="bi bi-trash3"></i> {/* Ícone de lixeira */}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;
