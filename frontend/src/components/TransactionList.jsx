import "../styles/transactionList.css";

function TransactionList({ transactions }) {
  console.log("transactions", transactions);  
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
    </div>
  );
}

export default TransactionList;