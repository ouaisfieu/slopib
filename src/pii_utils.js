export const PII = (function(){
  const patterns = { email:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/ig, phone:/\+?\d[\d\s.-]{5,}\d/g, url:/https?:\/\/[^\s]+/ig };
  function maskEmail(e){ const [l,d]=e.split('@'); return (l.slice(0,Math.max(1,Math.floor(l.length*0.3)))+'…@'+d); }
  function maskPhone(p){ const d=p.replace(/\D/g,''); return d.length>4 ? '•••'+d.slice(-2) : '•••'+d; }
  function maskText(s,policy={email:'partial',phone:'partial',default:'redact'}){ if (!s) return s; let out=s; out = out.replace(patterns.email, m => policy.email==='partial'?maskEmail(m):'[REDACTED]'); out = out.replace(patterns.phone, m => policy.phone==='partial'?maskPhone(m):'[REDACTED]'); out = out.replace(patterns.url, m => '[REDACTED]'); return out; }
  async function applyBeforeExport(rows, options={}){ const policy = options.policy || {}; return rows.map(r => { const copy = JSON.parse(JSON.stringify(r)); for (const k of Object.keys(copy)) if (typeof copy[k] === 'string') copy[k] = maskText(copy[k], policy); return copy; }); }
  function toCSV(rows){ if (!rows.length) return ''; const headers = Object.keys(rows[0]); const lines = [headers.join(',')]; for (const r of rows){ lines.push(headers.map(h=>`"${String(r[h]||'').replace(/"/g,'""')}"`).join(',')); } return lines.join('\n'); }
  return { applyBeforeExport, toCSV };
})();
