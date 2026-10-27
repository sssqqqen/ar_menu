const grid = document.getElementById('grid');
const tabs = document.getElementById('tabs');
const dlg = document.getElementById('dlg');
const viewer = document.getElementById('viewer');
const info = document.getElementById('info');
let items = [];
let current = 'Все';

fetch('menu.json')
  .then(r => r.json())
  .then(data => { items = data; renderTabs(); renderGrid(); })
  .catch(() => { grid.textContent = 'Не удалось загрузить меню. Откройте страницу через сервер или GitHub Pages.'; });

function renderTabs() {
  const cats = ['Все', ...new Set(items.map(i => i.category))];
  tabs.innerHTML = '';
  cats.forEach(c => {
    const b = document.createElement('button');
    b.textContent = c;
    if (c === current) b.className = 'active';
    b.onclick = () => { current = c; renderTabs(); renderGrid(); };
    tabs.appendChild(b);
  });
}

function renderGrid() {
  grid.innerHTML = '';
  items.filter(i => current === 'Все' || i.category === current).forEach(i => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${i.image}" alt="${i.name}" onerror="this.style.visibility='hidden'">
      <div><h3>${i.name}</h3><span>${i.price} ₽</span></div>`;
    card.onclick = () => openDish(i);
    grid.appendChild(card);
  });
}

function openDish(i) {
  viewer.innerHTML = `
    <model-viewer src="${i.model_glb}" ${i.model_usdz ? `ios-src="${i.model_usdz}"` : ""} poster="${i.image}"
      alt="${i.name}" ar ar-modes="webxr scene-viewer quick-look" ar-scale="fixed"
      camera-controls auto-rotate shadow-intensity="1" touch-action="pan-y">
      <button slot="ar-button" class="ar-btn">👁️ Посмотреть в AR</button>
    </model-viewer>`;
  info.innerHTML = `
    <h2>${i.name}</h2>
    <p>${i.description}</p>
    <p class="muted">Вес: ${i.weight} · Аллергены: ${i.allergens.length ? i.allergens.join(', ') : 'нет'}</p>
    <p><b>${i.price} ₽</b></p>`;
  dlg.showModal();
}

document.getElementById('close').onclick = () => dlg.close();
dlg.addEventListener('close', () => { viewer.innerHTML = ''; });
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
