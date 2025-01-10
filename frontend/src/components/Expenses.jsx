import { Link } from 'react-router-dom';
import { useState } from 'react';
import TransactionList from './TransactionList';
import '../styles/income-expenses.css';

function Expenses({ transactions, categories }) {

  const [timePeriod, setTimePeriod] = useState("day"); // Default to "day"

  const expenses = transactions.filter(transaction => transaction.type === 'expense');

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get dates for time periods
  const oneDay = new Date(today);
  const oneWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const oneYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  // Filter transactions based on time period
  const filterExpensesByPeriod = () => {
    switch (timePeriod) {
      case "day":
        return expenses.filter(transaction => new Date(transaction.date) >= oneDay);
      case "week":
        return expenses.filter(transaction => new Date(transaction.date) >= oneWeek);
      case "month":
        return expenses.filter(transaction => new Date(transaction.date) >= oneMonth);
      case "year":
        return expenses.filter(transaction => new Date(transaction.date) >= oneYear);
      default:
        return expenses;
    }
  };

  const filteredExpenses = filterExpensesByPeriod();

  // Calculate the total for the filtered transactions
  const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

  return (
    <div className='container'>
      <Link className='back-link' to="/finances">Go back</Link>
      <div className="time-period-selector">
        <button
          className={timePeriod === "day" ? "active" : ""}
          onClick={() => setTimePeriod("day")}
        >
          Today
        </button>
        <button
          className={timePeriod === "week" ? "active" : ""}
          onClick={() => setTimePeriod("week")}
        >
          This Week
        </button>
        <button
          className={timePeriod === "month" ? "active" : ""}
          onClick={() => setTimePeriod("month")}
        >
          This Month
        </button>
        <button
          className={timePeriod === "year" ? "active" : ""}
          onClick={() => setTimePeriod("year")}
        >
          This Year
        </button>
      </div>

      <TransactionList transactions={filteredExpenses} categories={categories} />
      <h2 className='total'>Total Expenses: <span className='total-amount'>-{totalExpenses.toFixed(2)}</span></h2>
    </div>
  )
}

export default Expenses;
