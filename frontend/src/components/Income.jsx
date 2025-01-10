import { Link } from 'react-router-dom';
import { useState } from 'react';
import TransactionList from './TransactionList';
import '../styles/income-expenses.css';

function Income({ transactions, categories }) {

  const [timePeriod, setTimePeriod] = useState("day"); // Default to "day"

  // get the income
  const income = transactions.filter(transaction => transaction.type === 'income');

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get dates for time periods
  const oneDay = new Date(today);
  const oneWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const oneYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  // Filter transactions based on time period
  const filterIncomeByPeriod = () => {
    switch (timePeriod) {
      case "day":
        return income.filter(transaction => new Date(transaction.date) >= oneDay);
      case "week":
        return income.filter(transaction => new Date(transaction.date) >= oneWeek);
      case "month":
        return income.filter(transaction => new Date(transaction.date) >= oneMonth);
      case "year":
        return income.filter(transaction => new Date(transaction.date) >= oneYear);
      default:
        return income;
    }
  };

  const filteredIncome = filterIncomeByPeriod();

  // Calculate the total for the filtered transactions
  const totalIncome = filteredIncome.reduce((acc, income) => acc + Number(income.amount), 0);

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
      <TransactionList transactions={filteredIncome} categories={categories} />
      <h2 className='total'>Total Income: <span className='total-amount'>+{totalIncome.toFixed(2)}</span></h2>

    </div>
  )
}

export default Income;