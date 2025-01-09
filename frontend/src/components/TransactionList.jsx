function TransactionList({ transactions }) {
  return (
    <div>
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          {transaction.amount}
        </li>
      ))}
    </ul>
    </div>
  );
}

export default TransactionList;