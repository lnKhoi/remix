import{j as e}from"./jsx-runtime-BEJf7xDi.js";import{c as o}from"./clsx-B-dksMZM.js";import{t as i}from"./bundle-mjs-BOZU2X2x.js";import{g as c,i as m}from"./index-Dt0pqFoG.js";import{L as d}from"./components-CF6Lyjm6.js";function x(...s){return i(o(s))}const h="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!--%20This%20file%20is%20generated%20by%20npm%20run%20build:icons%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='0'%20height='0'%3e%3cdefs%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='exclamation-circle'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m9-.75a9%209%200%201%201-18%200%209%209%200%200%201%2018%200Zm-9%203.75h.008v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='exclamation-triangle'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m-9.303%203.376c-.866%201.5.217%203.374%201.948%203.374h14.71c1.73%200%202.813-1.874%201.948-3.374L13.949%203.378c-.866-1.5-3.032-1.5-3.898%200L2.697%2016.126ZM12%2015.75h.007v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='magnifying-glass'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='m21%2021-5.197-5.197m0%200A7.5%207.5%200%201%200%205.196%205.196a7.5%207.5%200%200%200%2010.607%2010.607Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='minus-circle'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m-9.303%203.376c-.866%201.5.217%203.374%201.948%203.374h14.71c1.73%200%202.813-1.874%201.948-3.374L13.949%203.378c-.866-1.5-3.032-1.5-3.898%200L2.697%2016.126ZM12%2015.75h.007v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='shield-exclamation'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m0-10.036A11.959%2011.959%200%200%201%203.598%206%2011.99%2011.99%200%200%200%203%209.75c0%205.592%203.824%2010.29%209%2011.622%205.176-1.332%209-6.03%209-11.622%200-1.31-.21-2.57-.598-3.75h-.152c-3.196%200-6.1-1.25-8.25-3.286Zm0%2013.036h.008v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3c/defs%3e%3c/svg%3e",u={font:"w-[1em] h-[1em]",xs:"w-3 h-3",sm:"w-4 h-4",md:"w-5 h-5",lg:"w-6 h-6",xl:"w-7 h-7"},p={font:"gap-1.5",xs:"gap-1.5",sm:"gap-1.5",md:"gap-2",lg:"gap-2",xl:"gap-3"};function t({name:s,size:r="font",className:n,children:l,...a}){return l?e.jsxs("span",{className:`inline-flex items-center ${p[r]}`,children:[e.jsx(t,{name:s,size:r,className:n,...a}),l]}):e.jsx("svg",{...a,className:x(u[r],"inline self-center",n),children:e.jsx("use",{href:`${h}#${s}`})})}function E(){const s=c();if(m(s))return e.jsx(g,{caught:s});const{message:r,stack:n}=s;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"m-2 rounded bg-red-100 p-4",children:[e.jsxs("h1",{className:"font-bolder mb-1 inline-flex items-center gap-4 text-2xl text-red-900",children:[e.jsx(t,{name:"exclamation-circle",className:"h-8 w-8"}),r||"App Error"]}),e.jsx("p",{className:"mb-1 text-lg",children:"An error has occurred processing your request. You may try again or contact support if the problem persists."})]}),n&&e.jsxs("div",{className:"my-4 w-[95%] bg-white p-4 text-black",children:[e.jsx("pre",{className:"max-w-full overflow-auto ",children:n}),e.jsx("p",{className:"mt-4 italic text-red-500",children:"Stack trace only displayed in DEVELOPMENT"})]})]})}function g({caught:s}){let r,n={};switch(typeof s.data=="string"?r=s.data:(n=s.data,r=n.message),s.status){case 400:return e.jsx(w,{message:r,data:n});case 401:return e.jsx(f,{message:r,data:n});case 403:return e.jsx(b,{message:r,data:n});case 404:return e.jsx(v,{message:r,data:n});case 405:return e.jsx(j,{message:r,data:n});default:throw new Error(`Unexpected caught response with status: ${s.status} ${s.data}}`)}}function f({message:s,data:r}){return e.jsxs("div",{className:"m-2 rounded bg-purple-100 p-4",children:[e.jsxs("h1",{className:"font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-purple-900",children:[e.jsx(t,{name:"minus-circle",className:"h-8 w-8"}),s||"Unauthorized"]}),e.jsxs("p",{className:"mb-1 text-lg",children:["You must be logged into access this page. Click"," ",e.jsx(d,{to:"/login",children:"here"})," to login."]})]})}function w({message:s,data:r}){return e.jsxs("div",{className:"m-2 rounded bg-yellow-100 p-4",children:[e.jsxs("h1",{className:"font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-red-900",children:[e.jsx(t,{name:"exclamation-triangle",className:"h-8 w-8"}),s||"Bad Request"]}),e.jsx("p",{className:"mb-1 text-lg",children:"You made an invalid request. The following errors have occurred."}),(r==null?void 0:r.errors)&&e.jsx("ul",{className:"ml-4 list-disc",children:r.errors.map((n,l)=>e.jsx("li",{children:n},l))})]})}function j({message:s,data:r}){return e.jsxs("div",{className:"m-2 rounded bg-yellow-100 p-4",children:[e.jsxs("h1",{className:"font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-red-900",children:[e.jsx(t,{name:"exclamation-triangle",className:"h-8 w-8"}),s||"Invalid"]}),e.jsx("p",{className:"mb-1 text-lg",children:"You made an invalid request."})]})}function b({message:s,data:r}){return e.jsxs("div",{className:"m-2 rounded bg-orange-100 p-4",children:[e.jsxs("h1",{className:"font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-orange-900",children:[e.jsx(t,{name:"shield-exclamation",className:"h-8 w-8"}),s||"Not Authorized"]}),e.jsx("p",{className:"mb-1 text-lg",children:"You are not authorized to access this page."})]})}function v({message:s,data:r}){return e.jsxs("div",{className:"m-2 rounded bg-blue-100 p-4",children:[e.jsxs("h1",{className:"font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-blue-900",children:[e.jsx(t,{name:"magnifying-glass",className:"h-8 w-8"}),s||"Not Found"]}),e.jsx("p",{className:"mb-1 text-lg",children:"The page you were looking for could not be found."})]})}export{E as D,h as i};
