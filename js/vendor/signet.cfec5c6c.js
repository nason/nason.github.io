!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(){var a,b,c,d,e,f,g,h,i,j,k,l;null!=(null!=(l=window.console)?l.log:void 0)&&(e=function(a){var b,c,d,e;return d=document.head||document.getElementsByTagName("head")[0],b=null!=(e=d.querySelector("meta[name='"+a+"']"))?e.content:void 0,b?function(){var a,d,e,f;for(e=b.split(","),f=[],a=0,d=e.length;d>a;a++)c=e[a],f.push("function"==typeof c.trim?c.trim():void 0);return f}():void 0},a=e("signet:authors"),f=e("signet:links"),i='400 12px "Helvetica Neue", Helvetica, Arial, sans-serif',j=12,k=16,h=function(){var a,b,c,d,e,f;return b=function(){return/MSIE/.test(navigator.userAgent)},a=function(){return/Firefox/.test(navigator.userAgent)},c=function(){return/OPR/.test(navigator.userAgent)&&/Opera/.test(navigator.vendor)},d=function(){return/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor)},f=function(){var a;return a=navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/),a?537.38<=parseInt(a[1],10)+parseInt(a[2],10)/100:!1},e=function(){var a;return a=navigator.userAgent.match(/OPR\/(\d+)\./),a?15<=parseInt(a[1],10):!1},!b()&&!a()&&(!c()||e())&&(!d()||f())}(),b=function(a){var b,c,d,e,f,g,h,i,j;for(g=["log","debug","warn","error"],e={},b={},d=[],c=g.length,h=function(a){return e[a]=console[a],b[a]=function(){return e[a].apply(console,arguments)},console[a]=function(){d.push([a,arguments])}},c=i=0,j=g.length;j>i;c=++i)f=g[c],h(f);return setTimeout(function(){var b,c,h,i,j;for(h=0,i=g.length;i>h;h++)f=g[h],console[f]=e[f];for(a(),j=[];d.length;)b=d.shift(),f=b[0],c=b[1],j.push(console[f].apply(console,c));return j},0)},d=function(){var b,c,d,e,f,g,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G;if(null!=a?a.length:void 0){if(h){for(j=480,k=(null!=(G=document.body)?G.clientWidth:void 0)||480,c=20,d=c/2,f=60,p=a.length*c+25,z=14,y=-35,w=-24,g=document.createElement("canvas"),g.height=1e3,g.width=k,m=g.getContext("2d"),m.font=i,n=function(a,b,c,d,e){return m.fillStyle=e,m.fillRect(a,b+z,c,d)},o=function(a,b){return m.fillStyle="#444",m.fillText(a,f+10,b+z)},n(0,-z,k,p,"white"),r=B=0,E=a.length;E>B;r=++B)for(b=a[r],o(b,c*r+14),l=b.replace(/\s/g,""),e=c*r+(c-d)/2,v=C=0,F=l.length;F>C;v=++C)x=l[v],t=Math.floor(f*v/l.length),u=Math.ceil(f*(v+1)/l.length-t),q=(2*x.toLowerCase().charCodeAt(0)+5*l.toLowerCase().charCodeAt(0))%256,n(t,e,u,d,"hsl("+q+", 80%, 80%)");return s="font-size: 0; line-height: "+(p+y)+"px; padding: "+Math.floor(p/2)+"px "+k+"px "+Math.ceil(p/2)+'px 0; background-image: url("'+g.toDataURL()+'"); margin-left: '+w+"px",console.log("%c ",s)}for(console.log("Author"+(1===a.length?"":"s")+":"),A=0,D=a.length;D>A;A++)b=a[A],console.log(b)}},c=function(){var a,b,c,d,e,j,l,m,n,o,p,q,r,s,t,u,v;if(null!=f?f.length:void 0){if(h){for(a={"twitter.com":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGFBMVEWEu/Tf7fxirPK41vg3nPABj+4omO/+//+b16fMAAAAVklEQVR42lXNQRJEUQRDUSRh/ztu8QZd/46cokrMpz/zMR+CBSwrzFBLlbFDYYbdlLegxFq2crzlTu3MrH6p7hF0onDM4inGtJs+PaK0EdYdA8iD+ekHsEgEIt/uHNUAAAAASUVORK5CYII=","github.com":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGFBMVEVCQUIsKyu8u7ugn6B7envc29wSERH+/v6nd/awAAAAWklEQVQIHT3BiQ0CQBDEsNkv6b9jEDphR70tqD01Ojyjcfgbc9C9M9sNl4Xz52BTxCdUYH0WAuuzkILz54rKUpnT68Dm2GV0+Lo4TJ820EanqrWhNert6c2pH7EtBBOlbNv9AAAAAElFTkSuQmCC","plus.google.com":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAFVBMVEXic2r88vHLOCDzzMnpoJvVDQDdSzg1eZqZAAAAWklEQVR42lXPORIDQAgDQV3o/082a5x4qhR0QADaajb1hRWy4bhyTEbHMb/rHzHJPIau3bdlG9MDksZSConCRlHFfr7bCTNTerodC+fYmrbTHtUk0I/SfXB9AElwAxEwF7nBAAAAAElFTkSuQmCC"},o=["%c\n","line-height: 0; font-size: 0"],e=t=0,v=f.length;v>t;e=++t){n=f[e],c=n.replace(/(https?:\/\/[^\/]+(\/|$))(.*)/,"$1"),p=n.substr(c.length),d=g(c),q=g(p),j=null;for(b in a)if(l=a[b],new RegExp("^(https?://)?(www.)?"+b+"/","i").test(n)){j=l;break}j?(o[0]+="%c"+n+"%c %c %c\n",m=-d):(o[0]+="%c"+n+"\n",m=0),o.push("-webkit-font-smoothing: antialiased; font: "+i+"; margin-left: "+m+"px"),j&&(r=42,m=-q-r,o.push("background: #fff; line-height: "+k+"px; padding: "+(k/2+2)+"px "+r/2+"px "+(k/2+2)+"px "+r/2+"px; font-size: 0; margin-left: "+m+"px"),m=-(r/2)+2,o.push("background: #fff url("+j+"); line-height: "+k+"px; padding: 11px 14px 3px 0; font-size: 0; margin-left: "+m+"px"),o.push(""))}return console.log.apply(console,o)}for(s=0,u=f.length;u>s;s++)n=f[s],console.log(n)}},g=function(a){var b,c;return b=document.createElement("canvas"),c=b.getContext("2d"),c.font=i,c.measureText(a).width},b(function(){return d(),c()}))}).call(this)},{}]},{},[1]);