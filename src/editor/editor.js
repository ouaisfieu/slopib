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
