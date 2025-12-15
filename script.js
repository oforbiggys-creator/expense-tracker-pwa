document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const amountInput = document.getElementById("amount");
  const addBtn = document.getElementById("addBtn");
  const expenseList = document.getElementById("expenseList");
  const totalAmount = document.getElementById("totalAmount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach((expense, index) => {
      total += expense.amount;

      const li = document.createElement("li");
      li.innerHTML = `
        <span>${expense.title}</span>
        <span>₦${expense.amount}</span>
      `;
      expenseList.appendChild(li);
    });

    totalAmount.textContent = total;
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!title || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense");
      return;
    }

    expenses.push({ title, amount });
    titleInput.value = "";
    amountInput.value = "";

    renderExpenses();
  });

  renderExpenses();
});
