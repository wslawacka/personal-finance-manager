import { Link } from 'react-router-dom';
import TransactionList from './TransactionList';
import '../styles/income-expenses.css';

function Expenses({ transactions, categories }) {

  // get the expenses
  const expenses = transactions.filter(transaction => transaction.type === 'expense');

  // get the total expenses
  const totalExpenses = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + Number(transaction.amount), 0);


  return (
    <div className='container'>
      <Link className='back-link' to="/finances">Go back</Link>
      <TransactionList transactions={expenses} categories={categories} />
      <h2 className='total'>Total Expenses: <span className='total-amount'>-{totalExpenses.toFixed(2)}</span></h2>
    </div>
  )
}

export default Expenses;
