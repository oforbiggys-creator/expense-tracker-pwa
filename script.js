document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const amountInput = document.getElementById("amount");
  const addBtn = document.getElementById("addExpense");
  const list = document.getElementById("list");
  const unlockBtn = document.getElementById("unlockPro");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  /* ------------------------
     RENDER EXPENSES
  ------------------------ */
  function renderExpenses() {
    list.innerHTML = "";

    expenses.forEach((exp, index) => {
      const div = document.createElement("div");
      div.className = "expense";

      div.innerHTML = `
        <span>${exp.name} - ₦${exp.amount}</span>
        <span class="delete" data-index="${index}">✖</span>
      `;

      list.appendChild(div);
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  renderExpenses();

  /* ------------------------
     ADD EXPENSE (FIXED)
  ------------------------ */
  addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const amount = amountInput.value.trim();

    if (!name || !amount || isNaN(amount)) {
      alert("Please enter a valid expense name and amount");
      return;
    }

    expenses.push({
      name,
      amount: Number(amount),
    });

    nameInput.value = "";
    amountInput.value = "";

    renderExpenses();
  });

  /* ------------------------
     DELETE EXPENSE
  ------------------------ */
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      expenses.splice(index, 1);
      renderExpenses();
    }
  });

  /* ------------------------
     BIGGY PRO BUTTON (FIXED)
  ------------------------ */
  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      alert(
        "🚀 Biggy PRO coming soon!\n\n• Business analytics\n• Charts\n• Cloud sync"
      );
    });
  }
});
// THEME LOGIC
const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

toggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});