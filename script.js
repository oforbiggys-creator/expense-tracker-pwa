// ===============================
// Expense Tracker Logic
// ===============================

// Get elements
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render expenses
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${expense.title} - ₦${expense.amount}</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;

    expenseList.appendChild(li);
  });

  // Save to localStorage
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


// ===============================
// PWA: Service Worker Registration
// ===============================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.error("Service Worker error:", err));
  });
}
