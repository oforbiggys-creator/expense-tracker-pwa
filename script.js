// FORCE NEW VERSION (important for PWA cache)
const APP_VERSION = "1.0.3";

// Elements
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalDisplay = document.querySelector(".total");

// Load expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render function
function renderExpenses() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.title} - ₦${expense.amount}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    list.appendChild(li);
    total += expense.amount;
  });

  totalDisplay.textContent = `Total: ₦${total}`;
}

// Add expense
function addExpense() {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (!title || amount <= 0) {
    alert("Enter valid expense");
    return;
  }

  expenses.push({ title, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  titleInput.value = "";
  amountInput.value = "";

  renderExpenses();
}

// Delete expense
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
});

// Button event (CRITICAL FIX)
addBtn.addEventListener("click", addExpense);

// Initial render
renderExpenses();

// Service Worker (force update)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("SW registered"))
      .catch(err => console.error("SW error:", err));
  });
}
