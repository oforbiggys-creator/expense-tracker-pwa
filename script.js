const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");

const upgradeModal = document.getElementById("upgradeModal");
const closeModal = document.getElementById("closeModal");
const upgradeBtn = document.getElementById("upgradeBtn");
const modalCard = document.getElementById("modalCard");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let isPro = localStorage.getItem("isPro") === "true";

const FREE_LIMIT = 5;

// Render expenses
function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((e, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${e.name} - ₦${e.amount} <span style="color:red;cursor:pointer" onclick="removeExpense(${i})">✖</span>`;
    expenseList.appendChild(li);
  });
}

// Add expense
addExpenseBtn.onclick = () => {
  if (!expenseName.value || !expenseAmount.value) return;

  if (!isPro && expenses.length >= FREE_LIMIT) {
    upgradeModal.classList.remove("hidden");
    return;
  }

  expenses.push({
    name: expenseName.value,
    amount: expenseAmount.value
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenseName.value = "";
  expenseAmount.value = "";
  renderExpenses();
};

// Remove expense
function removeExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// ===== MODAL FIX =====

// Cancel button
closeModal.onclick = (e) => {
  e.stopPropagation();
  upgradeModal.classList.add("hidden");
};

// Click outside modal
upgradeModal.onclick = () => {
  upgradeModal.classList.add("hidden");
};

// Prevent card clicks
modalCard.onclick = (e) => {
  e.stopPropagation();
};

// Unlock PRO (demo)
upgradeBtn.onclick = () => {
  localStorage.setItem("isPro", "true");
  isPro = true;
  upgradeModal.classList.add("hidden");
  alert("🎉 Biggy PRO unlocked!");
};

renderExpenses();