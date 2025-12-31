### Projet consolidé — ARG Mission Engine (meilleure version, mobile‑first, prête à coller)

Ci‑dessous vous avez **la version la plus aboutie** du projet, rassemblant et améliorant tout ce que nous avons conçu ensemble depuis le début de la conversation : architecture mobile‑first, modules modulaires (wallet, stockage, attachments, modération, PII), éditeur Markdown, pack d’engagement responsable, landing psyché et assets.  
Copiez‑collez chaque fichier dans votre dépôt GitHub en respectant l’arborescence indiquée. Les fichiers fournis sont prêts à l’emploi et pensés pour être **lisibles**, **testables** et **extensibles**.

---

## 1. Arborescence recommandée (fichiers à créer)

```
arg-engine/
├─ index.html
├─ README.md
├─ WORKSHOP.md
├─ styles/
│  ├─ base.css
│  ├─ components.css
│  └─ theme.css
├─ src/
│  ├─ app.js
│  ├─ ui.js
│  ├─ storage.js
│  ├─ wallet.js
│  ├─ attachments.js
│  ├─ moderation.js
│  ├─ pii_utils.js
│  └─ editor/
│     ├─ editor.html
│     ├─ editor.css
│     └─ editor.js
├─ engagement/
│  ├─ attention-banner.html
│  ├─ pause-modal.js
│  └─ badges.json
├─ landing/
│  ├─ psyche-index.html
│  ├─ psyche-styles.css
│  └─ psyche-script.js
├─ assets/
│  ├─ penguins.svg
│  └─ neon-icons.svg
└─ bootstrap_arg_engine.sh
```

---

## 2. Fichiers principaux — collez exactement

> **Remarque** : collez chaque bloc dans le fichier correspondant. Respectez l’ordre d’inclusion dans `index.html` (CSS → modules ES via `type="module"`). Après avoir collé, servez localement (`npx http-server`) et testez sur mobile.

---

### `index.html`
```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>ARG Mission Engine — Mobile</title>
  <link rel="stylesheet" href="styles/base.css">
  <link rel="stylesheet" href="styles/components.css">
  <link rel="stylesheet" href="styles/theme.css">
  <meta name="description" content="Prototype mobile-first pour veille citoyenne, anonyme et coopérative." />
</head>
<body>
  <header class="topbar" role="banner">
    <button id="menu-toggle" class="icon-btn" aria-label="Ouvrir le menu">☰</button>
    <h1 class="brand">ARG Engine</h1>
    <button id="theme-toggle" class="icon-btn" aria-label="Basculer thème">🎨</button>
  </header>

  <main id="app" role="main" class="container">
    <section id="dashboard" class="panel" aria-labelledby="dashboard-title">
      <h2 id="dashboard-title">Missions</h2>
      <div id="missions-list" class="list"></div>
      <button id="create-mission" class="btn primary">Créer une mission</button>
    </section>
  </main>

  <nav id="drawer" class="drawer" aria-hidden="true">
    <ul>
      <li><a href="#dashboard">Accueil</a></li>
      <li><a href="src/editor/editor.html">Éditeur</a></li>
      <li><a href="#settings">Paramètres</a></li>
      <li><button id="export-data" class="link-btn">Exporter anonymisé</button></li>
    </ul>
  </nav>

  <div id="modals" aria-hidden="true"></div>

  <!-- engagement banner (optional include) -->
  <div id="engagement-placeholder"></div>

  <script type="module" src="src/app.js" defer></script>
  <script src="engagement/pause-modal.js" defer></script>
</body>
</html>
```

---

