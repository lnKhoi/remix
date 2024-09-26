import{r as l,j as c}from"./jsx-runtime-CHwbkWbZ.js";import{c as p}from"./index-BpNdDISV.js";import{u as F,a as $,c as g,P as D}from"./index-Cd5qH5R9.js";import{c as V}from"./index-CK9DHiHK.js";import{c as y,u as G,R as k,I as L}from"./index-BXYUa_hh.js";import{P as m}from"./index-6o9Yse_D.js";var T="Tabs",[K,Z]=V(T,[y]),h=y(),[B,x]=K(T),N=l.forwardRef((e,t)=>{const{__scopeTabs:a,value:o,onValueChange:r,defaultValue:d,orientation:n="horizontal",dir:u,activationMode:v="automatic",...b}=e,i=G(u),[s,f]=F({prop:o,onChange:r,defaultProp:d});return c.jsx(B,{scope:a,baseId:$(),value:s,onValueChange:f,orientation:n,dir:i,activationMode:v,children:c.jsx(m.div,{dir:i,"data-orientation":n,...b,ref:t})})});N.displayName=T;var C="TabsList",I=l.forwardRef((e,t)=>{const{__scopeTabs:a,loop:o=!0,...r}=e,d=x(C,a),n=h(a);return c.jsx(k,{asChild:!0,...n,orientation:d.orientation,dir:d.dir,loop:o,children:c.jsx(m.div,{role:"tablist","aria-orientation":d.orientation,...r,ref:t})})});I.displayName=C;var R="TabsTrigger",j=l.forwardRef((e,t)=>{const{__scopeTabs:a,value:o,disabled:r=!1,...d}=e,n=x(R,a),u=h(a),v=A(n.baseId,o),b=P(n.baseId,o),i=o===n.value;return c.jsx(L,{asChild:!0,...u,focusable:!r,active:i,children:c.jsx(m.button,{type:"button",role:"tab","aria-selected":i,"aria-controls":b,"data-state":i?"active":"inactive","data-disabled":r?"":void 0,disabled:r,id:v,...d,ref:t,onMouseDown:g(e.onMouseDown,s=>{!r&&s.button===0&&s.ctrlKey===!1?n.onValueChange(o):s.preventDefault()}),onKeyDown:g(e.onKeyDown,s=>{[" ","Enter"].includes(s.key)&&n.onValueChange(o)}),onFocus:g(e.onFocus,()=>{const s=n.activationMode!=="manual";!i&&!r&&s&&n.onValueChange(o)})})})});j.displayName=R;var w="TabsContent",_=l.forwardRef((e,t)=>{const{__scopeTabs:a,value:o,forceMount:r,children:d,...n}=e,u=x(w,a),v=A(u.baseId,o),b=P(u.baseId,o),i=o===u.value,s=l.useRef(i);return l.useEffect(()=>{const f=requestAnimationFrame(()=>s.current=!1);return()=>cancelAnimationFrame(f)},[]),c.jsx(D,{present:r||i,children:({present:f})=>c.jsx(m.div,{"data-state":i?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":v,hidden:!f,id:b,tabIndex:0,...n,ref:t,style:{...e.style,animationDuration:s.current?"0s":void 0},children:f&&d})})});_.displayName=w;function A(e,t){return`${e}-trigger-${t}`}function P(e,t){return`${e}-content-${t}`}var q=N,E=I,S=j,M=_;const ee=q,z=l.forwardRef(({className:e,...t},a)=>c.jsx(E,{ref:a,className:p("inline-flex  items-center bg-gray-100 justify-center rounded-lg  p-1 ",e),...t}));z.displayName=E.displayName;const H=l.forwardRef(({className:e,...t},a)=>c.jsx(S,{ref:a,className:p("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-800 text-gray-500 data-[state=active]:shadow h-8",e),...t}));H.displayName=S.displayName;const O=l.forwardRef(({className:e,...t},a)=>c.jsx(M,{ref:a,className:p("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e),...t}));O.displayName=M.displayName;export{ee as T};
