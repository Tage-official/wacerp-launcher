'use strict';
// Новости из news.json — тот же файл и формат, что у лаунчера (launcher/server/news.example.json).
(async () => {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  let list = [];
  try {
    const res = await fetch('news.json', { cache: 'no-cache' });
    if (res.ok) list = await res.json();
  } catch { /* без новостей страница работает как обычно */ }
  if (!Array.isArray(list) || !list.length) {
    document.getElementById('news')?.setAttribute('hidden', '');
    return;
  }
  for (const n of list.slice(0, 6)) {
    const card = document.createElement('article');
    card.className = 'news-card';
    const tag = document.createElement('span');
    tag.className = 'card-tag';
    tag.textContent = [n.date, n.tag].filter(Boolean).join(' · ');
    const h = document.createElement('h3');
    h.textContent = n.title || '';
    const lead = document.createElement('p');
    lead.className = 'news-lead';
    lead.textContent = n.lead || '';
    card.append(tag, h, lead);
    for (const text of Array.isArray(n.body) ? n.body : []) {
      const p = document.createElement('p');
      p.textContent = text;
      card.append(p);
    }
    grid.append(card);
  }
})();
