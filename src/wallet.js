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
