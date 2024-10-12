import React, { useState, useEffect } from "react";
import MonthForm from "./MonthForm";
import MonthList from "./MonthList";
import './App.css';

function App() {
  const loadMonthsFromLocalStorage = () => {
    const storedMonths = localStorage.getItem("months");
    return storedMonths ? JSON.parse(storedMonths) : [];
  };

  const [months, setMonths] = useState(loadMonthsFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("months", JSON.stringify(months));
  }, [months]);

  const addMonth = (newMonth) => {
    const updatedMonths = [...months, { ...newMonth, id: months.length + 1 }];
    setMonths(updatedMonths);
  };

  const addTransaction = (monthId, newTransaction) => {
    const updatedMonths = months.map((month) =>
      month.id === monthId
        ? { ...month, expenses: [...month.expenses, newTransaction] }
        : month
    );
    setMonths(updatedMonths);
  };

  const deleteTransaction = (monthId, transactionId) => {
    const updatedMonths = months.map((month) =>
      month.id === monthId
        ? {
            ...month,
            expenses: month.expenses.filter((t) => t.id !== transactionId),
          }
        : month
    );
    setMonths(updatedMonths);
  };

  const updateTransaction = (monthId, updatedTransaction) => {
    const updatedMonths = months.map((month) =>
      month.id === monthId
        ? {
            ...month,
            expenses: month.expenses.map((transaction) =>
              transaction.id === updatedTransaction.id
                ? updatedTransaction
                : transaction
            ),
          }
        : month
    );
    setMonths(updatedMonths);
  };

  return (
    <div className="container">
      <h1>Controle Financeiro do Lorenzo</h1>
      <MonthForm addMonth={addMonth} />
      <MonthList
        months={months}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        updateTransaction={updateTransaction} // Passando a função aqui
      />
    </div>
  );
}

export default App;
