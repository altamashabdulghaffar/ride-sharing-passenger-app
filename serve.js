// Serves this folder at http://localhost:5510 so the browser remembers permissions (like location).
// Files opened directly (file://...) cannot keep permissions, so the browser asks every time.
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=__dirname,PORT=5510;
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/app.html';
  const f=path.normalize(path.join(ROOT,p));
  if(!f.startsWith(ROOT)){res.writeHead(403);res.end();return}
  fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('Not found');return}res.writeHead(200,{'content-type':TYPES[path.extname(f).toLowerCase()]||'application/octet-stream','cache-control':'no-cache'});res.end(d)});
}).listen(PORT,'127.0.0.1',()=>console.log('Smart Safe Ride is running:\n  App:   http://localhost:'+PORT+'/app.html\n  Admin: http://localhost:'+PORT+'/admin.html\nKeep this window open while you use the app.'));
