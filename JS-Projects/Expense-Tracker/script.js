const list = document.getElementById("list");
const totalEl = document.getElementById("total");
let total = 0;

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amt = parseFloat(document.getElementById("amount").value);

  // Validation: Ensure both description and amount are valid
  if (!desc || isNaN(amt)) {
    alert('Please enter a valid description and amount.');
    return;
  }

  // Create the new entry
  const div = document.createElement("div");
  div.className = "entry";

  // Add content with conditional classes for positive or negative amounts
  div.innerHTML = `${desc} <span class="amount ${amt < 0 ? 'minus' : 'plus'}">PKR ${amt.toFixed(2)}</span>`;

  // Append to the list
  list.appendChild(div);

  // Update the total
  total += amt;
  totalEl.textContent = total.toFixed(2);

  // Clear the input fields
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}
