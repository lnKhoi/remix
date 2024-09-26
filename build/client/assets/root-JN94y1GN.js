import{r as k,j as g,b as Me}from"./jsx-runtime-CHwbkWbZ.js";import{j as T,k as A,l as Fe,m as Ue,r as ye,n as G,o as Le,p as P,S as He,q as O,t as $e,v as Z,w as Ie,x as Ne,y as Be,z as ae,A as ie,B as ze,C as ge,D as Je,E as We,G as Xe,H as Ge,I as Ve,J as Ye,_ as Ke,u as Qe,M as Ze,K as qe,N as et}from"./components-T8sgp3wV.js";import{m as tt,U as V,i as F,w as we,E as nt,K as rt,s as at,L as it,a as st,r as ot,O as lt}from"./index-Fe4a85aj.js";import{i as ut,D as ct}from"./error-boundary-DIcMk9Ug.js";import{A as dt}from"./auth.context-CHxM0nCf.js";import"./index-DLo6RHam.js";import"./clsx-B-dksMZM.js";import"./bundle-mjs-BOZU2X2x.js";/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */var ht=pt,ft=yt,mt=Object.prototype.toString,D=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function pt(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var n={},r=t||{},a=r.decode||gt,i=0;i<e.length;){var o=e.indexOf("=",i);if(o===-1)break;var s=e.indexOf(";",i);if(s===-1)s=e.length;else if(s<o){i=e.lastIndexOf(";",o-1)+1;continue}var l=e.slice(i,o).trim();if(n[l]===void 0){var u=e.slice(o+1,s).trim();u.charCodeAt(0)===34&&(u=u.slice(1,-1)),n[l]=St(u,a)}i=s+1}return n}function yt(e,t,n){var r=n||{},a=r.encode||wt;if(typeof a!="function")throw new TypeError("option encode is invalid");if(!D.test(e))throw new TypeError("argument name is invalid");var i=a(t);if(i&&!D.test(i))throw new TypeError("argument val is invalid");var o=e+"="+i;if(r.maxAge!=null){var s=r.maxAge-0;if(isNaN(s)||!isFinite(s))throw new TypeError("option maxAge is invalid");o+="; Max-Age="+Math.floor(s)}if(r.domain){if(!D.test(r.domain))throw new TypeError("option domain is invalid");o+="; Domain="+r.domain}if(r.path){if(!D.test(r.path))throw new TypeError("option path is invalid");o+="; Path="+r.path}if(r.expires){var l=r.expires;if(!vt(l)||isNaN(l.valueOf()))throw new TypeError("option expires is invalid");o+="; Expires="+l.toUTCString()}if(r.httpOnly&&(o+="; HttpOnly"),r.secure&&(o+="; Secure"),r.partitioned&&(o+="; Partitioned"),r.priority){var u=typeof r.priority=="string"?r.priority.toLowerCase():r.priority;switch(u){case"low":o+="; Priority=Low";break;case"medium":o+="; Priority=Medium";break;case"high":o+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(r.sameSite){var c=typeof r.sameSite=="string"?r.sameSite.toLowerCase():r.sameSite;switch(c){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return o}function gt(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function wt(e){return encodeURIComponent(e)}function vt(e){return mt.call(e)==="[object Date]"||e instanceof Date}function St(e,t){try{return t(e)}catch{return e}}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const se={};function ve(e,t){!e&&!se[t]&&(se[t]=!0,console.warn(t))}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const _t=({sign:e,unsign:t})=>(n,r={})=>{let{secrets:a=[],...i}={path:"/",sameSite:"lax",...r};return Et(n,i.expires),{get name(){return n},get isSigned(){return a.length>0},get expires(){return typeof i.maxAge<"u"?new Date(Date.now()+i.maxAge*1e3):i.expires},async parse(o,s){if(!o)return null;let l=ht(o,{...i,...s});return n in l?l[n]===""?"":await Tt(t,l[n],a):null},async serialize(o,s){return ft(n,o===""?"":await bt(e,o,a),{...i,...s})}}},q=e=>e!=null&&typeof e.name=="string"&&typeof e.isSigned=="boolean"&&typeof e.parse=="function"&&typeof e.serialize=="function";async function bt(e,t,n){let r=Rt(t);return n.length>0&&(r=await e(r,n[0])),r}async function Tt(e,t,n){if(n.length>0){for(let r of n){let a=await e(t,r);if(a!==!1)return oe(a)}return null}return oe(t)}function Rt(e){return btoa(Ct(encodeURIComponent(JSON.stringify(e))))}function oe(e){try{return JSON.parse(decodeURIComponent(xt(atob(e))))}catch{return{}}}function xt(e){let t=e.toString(),n="",r=0,a,i;for(;r<t.length;)a=t.charAt(r++),/[\w*+\-./@]/.exec(a)?n+=a:(i=a.charCodeAt(0),i<256?n+="%"+le(i,2):n+="%u"+le(i,4).toUpperCase());return n}function le(e,t){let n=e.toString(16);for(;n.length<t;)n="0"+n;return n}function Ct(e){let t=e.toString(),n="",r=0,a,i;for(;r<t.length;){if(a=t.charAt(r++),a==="%"){if(t.charAt(r)==="u"){if(i=t.slice(r+1,r+5),/^[\da-f]{4}$/i.exec(i)){n+=String.fromCharCode(parseInt(i,16)),r+=5;continue}}else if(i=t.slice(r,r+2),/^[\da-f]{2}$/i.exec(i)){n+=String.fromCharCode(parseInt(i,16)),r+=2;continue}}n+=a}return n}function Et(e,t){ve(!t,`The "${e}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`)}function U(e){const t=unescape(encodeURIComponent(e));return Uint8Array.from(t,(n,r)=>t.charCodeAt(r))}function kt(e){const t=String.fromCharCode.apply(null,e);return decodeURIComponent(escape(t))}function j(...e){const t=new Uint8Array(e.reduce((r,a)=>r+a.length,0));let n=0;for(const r of e)t.set(r,n),n+=r.length;return t}function Ot(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function ue(e){return e instanceof Uint8Array?t=>e[t]:e}function J(e,t,n,r,a){const i=ue(e),o=ue(n);for(let s=0;s<a;++s)if(i(t+s)!==o(r+s))return!1;return!0}function At(e){const t=new Array(256).fill(e.length);if(e.length>1)for(let n=0;n<e.length-1;n++)t[e[n]]=e.length-1-n;return t}const b=Symbol("Match");class ee{constructor(t){this._lookbehind=new Uint8Array,typeof t=="string"?this._needle=t=U(t):this._needle=t,this._lastChar=t[t.length-1],this._occ=At(t)}feed(t){let n=0,r;const a=[];for(;n!==t.length;)[n,...r]=this._feed(t,n),a.push(...r);return a}end(){const t=this._lookbehind;return this._lookbehind=new Uint8Array,t}_feed(t,n){const r=[];let a=-this._lookbehind.length;if(a<0){for(;a<0&&a<=t.length-this._needle.length;){const i=this._charAt(t,a+this._needle.length-1);if(i===this._lastChar&&this._memcmp(t,a,this._needle.length-1))return a>-this._lookbehind.length&&r.push(this._lookbehind.slice(0,this._lookbehind.length+a)),r.push(b),this._lookbehind=new Uint8Array,[a+this._needle.length,...r];a+=this._occ[i]}if(a<0)for(;a<0&&!this._memcmp(t,a,t.length-a);)a++;if(a>=0)r.push(this._lookbehind),this._lookbehind=new Uint8Array;else{const i=this._lookbehind.length+a;return i>0&&(r.push(this._lookbehind.slice(0,i)),this._lookbehind=this._lookbehind.slice(i)),this._lookbehind=Uint8Array.from(new Array(this._lookbehind.length+t.length),(o,s)=>this._charAt(t,s-this._lookbehind.length)),[t.length,...r]}}for(a+=n;a<=t.length-this._needle.length;){const i=t[a+this._needle.length-1];if(i===this._lastChar&&t[a]===this._needle[0]&&J(this._needle,0,t,a,this._needle.length-1))return a>n&&r.push(t.slice(n,a)),r.push(b),[a+this._needle.length,...r];a+=this._occ[i]}if(a<t.length){for(;a<t.length&&(t[a]!==this._needle[0]||!J(t,a,this._needle,0,t.length-a));)++a;a<t.length&&(this._lookbehind=t.slice(a))}return a>0&&r.push(t.slice(n,a<t.length?a:t.length)),[t.length,...r]}_charAt(t,n){return n<0?this._lookbehind[this._lookbehind.length+n]:t[n]}_memcmp(t,n,r){return J(this._charAt.bind(this,t),n,this._needle,0,r)}}class Dt{constructor(t,n){this._readableStream=n,this._search=new ee(t)}async*[Symbol.asyncIterator](){const t=this._readableStream.getReader();try{for(;;){const r=await t.read();if(r.done)break;yield*this._search.feed(r.value)}const n=this._search.end();n.length&&(yield n)}finally{t.releaseLock()}}}const Pt=Function.prototype.apply.bind(j,void 0),Se=U("--"),E=U(`\r
`);function jt(e){const t=e.split(";").map(r=>r.trim());if(t.shift()!=="form-data")throw new Error('malformed content-disposition header: missing "form-data" in `'+JSON.stringify(t)+"`");const n={};for(const r of t){const a=r.split("=",2);if(a.length!==2)throw new Error("malformed content-disposition header: key-value pair not found - "+r+" in `"+e+"`");const[i,o]=a;if(o[0]==='"'&&o[o.length-1]==='"')n[i]=o.slice(1,-1).replace(/\\"/g,'"');else if(o[0]!=='"'&&o[o.length-1]!=='"')n[i]=o;else if(o[0]==='"'&&o[o.length-1]!=='"'||o[0]!=='"'&&o[o.length-1]==='"')throw new Error("malformed content-disposition header: mismatched quotations in `"+e+"`")}if(!n.name)throw new Error("malformed content-disposition header: missing field name in `"+e+"`");return n}function Mt(e){const t=[];let n=!1,r;for(;typeof(r=e.shift())<"u";){const a=r.indexOf(":");if(a===-1)throw new Error("malformed multipart-form header: missing colon");const i=r.slice(0,a).trim().toLowerCase(),o=r.slice(a+1).trim();switch(i){case"content-disposition":n=!0,t.push(...Object.entries(jt(o)));break;case"content-type":t.push(["contentType",o])}}if(!n)throw new Error("malformed multipart-form header: missing content-disposition");return Object.fromEntries(t)}async function Ft(e,t){let n=!0,r=!1;const a=[[]],i=new ee(E);for(;;){const o=await e.next();if(o.done)throw new Error("malformed multipart-form data: unexpected end of stream");if(n&&o.value!==b&&Ot(o.value.slice(0,2),Se))return[void 0,new Uint8Array];let s;if(o.value!==b)s=o.value;else if(!r)s=t;else throw new Error("malformed multipart-form data: unexpected boundary");if(!s.length)continue;n&&(n=!1);const l=i.feed(s);for(const[u,c]of l.entries()){const p=c===b;if(!(!p&&!c.length)){if(r&&p)return l.push(i.end()),[a.filter(f=>f.length).map(Pt).map(kt),j(...l.slice(u+1).map(f=>f===b?E:f))];(r=p)?a.push([]):a[a.length-1].push(c)}}}}async function*Ut(e,t){const n=j(Se,U(t)),r=new Dt(n,e)[Symbol.asyncIterator]();for(;;){const i=await r.next();if(i.done)return;if(i.value===b)break}const a=new ee(E);for(;;){let u=function(y){const h=[];for(const d of a.feed(y))l&&h.push(E),(l=d===b)||h.push(d);return j(...h)};const[i,o]=await Ft(r,n);if(!i)return;async function s(){const y=await r.next();if(y.done)throw new Error("malformed multipart-form data: unexpected end of stream");return y}let l=!1,c=!1;async function p(){const y=await s();let h;if(y.value!==b)h=y.value;else if(!l)h=E;else return c=!0,{value:a.end()};return{value:u(h)}}const f=[{value:u(o)}];for(yield{...Mt(i),data:{[Symbol.asyncIterator](){return this},async next(){for(;;){const y=f.shift();if(!y)break;if(y.value.length>0)return y}for(;;){if(c)return{done:c,value:void 0};const y=await p();if(y.value.length>0)return y}}}};!c;)f.push(await p())}}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Lt(...e){return async t=>{for(let n of e){let r=await n(t);if(typeof r<"u"&&r!==null)return r}}}async function Ht(e,t){let n=e.headers.get("Content-Type")||"",[r,a]=n.split(/\s*;\s*boundary=/);if(!e.body||!a||r!=="multipart/form-data")throw new TypeError("Could not parse content as FormData.");let i=new FormData,o=Ut(e.body,a);for await(let s of o){if(s.done)break;typeof s.filename=="string"&&(s.filename=s.filename.split(/[/\\]/).pop());let l=await t(s);typeof l<"u"&&l!==null&&i.append(s.name,l)}return i}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function $t(e){return Object.keys(e).reduce((t,n)=>(t[n]=e[n].module,t),{})}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ce(e,t){if(e===!1||e===null||typeof e>"u")throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"),new Error(t)}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Y(e,t,n){let r=tt(e,t,n);return r?r.map(a=>({params:a.params,pathname:a.pathname,route:a.route})):null}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function It({loadContext:e,action:t,params:n,request:r,routeId:a,singleFetch:i}){let o=await t({request:i?be(M(r)):_e(M(r)),context:e,params:n});if(o===void 0)throw new Error(`You defined an action for route "${a}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);return i||T(o)?o:A(o)}async function Nt({loadContext:e,loader:t,params:n,request:r,routeId:a,singleFetch:i}){let o=await t({request:i?be(M(r)):_e(M(r)),context:e,params:n});if(o===void 0)throw new Error(`You defined a loader for route "${a}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);return Fe(o)?o.init&&Ue(o.init.status||200)?ye(new Headers(o.init.headers).get("Location"),o.init):o:i||T(o)?o:A(o)}function M(e){let t=new URL(e.url),n=t.searchParams.getAll("index");t.searchParams.delete("index");let r=[];for(let i of n)i&&r.push(i);for(let i of r)t.searchParams.append("index",i);let a={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return a.body&&(a.duplex="half"),new Request(t.href,a)}function _e(e){let t=new URL(e.url);t.searchParams.delete("_data");let n={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return n.body&&(n.duplex="half"),new Request(t.href,n)}function be(e){let t=new URL(e.url);t.searchParams.delete("_routes");let n={method:e.method,body:e.body,headers:e.headers,signal:e.signal};return n.body&&(n.duplex="half"),new Request(t.href,n)}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Te(e){let t={};return Object.values(e).forEach(n=>{let r=n.parentId||"";t[r]||(t[r]=[]),t[r].push(n)}),t}function Re(e,t="",n=Te(e)){return(n[t]||[]).map(r=>({...r,children:Re(e,r.id,n)}))}function xe(e,t,n="",r=Te(e)){return(r[n]||[]).map(a=>{let i={hasErrorBoundary:a.id==="root"||a.module.ErrorBoundary!=null,id:a.id,path:a.path,loader:a.module.loader?(o,s)=>Nt({request:o.request,params:o.params,loadContext:o.context,loader:a.module.loader,routeId:a.id,singleFetch:t.unstable_singleFetch===!0}):void 0,action:a.module.action?(o,s)=>It({request:o.request,params:o.params,loadContext:o.context,action:a.module.action,routeId:a.id,singleFetch:t.unstable_singleFetch===!0}):void 0,handle:a.module.handle};return a.index?{index:!0,...i}:{caseSensitive:a.caseSensitive,children:xe(e,t,a.id,r),...i}})}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Bt={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},zt=/[&><\u2028\u2029]/g;function Jt(e){return e.replace(zt,t=>Bt[t])}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function de(e){return Jt(JSON.stringify(e))}var Wt={};/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */async function Xt(e,t){if(t??(t=Wt.REMIX_DEV_ORIGIN),!t)throw Error("Dev server origin not set");let n=new URL(t);n.pathname="ping";let r=await fetch(n.href,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({buildHash:e.assets.version})}).catch(a=>{throw console.error(`Could not reach Remix dev server at ${n}`),a});if(!r.ok)throw console.error(`Could not reach Remix dev server at ${n} (${r.status})`),Error(await r.text())}function Gt(e){console.log(`[REMIX DEV] ${e.assets.version} ready`)}const Ce="__remix_devServerHooks";function Vt(e){globalThis[Ce]=e}function he(){return globalThis[Ce]}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Yt(e,t){return`⚠️ REMIX FUTURE CHANGE: Resource routes will no longer be able to return raw JavaScript objects in v3 when Single Fetch becomes the default. You can prepare for this change at your convenience by wrapping the data returned from your \`${e}\` function in the \`${t}\` route with \`json()\`.  For instructions on making this change see https://remix.run/docs/en/v2.9.2/guides/single-fetch#resource-routes`}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function fe(e,t){var n,r;let a=Re(e.routes),i=xe(e.routes,e.future),o=ze(t)?t:O.Production,s=it(i,{basename:e.basename,future:{v7_relativeSplatPath:((n=e.future)===null||n===void 0?void 0:n.v3_relativeSplatPath)===!0,v7_throwAbortReason:((r=e.future)===null||r===void 0?void 0:r.v3_throwAbortReason)===!0}}),l=e.entry.module.handleError||((u,{request:c})=>{o!==O.Test&&!c.signal.aborted&&console.error(F(u)&&u.error?u.error:u)});return{routes:a,dataRoutes:i,serverMode:o,staticHandler:s,errorHandler:l}}const Kt=(e,t)=>{let n,r,a,i,o;return async function(l,u={}){if(n=typeof e=="function"?await e():e,t??(t=n.mode),typeof e=="function"){let m=fe(n,t);r=m.routes,a=m.serverMode,i=m.staticHandler,o=m.errorHandler}else if(!r||!a||!i||!o){let m=fe(n,t);r=m.routes,a=m.serverMode,i=m.staticHandler,o=m.errorHandler}let c=new URL(l.url),p={},f=m=>{if(t===O.Development){var w,v;(w=he())===null||w===void 0||(v=w.processRequestError)===null||v===void 0||v.call(w,m)}o(m,{context:u,params:p,request:l})},y=`${n.basename??"/"}/__manifest`.replace(/\/+/g,"/");if(c.pathname===y)try{return await Qt(n,r,c)}catch(m){return f(m),new Response("Unknown Server Error",{status:500})}let h=Y(r,c.pathname,n.basename);h&&h.length>0&&Object.assign(p,h[0].params);let d;if(c.searchParams.has("_data")){n.future.unstable_singleFetch&&f(new Error("Warning: Single fetch-enabled apps should not be making ?_data requests, this is likely to break in the future"));let m=c.searchParams.get("_data");d=await Zt(a,n,i,m,l,u,f),n.entry.module.handleDataRequest&&(d=await n.entry.module.handleDataRequest(d,{context:u,params:p,request:l}),G(d)&&(d=Oe(d,n.basename)))}else if(n.future.unstable_singleFetch&&c.pathname.endsWith(".data")){let m=new URL(l.url);m.pathname=m.pathname.replace(/\.data$/,"").replace(/^\/_root$/,"/");let w=Y(r,m.pathname,n.basename);if(d=await qt(a,n,i,l,m,u,f),n.entry.module.handleDataRequest&&(d=await n.entry.module.handleDataRequest(d,{context:u,params:w?w[0].params:{},request:l}),G(d))){let v=Le(d.status,d.headers,n.basename);l.method==="GET"&&(v={[ge]:v});let R=new Headers(d.headers);return R.set("Content-Type","text/x-script"),new Response(P(v,l.signal,n.entry.module.streamTimeout,a),{status:He,headers:R})}}else if(h&&h[h.length-1].route.module.default==null&&h[h.length-1].route.module.ErrorBoundary==null)d=await tn(a,n,i,h.slice(-1)[0].route.id,l,u,f);else{var S,C;let m=t===O.Development?await((S=he())===null||S===void 0||(C=S.getCriticalCss)===null||C===void 0?void 0:C.call(S,n,c.pathname)):void 0;d=await en(a,n,i,l,u,f,m)}return l.method==="HEAD"?new Response(null,{headers:d.headers,status:d.status,statusText:d.statusText}):d}};async function Qt(e,t,n){let r={};if(n.searchParams.has("p")){for(let a of n.searchParams.getAll("p")){let i=Y(t,a,e.basename);if(i)for(let o of i){let s=o.route.id;r[s]=e.assets.routes[s]}}return A(r,{headers:{"Cache-Control":"public, max-age=31536000, immutable"}})}return new Response("Invalid Request",{status:400})}async function Zt(e,t,n,r,a,i,o){try{let s=await n.queryRoute(a,{routeId:r,requestContext:i});if(G(s))return Oe(s,t.basename);if(V in s){let l=s[V],u=$e(l,a.signal,e),c=l.init||{},p=new Headers(c.headers);return p.set("Content-Type","text/remix-deferred"),p.set("X-Remix-Response","yes"),c.headers=p,new Response(u,c)}return s=K(s,"X-Remix-Response","yes"),s}catch(s){if(T(s))return K(s,"X-Remix-Catch","yes");if(F(s))return o(s),Ee(s,e);let l=s instanceof Error||s instanceof DOMException?s:new Error("Unexpected Server Error");return o(l),we(Z(l,e),{status:500,headers:{"X-Remix-Error":"yes"}})}}async function qt(e,t,n,r,a,i,o){let{result:s,headers:l,status:u}=r.method!=="GET"?await Ie(t,e,n,r,a,i,o):await Ne(t,e,n,r,a,i,o),c=new Headers(l);return c.set("X-Remix-Response","yes"),u===304?new Response(null,{status:304,headers:c}):(c.set("Content-Type","text/x-script"),new Response(P(s,r.signal,t.entry.module.streamTimeout,e),{status:u||200,headers:c}))}async function en(e,t,n,r,a,i,o){let s;try{s=await n.query(r,{requestContext:a})}catch(f){return i(f),new Response(null,{status:500})}if(T(s))return s;let l=Be(t,s);if(s.statusCode===304)return new Response(null,{status:304,headers:l});s.errors&&(Object.values(s.errors).forEach(f=>{(!F(f)||f.error)&&i(f)}),s.errors=ae(s.errors,e));let u={loaderData:s.loaderData,actionData:s.actionData,errors:ie(s.errors,e)},c={manifest:t.assets,routeModules:$t(t.routes),staticHandlerContext:s,criticalCss:o,serverHandoffString:de({basename:t.basename,criticalCss:o,future:t.future,isSpaMode:t.isSpaMode,...t.future.unstable_singleFetch?null:{state:u}}),...t.future.unstable_singleFetch?{serverHandoffStream:P(u,r.signal,t.entry.module.streamTimeout,e),renderMeta:{}}:null,future:t.future,isSpaMode:t.isSpaMode,serializeError:f=>Z(f,e)},p=t.entry.module.default;try{return await p(r,s.statusCode,l,c,a)}catch(f){i(f);let y=f;if(T(f))try{let d=await nn(f);y=new nt(f.status,f.statusText,d)}catch{}s=rt(n.dataRoutes,s,y),s.errors&&(s.errors=ae(s.errors,e));let h={loaderData:s.loaderData,actionData:s.actionData,errors:ie(s.errors,e)};c={...c,staticHandlerContext:s,serverHandoffString:de({basename:t.basename,future:t.future,isSpaMode:t.isSpaMode,...t.future.unstable_singleFetch?null:{state:h}}),...t.future.unstable_singleFetch?{serverHandoffStream:P(h,r.signal,t.entry.module.streamTimeout,e),renderMeta:{}}:null};try{return await p(r,s.statusCode,l,c,a)}catch(d){return i(d),ke(d,e)}}}async function tn(e,t,n,r,a,i,o){try{let s=await n.queryRoute(a,{routeId:r,requestContext:i});return typeof s=="object"&&s!==null&&ce(!(V in s),`You cannot return a \`defer()\` response from a Resource Route.  Did you forget to export a default UI component from the "${r}" route?`),t.future.unstable_singleFetch&&!T(s)&&(console.warn(Yt(a.method==="GET"?"loader":"action",r)),s=A(s)),ce(T(s),"Expected a Response to be returned from queryRoute"),s}catch(s){return T(s)?K(s,"X-Remix-Catch","yes"):F(s)?(s&&o(s),Ee(s,e)):(o(s),ke(s,e))}}function Ee(e,t){return we(Z(e.error||new Error("Unexpected Server Error"),t),{status:e.status,statusText:e.statusText,headers:{"X-Remix-Error":"yes"}})}function ke(e,t){let n="Unexpected Server Error";return t!==O.Production&&(n+=`

${String(e)}`),new Response(n,{status:500,headers:{"Content-Type":"text/plain"}})}function nn(e){let t=e.headers.get("Content-Type");return t&&/\bapplication\/json\b/.test(t)?e.body==null?null:e.json():e.text()}function Oe(e,t){let n=new Headers(e.headers),r=n.get("Location");return n.set("X-Remix-Redirect",t&&at(r,t)||r),n.set("X-Remix-Status",String(e.status)),n.delete("Location"),e.headers.get("Set-Cookie")!==null&&n.set("X-Remix-Revalidate","yes"),new Response(null,{status:204,headers:n})}function K(e,t,n){let r=new Headers(e.headers);return r.set(t,n),new Response(e.body,{status:e.status,statusText:e.statusText,headers:r,duplex:e.body?"half":void 0})}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function W(e){return`__flash_${e}__`}const te=(e={},t="")=>{let n=new Map(Object.entries(e));return{get id(){return t},get data(){return Object.fromEntries(n)},has(r){return n.has(r)||n.has(W(r))},get(r){if(n.has(r))return n.get(r);let a=W(r);if(n.has(a)){let i=n.get(a);return n.delete(a),i}},set(r,a){n.set(r,a)},flash(r,a){n.set(W(r),a)},unset(r){n.delete(r)}}},rn=e=>e!=null&&typeof e.id=="string"&&typeof e.data<"u"&&typeof e.has=="function"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.flash=="function"&&typeof e.unset=="function",an=e=>({cookie:t,createData:n,readData:r,updateData:a,deleteData:i})=>{let o=q(t)?t:e((t==null?void 0:t.name)||"__session",t);return Ae(o),{async getSession(s,l){let u=s&&await o.parse(s,l),c=u&&await r(u);return te(c||{},u||"")},async commitSession(s,l){let{id:u,data:c}=s,p=(l==null?void 0:l.maxAge)!=null?new Date(Date.now()+l.maxAge*1e3):(l==null?void 0:l.expires)!=null?l.expires:o.expires;return u?await a(u,c,p):u=await n(c,p),o.serialize(u,l)},async destroySession(s,l){return await i(s.id),o.serialize("",{...l,maxAge:void 0,expires:new Date(0)})}}};function Ae(e){ve(e.isSigned,`The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`)}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const sn=e=>({cookie:t}={})=>{let n=q(t)?t:e((t==null?void 0:t.name)||"__session",t);return Ae(n),{async getSession(r,a){return te(r&&await n.parse(r,a)||{})},async commitSession(r,a){let i=await n.serialize(r.data,a);if(i.length>4096)throw new Error("Cookie length will exceed browser maximum. Length: "+i.length);return i},async destroySession(r,a){return n.serialize("",{...a,maxAge:void 0,expires:new Date(0)})}}};/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const on=e=>({cookie:t}={})=>{let n=new Map;return e({cookie:t,async createData(r,a){let i=Math.random().toString(36).substring(2,10);return n.set(i,{data:r,expires:a}),i},async readData(r){if(n.has(r)){let{data:a,expires:i}=n.get(r);if(!i||i>new Date)return a;i&&n.delete(r)}return null},async updateData(r,a,i){n.set(r,{data:a,expires:i})},async deleteData(r){n.delete(r)}})};/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */class De extends Error{constructor(t,n){super(`Field "${t}" exceeded upload size of ${n} bytes.`),this.field=t,this.maxBytes=n}}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ln({filter:e,maxPartSize:t=3e6}={}){return async({filename:n,contentType:r,name:a,data:i})=>{if(e&&!await e({filename:n,contentType:r,name:a}))return;let o=0,s=[];for await(let l of i){if(o+=l.byteLength,o>t)throw new De(a,t);s.push(l)}return typeof n=="string"?new File(s,n,{type:r}):await new Blob(s,{type:r}).text()}}/**
 * @remix-run/server-runtime v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const un=Object.freeze(Object.defineProperty({__proto__:null,MaxPartSizeExceededError:De,UNSAFE_SingleFetchRedirectSymbol:ge,broadcastDevReady:Xt,createCookieFactory:_t,createCookieSessionStorageFactory:sn,createMemorySessionStorageFactory:on,createRequestHandler:Kt,createSession:te,createSessionStorageFactory:an,defer:Je,isCookie:q,isSession:rn,json:A,logDevReady:Gt,redirect:ye,redirectDocument:We,replace:Xe,unstable_composeUploadHandlers:Lt,unstable_createMemoryUploadHandler:ln,unstable_data:Ge,unstable_parseMultipartFormData:Ht,unstable_setDevServerHooks:Vt},Symbol.toStringTag,{value:"Module"}));/**
 * @remix-run/react v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let me="positions";function cn({getKey:e,...t}){let{isSpaMode:n}=Ve(),r=st(),a=ot();Ye({getKey:e,storageKey:me});let i=k.useMemo(()=>{if(!e)return null;let s=e(r,a);return s!==r.key?s:null},[]);if(n)return null;let o=((s,l)=>{if(!window.history.state||!window.history.state.key){let u=Math.random().toString(32).slice(2);window.history.replaceState({key:u},"")}try{let c=JSON.parse(sessionStorage.getItem(s)||"{}")[l||window.history.state.key];typeof c=="number"&&window.scrollTo(0,c)}catch(u){console.error(u),sessionStorage.removeItem(s)}}).toString();return k.createElement("script",Ke({},t,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${o})(${JSON.stringify(me)}, ${JSON.stringify(i)})`}}))}var Pe={},L={},H={},$={};Object.defineProperty($,"__esModule",{value:!0});$.useBroadcastChannel=void 0;const Q=k;function dn(e,t,n){const r=(0,Q.useRef)(typeof window<"u"&&"BroadcastChannel"in window?new BroadcastChannel(e+"-channel"):null);return pe(r,"message",t),pe(r,"messageerror",n),(0,Q.useCallback)(a=>{var i;(i=r==null?void 0:r.current)===null||i===void 0||i.postMessage(a)},[r])}$.useBroadcastChannel=dn;function pe(e,t,n=()=>{}){(0,Q.useEffect)(()=>{const r=e.current;if(r)return r.addEventListener(t,n),()=>r.removeEventListener(t,n)},[e,t,n])}var I={};Object.defineProperty(I,"__esModule",{value:!0});I.useCorrectCssTransition=void 0;const hn=k;function fn(e){const t=document.createElement("style");t.appendChild(document.createTextNode(`* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`)),document.head.appendChild(t),e(),setTimeout(()=>{window.getComputedStyle(t).transition,document.head.removeChild(t)},0)}function mn({disableTransitions:e=!1}={}){return(0,hn.useCallback)(t=>{e?fn(()=>{t()}):t()},[e])}I.useCorrectCssTransition=mn;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.isTheme=e.useTheme=e.PreventFlashOnWrongTheme=e.ThemeProvider=e.mediaQuery=e.themes=e.Theme=void 0;const t=g,n=k,r=$,a=I;var i;(function(h){h.DARK="dark",h.LIGHT="light"})(i=e.Theme||(e.Theme={})),e.themes=Object.values(i);const o=(0,n.createContext)(void 0);o.displayName="ThemeContext";const s="(prefers-color-scheme: light)",l=()=>window.matchMedia(s).matches?i.LIGHT:i.DARK;e.mediaQuery=typeof window<"u"?window.matchMedia(s):null;function u({children:h,specifiedTheme:d,themeAction:S,disableTransitionOnThemeChange:C=!1}){const m=(0,a.useCorrectCssTransition)({disableTransitions:C}),[w,v]=(0,n.useState)(()=>d?e.themes.includes(d)?d:null:typeof window!="object"?null:l()),[R,B]=(0,n.useState)(d?"USER":"SYSTEM"),z=(0,r.useBroadcastChannel)("remix-themes",_=>{m(()=>{v(_.data.theme),B(_.data.definedBy)})});(0,n.useEffect)(()=>{if(R==="USER")return()=>{};const _=x=>{m(()=>{v(x.matches?i.LIGHT:i.DARK)})};return e.mediaQuery===null||e.mediaQuery===void 0||e.mediaQuery.addEventListener("change",_),()=>e.mediaQuery===null||e.mediaQuery===void 0?void 0:e.mediaQuery.removeEventListener("change",_)},[m,R]);const ne=(0,n.useCallback)(_=>{const x=typeof _=="function"?_(w):_;if(x===null){const re=l();m(()=>{v(re),B("SYSTEM"),z({theme:re,definedBy:"SYSTEM"})}),fetch(`${S}`,{method:"POST",body:JSON.stringify({theme:null})})}else m(()=>{v(x),B("USER"),z({theme:x,definedBy:"USER"})}),fetch(`${S}`,{method:"POST",body:JSON.stringify({theme:x})})},[z,m,w,S]),je=(0,n.useMemo)(()=>[w,ne,{definedBy:R}],[w,ne,R]);return(0,t.jsx)(o.Provider,{value:je,children:h})}e.ThemeProvider=u;const c=String.raw`
(() => {
  const theme = window.matchMedia(${JSON.stringify(s)}).matches
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
`;function p({ssrTheme:h,nonce:d}){const[S]=f();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("meta",{name:"color-scheme",content:S==="light"?"light dark":"dark light"}),h?null:(0,t.jsx)("script",{dangerouslySetInnerHTML:{__html:c},nonce:d,suppressHydrationWarning:!0})]})}e.PreventFlashOnWrongTheme=p;function f(){const h=(0,n.useContext)(o);if(h===void 0)throw new Error("useTheme must be used within a ThemeProvider");return h}e.useTheme=f;function y(h){return typeof h=="string"&&e.themes.includes(h)}e.isTheme=y})(H);Object.defineProperty(L,"__esModule",{value:!0});L.createThemeSessionResolver=void 0;const pn=H,yn=e=>async n=>{const r=await e.getSession(n.headers.get("Cookie"));return{getTheme:()=>{const a=r.get("theme");return(0,pn.isTheme)(a)?a:null},setTheme:a=>r.set("theme",a),commit:()=>e.commitSession(r),destroy:()=>e.destroySession(r)}};L.createThemeSessionResolver=yn;var N={};const gn=Me(un);Object.defineProperty(N,"__esModule",{value:!0});N.createThemeAction=void 0;const X=gn,wn=H,vn=e=>async({request:n})=>{const r=await e(n),{theme:a}=await n.json();return a?(0,wn.isTheme)(a)?(r.setTheme(a),(0,X.json)({success:!0},{headers:{"Set-Cookie":await r.commit()}})):(0,X.json)({success:!1,message:`theme value of ${a} is not a valid theme.`}):(0,X.json)({success:!0},{headers:{"Set-Cookie":await r.destroy()}})};N.createThemeAction=vn;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.createThemeAction=e.PreventFlashOnWrongTheme=e.isTheme=e.Theme=e.themes=e.useTheme=e.ThemeProvider=e.createThemeSessionResolver=void 0;var t=L;Object.defineProperty(e,"createThemeSessionResolver",{enumerable:!0,get:function(){return t.createThemeSessionResolver}});var n=H;Object.defineProperty(e,"ThemeProvider",{enumerable:!0,get:function(){return n.ThemeProvider}}),Object.defineProperty(e,"useTheme",{enumerable:!0,get:function(){return n.useTheme}}),Object.defineProperty(e,"themes",{enumerable:!0,get:function(){return n.themes}}),Object.defineProperty(e,"Theme",{enumerable:!0,get:function(){return n.Theme}}),Object.defineProperty(e,"isTheme",{enumerable:!0,get:function(){return n.isTheme}}),Object.defineProperty(e,"PreventFlashOnWrongTheme",{enumerable:!0,get:function(){return n.PreventFlashOnWrongTheme}});var r=N;Object.defineProperty(e,"createThemeAction",{enumerable:!0,get:function(){return r.createThemeAction}})})(Pe);const On=()=>[{rel:"prefetch",href:ut,as:"image"}];function An(){const e=Qe();return g.jsx(Pe.ThemeProvider,{specifiedTheme:e.theme,themeAction:"/action/set-theme",children:g.jsx(dt,{children:g.jsx(Sn,{})})})}function Sn(){return g.jsxs("html",{lang:"en",children:[g.jsxs("head",{children:[g.jsx("meta",{charSet:"utf-8"}),g.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),g.jsx(Ze,{}),g.jsx(qe,{})]}),g.jsxs("body",{suppressHydrationWarning:!0,children:[g.jsx(lt,{}),g.jsx(cn,{}),g.jsx(et,{})]})]})}function Dn(){return g.jsx(ct,{})}function Pn(){return g.jsx("h1",{children:"Loading..."})}export{Dn as ErrorBoundary,Pn as HydrateFallback,An as default,On as links};