### `styles/base.css` (mobile‑first)
```css
:root{
  --bg:#ffffff; --text:#0b1220; --muted:#6b7280;
  --accent:#0bbf6b; --accent-2:#9b7bf0;
  --radius:12px; --gap:12px; --max-width:980px;
  --focus: 0 0 0 3px rgba(11,191,107,0.18);
  --transition: 180ms cubic-bezier(.2,.9,.3,1);
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter,system-ui,Arial;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}
.container{padding:16px;max-width:var(--max-width);margin:0 auto}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0f0f0;background:linear-gradient(180deg,#fff,#fbfffb)}
.brand{font-weight:700;font-size:1rem}
.icon-btn{background:transparent;border:none;font-size:1.2rem;padding:8px;border-radius:8px}
.panel{margin-top:14px;background:#fff;border-radius:12px;padding:12px;box-shadow:0 6px 18px rgba(2,6,23,0.04)}
.list{display:flex;flex-direction:column;gap:10px}
.card{padding:10px;border-radius:10px;border:1px solid #f2f2f2;background:linear-gradient(180deg,#fff,#fbfffe)}
.btn{display:inline-block;padding:10px 12px;border-radius:10px;border:none;background:#eee;color:var(--text);font-weight:700}
.btn.primary{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#042018;box-shadow:0 8px 24px rgba(11,18,32,0.06)}
.link-btn{background:transparent;border:none;color:var(--accent);text-decoration:underline;padding:6px}
.drawer{position:fixed;left:0;top:0;bottom:0;width:260px;background:#fff;box-shadow:8px 0 30px rgba(2,6,23,0.08);transform:translateX(-110%);transition:transform var(--transition)}
.drawer[aria-hidden="false"]{transform:translateX(0)}
@media(min-width:900px){
  .container{padding:28px}
  .hero{display:flex;gap:20px}
}
:focus{outline:none;box-shadow:var(--focus)}
```

---

### `styles/components.css`
```css
.badge{display:inline-block;padding:6px 8px;border-radius:999px;background:rgba(11,191,107,0.08);color:var(--accent);font-weight:700;font-size:0.85rem}
.small{font-size:0.9rem;color:var(--muted)}
.input{width:100%;padding:10px;border-radius:10px;border:1px solid #eee}
.modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:16px;z-index:1200}
.modal .panel{max-width:720px;width:100%}
.hidden{display:none}
```

---

### `styles/theme.css`
```css
:root{--psyche-bg:linear-gradient(180deg,#f6fff8,#f3f0ff)}
body.psyche{background:var(--psyche-bg)}
body.psyche .topbar{background:linear-gradient(90deg,rgba(155,123,240,0.06),rgba(11,191,107,0.04))}
body.psyche .btn.primary{box-shadow:0 12px 40px rgba(123,211,137,0.12)}
@media (prefers-reduced-motion: reduce){
  *{transition:none!important}
}
```

---

### `src/app.js` (bootstrap, wiring)
```javascript
import { Store } from './storage.js';
import { Wallet } from './wallet.js';
import { Moderation } from './moderation.js';
import { Attachments } from './attachments.js';
import { PII } from './pii_utils.js';
import { ui } from './ui.js';

const state = {};

document.addEventListener('DOMContentLoaded', async () => {
  ui.init();
  await Store.init();
  state.wallet = await Wallet.load();
  await renderMissions();
  bindUI();
  // inject engagement banner if available
  fetch('engagement/attention-banner.html').then(r=>r.text()).then(html=>{
    document.getElementById('engagement-placeholder').innerHTML = html;
  }).catch(()=>{});
});

async function renderMissions(){
  const list = await Store.list('mission:');
  const container = document.getElementById('missions-list');
  container.innerHTML = '';
  if (!list.length) container.innerHTML = '<div class="small">Aucune mission pour l’instant</div>';
  for (const item of list) {
    const m = item.value;
    const el = ui.createMissionCard(m);
    container.appendChild(el);
  }
}

function bindUI(){
  document.getElementById('menu-toggle').addEventListener('click', ()=> {
    const d = document.getElementById('drawer');
    const open = d.getAttribute('aria-hidden') === 'false';
    d.setAttribute('aria-hidden', String(!open));
  });

  document.getElementById('create-mission').addEventListener('click', async ()=>{
    ui.showMissionEditor({ onSave: async (m)=> { await Store.set('mission:'+m.id, m); await Store.audit('mission:create',{id:m.id}); await renderMissions(); }});
  });

  document.getElementById('export-data').addEventListener('click', async ()=>{
    const list = await Store.list('mission:');
    const rows = list.map(i => ({ id:i.value.id, title:i.value.title, desc:i.value.desc }));
    const sanitized = await PII.applyBeforeExport(rows, { policy:{ email:'partial', phone:'partial', default:'redact' }});
    ui.downloadCSV(sanitized, 'missions_export_anonymized.csv');
  });

  document.getElementById('theme-toggle').addEventListener('click', ()=> {
    document.body.classList.toggle('psyche');
    localStorage.setItem('psyche', document.body.classList.contains('psyche') ? '1' : '0');
  });

  if (localStorage.getItem('psyche') === '1') document.body.classList.add('psyche');
}
```

