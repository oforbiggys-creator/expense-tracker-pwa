// Elements
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpense = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

const darkToggle = document.getElementById("darkToggle");

const openUpgrade = document.getElementById("openUpgrade");
const upgradeModal = document.getElementById("upgradeModal");
const upgradeBtn = document.getElementById("upgradeBtn");
const closeModal = document.getElementById("closeModal");

const businessSection = document.getElementById("businessSection");
const lockText = document.getElementById("lockText");

// State
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let isPro = localStorage.getItem("biggyPro") === "true";

// ---------------- EXPENSES ----------------
function render() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((e, i) => {
    total += e.amount;
    const li = document.createElement("li");
    li.innerHTML = `${e.name} - ₦${e.amount} <button onclick="del(${i})">❌</button>`;
    expenseList.appendChild(li);
  });

  totalEl.textContent = total;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function del(i) {
  expenses.splice(i, 1);
  render();
}

addExpense.onclick = () => {
  if (!expenseName.value || !expenseAmount.value) return;
  expenses.push({ name: expenseName.value, amount: +expenseAmount.value });
  expenseName.value = "";
  expenseAmount.value = "";
  render();
};

// ---------------- DARK MODE ----------------
darkToggle.checked = localStorage.getItem("dark") === "true";
document.body.classList.toggle("dark", darkToggle.checked);

darkToggle.onchange = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", darkToggle.checked);
};

// ---------------- PRO SYSTEM ----------------
function applyPro() {
  if (isPro) {
    businessSection.classList.remove("hidden");
    lockText.classList.add("hidden");
    openUpgrade.style.display = "none";
  } else {
    businessSection.classList.add("hidden");
    lockText.classList.remove("hidden");
  }
}

openUpgrade.onclick = () => {
  upgradeModal.classList.remove("hidden");
};

closeModal.onclick = () => {
  upgradeModal.classList.add("hidden");
};

upgradeBtn.onclick = () => {
  // DEMO UNLOCK (replace with Paystack later)
  isPro = true;
  localStorage.setItem("biggyPro", "true");
  upgradeModal.classList.add("hidden");
  applyPro();
  alert("🎉 Biggy PRO Unlocked!");
};

// Init
applyPro();
render();