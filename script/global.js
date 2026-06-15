function toggleNav() {
  document.querySelector('.hamburger').classList.toggle('open');
  document.querySelector('.nav-links').classList.toggle('open');
}

/* ── Pronúncia em inglês ──────────────────────────────────────────────────
   Arquivos MP3 estáticos em audio/<slug>.mp3 (gerados offline, sem API).
   Um botão 🔊 é adicionado automaticamente ao lado de cada termo em inglês
   das aulas; ao clicar, toca a pronúncia. */

// texto do termo (normalizado) => nome do arquivo em audio/
const EN_AUDIO_TERMS = {
  // Módulo 1 — O Computador
  'desktop': 'desktop',
  'notebook': 'notebook',
  'tablet': 'tablet',
  'monitor': 'monitor',
  'mouse': 'mouse',
  'cpu': 'cpu',
  'ram': 'ram',
  'hd / ssd': 'hd-ssd',
  'hardware': 'hardware',
  'software': 'software',
  // Módulo 2 — Teclado e Mouse
  'esc': 'esc',
  'enter': 'enter',
  'backspace': 'backspace',
  'shift': 'shift',
  'caps lock': 'caps-lock',
  'ctrl + c': 'ctrl',
  'ctrl + v': 'ctrl',
  'ctrl + x': 'ctrl',
  'ctrl + z': 'ctrl',
  'ctrl + s': 'ctrl',
  'ctrl + a': 'ctrl',
  'ctrl + b': 'ctrl',
  'ctrl + i': 'ctrl',
  'ctrl + u': 'ctrl',
  // Módulo 3 — Internet Segura
  'internet': 'internet',
  'browser': 'browser',
  'chrome': 'chrome',
  'firefox': 'firefox',
  'edge': 'edge',
  'safari': 'safari',
  'youtube': 'youtube',
  'wikipedia': 'wikipedia',
  'e-mail': 'email',
  'google': 'google',
  'url': 'url',
  // Módulo 4 — Criando com o PC
  'word': 'word',
  'word/writer': 'word-writer',
  'paint': 'paint',
  'powerpoint': 'powerpoint',
  'excel': 'excel',
  'google slides': 'google-slides',
  // Módulo 5 — Inteligência Artificial
  'machine learning': 'machine-learning',
  'chatgpt': 'chatgpt',
  'chatbot': 'chatbot',
  'chatbots': 'chatbot',
  'fake news': 'fake-news',
};

let _enAudio = null;

function playEnglishTerm(slug, btn) {
  if (_enAudio) _enAudio.pause();
  document.querySelectorAll('.audio-btn.playing').forEach(b => b.classList.remove('playing'));
  _enAudio = new Audio('audio/' + slug + '.mp3');
  btn.classList.add('playing');
  _enAudio.addEventListener('ended', () => btn.classList.remove('playing'));
  _enAudio.addEventListener('error', () => btn.classList.remove('playing'));
  _enAudio.play().catch(() => btn.classList.remove('playing'));
}

document.addEventListener('DOMContentLoaded', () => {
  const candidates = document.querySelectorAll('.lesson-body h6, .lesson-body strong, .en-term');
  candidates.forEach(el => {
    if (el.querySelector('.audio-btn')) return;
    const key = el.textContent.trim().toLowerCase()
      .replace(/\s*\+\s*/g, ' + ')   // "Ctrl+B" e "Ctrl + B" viram a mesma chave
      .replace(/\s+/g, ' ');
    const slug = EN_AUDIO_TERMS[key];
    if (!slug) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'audio-btn';
    btn.textContent = '🔊';
    btn.title = 'Ouvir em inglês';
    btn.setAttribute('aria-label', 'Ouvir pronúncia em inglês de ' + el.textContent.trim());
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      playEnglishTerm(slug, btn);
    });
    el.appendChild(btn);
  });
});
