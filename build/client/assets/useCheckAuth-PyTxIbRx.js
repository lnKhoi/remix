import{r}from"./jsx-runtime-CHwbkWbZ.js";import{g as n}from"./auth-CWqnw3Po.js";import{u as c}from"./auth.context-CHxM0nCf.js";import{u,a as i}from"./index-Fe4a85aj.js";const h=()=>{const t=u(),{updateUserInfo:a}=c(),s=i(),e=async()=>{try{const o=await n();a(o.data),s.pathname==="/"&&t("/manager/dashboard")}catch{a(null),t("/login")}};r.useEffect(()=>{e()},[])};export{h as u};
