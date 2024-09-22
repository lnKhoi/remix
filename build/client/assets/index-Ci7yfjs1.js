import{r as Q,j as De,a as Pe}from"./jsx-runtime-BEJf7xDi.js";import{m as b,n as k,o as Fe,p as Ue,r as me,q as J,t as Me,v as A,w as Le,x,y as je,z as Y,A as He,B as $e,C as Ie,D as re,E as ae,G as Ne,H as pe,I as ze,J as Be,K as Xe,N as Je}from"./components-CF6Lyjm6.js";import{m as We,U as W,i as F,w as ye,E as Ge,K as Ve,s as Ke,L as Qe}from"./index-Dt0pqFoG.js";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var Ye=et,Ze=tt,qe=Object.prototype.toString,O=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function et(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},a=r.decode||nt,i=0;i<e.length;){var s=e.indexOf("=",i);if(s===-1)break;var o=e.indexOf(";",i);if(o===-1)o=e.length;else if(o<s){i=e.lastIndexOf(";",s-1)+1;continue}var l=e.slice(i,s).trim();if(n[l]===void 0){var u=e.slice(s+1,o).trim();u.charCodeAt(0)===34&&(u=u.slice(1,-1)),n[l]=it(u,a)}i=o+1}return n}function tt(e,t,n){var r=n||{},a=r.encode||rt;if(typeof a!="function")throw new TypeError("option encode is invalid");if(!O.test(e))throw new TypeError("argument name is invalid");var i=a(t);if(i&&!O.test(i))throw new TypeError("argument val is invalid");var s=e+"="+i;if(r.maxAge!=null){var o=r.maxAge-0;if(isNaN(o)||!isFinite(o))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(o)}if(r.domain){if(!O.test(r.domain))throw new TypeError("option domain is invalid");s+="; Domain="+r.domain}if(r.path){if(!O.test(r.path))throw new TypeError("option path is invalid");s+="; Path="+r.path}if(r.expires){var l=r.expires;if(!at(l)||isNaN(l.valueOf()))throw new TypeError("option expires is invalid");s+="; Expires="+l.toUTCString()}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.partitioned&&(s+="; Partitioned"),r.priority){var u=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(u){case"low":s+="; Priority=Low";break;case"medium":s+="; Priority=Medium";break;case"high":s+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var c=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(c){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;case"none":s+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return s}function nt(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function rt(e){return encodeURIComponent(e)}function at(e){return qe.call(e)==="[object Date]"||e instanceof Date}function it(e,t){try{return t(e)}catch{return e}}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const ie={};function ge(e,t){!e&&!ie[t]&&(ie[t]=!0,console.warn(t))}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const st=({sign:e,unsign:t})=>(n,r={})=>{let{secrets:a=[],...i}={path:"/",sameSite:"lax",...r};return ht(n,i.expires),{get name(){return n},get isSigned(){return a.length>0},get expires(){return typeof i.maxAge<"u"?new Date(Date.now()+i.maxAge*1e3):i.expires},async parse(s,o){if(!s)return null;let l=Ye(s,{...i,...o});return n in l?l[n]===""?"":await lt(t,l[n],a):null},async serialize(s,o){return Ze(n,s===""?"":await ot(e,s,a),{...i,...o})}}},Z=e=>e!=null&&typeof e.name=="string"&&typeof e.isSigned=="boolean"&&typeof e.parse=="function"&&typeof e.serialize=="function";async function ot(e,t,n){let r=ut(t);return n.length>0&&(r=await e(r,n[0])),r}async function lt(e,t,n){if(n.length>0){for(let r of n){let a=await e(t,r);if(a!==!1)return se(a)}return null}return se(t)}function ut(e){return btoa(dt(encodeURIComponent(JSON.stringify(e))))}function se(e){try{return JSON.parse(decodeURIComponent(ct(atob(e))))}catch{return{}}}function ct(e){let t=e.toString(),n="",r=0,a,i;for(;r<t.length;)a=t.charAt(r++),/[\w*+\-./@]/.exec(a)?n+=a:(i=a.charCodeAt(0),i<256?n+="%"+oe(i,2):n+="%u"+oe(i,4).toUpperCase());return n}function oe(e,t){let n=e.toString(16);for(;n.length<t;)n="0"+n;return n}function dt(e){let t=e.toString(),n="",r=0,a,i;for(;r<t.length;){if(a=t.charAt(r++),a==="%"){if(t.charAt(r)==="u"){if(i=t.slice(r+1,r+5),/^[\da-f]{4}$/i.exec(i)){n+=String.fromCharCode(parseInt(i,16)),r+=5;continue}}else if(i=t.slice(r,r+2),/^[\da-f]{2}$/i.exec(i)){n+=String.fromCharCode(parseInt(i,16)),r+=2;continue}}n+=a}return n}function ht(e,t){ge(!t,`The "${e}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`)}function U(e){const t=unescape(encodeURIComponent(e));return Uint8Array.from(t,(n,r)=>t.charCodeAt(r))}function ft(e){const t=String.fromCharCode.apply(null,e);return decodeURIComponent(escape(t))}function D(...e){const t=new Uint8Array(e.reduce((r,a)=>r+a.length,0));let n=0;for(const r of e)t.set(r,n),n+=r.length;return t}function mt(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function le(e){return e instanceof Uint8Array?t=>e[t]:e}function z(e,t,n,r,a){const i=le(e),s=le(n);for(let o=0;o<a;++o)if(i(t+o)!==s(r+o))return!1;return!0}function pt(e){const t=new Array(256).fill(e.length);if(e.length>1)for(let n=0;n<e.length-1;n++)t[e[n]]=e.length-1-n;return t}const _=Symbol("Match");class q{constructor(t){this._lookbehind=new Uint8Array,typeof t=="string"?this._needle=t=U(t):this._needle=t,this._lastChar=t[t.length-1],this._occ=pt(t)}feed(t){let n=0,r;const a=[];for(;n!==t.length;)[n,...r]=this._feed(t,n),a.push(...r);return a}end(){const t=this._lookbehind;return this._lookbehind=new Uint8Array,t}_feed(t,n){const r=[];let a=-this._lookbehind.length;if(a<0){for(;a<0&&a<=t.length-this._needle.length;){const i=this._charAt(t,a+this._needle.length-1);if(i===this._lastChar&&this._memcmp(t,a,this._needle.length-1))return a>-this._lookbehind.length&&r.push(this._lookbehind.slice(0,this._lookbehind.length+a)),r.push(_),this._lookbehind=new Uint8Array,[a+this._needle.length,...r];a+=this._occ[i]}if(a<0)for(;a<0&&!this._memcmp(t,a,t.length-a);)a++;if(a>=0)r.push(this._lookbehind),this._lookbehind=new Uint8Array;else{const i=this._lookbehind.length+a;return i>0&&(r.push(this._lookbehind.slice(0,i)),this._lookbehind=this._lookbehind.slice(i)),this._lookbehind=Uint8Array.from(new Array(this._lookbehind.length+t.length),(s,o)=>this._charAt(t,o-this._lookbehind.length)),[t.length,...r]}}for(a+=n;a<=t.length-this._needle.length;){const i=t[a+this._needle.length-1];if(i===this._lastChar&&t[a]===this._needle[0]&&z(this._needle,0,t,a,this._needle.length-1))return a>n&&r.push(t.slice(n,a)),r.push(_),[a+this._needle.length,...r];a+=this._occ[i]}if(a<t.length){for(;a<t.length&&(t[a]!==this._needle[0]||!z(t,a,this._needle,0,t.length-a));)++a;a<t.length&&(this._lookbehind=t.slice(a))}return a>0&&r.push(t.slice(n,a<t.length?a:t.length)),[t.length,...r]}_charAt(t,n){return n<0?this._lookbehind[this._lookbehind.length+n]:t[n]}_memcmp(t,n,r){return z(this._charAt.bind(this,t),n,this._needle,0,r)}}class yt{constructor(t,n){this._readableStream=n,this._search=new q(t)}async*[Symbol.asyncIterator](){const t=this._readableStream.getReader();try{for(;;){const r=await t.read();if(r.done)break;yield*this._search.feed(r.value)}const n=this._search.end();n.length&&(yield n)}finally{t.releaseLock()}}}const gt=Function.prototype.apply.bind(D,void 0),we=U("--"),E=U(`\r
`);function wt(e){const t=e.split(";").map(r=>r.trim());if(t.shift()!=="form-data")throw new Error('malformed content-disposition header: missing "form-data" in `'+JSON.stringify(t)+"`");const n={};for(const r of t){const a=r.split("=",2);if(a.length!==2)throw new Error("malformed content-disposition header: key-value pair not found - "+r+" in `"+e+"`");const[i,s]=a;if(s[0]==='"'&&s[s.length-1]==='"')n[i]=s.slice(1,-1).replace(/\\"/g,'"');else if(s[0]!=='"'&&s[s.length-1]!=='"')n[i]=s;else if(s[0]==='"'&&s[s.length-1]!=='"'||s[0]!=='"'&&s[s.length-1]==='"')throw new Error("malformed content-disposition header: mismatched quotations in `"+e+"`")}if(!n.name)throw new Error("malformed content-disposition header: missing field name in `"+e+"`");return n}function vt(e){const t=[];let n=!1,r;for(;typeof(r=e.shift())<"u";){const a=r.indexOf(":");if(a===-1)throw new Error("malformed multipart-form header: missing colon");const i=r.slice(0,a).trim().toLowerCase(),s=r.slice(a+1).trim();switch(i){case"content-disposition":n=!0,t.push(...Object.entries(wt(s)));break;case"content-type":t.push(["contentType",s])}}if(!n)throw new Error("malformed multipart-form header: missing content-disposition");return Object.fromEntries(t)}async function St(e,t){let n=!0,r=!1;const a=[[]],i=new q(E);for(;;){const s=await e.next();if(s.done)throw new Error("malformed multipart-form data: unexpected end of stream");if(n&&s.value!==_&&mt(s.value.slice(0,2),we))return[void 0,new Uint8Array];let o;if(s.value!==_)o=s.value;else if(!r)o=t;else throw new Error("malformed multipart-form data: unexpected boundary");if(!o.length)continue;n&&(n=!1);const l=i.feed(o);for(const[u,c]of l.entries()){const p=c===_;if(!(!p&&!c.length)){if(r&&p)return l.push(i.end()),[a.filter(f=>f.length).map(gt).map(ft),D(...l.slice(u+1).map(f=>f===_?E:f))];(r=p)?a.push([]):a[a.length-1].push(c)}}}}async function*_t(e,t){const n=D(we,U(t)),r=new yt(n,e)[Symbol.asyncIterator]();for(;;){const i=await r.next();if(i.done)return;if(i.value===_)break}const a=new q(E);for(;;){let u=function(y){const h=[];for(const d of a.feed(y))l&&h.push(E),(l=d===_)||h.push(d);return D(...h)};const[i,s]=await St(r,n);if(!i)return;async function o(){const y=await r.next();if(y.done)throw new Error("malformed multipart-form data: unexpected end of stream");return y}let l=!1,c=!1;async function p(){const y=await o();let h;if(y.value!==_)h=y.value;else if(!l)h=E;else return c=!0,{value:a.end()};return{value:u(h)}}const f=[{value:u(s)}];for(yield{...vt(i),data:{[Symbol.asyncIterator](){return this},async next(){for(;;){const y=f.shift();if(!y)break;if(y.value.length>0)return y}for(;;){if(c)return{done:c,value:void 0};const y=await p();if(y.value.length>0)return y}}}};!c;)f.push(await p())}}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function bt(...e){return async t=>{for(let n of e){let r=await n(t);if(typeof r<"u"&&r!==null)return r}}}async function Tt(e,t){let n=e.headers.get("Content-Type")||"",[r,a]=n.split(/\s*;\s*boundary=/);if(!e.body||!a||r!=="multipart/form-data")throw new TypeError("Could not parse content as FormData.");let i=new FormData,s=_t(e.body,a);for await(let o of s){if(o.done)break;typeof o.filename=="string"&&(o.filename=o.filename.split(/[/\\]/).pop());let l=await t(o);typeof l<"u"&&l!==null&&i.append(o.name,l)}return i}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Rt(e){return Object.keys(e).reduce((t,n)=>(t[n]=e[n].module,t),{})}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ue(e,t){if(e===!1||e===null||typeof e>"u")throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"),new Error(t)}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function G(e,t,n){let r=We(e,t,n);return r?r.map(a=>({params:a.params,pathname:a.pathname,route:a.route})):null}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function Ct({loadContext:e,action:t,params:n,request:r,routeId:a,singleFetch:i}){let s=await t({request:i?Se(P(r)):ve(P(r)),context:e,params:n});if(s===void 0)throw new Error(`You defined an action for route "${a}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);return i||b(s)?s:k(s)}async function Et({loadContext:e,loader:t,params:n,request:r,routeId:a,singleFetch:i}){let s=await t({request:i?Se(P(r)):ve(P(r)),context:e,params:n});if(s===void 0)throw new Error(`You defined a loader for route "${a}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);return Fe(s)?s.init&&Ue(s.init.status||200)?me(new Headers(s.init.headers).get("Location"),s.init):s:i||b(s)?s:k(s)}function P(e){let t=new URL(e.url),n=t.searchParams.getAll("index");t.searchParams.delete("index");let r=[];for(let i of n)i&&r.push(i);for(let i of r)t.searchParams.append("index",i);let a={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return a.body&&(a.duplex="half"),new Request(t.href,a)}function ve(e){let t=new URL(e.url);t.searchParams.delete("_data");let n={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return n.body&&(n.duplex="half"),new Request(t.href,n)}function Se(e){let t=new URL(e.url);t.searchParams.delete("_routes");let n={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return n.body&&(n.duplex="half"),new Request(t.href,n)}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _e(e){let t={};return Object.values(e).forEach(n=>{let r=n.parentId||"";t[r]||(t[r]=[]),t[r].push(n)}),t}function be(e,t="",n=_e(e)){return(n[t]||[]).map(r=>({...r,children:be(e,r.id,n)}))}function Te(e,t,n="",r=_e(e)){return(r[n]||[]).map(a=>{let i={hasErrorBoundary:a.id==="root"||a.module.ErrorBoundary!=null,id:a.id,path:a.path,loader:a.module.loader?(s,o)=>Et({request:s.request,params:s.params,loadContext:s.context,loader:a.module.loader,routeId:a.id,singleFetch:t.unstable_singleFetch===!0}):void 0,action:a.module.action?(s,o)=>Ct({request:s.request,params:s.params,loadContext:s.context,action:a.module.action,routeId:a.id,singleFetch:t.unstable_singleFetch===!0}):void 0,handle:a.module.handle};return a.index?{index:!0,...i}:{caseSensitive:a.caseSensitive,children:Te(e,t,a.id,r),...i}})}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const xt={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},kt=/[&><\u2028\u2029]/g;function Ot(e){return e.replace(kt,t=>xt[t])}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ce(e){return Ot(JSON.stringify(e))}var At={};/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function Dt(e,t){if(t??(t=At.REMIX_DEV_ORIGIN),!t)throw Error("Dev server origin not set");let n=new URL(t);n.pathname="ping";let r=await fetch(n.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({buildHash:e.assets.version})}).catch(a=>{throw console.error(`Could not reach Remix dev server at ${n}`),a});if(!r.ok)throw console.error(`Could not reach Remix dev server at ${n} (${r.status})`),Error(await r.text())}function Pt(e){console.log(`[REMIX DEV] ${e.assets.version} ready`)}const Re="__remix_devServerHooks";function Ft(e){globalThis[Re]=e}function de(){return globalThis[Re]}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ut(e,t){return`⚠️ REMIX FUTURE CHANGE: Resource routes will no longer be able to return raw JavaScript objects in v3 when Single Fetch becomes the default. You can prepare for this change at your convenience by wrapping the data returned from your \`${e}\` function in the \`${t}\` route with \`json()\`.  For instructions on making this change see https://remix.run/docs/en/v2.9.2/guides/single-fetch#resource-routes`}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function he(e,t){var n,r;let a=be(e.routes),i=Te(e.routes,e.future),s=Ne(t)?t:x.Production,o=Qe(i,{basename:e.basename,future:{v7_relativeSplatPath:((n=e.future)===null||n===void 0?void 0:n.v3_relativeSplatPath)===!0,v7_throwAbortReason:((r=e.future)===null||r===void 0?void 0:r.v3_throwAbortReason)===!0}}),l=e.entry.module.handleError||((u,{request:c})=>{s!==x.Test&&!c.signal.aborted&&console.error(F(u)&&u.error?u.error:u)});return{routes:a,dataRoutes:i,serverMode:s,staticHandler:o,errorHandler:l}}const Mt=(e,t)=>{let n,r,a,i,s;return async function(l,u={}){if(n=typeof e=="function"?await e():e,t??(t=n.mode),typeof e=="function"){let m=he(n,t);r=m.routes,a=m.serverMode,i=m.staticHandler,s=m.errorHandler}else if(!r||!a||!i||!s){let m=he(n,t);r=m.routes,a=m.serverMode,i=m.staticHandler,s=m.errorHandler}let c=new URL(l.url),p={},f=m=>{if(t===x.Development){var g,w;(g=de())===null||g===void 0||(w=g.processRequestError)===null||w===void 0||w.call(g,m)}s(m,{context:u,params:p,request:l})},y=`${n.basename??"/"}/__manifest`.replace(/\/+/g,"/");if(c.pathname===y)try{return await Lt(n,r,c)}catch(m){return f(m),new Response("Unknown Server Error",{status:500})}let h=G(r,c.pathname,n.basename);h&&h.length>0&&Object.assign(p,h[0].params);let d;if(c.searchParams.has("_data")){n.future.unstable_singleFetch&&f(new Error("Warning: Single fetch-enabled apps should not be making ?_data requests, this is likely to break in the future"));let m=c.searchParams.get("_data");d=await jt(a,n,i,m,l,u,f),n.entry.module.handleDataRequest&&(d=await n.entry.module.handleDataRequest(d,{context:u,params:p,request:l}),J(d)&&(d=xe(d,n.basename)))}else if(n.future.unstable_singleFetch&&c.pathname.endsWith(".data")){let m=new URL(l.url);m.pathname=m.pathname.replace(/\.data$/,"").replace(/^\/_root$/,"/");let g=G(r,m.pathname,n.basename);if(d=await Ht(a,n,i,l,m,u,f),n.entry.module.handleDataRequest&&(d=await n.entry.module.handleDataRequest(d,{context:u,params:g?g[0].params:{},request:l}),J(d))){let w=Me(d.status,d.headers,n.basename);l.method==="GET"&&(w={[pe]:w});let T=new Headers(d.headers);return T.set("Content-Type","text/x-script"),new Response(A(w,l.signal,n.entry.module.streamTimeout,a),{status:Le,headers:T})}}else if(h&&h[h.length-1].route.module.default==null&&h[h.length-1].route.module.ErrorBoundary==null)d=await It(a,n,i,h.slice(-1)[0].route.id,l,u,f);else{var v,C;let m=t===x.Development?await((v=de())===null||v===void 0||(C=v.getCriticalCss)===null||C===void 0?void 0:C.call(v,n,c.pathname)):void 0;d=await $t(a,n,i,l,u,f,m)}return l.method==="HEAD"?new Response(null,{headers:d.headers,status:d.status,statusText:d.statusText}):d}};async function Lt(e,t,n){let r={};if(n.searchParams.has("p")){for(let a of n.searchParams.getAll("p")){let i=G(t,a,e.basename);if(i)for(let s of i){let o=s.route.id;r[o]=e.assets.routes[o]}}return k(r,{headers:{"Cache-Control":"public, max-age=31536000, immutable"}})}return new Response("Invalid Request",{status:400})}async function jt(e,t,n,r,a,i,s){try{let o=await n.queryRoute(a,{routeId:r,requestContext:i});if(J(o))return xe(o,t.basename);if(W in o){let l=o[W],u=je(l,a.signal,e),c=l.init||{},p=new Headers(c.headers);return p.set("Content-Type","text/remix-deferred"),p.set("X-Remix-Response","yes"),c.headers=p,new Response(u,c)}return o=V(o,"X-Remix-Response","yes"),o}catch(o){if(b(o))return V(o,"X-Remix-Catch","yes");if(F(o))return s(o),Ce(o,e);let l=o instanceof Error||o instanceof DOMException?o:new Error("Unexpected Server Error");return s(l),ye(Y(l,e),{status:500,headers:{"X-Remix-Error":"yes"}})}}async function Ht(e,t,n,r,a,i,s){let{result:o,headers:l,status:u}=r.method!=="GET"?await He(t,e,n,r,a,i,s):await $e(t,e,n,r,a,i,s),c=new Headers(l);return c.set("X-Remix-Response","yes"),u===304?new Response(null,{status:304,headers:c}):(c.set("Content-Type","text/x-script"),new Response(A(o,r.signal,t.entry.module.streamTimeout,e),{status:u||200,headers:c}))}async function $t(e,t,n,r,a,i,s){let o;try{o=await n.query(r,{requestContext:a})}catch(f){return i(f),new Response(null,{status:500})}if(b(o))return o;let l=Ie(t,o);if(o.statusCode===304)return new Response(null,{status:304,headers:l});o.errors&&(Object.values(o.errors).forEach(f=>{(!F(f)||f.error)&&i(f)}),o.errors=re(o.errors,e));let u={loaderData:o.loaderData,actionData:o.actionData,errors:ae(o.errors,e)},c={manifest:t.assets,routeModules:Rt(t.routes),staticHandlerContext:o,criticalCss:s,serverHandoffString:ce({basename:t.basename,criticalCss:s,future:t.future,isSpaMode:t.isSpaMode,...t.future.unstable_singleFetch?null:{state:u}}),...t.future.unstable_singleFetch?{serverHandoffStream:A(u,r.signal,t.entry.module.streamTimeout,e),renderMeta:{}}:null,future:t.future,isSpaMode:t.isSpaMode,serializeError:f=>Y(f,e)},p=t.entry.module.default;try{return await p(r,o.statusCode,l,c,a)}catch(f){i(f);let y=f;if(b(f))try{let d=await Nt(f);y=new Ge(f.status,f.statusText,d)}catch{}o=Ve(n.dataRoutes,o,y),o.errors&&(o.errors=re(o.errors,e));let h={loaderData:o.loaderData,actionData:o.actionData,errors:ae(o.errors,e)};c={...c,staticHandlerContext:o,serverHandoffString:ce({basename:t.basename,future:t.future,isSpaMode:t.isSpaMode,...t.future.unstable_singleFetch?null:{state:h}}),...t.future.unstable_singleFetch?{serverHandoffStream:A(h,r.signal,t.entry.module.streamTimeout,e),renderMeta:{}}:null};try{return await p(r,o.statusCode,l,c,a)}catch(d){return i(d),Ee(d,e)}}}async function It(e,t,n,r,a,i,s){try{let o=await n.queryRoute(a,{routeId:r,requestContext:i});return typeof o=="object"&&o!==null&&ue(!(W in o),`You cannot return a \`defer()\` response from a Resource Route.  Did you forget to export a default UI component from the "${r}" route?`),t.future.unstable_singleFetch&&!b(o)&&(console.warn(Ut(a.method==="GET"?"loader":"action",r)),o=k(o)),ue(b(o),"Expected a Response to be returned from queryRoute"),o}catch(o){return b(o)?V(o,"X-Remix-Catch","yes"):F(o)?(o&&s(o),Ce(o,e)):(s(o),Ee(o,e))}}function Ce(e,t){return ye(Y(e.error||new Error("Unexpected Server Error"),t),{status:e.status,statusText:e.statusText,headers:{"X-Remix-Error":"yes"}})}function Ee(e,t){let n="Unexpected Server Error";return t!==x.Production&&(n+=`

${String(e)}`),new Response(n,{status:500,headers:{"Content-Type":"text/plain"}})}function Nt(e){let t=e.headers.get("Content-Type");return t&&/\bapplication\/json\b/.test(t)?e.body==null?null:e.json():e.text()}function xe(e,t){let n=new Headers(e.headers),r=n.get("Location");return n.set("X-Remix-Redirect",t&&Ke(r,t)||r),n.set("X-Remix-Status",String(e.status)),n.delete("Location"),e.headers.get("Set-Cookie")!==null&&n.set("X-Remix-Revalidate","yes"),new Response(null,{status:204,headers:n})}function V(e,t,n){let r=new Headers(e.headers);return r.set(t,n),new Response(e.body,{status:e.status,statusText:e.statusText,headers:r,duplex:e.body?"half":void 0})}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function B(e){return`__flash_${e}__`}const ee=(e={},t="")=>{let n=new Map(Object.entries(e));return{get id(){return t},get data(){return Object.fromEntries(n)},has(r){return n.has(r)||n.has(B(r))},get(r){if(n.has(r))return n.get(r);let a=B(r);if(n.has(a)){let i=n.get(a);return n.delete(a),i}},set(r,a){n.set(r,a)},flash(r,a){n.set(B(r),a)},unset(r){n.delete(r)}}},zt=e=>e!=null&&typeof e.id=="string"&&typeof e.data<"u"&&typeof e.has=="function"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.flash=="function"&&typeof e.unset=="function",Bt=e=>({cookie:t,createData:n,readData:r,updateData:a,deleteData:i})=>{let s=Z(t)?t:e((t==null?void 0:t.name)||"__session",t);return ke(s),{async getSession(o,l){let u=o&&await s.parse(o,l),c=u&&await r(u);return ee(c||{},u||"")},async commitSession(o,l){let{id:u,data:c}=o,p=(l==null?void 0:l.maxAge)!=null?new Date(Date.now()+l.maxAge*1e3):(l==null?void 0:l.expires)!=null?l.expires:s.expires;return u?await a(u,c,p):u=await n(c,p),s.serialize(u,l)},async destroySession(o,l){return await i(o.id),s.serialize("",{...l,maxAge:void 0,expires:new Date(0)})}}};function ke(e){ge(e.isSigned,`The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`)}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Xt=e=>({cookie:t}={})=>{let n=Z(t)?t:e((t==null?void 0:t.name)||"__session",t);return ke(n),{async getSession(r,a){return ee(r&&await n.parse(r,a)||{})},async commitSession(r,a){let i=await n.serialize(r.data,a);if(i.length>4096)throw new Error("Cookie length will exceed browser maximum. Length: "+i.length);return i},async destroySession(r,a){return n.serialize("",{...a,maxAge:void 0,expires:new Date(0)})}}};/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Jt=e=>({cookie:t}={})=>{let n=new Map;return e({cookie:t,async createData(r,a){let i=Math.random().toString(36).substring(2,10);return n.set(i,{data:r,expires:a}),i},async readData(r){if(n.has(r)){let{data:a,expires:i}=n.get(r);if(!i||i>new Date)return a;i&&n.delete(r)}return null},async updateData(r,a,i){n.set(r,{data:a,expires:i})},async deleteData(r){n.delete(r)}})};/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */class Oe extends Error{constructor(t,n){super(`Field "${t}" exceeded upload size of ${n} bytes.`),this.field=t,this.maxBytes=n}}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Wt({filter:e,maxPartSize:t=3e6}={}){return async({filename:n,contentType:r,name:a,data:i})=>{if(e&&!await e({filename:n,contentType:r,name:a}))return;let s=0,o=[];for await(let l of i){if(s+=l.byteLength,s>t)throw new Oe(a,t);o.push(l)}return typeof n=="string"?new File(o,n,{type:r}):await new Blob(o,{type:r}).text()}}/**
 * @remix-run/server-runtime v2.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Gt=Object.freeze(Object.defineProperty({__proto__:null,MaxPartSizeExceededError:Oe,UNSAFE_SingleFetchRedirectSymbol:pe,broadcastDevReady:Dt,createCookieFactory:st,createCookieSessionStorageFactory:Xt,createMemorySessionStorageFactory:Jt,createRequestHandler:Mt,createSession:ee,createSessionStorageFactory:Bt,defer:ze,isCookie:Z,isSession:zt,json:k,logDevReady:Pt,redirect:me,redirectDocument:Be,replace:Xe,unstable_composeUploadHandlers:bt,unstable_createMemoryUploadHandler:Wt,unstable_data:Je,unstable_parseMultipartFormData:Tt,unstable_setDevServerHooks:Ft},Symbol.toStringTag,{value:"Module"}));var Vt={},M={},L={},j={};Object.defineProperty(j,"__esModule",{value:!0});j.useBroadcastChannel=void 0;const K=Q;function Kt(e,t,n){const r=(0,K.useRef)(typeof window<"u"&&"BroadcastChannel"in window?new BroadcastChannel(e+"-channel"):null);return fe(r,"message",t),fe(r,"messageerror",n),(0,K.useCallback)(a=>{var i;(i=r==null?void 0:r.current)===null||i===void 0||i.postMessage(a)},[r])}j.useBroadcastChannel=Kt;function fe(e,t,n=()=>{}){(0,K.useEffect)(()=>{const r=e.current;if(r)return r.addEventListener(t,n),()=>r.removeEventListener(t,n)},[e,t,n])}var H={};Object.defineProperty(H,"__esModule",{value:!0});H.useCorrectCssTransition=void 0;const Qt=Q;function Yt(e){const t=document.createElement("style");t.appendChild(document.createTextNode(`* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`)),document.head.appendChild(t),e(),setTimeout(()=>{window.getComputedStyle(t).transition,document.head.removeChild(t)},0)}function Zt({disableTransitions:e=!1}={}){return(0,Qt.useCallback)(t=>{e?Yt(()=>{t()}):t()},[e])}H.useCorrectCssTransition=Zt;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.isTheme=e.useTheme=e.PreventFlashOnWrongTheme=e.ThemeProvider=e.mediaQuery=e.themes=e.Theme=void 0;const t=De,n=Q,r=j,a=H;var i;(function(h){h.DARK="dark",h.LIGHT="light"})(i=e.Theme||(e.Theme={})),e.themes=Object.values(i);const s=(0,n.createContext)(void 0);s.displayName="ThemeContext";const o="(prefers-color-scheme: light)",l=()=>window.matchMedia(o).matches?i.LIGHT:i.DARK;e.mediaQuery=typeof window<"u"?window.matchMedia(o):null;function u({children:h,specifiedTheme:d,themeAction:v,disableTransitionOnThemeChange:C=!1}){const m=(0,a.useCorrectCssTransition)({disableTransitions:C}),[g,w]=(0,n.useState)(()=>d?e.themes.includes(d)?d:null:typeof window!="object"?null:l()),[T,I]=(0,n.useState)(d?"USER":"SYSTEM"),N=(0,r.useBroadcastChannel)("remix-themes",S=>{m(()=>{w(S.data.theme),I(S.data.definedBy)})});(0,n.useEffect)(()=>{if(T==="USER")return()=>{};const S=R=>{m(()=>{w(R.matches?i.LIGHT:i.DARK)})};return e.mediaQuery===null||e.mediaQuery===void 0||e.mediaQuery.addEventListener("change",S),()=>e.mediaQuery===null||e.mediaQuery===void 0?void 0:e.mediaQuery.removeEventListener("change",S)},[m,T]);const te=(0,n.useCallback)(S=>{const R=typeof S=="function"?S(g):S;if(R===null){const ne=l();m(()=>{w(ne),I("SYSTEM"),N({theme:ne,definedBy:"SYSTEM"})}),fetch(`${v}`,{method:"POST",body:JSON.stringify({theme:null})})}else m(()=>{w(R),I("USER"),N({theme:R,definedBy:"USER"})}),fetch(`${v}`,{method:"POST",body:JSON.stringify({theme:R})})},[N,m,g,v]),Ae=(0,n.useMemo)(()=>[g,te,{definedBy:T}],[g,te,T]);return(0,t.jsx)(s.Provider,{value:Ae,children:h})}e.ThemeProvider=u;const c=String.raw`
(() => {
  const theme = window.matchMedia(${JSON.stringify(o)}).matches
    ? 'light'
    : 'dark';
  
  const cl = document.documentElement.classList;
  const dataAttr = document.documentElement.dataset.theme;

  if (dataAttr != null) {
    const themeAlreadyApplied = dataAttr === 'light' || dataAttr === 'dark';
    if (!themeAlreadyApplied) {
      document.documentElement.dataset.theme = theme;
    }
  } else {
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (!themeAlreadyApplied) {
      cl.add(theme);
    }
  }
  
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;function p({ssrTheme:h,nonce:d}){const[v]=f();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("meta",{name:"color-scheme",content:v==="light"?"light dark":"dark light"}),h?null:(0,t.jsx)("script",{dangerouslySetInnerHTML:{__html:c},nonce:d,suppressHydrationWarning:!0})]})}e.PreventFlashOnWrongTheme=p;function f(){const h=(0,n.useContext)(s);if(h===void 0)throw new Error("useTheme must be used within a ThemeProvider");return h}e.useTheme=f;function y(h){return typeof h=="string"&&e.themes.includes(h)}e.isTheme=y})(L);Object.defineProperty(M,"__esModule",{value:!0});M.createThemeSessionResolver=void 0;const qt=L,en=e=>async n=>{const r=await e.getSession(n.headers.get("Cookie"));return{getTheme:()=>{const a=r.get("theme");return(0,qt.isTheme)(a)?a:null},setTheme:a=>r.set("theme",a),commit:()=>e.commitSession(r),destroy:()=>e.destroySession(r)}};M.createThemeSessionResolver=en;var $={};const tn=Pe(Gt);Object.defineProperty($,"__esModule",{value:!0});$.createThemeAction=void 0;const X=tn,nn=L,rn=e=>async({request:n})=>{const r=await e(n),{theme:a}=await n.json();return a?(0,nn.isTheme)(a)?(r.setTheme(a),(0,X.json)({success:!0},{headers:{"Set-Cookie":await r.commit()}})):(0,X.json)({success:!1,message:`theme value of ${a} is not a valid theme.`}):(0,X.json)({success:!0},{headers:{"Set-Cookie":await r.destroy()}})};$.createThemeAction=rn;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.createThemeAction=e.PreventFlashOnWrongTheme=e.isTheme=e.Theme=e.themes=e.useTheme=e.ThemeProvider=e.createThemeSessionResolver=void 0;var t=M;Object.defineProperty(e,"createThemeSessionResolver",{enumerable:!0,get:function(){return t.createThemeSessionResolver}});var n=L;Object.defineProperty(e,"ThemeProvider",{enumerable:!0,get:function(){return n.ThemeProvider}}),Object.defineProperty(e,"useTheme",{enumerable:!0,get:function(){return n.useTheme}}),Object.defineProperty(e,"themes",{enumerable:!0,get:function(){return n.themes}}),Object.defineProperty(e,"Theme",{enumerable:!0,get:function(){return n.Theme}}),Object.defineProperty(e,"isTheme",{enumerable:!0,get:function(){return n.isTheme}}),Object.defineProperty(e,"PreventFlashOnWrongTheme",{enumerable:!0,get:function(){return n.PreventFlashOnWrongTheme}});var r=$;Object.defineProperty(e,"createThemeAction",{enumerable:!0,get:function(){return r.createThemeAction}})})(Vt);export{Vt as b};