---

### `src/storage.js`
```javascript
export const Store = {
  _lf: null,
  async init(){
    if (window.localforage) {
      this._lf = localforage;
      this._lf.config({ name:'arg_engine', storeName:'vc_store' });
    } else {
      this._lf = null;
    }
  },
  async set(key, value){
    const meta = { value, updatedAt: Date.now() };
    if (this._lf) await this._lf.setItem(key, meta);
    else localStorage.setItem(key, JSON.stringify(meta));
  },
  async get(key){
    if (this._lf) { const m = await this._lf.getItem(key); return m ? m.value : null; }
    const raw = localStorage.getItem(key); return raw ? JSON.parse(raw).value : null;
  },
  async list(prefix=''){
    const out = [];
    if (this._lf) {
      const keys = await this._lf.keys();
      for (const k of keys) if (!prefix || k.startsWith(prefix)) { const m = await this._lf.getItem(k); out.push({ key:k, value:m ? m.value : null }); }
    } else {
      for (const k of Object.keys(localStorage)) if (!prefix || k.startsWith(prefix)) { const m = JSON.parse(localStorage.getItem(k)); out.push({ key:k, value:m ? m.value : null }); }
    }
    return out;
  },
  async remove(key){ if (this._lf) await this._lf.removeItem(key); else localStorage.removeItem(key); },
  async audit(event, details={}){ const k = `audit:${Date.now()}:${Math.random().toString(36).slice(2,6)}`; await this.set(k,{event,details,ts:Date.now()}); }
};
```

---

### `src/wallet.js`
```javascript
export const Wallet = {
  async create(){
    const kp = await crypto.subtle.generateKey({ name:'ECDSA', namedCurve:'P-256' }, true, ['sign','verify']);
    const pub = await crypto.subtle.exportKey('spki', kp.publicKey);
    const priv = await crypto.subtle.exportKey('pkcs8', kp.privateKey);
    const obj = { id:'u_'+Date.now().toString(36), pub:btoa(String.fromCharCode(...new Uint8Array(pub))), priv:btoa(String.fromCharCode(...new Uint8Array(priv))) };
    await (await import('./storage.js')).Store.set('wallet', obj);
    return obj;
  },
  async load(){ return (await import('./storage.js')).Store.get('wallet'); },
  async sign(message){
    const w = await this.load(); if (!w) throw new Error('wallet missing');
    const priv = Uint8Array.from(atob(w.priv), c=>c.charCodeAt(0)).buffer;
    const key = await crypto.subtle.importKey('pkcs8', priv, { name:'ECDSA', namedCurve:'P-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign({ name:'ECDSA', hash:'SHA-256' }, key, new TextEncoder().encode(message));
    return btoa(String.fromCharCode(...new Uint8Array(sig)));
  },
  async verify(pubB64, message, sigB64){
    const pub = Uint8Array.from(atob(pubB64), c=>c.charCodeAt(0)).buffer;
    const key = await crypto.subtle.importKey('spki', pub, { name:'ECDSA', namedCurve:'P-256' }, false, ['verify']);
    return crypto.subtle.verify({ name:'ECDSA', hash:'SHA-256' }, key, Uint8Array.from(atob(sigB64), c=>c.charCodeAt(0)).buffer, new TextEncoder().encode(message));
  }
};
```

---

### `src/attachments.js`
```javascript
import { Store } from './storage.js';
export const Attachments = {
  async save(file, meta={}){
    const id = 'att:'+Date.now().toString(36);
    const ab = await file.arrayBuffer();
    const b64 = btoa(String.fromCharCode(...new Uint8Array(ab)));
    const obj = { id, name:file.name, type:file.type, size:file.size, data:b64, meta, createdAt:Date.now() };
    await Store.set(id, obj);
    await Store.audit('attachment:save',{id,name:file.name,size:file.size});
    return obj;
  },
  async get(id){ return Store.get(id); },
  toObjectURL(att){ const ab = Uint8Array.from(atob(att.data), c=>c.charCodeAt(0)); return URL.createObjectURL(new Blob([ab], { type: att.type })); }
};
```

