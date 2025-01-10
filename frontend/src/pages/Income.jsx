import { Link } from 'react-router-dom';
import { useState } from 'react';

import TransactionList from '../components/TransactionList';

import '../styles/income-expenses.css';

function Income({ transactions, categories }) {

  // initialize time period state to "day"
  const [timePeriod, setTimePeriod] = useState("day"); 

  // filter the transactions to only include income
  const income = transactions.filter(transaction => transaction.type === 'income');

  // get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // get the dates for the time periods
  const oneDay = new Date(today);
  const oneWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const oneYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  // filter the income based on the time period
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

  // get the filtered income based on the time period
  const filteredIncome = filterIncomeByPeriod();

  // calculate the total for the filtered transactions
  const totalIncome = filteredIncome.reduce((acc, income) => acc + Number(income.amount), 0);

  return (
    <div className='container'>
      {/* display the link to go back to the finances page */}
      <Link className='back-link' to="/finances">Go back</Link>
      {/* display the buttons to select the time period */}
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
      {/* display the list of transactions filtered by the time period */}
      <TransactionList transactions={filteredIncome} categories={categories} />
      {/* display the total income */}
      <h2 className='total'>Total Income: <span className='total-amount'>+{totalIncome.toFixed(2)}</span></h2>
    </div>
  )
}

export default Income;