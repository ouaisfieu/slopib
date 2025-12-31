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
