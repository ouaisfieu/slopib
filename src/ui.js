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
