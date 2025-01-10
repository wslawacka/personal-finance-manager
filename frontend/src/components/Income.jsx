import { Link } from 'react-router-dom';
import TransactionList from './TransactionList';
import '../styles/income-expenses.css';

function Income({ transactions, categories }) {

  // get the income
  const income = transactions.filter(transaction => transaction.type === 'income');

  // get the total income
  const totalIncome = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  return (
    <div className='container'>
      <Link className='back-link' to="/finances">Go back</Link>
      <TransactionList transactions={income} categories={categories} />
      <h2 className='total'>Total Income: <span className='total-amount'>+{totalIncome.toFixed(2)}</span></h2>

    </div>
  )
}

export default Income;