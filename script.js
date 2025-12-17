// Elements
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalAmountEl = document.getElementById("totalAmount");

const darkToggle = document.getElementById("darkToggle");
const businessToggle = document.getElementById("businessToggle");
const businessSection = document.getElementById("businessSection");
const lockMessage = document.getElementById("lockMessage");

// State
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let businessUnlocked = localStorage.getItem("businessUnlocked") === "true";

// --------------------
// Expense Functions
// --------------------
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.name} - ₦${exp.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    expenseList.appendChild(li);
  });

  totalAmountEl.textContent = total;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

addExpenseBtn.addEventListener("click", () => {
  if (!expenseName.value || !expenseAmount.value) return;

  expenses.push({
    name: expenseName.value,
    amount: Number(expenseAmount.value)
  });

  expenseName.value = "";
  expenseAmount.value = "";
  renderExpenses();
});

// --------------------
// Dark Mode
// --------------------
darkToggle.checked = localStorage.getItem("dark") === "true";
document.body.classList.toggle("dark", darkToggle.checked);

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", darkToggle.checked);
});

// --------------------
// Business Mode Lock
// --------------------
function applyBusinessLock() {
  if (!businessUnlocked) {
    businessToggle.disabled = true;
    lockMessage.classList.remove("hidden");
    businessSection.classList.add("hidden");
  } else {
    businessToggle.disabled = false;
    lockMessage.classList.add("hidden");
  }
}

businessToggle.addEventListener("change", () => {
  businessSection.classList.toggle("hidden", !businessToggle.checked);
});

// Secret unlock (DEV ONLY)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "U") {
    businessUnlocked = true;
    localStorage.setItem("businessUnlocked", "true");
    alert("✅ Business Mode Unlocked");
    applyBusinessLock();
  }
});

// Init
applyBusinessLock();
renderExpenses();