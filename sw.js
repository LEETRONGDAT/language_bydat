const CACHE='language100-v12';
const SHELL=['./','./index.html','./manifest.json','./data.js','./lessons.json','./lesson-generator.js','./study-features.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.pathname.includes('/audio-generated/'))return;e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(res.ok&&u.origin===self.location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return res}).catch(()=>cached)))})
