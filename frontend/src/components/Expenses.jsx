import { Link } from 'react-router-dom';

function Expenses({ transactions }) {
  return (
    <div>
      <Link to="/finances">Back</Link>
      {/* <TransactionList transactions={transactions} /> */}
    </div>
  )
}

export default Expenses;