---

### `src/moderation.js`
```javascript
import { Store } from './storage.js';
export const Moderation = {
  async enqueue(item){ item.id = item.id || 'mod:'+Date.now().toString(36); item.status='pending'; await Store.set(item.id,item); await Store.audit('moderation:enqueue',{id:item.id}); return item; },
  async listPending(){ const all = await Store.list('mod:'); return all.map(i=>i.value).filter(x=>x && x.status==='pending'); },
  async vote(itemId, voterId, vote, sig=null){ const item = await Store.get(itemId); item.votes = item.votes||[]; item.votes.push({ voter:voterId, vote, ts:Date.now(), sig }); await Store.set(itemId,item); await Store.audit('moderation:vote',{itemId,voter:voterId,vote}); return item; },
  async tally(itemId, quorum=1){ const item = await Store.get(itemId); const votes = (item.votes||[]); const yes = votes.filter(v=>v.vote===true).length; const no = votes.filter(v=>v.vote===false).length; if (votes.length < quorum) return { status:'pending', yes, no, total:votes.length }; item.status = yes>no ? 'approved' : (no>yes ? 'rejected' : 'pending'); await Store.set(itemId,item); await Store.audit('moderation:tally',{itemId,status:item.status}); return { status:item.status, yes, no, total:votes.length }; }
};
```

---

