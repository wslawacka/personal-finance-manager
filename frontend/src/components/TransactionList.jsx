import "../styles/transactionList.css";

function TransactionList({ transactions, categories }) {

  return (
    <div className="transaction-list-container">
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li className="transaction-item" key={transaction.id}>

          {transaction.type === "income" ? <span>+</span> : <span>-</span>}
          
          <span className="transaction-property">{transaction.amount}</span>
          <span className="transaction-property">{transaction.description}</span>
          {/* <span className="transaction-property">{transaction.type}</span> */}
          
          <span className="transaction-property">{transaction.date}</span> 
        </li>
      ))}
    </ul> 
    <ul className="category-list">
      {categories.map((category) => (
        <li className="category-item" key={category.id}>
          <span className="category-property">{category.name}</span>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default TransactionList;