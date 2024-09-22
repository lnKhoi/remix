import{r as t,j as a}from"./jsx-runtime-BEJf7xDi.js";import{Q as L,B as $}from"./react-toastify.esm-Cjr834P9.js";import{v as A}from"./auth-CdFHSnW-.js";import{L as F}from"./login-banner-CF0bpVHV.js";import{L as B}from"./logo-DszzMTaQ.js";import{b as M,u as K,a as z}from"./index-Dt0pqFoG.js";import"./clsx-B-dksMZM.js";function Q(l){const e=t.useRef();return t.useEffect(()=>{e.current=l},[l]),e.current}const W=l=>{const{focus:e,autoFocus:u,className:c,...f}=l,r=t.useRef(null),m=Q(!!e);return t.useLayoutEffect(()=>{r.current&&(e&&u&&r.current.focus(),e&&u&&e!==m&&(r.current.focus(),r.current.select()))},[u,e,m]),a.jsx("input",{className:`no-spin text-center border-y text-3xl font-medium bg-transparent border-l 
  w-[73.333px] h-[94px] 
  focus:outline-none focus:border-blue border-gray-400 focus:border ${c}`,ref:r,...f})},_=t.memo(W),q=l=>{const{length:e,isNumberInput:u,autoFocus:c,disabled:f,value:r,onChange:m,inputClassName:h,otpClassName:k,...N}=l,[o,x]=t.useState(0),[i,g]=t.useState(Array(e).fill(""));t.useEffect(()=>{r===""&&(g(Array(e).fill("")),x(0))},[r,e]);const p=t.useCallback(n=>{const s=n.join("");m(s)},[m]),b=t.useCallback(n=>{const s=n;return!u||!s||Number(s)>=0?s:""},[u]),C=t.useCallback(n=>{const s=[...i];s[o]=n[0]||"",g(s),p(s)},[o,p,i]),d=t.useCallback(n=>{const s=Math.max(Math.min(e-1,n),0);x(s)},[e]),y=t.useCallback(()=>{d(o-1)},[o,d]),v=t.useCallback(()=>{d(o+1)},[o,d]),j=t.useCallback(n=>()=>{d(n)},[d]),S=t.useCallback(n=>{const s=b(n.currentTarget.value);if(!s){n.preventDefault();return}C(s),v()},[C,v,b]),D=t.useCallback(()=>{x(-1)},[]),E=t.useCallback(n=>{switch(n.key){case"Backspace":case"Delete":{n.preventDefault(),i[o]?C(""):y();break}case"ArrowLeft":{n.preventDefault(),y();break}case"ArrowRight":{n.preventDefault(),v();break}}},[o,C,v,y,i]),R=t.useCallback(n=>{n.preventDefault();const s=n.clipboardData.getData("text/plain").trim().slice(0,e-o).split("");if(s){let P=0;const w=[...i];w.forEach((T,I)=>{if(I>=o){const O=b(s.shift()||T);O&&(w[I]=O,P=I)}}),g(w),p(w),x(Math.min(P+1,e-1))}},[o,b,e,i,p]);return a.jsx("div",{className:"bg-gray-500 w-fit border-none flex overflow-hidden justify-start rounded-lg",...N,children:Array(e).fill("").map((n,s)=>a.jsx(_,{type:N.type,focus:o===s,value:i&&i[s],autoFocus:c,onFocus:j(s),onChange:S,onKeyDown:E,onBlur:D,onPaste:R,disabled:f,className:` ${s===0?"rounded-s-lg border-l":s===e-1?"rounded-e-lg border-r":""} ${h}`},`SingleInput-${s}`))})},G=t.memo(q);function H(){return a.jsxs("svg",{className:"animate-spin h-5 w-5 mr-2 text-black",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[a.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),a.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"})]})}const V=l=>{const[e,u]=t.useState(l),[c,f]=t.useState(!1);t.useEffect(()=>{let h;return c&&(h=setInterval(()=>{e>0?u(e-1):f(!1)},1e3)),()=>{clearInterval(h)}},[c,e]);const r=()=>{f(!0)},m=()=>{f(!1),u(l)};return{time:`${Math.floor(e/60)}:${(e%60).toString().padStart(2,"0")}`,isRunning:c,startCountdown:r,resetCountdown:m}},se=()=>[{title:"Spiral - Verify OTP"}];function ae(){var y;const{id:l}=M(),e=K(),u=z(),[c,f]=t.useState(""),[r,m]=t.useState(""),[h,k]=t.useState(!1),{time:N,startCountdown:o,resetCountdown:x}=V(600),{time:i,startCountdown:g,isRunning:p,resetCountdown:b}=V(60),C=()=>{b(),x(),o(),g()},d=async()=>{k(!0),await A({userId:l,otp:c}).then(()=>{$.success("Verify successfully!"),setTimeout(()=>u("/login"),1e3)}).finally(()=>k(!1)).catch(j=>{m(j==null?void 0:j.message)})};return t.useEffect(()=>{o(),g()},[]),t.useEffect(()=>{c.length===6&&d()},[c]),a.jsxs("div",{className:"flex h-[100vh] w-full items-center justify-between",children:[a.jsx(L,{}),a.jsxs("div",{className:"flex min-h-full w-1/2 flex-col items-center justify-center",children:[a.jsx("img",{src:B,alt:"logo",className:"mb-[30px] h-[45px] object-contain"}),a.jsx("h1",{className:"mb-2 text-3xl font-bold text-black",children:"Email Verification "}),a.jsx("p",{className:"mt-2 text-sm text-gray-700",children:"A Verification code has been sent to"}),a.jsx("span",{className:"text-gray-700 font-bold text-sm mt-1",children:(y=e==null?void 0:e.state)==null?void 0:y.email}),a.jsxs("div",{className:"mt-8 text-sm text-gray-800",children:["OTP Expire: ",N]}),a.jsx(G,{className:"otpContainer mt-[30px]",inputClassName:"otpInput",length:6,value:c,onChange:f}),r&&a.jsx("span",{className:"mt-2 text-red-500 text-sm",children:r}),h&&a.jsxs("div",{className:"flex items-center mt-2 gap-1",children:[a.jsx(H,{}),a.jsx("p",{className:"text-gray-800",children:"Check your code"})]}),a.jsxs("div",{className:"flex items-center mt-[30px] gap-2",children:[a.jsx("p",{className:" text-gray-800 text-sm",children:"Didn’t receive the code?"}),a.jsxs("span",{onClick:()=>p?null:C(),className:`text-blue-600 text-sm font-bold  ${p?"cursor-not-allowed":"cursor-pointer"}`,children:["Resend code ",i]})]})]}),a.jsx("div",{className:"h-full w-1/2",children:a.jsx("img",{src:F,alt:"banner",className:"h-full w-full object-cover"})})]})}export{ae as default,se as meta};
