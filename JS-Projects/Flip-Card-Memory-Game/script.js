const emojis = ["🎉", "🎉", "⭐", "⭐"];
let flipped = [], matched = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const shuffled = shuffle([...emojis]);
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  shuffled.forEach((emoji, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (this.textContent || flipped.length === 2) return;
  this.textContent = this.dataset.emoji;
  flipped.push(this);
  if (flipped.length === 2) {
    setTimeout(() => {
      if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
        flipped.forEach(c => c.classList.add("matched"));
        matched += 2;
        if (matched === emojis.length) alert("You Win!");
      } else {
        flipped.forEach(c => c.textContent = "");
      }
      flipped = [];
    }, 1000);
  }
}

createBoard();