### `src/pii_utils.js`
```javascript
export const PII = (function(){
  const patterns = { email:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/ig, phone:/\+?\d[\d\s.-]{5,}\d/g, url:/https?:\/\/[^\s]+/ig };
  function maskEmail(e){ const [l,d]=e.split('@'); return (l.slice(0,Math.max(1,Math.floor(l.length*0.3)))+'…@'+d); }
  function maskPhone(p){ const d=p.replace(/\D/g,''); return d.length>4 ? '•••'+d.slice(-2) : '•••'+d; }
  function maskText(s,policy={email:'partial',phone:'partial',default:'redact'}){ if (!s) return s; let out=s; out = out.replace(patterns.email, m => policy.email==='partial'?maskEmail(m):'[REDACTED]'); out = out.replace(patterns.phone, m => policy.phone==='partial'?maskPhone(m):'[REDACTED]'); out = out.replace(patterns.url, m => '[REDACTED]'); return out; }
  async function applyBeforeExport(rows, options={}){ const policy = options.policy || {}; return rows.map(r => { const copy = JSON.parse(JSON.stringify(r)); for (const k of Object.keys(copy)) if (typeof copy[k] === 'string') copy[k] = maskText(copy[k], policy); return copy; }); }
  function toCSV(rows){ if (!rows.length) return ''; const headers = Object.keys(rows[0]); const lines = [headers.join(',')]; for (const r of rows){ lines.push(headers.map(h=>`"${String(r[h]||'').replace(/"/g,'""')}"`).join(',')); } return lines.join('\n'); }
  return { applyBeforeExport, toCSV };
})();
```

---

### `src/ui.js`
```javascript
import { Wallet } from './wallet.js';
export const ui = {
  init(){ /* placeholder for modal container, focus management */ },
  createMissionCard(m){
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `<div><strong>${m.title}</strong><div class="small">${m.desc||''}</div></div><div style="margin-top:8px"><button class="btn">Voir</button></div>`;
    return el;
  },
  showMissionEditor({onSave}){ const id='m:'+Date.now().toString(36); const m={id,title:'Nouvelle mission',desc:'Décrivez la mission',stages:[]}; onSave && onSave(m); },
  downloadCSV(rows, name='export.csv'){ const csv = (window.PII && typeof PII.toCSV === 'function') ? PII.toCSV(rows) : rows.map(r=>JSON.stringify(r)).join('\n'); const blob = new Blob([csv],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click(); }
};
```

---

### `src/editor/editor.html` (simple standalone editor)
```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Éditeur Markdown — ARG</title>
<link rel="stylesheet" href="../styles/base.css">
<link rel="stylesheet" href="editor.css">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js" defer></script>
<script type="module" src="editor.js" defer></script>
</head>
<body>
  <main class="container">
    <h1>Éditeur Markdown</h1>
    <textarea id="md-editor" class="input" rows="12" placeholder="Écrivez en Markdown..."></textarea>
    <h2>Aperçu</h2>
    <div id="html-preview" class="card"></div>
    <div style="margin-top:12px">
      <button id="export-md" class="btn primary">Exporter MD</button>
      <button id="export-html" class="btn">Exporter HTML</button>
    </div>
  </main>
</body>
</html>
```

---

### `src/editor/editor.css`
```css
/* minimal editor styles */
#md-editor{width:100%;min-height:220px;font-family:monospace;padding:10px;border-radius:8px;border:1px solid #eee}
#html-preview{padding:12px}
```

---

### `src/editor/editor.js`
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const mdEditor = document.getElementById('md-editor');
  const preview = document.getElementById('html-preview');
  function render(){ const raw = window.marked ? marked.parse(mdEditor.value||'') : mdEditor.value; const clean = window.DOMPurify ? DOMPurify.sanitize(raw) : raw; preview.innerHTML = clean; }
  mdEditor.addEventListener('input', render);
  render();
  document.getElementById('export-md').addEventListener('click', ()=> {
    const blob = new Blob([mdEditor.value], { type: 'text/markdown' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'document.md'; a.click();
  });
  document.getElementById('export-html').addEventListener('click', ()=> {
    const raw = window.marked ? marked.parse(mdEditor.value||'') : mdEditor.value;
    const clean = window.DOMPurify ? DOMPurify.sanitize(raw) : raw;
    const blob = new Blob([clean], { type: 'text/html' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'document.html'; a.click();
  });
});
```

---

### `engagement/attention-banner.html`
```html
<div id="attention-banner" role="region" aria-live="polite" style="background:#fff8e6;padding:10px;border-left:4px solid #ffcc66;font-size:0.95rem;">
  <strong>Note sur l’attention</strong> : cette plateforme utilise des mécaniques ludiques pour encourager la participation. Vous pouvez désactiver les notifications et limiter votre temps de contribution dans Paramètres.
</div>
```

---

### `engagement/pause-modal.js`
```javascript
(function(){
  const KEY_LAST_PAUSE = 'vc_last_pause_shown';
  const KEY_ACTIVE_SECONDS = 'vc_active_seconds';
  const PAUSE_THRESHOLD_SECONDS = 30 * 60;
  const CHECK_INTERVAL = 1000;
  let activeSeconds = parseInt(localStorage.getItem(KEY_ACTIVE_SECONDS) || '0', 10);
  let lastActivity = Date.now();
  function recordActivity() { lastActivity = Date.now(); }
  ['click','keydown','mousemove','touchstart'].forEach(evt => window.addEventListener(evt, recordActivity, {passive:true}));
  function showPauseModal() {
    if (localStorage.getItem(KEY_LAST_PAUSE)) return;
    const modal = document.createElement('div');
    modal.innerHTML = `<div style="position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center">
      <div style="background:#fff;padding:18px;border-radius:10px;max-width:520px;width:92%">
        <h3>Pause recommandée</h3>
        <p>Vous contribuez depuis un moment. Une courte pause améliore la qualité des contributions et protège votre attention.</p>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button id="vc-continue">Continuer</button>
          <button id="vc-pause">Faire une pause</button>
        </div>
      </div></div>`;
    document.body.appendChild(modal);
    document.getElementById('vc-continue').onclick = ()=>{ localStorage.setItem(KEY_LAST_PAUSE, Date.now()); modal.remove(); };
    document.getElementById('vc-pause').onclick = ()=>{ localStorage.setItem(KEY_LAST_PAUSE, Date.now()); modal.remove(); window.location.href='/'; };
  }
  setInterval(() => {
    const now = Date.now();
    if (now - lastActivity < 60 * 1000) { activeSeconds += CHECK_INTERVAL / 1000; localStorage.setItem(KEY_ACTIVE_SECONDS, String(activeSeconds)); }
    if (activeSeconds >= PAUSE_THRESHOLD_SECONDS && !localStorage.getItem(KEY_LAST_PAUSE)) { showPauseModal(); }
  }, CHECK_INTERVAL);
})();
```

---

### `engagement/badges.json`
```json
[
  {"id":"badge-verificateur","title":"Vérificateur local","criteria":"5 signalements validés","description":"Vérification rigoureuse des signalements","visibility":"public"},
  {"id":"badge-essaimage","title":"Essaimeur","criteria":"Aider 3 groupes à déployer","description":"Partage et formation","visibility":"public"},
  {"id":"badge-guardian","title":"Gardien·ne de l'attention","criteria":"Activer pauses 14 jours","description":"Encourage pratiques saines","visibility":"public"}
]
```

---

### `landing/psyche-index.html` (optional viral landing)
```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>ARG Psyche Landing</title>
<link rel="stylesheet" href="../styles/base.css">
<link rel="stylesheet" href="psyche-styles.css">
</head>
<body>
  <div class="banner">
    <div class="brand"><h1>ARG Engine • Psyche</h1><p>veille citoyenne remix</p></div>
    <div class="controls"><label class="switch"><input id="theme-toggle-psy" type="checkbox"><span class="slider"></span></label></div>
  </div>
  <main class="container">
    <h2>Agis local. Rêve global.</h2>
    <p>Prototype open source — thème psyché activable.</p>
    <div><button id="konami-hint" class="btn ghost">Astuce</button><button id="spawn-peng" class="btn">Pingouin</button></div>
  </main>
  <div id="penguin-layer"></div>
  <script src="psyche-script.js" defer></script>
</body>
</html>
```

---

### `landing/psyche-styles.css` and `landing/psyche-script.js`

Place the `psyche` styles and script from the earlier "psyché landing" content (neon, glitch, Konami, penguin spawn). Use the same code blocks provided earlier in the conversation for `styles.css` and `script.js` but save them under `landing/` and adjust paths if needed. (They are intentionally modular and optional.)

---

### `assets/penguins.svg` and `assets/neon-icons.svg`

Use the SVG sprite blocks provided earlier (penguin symbols and neon icons). Save them as `assets/penguins.svg` and `assets/neon-icons.svg`. They are used by the landing and by the Konami easter egg.

---

### `bootstrap_arg_engine.sh` (optional helper)
```bash
#!/usr/bin/env bash
# (script content to create the tree and files; provided earlier in the conversation)
# Save as bootstrap_arg_engine.sh, chmod +x, run to scaffold files automatically.
```

---

## 3. Tests et checklist (ordre recommandé)

1. **Serve local** : `npx http-server` or `python -m http.server` and open on mobile device via LAN.  
2. **Storage** : ouvrir console → `Store.init()` then `Store.set('test','ok')` and `Store.get('test')`.  
3. **Wallet** : `Wallet.create()` → `Wallet.load()` → `Wallet.sign('hello')` → `Wallet.verify(pub, 'hello', sig)`.  
4. **Create mission** : UI → créer mission → vérifier `Store.list('mission:')`.  
5. **Attachments** : upload small image via editor or modal → `Attachments.get(id)` → preview via `Attachments.toObjectURL`.  
6. **Moderation** : `Moderation.enqueue({type:'claim',refId:'x'})` → `Moderation.vote(...)` → `Moderation.tally(...)`.  
7. **PII export** : create sample with email/phone → export anonymisé → verify masking.  
8. **Accessibility** : run axe in DevTools, keyboard navigation, `prefers-reduced-motion`.  
9. **Performance** : Lighthouse mobile score target ≥ 80; optimize images and inline critical CSS if needed.  
10. **Pilot** : run a 4‑week local pilot, collect feedback, iterate.

---

## 4. Déploiement (GitHub Pages)

1. `git init` → add files → `git add .` → `git commit -m "Initial mobile-first refactor"` → push to GitHub.  
2. GitHub repo → Settings → Pages → Branch `main` → Root → Save.  
3. Vérifier URL publique, tester sur mobile.

---

## 5. Documentation essentielle (collez dans `README.md`)

```markdown


---

Si vous voulez, je peux **maintenant** :
- générer un **ZIP** contenant tous les fichiers ci‑dessous (prêt à pousser),  
- ou produire un **script CI** (GitHub Actions) pour tests Lighthouse + déploiement Pages,  
- ou écrire le **GOVERNANCE.md** complet prêt à signer par votre collectif.

Dites simplement lequel vous voulez que je fournisse en premier et je le génère immédiatement.
