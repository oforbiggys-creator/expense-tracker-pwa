const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("expenseList");
const totalEl = document.getElementById("total");
const themeToggle = document.getElementById("themeToggle");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

/* ===== DARK MODE ===== */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

/* ===== PIE CHART ===== */
const ctx = document.getElementById("expenseChart").getContext("2d");
let chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        "#4CAF50",
        "#2196F3",
        '#FF9800',
        '#9C27B0',
        '#E91E63'
      ]
    }]
  }
});

/* ===== FUNCTIONS ===== */
function render() {
  list.innerHTML = "";
  let total = 0;

  chart.data.labels = [];
  chart.data.datasets[0].data = [];

  expenses.forEach((exp, index) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.title} - ₦${exp.amount}
      <button onclick="removeExpense(${index})">Delete</button>
    `;
    list.appendChild(li);

    chart.data.labels.push(exp.title);
    chart.data.datasets[0].data.push(exp.amount);
  });

  chart.update();
  totalEl.textContent = `₦${total}`;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function removeExpense(index) {
  expenses.splice(index, 1);
  render();
}

addBtn.onclick = () => {
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);

  if (!title || amount <= 0) return;

  expenses.push({ title, amount });
  titleInput.value = "";
  amountInput.value = "";
  render();
};

render();