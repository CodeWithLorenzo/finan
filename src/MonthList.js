import React from "react";
import TransactionList from "./TransactionList";

function MonthList({ months, addTransaction, deleteTransaction, updateTransaction }) {
  return (
    <div className="month-list">
      {months.map((month) => {
        // Calcular total de gastos
        const totalExpenses = month.expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
        // Calcular sobra
        const totalSurplus = month.income - totalExpenses;

        return (
          <div key={month.id}>
            <h3>{month.name}</h3>
            <h4>Receita: R$ {month.income.toFixed(2)}</h4>
            <h4>Gastos Totais: R$ {totalExpenses.toFixed(2)}</h4>
            <h4>Sobra: R$ {totalSurplus.toFixed(2)}</h4>
            <TransactionList
              monthId={month.id}
              transactions={month.expenses}
              addTransaction={addTransaction}
              deleteTransaction={deleteTransaction}
              updateTransaction={updateTransaction}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MonthList;
