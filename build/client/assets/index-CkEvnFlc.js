import{r as n,$ as i}from"./jsx-runtime-BEJf7xDi.js";import{b as C,u as l}from"./index-rbnsDBgO.js";function k(t,s,{checkForDefaultPrevented:c=!0}={}){return function(o){if(t==null||t(o),c===!1||!o.defaultPrevented)return s==null?void 0:s(o)}}var b=i.useId||(()=>{}),h=0;function y(t){const[s,c]=n.useState(b());return C(()=>{t||c(e=>e??String(h++))},[t]),t||(s?`radix-${s}`:"")}function I({prop:t,defaultProp:s,onChange:c=()=>{}}){const[e,o]=R({defaultProp:s,onChange:c}),u=t!==void 0,d=u?t:e,a=l(c),S=n.useCallback(f=>{if(u){const r=typeof f=="function"?f(t):f;r!==t&&a(r)}else o(f)},[u,t,o,a]);return[d,S]}function R({defaultProp:t,onChange:s}){const c=n.useState(t),[e]=c,o=n.useRef(e),u=l(s);return n.useEffect(()=>{o.current!==e&&(u(e),o.current=e)},[e,o,u]),c}export{y as a,k as c,I as u};
