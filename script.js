// Elements
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

const proCard = document.getElementById("proCard");
const proFeatures = document.getElementById("proFeatures");
const unlockPro = document.getElementById("unlockPro");

const themeToggle = document.getElementById("themeToggle");

// State
let expenses = JSON.parse(localStorage.getItem("spendio_expenses")) || [];
let isPro = localStorage.getItem("spendio_pro") === "true";

// Render
function render() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach(e => {
    total += Number(e.amount);
    const li = document.createElement("li");
    li.textContent = `${e.title} - ₦${e.amount}`;
    list.appendChild(li);
  });

  totalEl.textContent = `₦${total}`;

  if (isPro) {
    proCard.style.display = "none";
    proFeatures.style.display = "block";
  }
}

render();

// Add expense
addBtn.onclick = () => {
  if (!titleInput.value || !amountInput.value) return;

  expenses.push({
    title: titleInput.value,
    amount: amountInput.value
  });

  localStorage.setItem("spendio_expenses", JSON.stringify(expenses));
  titleInput.value = "";
  amountInput.value = "";
  render();
};

// PRO Unlock (Flutterwave placeholder)
unlockPro.onclick = () => {
  alert("Replace with Flutterwave payment to unlock Spendio PRO");
  localStorage.setItem("spendio_pro", "true");
  location.reload();
};

// Dark mode
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "spendio_theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
};

// Restore theme
if (localStorage.getItem("spendio_theme") === "light") {
  document.body.classList.add("light");
}