function rollDice() {
  const dice = document.getElementById('dice');
  const random = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice${random}.png`;
}
