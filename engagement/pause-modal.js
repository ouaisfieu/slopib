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
