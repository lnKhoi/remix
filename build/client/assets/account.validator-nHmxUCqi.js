import{d as a}from"./messages.constant-CuOiyucR.js";const t=()=>a().min(8,"Password must be at least 8 characters long").max(20,"Password must be at most 20 characters long").matches(/[A-Z]/,"Password must contain at least one uppercase letter").matches(/[0-9]/,"Password must contain at least one number").matches(/[@$!%*?&]/,"Password must contain at least one special character").required("Password is required");export{t as c};
