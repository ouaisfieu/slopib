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
