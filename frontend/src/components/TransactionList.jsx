import axios from "axios";
import { useState } from "react";
import "../styles/transactionList.css";

function TransactionList({ transactions, categories, fetchTransactions, fetchCategories, user_id }) {
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleDeleteTransaction = async (transactionId) => {
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", transactionId);
    try {
      await axios.post(
        "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php",
        formData
      );
      fetchTransactions();
    } catch (error) {
      alert("Error deleting transaction");
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransactionId(transaction.id);
    setEditData({
      category_id: transaction.category_id,
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "other") {
      setIsAddingNewCategory(true);
    } else {
      setIsAddingNewCategory(false);
      setEditData((prevData) => ({ ...prevData, category_id: selectedCategory }));
    }
  };

  const handleSaveTransaction = async () => {
    if (isAddingNewCategory && newCategory.trim() === "") {
      alert("Please enter a valid category name.");
      return;
    }

    let category_id = editData.category_id;

    if (isAddingNewCategory && newCategory) {
     
      try {
        const formData = new FormData();
        formData.append("action", "add");
        formData.append("user_id", user_id);
        formData.append("name", newCategory);
        formData.append("type", editData.type);

        const response = await axios.post(
          "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php",
          formData
        );
        fetchCategories();
        category_id = response.data.id; 
      } catch (error) {
        alert("Error adding new category");
        return;
      }
    }

    const formData = new FormData();
    formData.append("action", "edit");
    formData.append("id", editingTransactionId);
    formData.append("category_id", category_id);
    formData.append("type", editData.type);
    formData.append("amount", editData.amount);
    formData.append("date", editData.date);
    formData.append("description", editData.description);

    try {
      await axios.post(
        "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php",
        formData
      );
      fetchTransactions();
      setEditingTransactionId(null);
      setNewCategory(""); 
    } catch (error) {
      alert("Error saving transaction");
    }
  };

  const handleCancelEdit = () => {
    setEditingTransactionId(null);
    setNewCategory(""); 
    setIsAddingNewCategory(false);
  };



  return (
    <div className="transaction-list-container">
      <h2>Recent transactions:</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li className="transaction-item" key={transaction.id}>
            {editingTransactionId === transaction.id ? (
              <>
                <input
                  type="number"
                  min="0" 
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData((prevData) => ({
                      ...prevData,
                      amount: e.target.value,
                    }))
                  }
                  placeholder="Amount"
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prevData) => ({
                      ...prevData,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Description"
                />
                <select
                  value={editData.type}
                  onChange={(e) =>
                    setEditData((prevData) => ({
                      ...prevData,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <select value={editData.category_id} onChange={handleCategoryChange}>
                  {editData.type === "income"
                    ? categories
                        .filter((category) => category.type === "income")
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                    : categories
                        .filter((category) => category.type === "expense")
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                  <option value="other">Other (add new)</option>
                </select>
                {isAddingNewCategory && (
                  <input
                    type="text"
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                )}
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData((prevData) => ({
                      ...prevData,
                      date: e.target.value,
                    }))
                  }
                />
                <button className="save-transaction-button" onClick={handleSaveTransaction}>Save</button>
                <button className="cancel-transaction-button" onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {transaction.type === "income" ? <span>+</span> : <span>-</span>}
                <span className="transaction-property">{transaction.amount}</span>
                <span className="transaction-property">{transaction.description}</span>
                <span className="transaction-property">
                  {categories.find(
                    (category) =>
                      category.user_id === transaction.user_id &&
                      category.id === transaction.category_id
                  )?.name ?? "Unknown"}
                </span>
                <span className="transaction-property">{transaction.date}</span>
                <button className="edit-transaction-button" onClick={() => handleEditTransaction(transaction)}>Edit</button>
                <button className="delete-transaction-button" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
