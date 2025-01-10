import "../styles/transactionList.css";

function TransactionList({ transactions, categories }) {
  

  return (
    <div className="transaction-list-container">
    <h2>Recent transactions:</h2>
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li className="transaction-item" key={transaction.id}>
          {transaction.type === "income" ? <span>+</span> : <span>-</span>}
          <span className="transaction-property">{transaction.amount}</span>
          <span className="transaction-property">{transaction.description}</span>
          <span className="transaction-property">{categories.find(category => category.user_id === transaction.user_id && category.id === transaction.category_id).name}</span>
          <span className="transaction-property">{transaction.date}</span> 
        </li>
      ))}
    </ul> 
    </div>
  );
}

export default TransactionList;