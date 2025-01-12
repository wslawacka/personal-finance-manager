import { Link } from 'react-router-dom';
import { useState } from 'react';

import TransactionList from '../components/TransactionList';

import '../styles/incomeExpenses.css';

function Expenses({ transactions, categories }) {

  // initialize time period state to "day"
  const [timePeriod, setTimePeriod] = useState("day"); 

  // filter the transactions to only include expenses
  const expenses = transactions.filter(transaction => transaction.type === 'expense');

  // get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // get the dates for the time periods
  const oneDay = new Date(today);
  const oneWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const oneYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  // filter the expenses based on the time period
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

  // get the filtered expenses based on the time period
  const filteredExpenses = filterExpensesByPeriod();

  // calculate the total for the filtered transactions
  const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

  return (
    <div className='container'>
      {/* display the link to go back to the finances page */}
      <Link className='back-link' to="/finances">Go back</Link>
      <div className="time-period-selector">
        {/* display the buttons to select the time period */}
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
      {/* display the list of transactions filtered by the time period */}
      <TransactionList transactions={filteredExpenses} categories={categories} />
      {/* display the total expenses for the filtered transactions */}
      <h2 className='total'>Total Expenses: <span className='total-amount'>-{totalExpenses.toFixed(2)} &#8364;</span></h2>
    </div>
  )
}

export default Expenses;
