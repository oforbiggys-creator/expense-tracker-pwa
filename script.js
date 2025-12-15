// Get elements
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");

// Load saved expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render expenses
function renderExpenses() {
  list.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₦${expense.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add expense
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = amountInput.value;

  if (!title || !amount) return;

  expenses.push({ title, amount });
  titleInput.value = "";
  amountInput.value = "";

  renderExpenses();
});

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial render
renderExpenses();
