
const state = {
  data: [],
  domains: [],
  ages: []
};

async function loadData() {
  const res = await fetch('data/dce_planner_database.json');
  const rows = await res.json();
  // Normalize keys
  state.data = rows.map(r => ({ 
    domain: String(r['Domain']||'').trim(),
    theme: String(r['Themes']||'').trim(),
    age: String(r['Age group']||'').trim(),
    id: String(r['ID']||'').trim(),
    outcome: String(r['Learning outcomes']||'').trim()
  }));
  state.domains = [...new Set(state.data.map(r => r.domain))].sort();
  state.ages = [...new Set(state.data.map(r => r.age))].sort();
  fillFilters();
  render();
}

function fillFilters(){
  const domainSel = document.getElementById('domain');
  const ageSel = document.getElementById('age');
  state.domains.forEach(d => domainSel.append(new Option(d,d)));
  state.ages.forEach(a => ageSel.append(new Option(a,a)));
}

function getFilters(){
  return {
    domain: document.getElementById('domain').value,
    age: document.getElementById('age').value,
    q: document.getElementById('q').value.trim().toLowerCase()
  }
}

function applyFilters(rows, f){
  return rows.filter(r => {
    let ok = true;
    if(f.domain) ok = ok && r.domain === f.domain;
    if(f.age) ok = ok && r.age === f.age;
    if(f.q){
      const hay = (r.id + ' ' + r.theme + ' ' + r.outcome).toLowerCase();
      ok = ok && hay.includes(f.q);
    }
    return ok;
  });
}

function render(){
  const f = getFilters();
  const filtered = applyFilters(state.data, f);

  document.getElementById('count').textContent = filtered.length;
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  if(filtered.length === 0){
    const d = document.createElement('div');
    d.className = 'empty';
    d.textContent = 'Brak wyników dla wybranych filtrów.';
    grid.appendChild(d);
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';

    const badges = document.createElement('div');
    badges.className = 'badges';
    badges.innerHTML = `
      <span class="badge">👥 {'{'}r.age{'}'}</span>
      <span class="badge">🧭 {'{'}r.domain{'}'}</span>
    `.replace("{'{'}r.age{'}'}", r.age).replace("{'{'}r.domain{'}'}", r.domain);

    const id = document.createElement('div');
    id.className = 'id';
    id.textContent = r.id;

    const theme = document.createElement('div');
    theme.className = 'theme';
    theme.textContent = r.theme;

    const outcome = document.createElement('div');
    outcome.className = 'outcome';
    outcome.textContent = r.outcome;

    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.textContent = 'Kopiuj efekt';
    btn.onclick = () => navigator.clipboard.writeText(`[{r.id}] {r.outcome}`.replace('{r.id}', r.id).replace('{r.outcome}', r.outcome));

    card.append(badges, id, theme, outcome, btn);
    grid.appendChild(card);
  });
}

function clearFilters(){
  document.getElementById('domain').value = '';
  document.getElementById('age').value = '';
  document.getElementById('q').value = '';
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('domain').addEventListener('change', render);
  document.getElementById('age').addEventListener('change', render);
  document.getElementById('q').addEventListener('input', render);
  document.getElementById('clear').addEventListener('click', clearFilters);
  loadData();
});
