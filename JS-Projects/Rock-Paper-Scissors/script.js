const choices = ["Rock", "Paper", "Scissors"];

function play(user) {
  // Validate the user input
  if (!choices.includes(user)) {
    document.getElementById("result").textContent = "Invalid input! Please choose Rock, Paper, or Scissors.";
    return;
  }

  const comp = choices[Math.floor(Math.random() * 3)];
  let result = `You chose ${user}, Computer chose ${comp}. `;

  if (user === comp) {
    result += "It's a draw!";
  } else if (
    (user === "Rock" && comp === "Scissors") ||
    (user === "Paper" && comp === "Rock") ||
    (user === "Scissors" && comp === "Paper")
  ) {
    result += "You win!";
  } else {
    result += "You lose!";
  }

  document.getElementById("result").textContent = result;
}
