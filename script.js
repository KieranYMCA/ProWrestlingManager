
const wrestlers = [
  { name: "Jack Havoc", style: "Brawler", pop: 65, image: "images/jack_havoc.png" },
  { name: "El Fantasma", style: "Luchador", pop: 72, image: "images/el_fantasma.png" },
  { name: "Bruiser Betty", style: "Brawler", pop: 60, image: "images/bruiser_betty.png" },
];

function startGame() {
  document.getElementById('home').classList.remove('visible');
  document.getElementById('game').classList.add('visible');
  renderRoster();
}

function renderRoster() {
  const container = document.getElementById('roster');
  container.innerHTML = '';
  wrestlers.forEach(w => {
    container.innerHTML += `
      <div class="wrestler">
        <img src="${w.image}" alt="${w.name}" />
        <div><strong>${w.name}</strong></div>
        <div>${w.style}</div>
        <div>Popularity: ${w.pop}</div>
      </div>
    `;
  });
}
