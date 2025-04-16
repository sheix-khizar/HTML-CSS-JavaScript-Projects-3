const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = new Date();

function renderCalendar() {
  calendar.innerHTML = days.map(d => `<div class="day">${d}</div>`).join('');
  const year = date.getFullYear(), month = date.getMonth();
  monthYear.textContent = date.toLocaleString('default', { month: 'long' }) + " " + year;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) calendar.innerHTML += `<div></div>`;
  for (let d = 1; d <= lastDate; d++) {
    const today = new Date();
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    calendar.innerHTML += `<div class="date ${isToday ? 'today' : ''}">${d}</div>`;
  }
}

function prevMonth() { date.setMonth(date.getMonth() - 1); renderCalendar(); }
function nextMonth() { date.setMonth(date.getMonth() + 1); renderCalendar(); }

renderCalendar();