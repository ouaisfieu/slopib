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
