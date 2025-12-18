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

/* ================= SAFE RENDER ================= */
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((e, i) => {
    // SAFETY CHECK (prevents undefined)
    if (!e || !e.name || !e.amount) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${e.name} - ₦${Number(e.amount).toLocaleString()}</span>
      <span style="color:red;cursor:pointer" onclick="removeExpense(${i})">✖</span>
    `;
    expenseList.appendChild(li);
  });
}

/* ================= ADD EXPENSE ================= */
addExpenseBtn.onclick = () => {
  const name = expenseName.value.trim();
  const amount = expenseAmount.value.trim();

  if (!name || !amount || Number(amount) <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  if (!isPro && expenses.length >= FREE_LIMIT) {
    upgradeModal.classList.remove("hidden");
    return;
  }

  expenses.push({
    name,
    amount: Number(amount)
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenseName.value = "";
  expenseAmount.value = "";
  renderExpenses();
};

/* ================= REMOVE ================= */
function removeExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

/* ================= MODAL ================= */
closeModal.onclick = (e) => {
  e.stopPropagation();
  upgradeModal.classList.add("hidden");
};

upgradeModal.onclick = () => {
  upgradeModal.classList.add("hidden");
};

modalCard.onclick = (e) => {
  e.stopPropagation();
};

upgradeBtn.onclick = () => {
  localStorage.setItem("isPro", "true");
  isPro = true;
  upgradeModal.classList.add("hidden");
  alert("🎉 Biggy PRO unlocked!");
};

renderExpenses();