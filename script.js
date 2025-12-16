// ====== ELEMENTS ======
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

// ====== DATA ======
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ====== FUNCTIONS ======
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalEl.textContent = `Total: ₦${total}`;
}

function renderExpenses() {
  list.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${expense.title} - ₦${expense.amount}</span>
      <button class="delete-btn">Delete</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenses();
      updateTotal();
    });

    list.appendChild(li);
  });
}

function addExpense() {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (!title || amount <= 0) {
    alert("Please enter a valid expense");
    return;
  }

  expenses.push({ title, amount });

  titleInput.value = "";
  amountInput.value = "";

  saveExpenses();
  renderExpenses();
  updateTotal();
}

// ====== EVENTS ======
addBtn.addEventListener("click", addExpense);

// ====== INIT ======
renderExpenses();
updateTotal();

// ====== SERVICE WORKER ======
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}