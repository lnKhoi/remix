import{r as a,j as R}from"./jsx-runtime-CHwbkWbZ.js";import{c as se}from"./index-Cd5qH5R9.js";import{P as W,d as yt}from"./index-6o9Yse_D.js";import{u as K}from"./index-BpNdDISV.js";import{u as z,a as oe,c as wt}from"./index-CK9DHiHK.js";import{c as Et,o as bt,s as St,f as Ct,a as Pt,h as xt,b as Re,l as At,d as Rt}from"./floating-ui.dom-DUxIRmir.js";import{r as Ot,a as Lt}from"./index-DLo6RHam.js";function kt(e,t=globalThis==null?void 0:globalThis.document){const r=z(e);a.useEffect(()=>{const n=o=>{o.key==="Escape"&&r(o)};return t.addEventListener("keydown",n,{capture:!0}),()=>t.removeEventListener("keydown",n,{capture:!0})},[r,t])}var Nt="DismissableLayer",me="dismissableLayer.update",Tt="dismissableLayer.pointerDownOutside",Mt="dismissableLayer.focusOutside",Oe,He=a.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Dt=a.forwardRef((e,t)=>{const{disableOutsidePointerEvents:r=!1,onEscapeKeyDown:n,onPointerDownOutside:o,onFocusOutside:s,onInteractOutside:u,onDismiss:i,...m}=e,l=a.useContext(He),[f,v]=a.useState(null),h=(f==null?void 0:f.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,w]=a.useState({}),C=K(t,y=>v(y)),c=Array.from(l.layers),[d]=[...l.layersWithOutsidePointerEventsDisabled].slice(-1),p=c.indexOf(d),S=f?c.indexOf(f):-1,b=l.layersWithOutsidePointerEventsDisabled.size>0,g=S>=p,E=Wt(y=>{const A=y.target,k=[...l.branches].some(N=>N.contains(A));!g||k||(o==null||o(y),u==null||u(y),y.defaultPrevented||i==null||i())},h),P=_t(y=>{const A=y.target;[...l.branches].some(N=>N.contains(A))||(s==null||s(y),u==null||u(y),y.defaultPrevented||i==null||i())},h);return kt(y=>{S===l.layers.size-1&&(n==null||n(y),!y.defaultPrevented&&i&&(y.preventDefault(),i()))},h),a.useEffect(()=>{if(f)return r&&(l.layersWithOutsidePointerEventsDisabled.size===0&&(Oe=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),l.layersWithOutsidePointerEventsDisabled.add(f)),l.layers.add(f),Le(),()=>{r&&l.layersWithOutsidePointerEventsDisabled.size===1&&(h.body.style.pointerEvents=Oe)}},[f,h,r,l]),a.useEffect(()=>()=>{f&&(l.layers.delete(f),l.layersWithOutsidePointerEventsDisabled.delete(f),Le())},[f,l]),a.useEffect(()=>{const y=()=>w({});return document.addEventListener(me,y),()=>document.removeEventListener(me,y)},[]),R.jsx(W.div,{...m,ref:C,style:{pointerEvents:b?g?"auto":"none":void 0,...e.style},onFocusCapture:se(e.onFocusCapture,P.onFocusCapture),onBlurCapture:se(e.onBlurCapture,P.onBlurCapture),onPointerDownCapture:se(e.onPointerDownCapture,E.onPointerDownCapture)})});Dt.displayName=Nt;var Ft="DismissableLayerBranch",It=a.forwardRef((e,t)=>{const r=a.useContext(He),n=a.useRef(null),o=K(t,n);return a.useEffect(()=>{const s=n.current;if(s)return r.branches.add(s),()=>{r.branches.delete(s)}},[r.branches]),R.jsx(W.div,{...e,ref:o})});It.displayName=Ft;function Wt(e,t=globalThis==null?void 0:globalThis.document){const r=z(e),n=a.useRef(!1),o=a.useRef(()=>{});return a.useEffect(()=>{const s=i=>{if(i.target&&!n.current){let m=function(){$e(Tt,r,l,{discrete:!0})};const l={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=m,t.addEventListener("click",o.current,{once:!0})):m()}else t.removeEventListener("click",o.current);n.current=!1},u=window.setTimeout(()=>{t.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(u),t.removeEventListener("pointerdown",s),t.removeEventListener("click",o.current)}},[t,r]),{onPointerDownCapture:()=>n.current=!0}}function _t(e,t=globalThis==null?void 0:globalThis.document){const r=z(e),n=a.useRef(!1);return a.useEffect(()=>{const o=s=>{s.target&&!n.current&&$e(Mt,r,{originalEvent:s},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,r]),{onFocusCapture:()=>n.current=!0,onBlurCapture:()=>n.current=!1}}function Le(){const e=new CustomEvent(me);document.dispatchEvent(e)}function $e(e,t,r,{discrete:n}){const o=r.originalEvent.target,s=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:r});t&&o.addEventListener(e,t,{once:!0}),n?yt(o,s):o.dispatchEvent(s)}var ce=0;function sn(){a.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??ke()),document.body.insertAdjacentElement("beforeend",e[1]??ke()),ce++,()=>{ce===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),ce--}},[])}function ke(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var ue="focusScope.autoFocusOnMount",le="focusScope.autoFocusOnUnmount",Ne={bubbles:!1,cancelable:!0},Bt="FocusScope",jt=a.forwardRef((e,t)=>{const{loop:r=!1,trapped:n=!1,onMountAutoFocus:o,onUnmountAutoFocus:s,...u}=e,[i,m]=a.useState(null),l=z(o),f=z(s),v=a.useRef(null),h=K(t,c=>m(c)),w=a.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;a.useEffect(()=>{if(n){let c=function(b){if(w.paused||!i)return;const g=b.target;i.contains(g)?v.current=g:D(v.current,{select:!0})},d=function(b){if(w.paused||!i)return;const g=b.relatedTarget;g!==null&&(i.contains(g)||D(v.current,{select:!0}))},p=function(b){if(document.activeElement===document.body)for(const E of b)E.removedNodes.length>0&&D(i)};document.addEventListener("focusin",c),document.addEventListener("focusout",d);const S=new MutationObserver(p);return i&&S.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",c),document.removeEventListener("focusout",d),S.disconnect()}}},[n,i,w.paused]),a.useEffect(()=>{if(i){Me.add(w);const c=document.activeElement;if(!i.contains(c)){const p=new CustomEvent(ue,Ne);i.addEventListener(ue,l),i.dispatchEvent(p),p.defaultPrevented||(Ht(Xt(ze(i)),{select:!0}),document.activeElement===c&&D(i))}return()=>{i.removeEventListener(ue,l),setTimeout(()=>{const p=new CustomEvent(le,Ne);i.addEventListener(le,f),i.dispatchEvent(p),p.defaultPrevented||D(c??document.body,{select:!0}),i.removeEventListener(le,f),Me.remove(w)},0)}}},[i,l,f,w]);const C=a.useCallback(c=>{if(!r&&!n||w.paused)return;const d=c.key==="Tab"&&!c.altKey&&!c.ctrlKey&&!c.metaKey,p=document.activeElement;if(d&&p){const S=c.currentTarget,[b,g]=$t(S);b&&g?!c.shiftKey&&p===g?(c.preventDefault(),r&&D(b,{select:!0})):c.shiftKey&&p===b&&(c.preventDefault(),r&&D(g,{select:!0})):p===S&&c.preventDefault()}},[r,n,w.paused]);return R.jsx(W.div,{tabIndex:-1,...u,ref:h,onKeyDown:C})});jt.displayName=Bt;function Ht(e,{select:t=!1}={}){const r=document.activeElement;for(const n of e)if(D(n,{select:t}),document.activeElement!==r)return}function $t(e){const t=ze(e),r=Te(t,e),n=Te(t.reverse(),e);return[r,n]}function ze(e){const t=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:n=>{const o=n.tagName==="INPUT"&&n.type==="hidden";return n.disabled||n.hidden||o?NodeFilter.FILTER_SKIP:n.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;r.nextNode();)t.push(r.currentNode);return t}function Te(e,t){for(const r of e)if(!zt(r,{upTo:t}))return r}function zt(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Ut(e){return e instanceof HTMLInputElement&&"select"in e}function D(e,{select:t=!1}={}){if(e&&e.focus){const r=document.activeElement;e.focus({preventScroll:!0}),e!==r&&Ut(e)&&t&&e.select()}}var Me=Yt();function Yt(){let e=[];return{add(t){const r=e[0];t!==r&&(r==null||r.pause()),e=De(e,t),e.unshift(t)},remove(t){var r;e=De(e,t),(r=e[0])==null||r.resume()}}}function De(e,t){const r=[...e],n=r.indexOf(t);return n!==-1&&r.splice(n,1),r}function Xt(e){return e.filter(t=>t.tagName!=="A")}var te=typeof document<"u"?a.useLayoutEffect:a.useEffect;function ae(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let r,n,o;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(r=e.length,r!==t.length)return!1;for(n=r;n--!==0;)if(!ae(e[n],t[n]))return!1;return!0}if(o=Object.keys(e),r=o.length,r!==Object.keys(t).length)return!1;for(n=r;n--!==0;)if(!{}.hasOwnProperty.call(t,o[n]))return!1;for(n=r;n--!==0;){const s=o[n];if(!(s==="_owner"&&e.$$typeof)&&!ae(e[s],t[s]))return!1}return!0}return e!==e&&t!==t}function Ue(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Fe(e,t){const r=Ue(e);return Math.round(t*r)/r}function fe(e){const t=a.useRef(e);return te(()=>{t.current=e}),t}function Kt(e){e===void 0&&(e={});const{placement:t="bottom",strategy:r="absolute",middleware:n=[],platform:o,elements:{reference:s,floating:u}={},transform:i=!0,whileElementsMounted:m,open:l}=e,[f,v]=a.useState({x:0,y:0,strategy:r,placement:t,middlewareData:{},isPositioned:!1}),[h,w]=a.useState(n);ae(h,n)||w(n);const[C,c]=a.useState(null),[d,p]=a.useState(null),S=a.useCallback(x=>{x!==P.current&&(P.current=x,c(x))},[]),b=a.useCallback(x=>{x!==y.current&&(y.current=x,p(x))},[]),g=s||C,E=u||d,P=a.useRef(null),y=a.useRef(null),A=a.useRef(f),k=m!=null,N=fe(m),_=fe(o),V=fe(l),O=a.useCallback(()=>{if(!P.current||!y.current)return;const x={placement:t,strategy:r,middleware:h};_.current&&(x.platform=_.current),Et(P.current,y.current,x).then(I=>{const M={...I,isPositioned:V.current!==!1};U.current&&!ae(A.current,M)&&(A.current=M,Ot.flushSync(()=>{v(M)}))})},[h,t,r,_,V]);te(()=>{l===!1&&A.current.isPositioned&&(A.current.isPositioned=!1,v(x=>({...x,isPositioned:!1})))},[l]);const U=a.useRef(!1);te(()=>(U.current=!0,()=>{U.current=!1}),[]),te(()=>{if(g&&(P.current=g),E&&(y.current=E),g&&E){if(N.current)return N.current(g,E,O);O()}},[g,E,O,N,k]);const Y=a.useMemo(()=>({reference:P,floating:y,setReference:S,setFloating:b}),[S,b]),T=a.useMemo(()=>({reference:g,floating:E}),[g,E]),F=a.useMemo(()=>{const x={position:r,left:0,top:0};if(!T.floating)return x;const I=Fe(T.floating,f.x),M=Fe(T.floating,f.y);return i?{...x,transform:"translate("+I+"px, "+M+"px)",...Ue(T.floating)>=1.5&&{willChange:"transform"}}:{position:r,left:I,top:M}},[r,i,T.floating,f.x,f.y]);return a.useMemo(()=>({...f,update:O,refs:Y,elements:T,floatingStyles:F}),[f,O,Y,T,F])}const Vt=e=>{function t(r){return{}.hasOwnProperty.call(r,"current")}return{name:"arrow",options:e,fn(r){const{element:n,padding:o}=typeof e=="function"?e(r):e;return n&&t(n)?n.current!=null?Re({element:n.current,padding:o}).fn(r):{}:n?Re({element:n,padding:o}).fn(r):{}}}},Zt=(e,t)=>({...bt(e),options:[e,t]}),Gt=(e,t)=>({...St(e),options:[e,t]}),qt=(e,t)=>({...At(e),options:[e,t]}),Qt=(e,t)=>({...Ct(e),options:[e,t]}),Jt=(e,t)=>({...Pt(e),options:[e,t]}),er=(e,t)=>({...xt(e),options:[e,t]}),tr=(e,t)=>({...Vt(e),options:[e,t]});var rr="Arrow",Ye=a.forwardRef((e,t)=>{const{children:r,width:n=10,height:o=5,...s}=e;return R.jsx(W.svg,{...s,ref:t,width:n,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?r:R.jsx("polygon",{points:"0,0 30,0 15,10"})})});Ye.displayName=rr;var nr=Ye;function or(e){const[t,r]=a.useState(void 0);return oe(()=>{if(e){r({width:e.offsetWidth,height:e.offsetHeight});const n=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const s=o[0];let u,i;if("borderBoxSize"in s){const m=s.borderBoxSize,l=Array.isArray(m)?m[0]:m;u=l.inlineSize,i=l.blockSize}else u=e.offsetWidth,i=e.offsetHeight;r({width:u,height:i})});return n.observe(e,{box:"border-box"}),()=>n.unobserve(e)}else r(void 0)},[e]),t}var ye="Popper",[Xe,cn]=wt(ye),[ar,Ke]=Xe(ye),Ve=e=>{const{__scopePopper:t,children:r}=e,[n,o]=a.useState(null);return R.jsx(ar,{scope:t,anchor:n,onAnchorChange:o,children:r})};Ve.displayName=ye;var Ze="PopperAnchor",Ge=a.forwardRef((e,t)=>{const{__scopePopper:r,virtualRef:n,...o}=e,s=Ke(Ze,r),u=a.useRef(null),i=K(t,u);return a.useEffect(()=>{s.onAnchorChange((n==null?void 0:n.current)||u.current)}),n?null:R.jsx(W.div,{...o,ref:i})});Ge.displayName=Ze;var we="PopperContent",[ir,sr]=Xe(we),qe=a.forwardRef((e,t)=>{var Ee,be,Se,Ce,Pe,xe;const{__scopePopper:r,side:n="bottom",sideOffset:o=0,align:s="center",alignOffset:u=0,arrowPadding:i=0,avoidCollisions:m=!0,collisionBoundary:l=[],collisionPadding:f=0,sticky:v="partial",hideWhenDetached:h=!1,updatePositionStrategy:w="optimized",onPlaced:C,...c}=e,d=Ke(we,r),[p,S]=a.useState(null),b=K(t,X=>S(X)),[g,E]=a.useState(null),P=or(g),y=(P==null?void 0:P.width)??0,A=(P==null?void 0:P.height)??0,k=n+(s!=="center"?"-"+s:""),N=typeof f=="number"?f:{top:0,right:0,bottom:0,left:0,...f},_=Array.isArray(l)?l:[l],V=_.length>0,O={padding:N,boundary:_.filter(ur),altBoundary:V},{refs:U,floatingStyles:Y,placement:T,isPositioned:F,middlewareData:x}=Kt({strategy:"fixed",placement:k,whileElementsMounted:(...X)=>Rt(...X,{animationFrame:w==="always"}),elements:{reference:d.anchor},middleware:[Zt({mainAxis:o+A,alignmentAxis:u}),m&&Gt({mainAxis:!0,crossAxis:!1,limiter:v==="partial"?qt():void 0,...O}),m&&Qt({...O}),Jt({...O,apply:({elements:X,rects:Ae,availableWidth:ht,availableHeight:pt})=>{const{width:mt,height:gt}=Ae.reference,G=X.floating.style;G.setProperty("--radix-popper-available-width",`${ht}px`),G.setProperty("--radix-popper-available-height",`${pt}px`),G.setProperty("--radix-popper-anchor-width",`${mt}px`),G.setProperty("--radix-popper-anchor-height",`${gt}px`)}}),g&&tr({element:g,padding:i}),lr({arrowWidth:y,arrowHeight:A}),h&&er({strategy:"referenceHidden",...O})]}),[I,M]=et(T),Z=z(C);oe(()=>{F&&(Z==null||Z())},[F,Z]);const ut=(Ee=x.arrow)==null?void 0:Ee.x,lt=(be=x.arrow)==null?void 0:be.y,ft=((Se=x.arrow)==null?void 0:Se.centerOffset)!==0,[dt,vt]=a.useState();return oe(()=>{p&&vt(window.getComputedStyle(p).zIndex)},[p]),R.jsx("div",{ref:U.setFloating,"data-radix-popper-content-wrapper":"",style:{...Y,transform:F?Y.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:dt,"--radix-popper-transform-origin":[(Ce=x.transformOrigin)==null?void 0:Ce.x,(Pe=x.transformOrigin)==null?void 0:Pe.y].join(" "),...((xe=x.hide)==null?void 0:xe.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:R.jsx(ir,{scope:r,placedSide:I,onArrowChange:E,arrowX:ut,arrowY:lt,shouldHideArrow:ft,children:R.jsx(W.div,{"data-side":I,"data-align":M,...c,ref:b,style:{...c.style,animation:F?void 0:"none"}})})})});qe.displayName=we;var Qe="PopperArrow",cr={top:"bottom",right:"left",bottom:"top",left:"right"},Je=a.forwardRef(function(t,r){const{__scopePopper:n,...o}=t,s=sr(Qe,n),u=cr[s.placedSide];return R.jsx("span",{ref:s.onArrowChange,style:{position:"absolute",left:s.arrowX,top:s.arrowY,[u]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[s.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[s.placedSide],visibility:s.shouldHideArrow?"hidden":void 0},children:R.jsx(nr,{...o,ref:r,style:{...o.style,display:"block"}})})});Je.displayName=Qe;function ur(e){return e!==null}var lr=e=>({name:"transformOrigin",options:e,fn(t){var d,p,S;const{placement:r,rects:n,middlewareData:o}=t,u=((d=o.arrow)==null?void 0:d.centerOffset)!==0,i=u?0:e.arrowWidth,m=u?0:e.arrowHeight,[l,f]=et(r),v={start:"0%",center:"50%",end:"100%"}[f],h=(((p=o.arrow)==null?void 0:p.x)??0)+i/2,w=(((S=o.arrow)==null?void 0:S.y)??0)+m/2;let C="",c="";return l==="bottom"?(C=u?v:`${h}px`,c=`${-m}px`):l==="top"?(C=u?v:`${h}px`,c=`${n.floating.height+m}px`):l==="right"?(C=`${-m}px`,c=u?v:`${w}px`):l==="left"&&(C=`${n.floating.width+m}px`,c=u?v:`${w}px`),{data:{x:C,y:c}}}});function et(e){const[t,r="center"]=e.split("-");return[t,r]}var un=Ve,ln=Ge,fn=qe,dn=Je,fr="Portal",dr=a.forwardRef((e,t)=>{var i;const{container:r,...n}=e,[o,s]=a.useState(!1);oe(()=>s(!0),[]);const u=r||o&&((i=globalThis==null?void 0:globalThis.document)==null?void 0:i.body);return u?Lt.createPortal(R.jsx(W.div,{...n,ref:t}),u):null});dr.displayName=fr;var vr=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},B=new WeakMap,q=new WeakMap,Q={},de=0,tt=function(e){return e&&(e.host||tt(e.parentNode))},hr=function(e,t){return t.map(function(r){if(e.contains(r))return r;var n=tt(r);return n&&e.contains(n)?n:(console.error("aria-hidden",r,"in not contained inside",e,". Doing nothing"),null)}).filter(function(r){return!!r})},pr=function(e,t,r,n){var o=hr(t,Array.isArray(e)?e:[e]);Q[r]||(Q[r]=new WeakMap);var s=Q[r],u=[],i=new Set,m=new Set(o),l=function(v){!v||i.has(v)||(i.add(v),l(v.parentNode))};o.forEach(l);var f=function(v){!v||m.has(v)||Array.prototype.forEach.call(v.children,function(h){if(i.has(h))f(h);else try{var w=h.getAttribute(n),C=w!==null&&w!=="false",c=(B.get(h)||0)+1,d=(s.get(h)||0)+1;B.set(h,c),s.set(h,d),u.push(h),c===1&&C&&q.set(h,!0),d===1&&h.setAttribute(r,"true"),C||h.setAttribute(n,"true")}catch(p){console.error("aria-hidden: cannot operate on ",h,p)}})};return f(t),i.clear(),de++,function(){u.forEach(function(v){var h=B.get(v)-1,w=s.get(v)-1;B.set(v,h),s.set(v,w),h||(q.has(v)||v.removeAttribute(n),q.delete(v)),w||v.removeAttribute(r)}),de--,de||(B=new WeakMap,B=new WeakMap,q=new WeakMap,Q={})}},vn=function(e,t,r){r===void 0&&(r="data-aria-hidden");var n=Array.from(Array.isArray(e)?e:[e]),o=vr(e);return o?(n.push.apply(n,Array.from(o.querySelectorAll("[aria-live]"))),pr(n,o,r,"aria-hidden")):function(){return null}},L=function(){return L=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},L.apply(this,arguments)};function rt(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r}function mr(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var re="right-scroll-bar-position",ne="width-before-scroll-bar",gr="with-scroll-bars-hidden",yr="--removed-body-scroll-bar-size";function ve(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function wr(e,t){var r=a.useState(function(){return{value:e,callback:t,facade:{get current(){return r.value},set current(n){var o=r.value;o!==n&&(r.value=n,r.callback(n,o))}}}})[0];return r.callback=t,r.facade}var Er=typeof window<"u"?a.useLayoutEffect:a.useEffect,Ie=new WeakMap;function br(e,t){var r=wr(null,function(n){return e.forEach(function(o){return ve(o,n)})});return Er(function(){var n=Ie.get(r);if(n){var o=new Set(n),s=new Set(e),u=r.current;o.forEach(function(i){s.has(i)||ve(i,null)}),s.forEach(function(i){o.has(i)||ve(i,u)})}Ie.set(r,e)},[e]),r}function Sr(e){return e}function Cr(e,t){t===void 0&&(t=Sr);var r=[],n=!1,o={read:function(){if(n)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return r.length?r[r.length-1]:e},useMedium:function(s){var u=t(s,n);return r.push(u),function(){r=r.filter(function(i){return i!==u})}},assignSyncMedium:function(s){for(n=!0;r.length;){var u=r;r=[],u.forEach(s)}r={push:function(i){return s(i)},filter:function(){return r}}},assignMedium:function(s){n=!0;var u=[];if(r.length){var i=r;r=[],i.forEach(s),u=r}var m=function(){var f=u;u=[],f.forEach(s)},l=function(){return Promise.resolve().then(m)};l(),r={push:function(f){u.push(f),l()},filter:function(f){return u=u.filter(f),r}}}};return o}function Pr(e){e===void 0&&(e={});var t=Cr(null);return t.options=L({async:!0,ssr:!1},e),t}var nt=function(e){var t=e.sideCar,r=rt(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var n=t.read();if(!n)throw new Error("Sidecar medium not found");return a.createElement(n,L({},r))};nt.isSideCarExport=!0;function xr(e,t){return e.useMedium(t),nt}var ot=Pr(),he=function(){},ie=a.forwardRef(function(e,t){var r=a.useRef(null),n=a.useState({onScrollCapture:he,onWheelCapture:he,onTouchMoveCapture:he}),o=n[0],s=n[1],u=e.forwardProps,i=e.children,m=e.className,l=e.removeScrollBar,f=e.enabled,v=e.shards,h=e.sideCar,w=e.noIsolation,C=e.inert,c=e.allowPinchZoom,d=e.as,p=d===void 0?"div":d,S=e.gapMode,b=rt(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),g=h,E=br([r,t]),P=L(L({},b),o);return a.createElement(a.Fragment,null,f&&a.createElement(g,{sideCar:ot,removeScrollBar:l,shards:v,noIsolation:w,inert:C,setCallbacks:s,allowPinchZoom:!!c,lockRef:r,gapMode:S}),u?a.cloneElement(a.Children.only(i),L(L({},P),{ref:E})):a.createElement(p,L({},P,{className:m,ref:E}),i))});ie.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};ie.classNames={fullWidth:ne,zeroRight:re};var Ar=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function Rr(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Ar();return t&&e.setAttribute("nonce",t),e}function Or(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Lr(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var kr=function(){var e=0,t=null;return{add:function(r){e==0&&(t=Rr())&&(Or(t,r),Lr(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Nr=function(){var e=kr();return function(t,r){a.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&r])}},at=function(){var e=Nr(),t=function(r){var n=r.styles,o=r.dynamic;return e(n,o),null};return t},Tr={left:0,top:0,right:0,gap:0},pe=function(e){return parseInt(e||"",10)||0},Mr=function(e){var t=window.getComputedStyle(document.body),r=t[e==="padding"?"paddingLeft":"marginLeft"],n=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[pe(r),pe(n),pe(o)]},Dr=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Tr;var t=Mr(e),r=document.documentElement.clientWidth,n=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,n-r+t[2]-t[0])}},Fr=at(),$="data-scroll-locked",Ir=function(e,t,r,n){var o=e.left,s=e.top,u=e.right,i=e.gap;return r===void 0&&(r="margin"),`
  .`.concat(gr,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(i,"px ").concat(n,`;
  }
  body[`).concat($,`] {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(n,";"),r==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(s,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(n,`;
    `),r==="padding"&&"padding-right: ".concat(i,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(re,` {
    right: `).concat(i,"px ").concat(n,`;
  }
  
  .`).concat(ne,` {
    margin-right: `).concat(i,"px ").concat(n,`;
  }
  
  .`).concat(re," .").concat(re,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(ne," .").concat(ne,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body[`).concat($,`] {
    `).concat(yr,": ").concat(i,`px;
  }
`)},We=function(){var e=parseInt(document.body.getAttribute($)||"0",10);return isFinite(e)?e:0},Wr=function(){a.useEffect(function(){return document.body.setAttribute($,(We()+1).toString()),function(){var e=We()-1;e<=0?document.body.removeAttribute($):document.body.setAttribute($,e.toString())}},[])},_r=function(e){var t=e.noRelative,r=e.noImportant,n=e.gapMode,o=n===void 0?"margin":n;Wr();var s=a.useMemo(function(){return Dr(o)},[o]);return a.createElement(Fr,{styles:Ir(s,!t,o,r?"":"!important")})},ge=!1;if(typeof window<"u")try{var J=Object.defineProperty({},"passive",{get:function(){return ge=!0,!0}});window.addEventListener("test",J,J),window.removeEventListener("test",J,J)}catch{ge=!1}var j=ge?{passive:!1}:!1,Br=function(e){return e.tagName==="TEXTAREA"},it=function(e,t){var r=window.getComputedStyle(e);return r[t]!=="hidden"&&!(r.overflowY===r.overflowX&&!Br(e)&&r[t]==="visible")},jr=function(e){return it(e,"overflowY")},Hr=function(e){return it(e,"overflowX")},_e=function(e,t){var r=t.ownerDocument,n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var o=st(e,n);if(o){var s=ct(e,n),u=s[1],i=s[2];if(u>i)return!0}n=n.parentNode}while(n&&n!==r.body);return!1},$r=function(e){var t=e.scrollTop,r=e.scrollHeight,n=e.clientHeight;return[t,r,n]},zr=function(e){var t=e.scrollLeft,r=e.scrollWidth,n=e.clientWidth;return[t,r,n]},st=function(e,t){return e==="v"?jr(t):Hr(t)},ct=function(e,t){return e==="v"?$r(t):zr(t)},Ur=function(e,t){return e==="h"&&t==="rtl"?-1:1},Yr=function(e,t,r,n,o){var s=Ur(e,window.getComputedStyle(t).direction),u=s*n,i=r.target,m=t.contains(i),l=!1,f=u>0,v=0,h=0;do{var w=ct(e,i),C=w[0],c=w[1],d=w[2],p=c-d-s*C;(C||p)&&st(e,i)&&(v+=p,h+=C),i instanceof ShadowRoot?i=i.host:i=i.parentNode}while(!m&&i!==document.body||m&&(t.contains(i)||t===i));return(f&&(Math.abs(v)<1||!o)||!f&&(Math.abs(h)<1||!o))&&(l=!0),l},ee=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Be=function(e){return[e.deltaX,e.deltaY]},je=function(e){return e&&"current"in e?e.current:e},Xr=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Kr=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Vr=0,H=[];function Zr(e){var t=a.useRef([]),r=a.useRef([0,0]),n=a.useRef(),o=a.useState(Vr++)[0],s=a.useState(at)[0],u=a.useRef(e);a.useEffect(function(){u.current=e},[e]),a.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var c=mr([e.lockRef.current],(e.shards||[]).map(je),!0).filter(Boolean);return c.forEach(function(d){return d.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),c.forEach(function(d){return d.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var i=a.useCallback(function(c,d){if("touches"in c&&c.touches.length===2)return!u.current.allowPinchZoom;var p=ee(c),S=r.current,b="deltaX"in c?c.deltaX:S[0]-p[0],g="deltaY"in c?c.deltaY:S[1]-p[1],E,P=c.target,y=Math.abs(b)>Math.abs(g)?"h":"v";if("touches"in c&&y==="h"&&P.type==="range")return!1;var A=_e(y,P);if(!A)return!0;if(A?E=y:(E=y==="v"?"h":"v",A=_e(y,P)),!A)return!1;if(!n.current&&"changedTouches"in c&&(b||g)&&(n.current=E),!E)return!0;var k=n.current||E;return Yr(k,d,c,k==="h"?b:g,!0)},[]),m=a.useCallback(function(c){var d=c;if(!(!H.length||H[H.length-1]!==s)){var p="deltaY"in d?Be(d):ee(d),S=t.current.filter(function(E){return E.name===d.type&&(E.target===d.target||d.target===E.shadowParent)&&Xr(E.delta,p)})[0];if(S&&S.should){d.cancelable&&d.preventDefault();return}if(!S){var b=(u.current.shards||[]).map(je).filter(Boolean).filter(function(E){return E.contains(d.target)}),g=b.length>0?i(d,b[0]):!u.current.noIsolation;g&&d.cancelable&&d.preventDefault()}}},[]),l=a.useCallback(function(c,d,p,S){var b={name:c,delta:d,target:p,should:S,shadowParent:Gr(p)};t.current.push(b),setTimeout(function(){t.current=t.current.filter(function(g){return g!==b})},1)},[]),f=a.useCallback(function(c){r.current=ee(c),n.current=void 0},[]),v=a.useCallback(function(c){l(c.type,Be(c),c.target,i(c,e.lockRef.current))},[]),h=a.useCallback(function(c){l(c.type,ee(c),c.target,i(c,e.lockRef.current))},[]);a.useEffect(function(){return H.push(s),e.setCallbacks({onScrollCapture:v,onWheelCapture:v,onTouchMoveCapture:h}),document.addEventListener("wheel",m,j),document.addEventListener("touchmove",m,j),document.addEventListener("touchstart",f,j),function(){H=H.filter(function(c){return c!==s}),document.removeEventListener("wheel",m,j),document.removeEventListener("touchmove",m,j),document.removeEventListener("touchstart",f,j)}},[]);var w=e.removeScrollBar,C=e.inert;return a.createElement(a.Fragment,null,C?a.createElement(s,{styles:Kr(o)}):null,w?a.createElement(_r,{gapMode:e.gapMode}):null)}function Gr(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const qr=xr(ot,Zr);var Qr=a.forwardRef(function(e,t){return a.createElement(ie,L({},e,{ref:t,sideCar:qr}))});Qr.classNames=ie.classNames;export{ln as A,fn as C,Dt as D,jt as F,dr as P,Qr as R,dn as a,un as b,cn as c,vn as h,sn as u};
