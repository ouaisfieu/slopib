import { Store } from './storage.js';
export const Moderation = {
  async enqueue(item){ item.id = item.id || 'mod:'+Date.now().toString(36); item.status='pending'; await Store.set(item.id,item); await Store.audit('moderation:enqueue',{id:item.id}); return item; },
  async listPending(){ const all = await Store.list('mod:'); return all.map(i=>i.value).filter(x=>x && x.status==='pending'); },
  async vote(itemId, voterId, vote, sig=null){ const item = await Store.get(itemId); item.votes = item.votes||[]; item.votes.push({ voter:voterId, vote, ts:Date.now(), sig }); await Store.set(itemId,item); await Store.audit('moderation:vote',{itemId,voter:voterId,vote}); return item; },
  async tally(itemId, quorum=1){ const item = await Store.get(itemId); const votes = (item.votes||[]); const yes = votes.filter(v=>v.vote===true).length; const no = votes.filter(v=>v.vote===false).length; if (votes.length < quorum) return { status:'pending', yes, no, total:votes.length }; item.status = yes>no ? 'approved' : (no>yes ? 'rejected' : 'pending'); await Store.set(itemId,item); await Store.audit('moderation:tally',{itemId,status:item.status}); return { status:item.status, yes, no, total:votes.length }; }
};
