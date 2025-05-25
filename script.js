
const roster = [
  { name: "Jack Havoc", style: "Brawler", pop: 65, image: "jack_havoc.png" },
  { name: "El Fantasma", style: "Luchador", pop: 64, image: "el_fantasma.png" },
  { name: "Bruiser Betty", style: "Brawler", pop: 64, image: "bruiser_betty.png" }
];

let currentWeek = 1;
let history = [];

function startGame() {
  localStorage.setItem("week", currentWeek);
  localStorage.setItem("history", JSON.stringify(history));
  renderGameScreen();
}

function loadGame() {
  currentWeek = parseInt(localStorage.getItem("week")) || 1;
  history = JSON.parse(localStorage.getItem("history")) || [];
  renderGameScreen();
}

function renderHomeScreen() {
  document.getElementById("app").innerHTML = \`
    <div class="container">
      <h1>Home Screen</h1>
      <button onclick="startGame()">Start Game</button>
      <button onclick="loadGame()">Load Game</button>
    </div>
  \`;
}

function renderGameScreen() {
  const rosterHtml = roster.map(w => \`
    <div style="text-align:center">
      <img src="images/\${w.image}" alt="\${w.name}" />
      <div>\${w.name}<br>\${w.style}<br>Goly \${w.pop}</div>
    </div>
  \`).join("");

  document.getElementById("app").innerHTML = \`
    <div class="container">
      <h1>TEW 9 Clone</h1>
      <h2>Ace Championship Wrestling—Week \${currentWeek}</h2>
      <button onclick="renderBookingScreen()">Book Show</button>
      <button onclick="renderHistory()">View History</button>
      <div class="roster" style="display:flex; gap:10px; justify-content: space-around; margin-top:20px;">\${rosterHtml}</div>
    </div>
  \`;
}

function renderBookingScreen() {
  const matches = roster.flatMap(r1 =>
    roster.filter(r2 => r1 !== r2).map(r2 => \`\${r1.name} vs \${r2.name}\`)
  );

  const matchOptions = matches.map(m => \`<option value="\${m}">\${m}</option>\`).join("");

  document.getElementById("app").innerHTML = \`
    <div class="container">
      <h2>Book Show</h2>
      <form onsubmit="submitBooking(event)">
        <label>Opener</label><br/>
        <select id="opener">\${matchOptions}</select><br/><br/>
        <label>Midcard</label><br/>
        <select id="midcard">\${matchOptions}</select><br/><br/>
        <label>Main Event</label><br/>
        <select id="mainevent">\${matchOptions}</select><br/><br/>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  \`;
}

function submitBooking(e) {
  e.preventDefault();
  const opener = document.getElementById("opener").value;
  const midcard = document.getElementById("midcard").value;
  const mainevent = document.getElementById("mainevent").value;
  const show = { week: currentWeek, matches: [opener, midcard, mainevent] };
  history.push(show);
  currentWeek++;
  localStorage.setItem("week", currentWeek);
  localStorage.setItem("history", JSON.stringify(history));
  renderGameScreen();
}

function renderHistory() {
  const shows = history.map(s => \`
    <div>
      <h3>Week \${s.week}</h3>
      <ul>
        \${s.matches.map(m => \`<li>\${m}</li>\`).join("")}
      </ul>
    </div>
  \`).join("");

  document.getElementById("app").innerHTML = \`
    <div class="container">
      <h2>Show History</h2>
      \${shows}
      <button onclick="renderGameScreen()">Back</button>
    </div>
  \`;
}

renderHomeScreen();
