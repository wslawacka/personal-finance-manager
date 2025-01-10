import "../styles/transactionList.css";

function TransactionList({ transactions, categories }) {

  return (
    <div className="transaction-list-container">
    <h2>Recent transactions:</h2>
    {/* display the list of transactions */}
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li className="transaction-item" key={transaction.id}>
          {/* if the transaction is an income, display a plus sign, otherwise display a minus sign */}
          {transaction.type === "income" ? <span>+</span> : <span>-</span>}
          <span className="transaction-property">{transaction.amount}</span>
          <span className="transaction-property">{transaction.description}</span>
          {/* display the correct category name - find the category name by matching the user_id and category_id */}
          <span className="transaction-property">{categories.find(category => category.user_id === transaction.user_id && category.id === transaction.category_id)?.name || 'Unknown'}</span> 
          <span className="transaction-property">{transaction.date}</span> 
        </li>
      ))}
    </ul> 
    </div>
  );
}

export default TransactionList;