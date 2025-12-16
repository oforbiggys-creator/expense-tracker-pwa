let expenses = [];
let chart;

// Add Expense
function addExpense() {
  const title = document.getElementById("title").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!title || isNaN(amount)) return;

  expenses.push({ title, amount });

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  updateUI();
}

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

// Update UI
function updateUI() {
  const list = document.getElementById("expense-list");
  const totalEl = document.getElementById("total");

  list.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₦${expense.amount}
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = total;
  updateChart();
}

// Pie Chart
function updateChart() {
  const ctx = document.getElementById("expenseChart");

  const labels = expenses.map(e => e.title);
  const data = expenses.map(e => e.amount);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#F44336",
          "#2196F3",
          "#9C27B0"
        ]
      }]
    }
  });
}

/* 🌙 Dark Mode */
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}