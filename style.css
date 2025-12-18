let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let isPro = localStorage.getItem("biggyPro") === "true";
let chart;

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const name = document.getElementById("name").value.trim();
  const amount = Number(document.getElementById("amount").value);

  if (!name || amount <= 0) return alert("Enter valid data");

  expenses.push({ name, amount });
  save();
  render();
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  save();
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  expenses.forEach((e, i) => {
    list.innerHTML += `
      <div class="expense">
        ${e.name} - ₦${e.amount}
        <span class="delete" onclick="deleteExpense(${i})">✖</span>
      </div>
    `;
  });

  if (isPro) drawChart();
}

function unlockPro() {
  isPro = true;
  localStorage.setItem("biggyPro", "true");
  document.getElementById("lockSection").style.display = "none";
  document.getElementById("businessSection").style.display = "block";
  drawChart();
}

function drawChart() {
  const ctx = document.getElementById("pieChart");

  const data = {};
  expenses.forEach(e => {
    data[e.name] = (data[e.name] || 0) + e.amount;
  });

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}

if (isPro) {
  document.getElementById("lockSection").style.display = "none";
  document.getElementById("businessSection").style.display = "block";
}

render();