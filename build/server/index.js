import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json, redirect } from "@remix-run/node";
import { RemixServer, useRouteError, isRouteErrorResponse, Link, useNavigate, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts, useParams, useLocation, Form as Form$2 } from "@remix-run/react";
import { isbot } from "isbot";
import { createThemeSessionResolver, ThemeProvider } from "remix-themes";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import React__default, { createContext, useState, useContext, useEffect, forwardRef, useRef, memo, useLayoutEffect, useCallback, Suspense, useMemo } from "react";
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Checkbox, Layout as Layout$2, Badge as Badge$1, Menu, Avatar as Avatar$1, Form as Form$1, Breadcrumb as Breadcrumb$1, Input as Input$1, InputNumber, DatePicker, Select as Select$1, Radio, Button as Button$1, Dropdown, Modal, Table as Table$1 } from "antd";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Select from "react-select";
import { useNavigate as useNavigate$1, useLocation as useLocation$1 } from "react-router-dom";
import { HomeIcon, FireIcon, UserIcon, DocumentChartBarIcon, ArchiveBoxIcon, ChartBarIcon, ArrowLeftEndOnRectangleIcon, UserPlusIcon, EyeIcon as EyeIcon$1, PencilSquareIcon, TrashIcon, BellIcon, CheckIcon, EllipsisHorizontalIcon, CalendarDaysIcon, MagnifyingGlassIcon, PlusIcon, ChevronUpDownIcon, AdjustmentsHorizontalIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ChevronRightIcon, CheckIcon as CheckIcon$1, DotFilledIcon, ChevronLeftIcon, CalendarIcon } from "@radix-ui/react-icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as RechartsPrimitive from "recharts";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, CartesianGrid, XAxis, Line, BarChart, Bar } from "recharts";
import { TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") ?? "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}
const iconsHref = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!--%20This%20file%20is%20generated%20by%20npm%20run%20build:icons%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='0'%20height='0'%3e%3cdefs%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='exclamation-circle'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m9-.75a9%209%200%201%201-18%200%209%209%200%200%201%2018%200Zm-9%203.75h.008v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='exclamation-triangle'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m-9.303%203.376c-.866%201.5.217%203.374%201.948%203.374h14.71c1.73%200%202.813-1.874%201.948-3.374L13.949%203.378c-.866-1.5-3.032-1.5-3.898%200L2.697%2016.126ZM12%2015.75h.007v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='magnifying-glass'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='m21%2021-5.197-5.197m0%200A7.5%207.5%200%201%200%205.196%205.196a7.5%207.5%200%200%200%2010.607%2010.607Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='minus-circle'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m-9.303%203.376c-.866%201.5.217%203.374%201.948%203.374h14.71c1.73%200%202.813-1.874%201.948-3.374L13.949%203.378c-.866-1.5-3.032-1.5-3.898%200L2.697%2016.126ZM12%2015.75h.007v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3csymbol%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='currentColor'%20class='w-6%20h-6'%20id='shield-exclamation'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m0-10.036A11.959%2011.959%200%200%201%203.598%206%2011.99%2011.99%200%200%200%203%209.75c0%205.592%203.824%2010.29%209%2011.622%205.176-1.332%209-6.03%209-11.622%200-1.31-.21-2.57-.598-3.75h-.152c-3.196%200-6.1-1.25-8.25-3.286Zm0%2013.036h.008v.008H12v-.008Z'%20%3e%3c/path%3e%3c/symbol%3e%3c/defs%3e%3c/svg%3e";
const sizeClassName = {
  font: "w-[1em] h-[1em]",
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7"
};
const childrenSizeClassName = {
  font: "gap-1.5",
  xs: "gap-1.5",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2",
  xl: "gap-3"
};
function Icon({
  name,
  size = "font",
  className,
  children,
  ...props
}) {
  if (children) {
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: `inline-flex items-center ${childrenSizeClassName[size]}`,
        children: [
          /* @__PURE__ */ jsx(Icon, { name, size, className, ...props }),
          children
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      className: cn$1(sizeClassName[size], "inline self-center", className),
      children: /* @__PURE__ */ jsx("use", { href: `${iconsHref}#${name}` })
    }
  );
}
function DefaultErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsx(CatchBoundary, { caught: error });
  }
  const { message, stack } = error;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-red-100 p-4", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-4 text-2xl text-red-900", children: [
        /* @__PURE__ */ jsx(Icon, { name: "exclamation-circle", className: "h-8 w-8" }),
        message || "App Error"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "An error has occurred processing your request. You may try again or contact support if the problem persists." })
    ] }),
    stack && /* @__PURE__ */ jsxs("div", { className: "my-4 w-[95%] bg-white p-4 text-black", children: [
      /* @__PURE__ */ jsx("pre", { className: "max-w-full overflow-auto ", children: stack }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 italic text-red-500", children: "Stack trace only displayed in DEVELOPMENT" })
    ] })
  ] });
}
function CatchBoundary({ caught }) {
  let message;
  let data2 = {};
  if (typeof caught.data === "string") {
    message = caught.data;
  } else {
    data2 = caught.data;
    message = data2.message;
  }
  switch (caught.status) {
    case 400:
      return /* @__PURE__ */ jsx(BadRequest, { message, data: data2 });
    case 401:
      return /* @__PURE__ */ jsx(Unauthorized, { message, data: data2 });
    case 403:
      return /* @__PURE__ */ jsx(Forbidden, { message, data: data2 });
    case 404:
      return /* @__PURE__ */ jsx(NotFound, { message, data: data2 });
    case 405:
      return /* @__PURE__ */ jsx(Invalid, { message, data: data2 });
    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status} ${caught.data}}`
      );
  }
}
function Unauthorized({ message, data: data2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-purple-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-purple-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "minus-circle", className: "h-8 w-8" }),
      message || "Unauthorized"
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mb-1 text-lg", children: [
      "You must be logged into access this page. Click",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/login", children: "here" }),
      " to login."
    ] })
  ] });
}
function BadRequest({
  message,
  data: data2
}) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-yellow-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-red-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "exclamation-triangle", className: "h-8 w-8" }),
      message || "Bad Request"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "You made an invalid request. The following errors have occurred." }),
    (data2 == null ? void 0 : data2.errors) && /* @__PURE__ */ jsx("ul", { className: "ml-4 list-disc", children: data2.errors.map((error, i) => /* @__PURE__ */ jsx("li", { children: error }, i)) })
  ] });
}
function Invalid({ message, data: data2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-yellow-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-red-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "exclamation-triangle", className: "h-8 w-8" }),
      message || "Invalid"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "You made an invalid request." })
  ] });
}
function Forbidden({ message, data: data2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-orange-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-orange-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "shield-exclamation", className: "h-8 w-8" }),
      message || "Not Authorized"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "You are not authorized to access this page." })
  ] });
}
function NotFound({ message, data: data2 }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-blue-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-blue-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "magnifying-glass", className: "h-8 w-8" }),
      message || "Not Found"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "The page you were looking for could not be found." })
  ] });
}
const MyContext = createContext(void 0);
const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const updateUserInfo = (info) => {
    setUserInfo(info);
  };
  const handleLogout = () => {
    localStorage.removeItem("remix_us_tk");
    navigate("/logout");
  };
  return /* @__PURE__ */ jsx(MyContext.Provider, { value: { userInfo, updateUserInfo, handleLogout }, children });
};
const useAuthContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  return context;
};
const isProduction = process.env.NODE_ENV === "production";
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    // 30days
    sameSite: "lax",
    secrets: ["s3cr3t"],
    ...isProduction ? { domain: "your-production-domain.com", secure: true } : {}
  }
});
const themeSessionResolver = createThemeSessionResolver(sessionStorage);
const authenticator$1 = new Authenticator(sessionStorage);
let googleStrategy$1 = new GoogleStrategy(
  {
    clientID: void 0,
    clientSecret: void 0,
    callbackURL: `https://spiral-tawny.vercel.app/auth/google/callback`
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return {
      accessToken,
      refreshToken,
      profile
    };
  }
);
authenticator$1.use(googleStrategy$1);
let { getSession, commitSession, destroySession } = sessionStorage;
const links = () => [
  { rel: "prefetch", href: iconsHref, as: "image" }
];
async function loader$6({ request }) {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
}
function AppWithProviders() {
  const data2 = useLoaderData();
  return /* @__PURE__ */ jsx(ThemeProvider, { specifiedTheme: data2.theme, themeAction: "/action/set-theme", children: /* @__PURE__ */ jsx(AuthContextProvider, { children: /* @__PURE__ */ jsx(App, {}) }) });
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { suppressHydrationWarning: true, children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function ErrorBoundary$1() {
  return /* @__PURE__ */ jsx(DefaultErrorBoundary, {});
}
function HydrateFallback() {
  return /* @__PURE__ */ jsx("h1", { children: "Loading..." });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  HydrateFallback,
  default: AppWithProviders,
  links,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const axiosClient = axios.create({
  baseURL: "https://spiral-platform-dev.lava-art-group.workers.dev",
  timeout: 2e4,
  headers: { contentType: "application/json", "ngrok-skip-browser-warning": "true" }
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("remix_us_tk");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (response) => response.data,
  ({ message, response }) => {
    var _a, _b, _c;
    if ((response == null ? void 0 : response.status) === 401) {
      localStorage.removeItem("remix_us_tk");
      window.location.replace("/login");
      return;
    }
    const errorMessage = ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.message) || ((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.error) || message;
    const errorCode = ((_c = response == null ? void 0 : response.data) == null ? void 0 : _c.code) ?? -1;
    return Promise.reject({
      message: errorMessage,
      code: errorCode,
      status: (response == null ? void 0 : response.status) ?? -1
    });
  }
);
const getAuthHeaders = () => {
  const token = localStorage.getItem("remix_us_tk");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
const getData = async (url, params = {}) => {
  try {
    const result = await axiosClient.get(url, { params, headers: getAuthHeaders() });
    return result;
  } catch (e) {
    throw e;
  }
};
const postData = async (url, data2 = {}) => {
  try {
    const result = await axiosClient.post(url, data2, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": data2 instanceof FormData ? "multipart/form-data" : "application/json"
      }
    });
    return result;
  } catch (e) {
    throw e;
  }
};
const login = (email, password) => {
  return postData(`api/v1/auth/login`, { email, password });
};
const registerBrand = (payload) => {
  return postData(`/api/v1/auth/register/brand`, payload);
};
const forgotPassword = (email) => {
  return postData(`/api/v1/auth/send-mail-forgot-password`, { email });
};
const resetPassword = (password, confirmPassword, id) => {
  return postData(`/api/v1/auth/reset-password/${id}`, {
    password,
    confirmPassword
  });
};
const getMe = () => {
  return getData("/api/v1/user/me");
};
const verifyOTP = (payload) => {
  return postData("/api/v1/auth/validate-otp/active-user", payload);
};
const login3rdParty = (role, email, name, phone) => {
  return postData(`/api/v1/auth/login-3rd-party/${role}`, { email, name, phone });
};
const Logo = "/assets/logo-Os7jrbJO.svg";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, disabled, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxs(
      Comp,
      {
        disabled: disabled || loading,
        className: cn(buttonVariants({ variant, size, className }), loading && "cursor-not-allowed"),
        ref,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "animate-spin h-5 w-5 mr-2 text-white",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              children: [
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  }
                )
              ]
            }
          ),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Input = React.forwardRef(
  ({ className, type, hasError, label, errorMessage, ...props }, ref) => {
    return /* @__PURE__ */ jsxs("div", { children: [
      label && /* @__PURE__ */ jsx(Label, { htmlFor: props.id, children: label }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type,
          className: cn(
            "flex h-9 w-full mt-1 rounded-md border px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-0",
            hasError ? "border-red-500" : "border-input focus:border-blue-600",
            className
          ),
          ref,
          ...props
        }
      ),
      errorMessage && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm mt-1", children: errorMessage })
    ] });
  }
);
Input.displayName = "Input";
const EMAIL_REQUIRED = "Email is required";
const INVALID_EMAIL = "Invalid email address";
const FULLNAME_REQUIRED = "Full name is required";
const PASSWORD_MISSMATCH = "Your password don't match";
const CONFIRM_PASSWORD_REQUIRED = "Confirm password is required";
const PHONE_REQUIRED = "Phone number is required";
const PHONE_INVALID = "Phone number is invalid";
const PLEASE_SELECT_GENDER = "Please select gender";
const LOCATION_REQUIRED = "Please select a location";
const DISCOUNT_REQUIRED = "Please enter a discount value";
const PLEASE_SELECT_DEADLINE = "Please select a deadline";
const CAMPAIGN_REQUIRED = "Please enter the campaign name";
const BUDGET_REQUIRED = "Please enter the campaign budget";
const REQUIRED = "Required";
const meta$9 = () => {
  return [{ title: "Spiral - Forgot Password" }];
};
const validationSchema$2 = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED)
});
function Page$6() {
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleConfirmEmail = async (email) => {
    setLoading(true);
    await forgotPassword(email).then((res) => setIsConfirmed(true)).catch((error) => toast.error(error == null ? void 0 : error.message)).finally(() => setLoading(false));
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full mx-auto h-[100vh] flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex flex-col items-center w-[460px] h-full justify-center", children: [
      /* @__PURE__ */ jsx("img", { className: "mb-[170px]", src: Logo, alt: "logo" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-2 text-gray-900 font-bold", children: isConfirmed ? "Check Your Email" : "Forgot Your Password" }),
      isConfirmed ? /* @__PURE__ */ jsxs("div", { className: "text-sm mb-[30px] text-gray-700 text-center", children: [
        "Thanks! If ",
        /* @__PURE__ */ jsx("span", { className: "text-gray-950 font-semibold", children: "your email" }),
        " matches an email we have on file, we've sent you an email containing further instructions for resetting your password.",
        /* @__PURE__ */ jsx("br", {})
      ] }) : /* @__PURE__ */ jsx("h1", { className: "text-sm mb-[30px] text-gray-700 text-center", children: "Enter the email address associated with your account and we’ll send you a link to reset your password." }),
      isConfirmed && /* @__PURE__ */ jsxs("span", { className: "text-center text-sm text-gray-700", children: [
        "If you haven't received an email in 5 minutes, check your spam,",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "underline text-blue-500 font-semibold cursor-pointer", children: "resend" }),
        ", or try a different ",
        /* @__PURE__ */ jsx("span", { onClick: () => setIsConfirmed(false), className: "underline cursor-pointer text-blue-500 font-semibold", children: "email" }),
        "."
      ] }),
      !isConfirmed && /* @__PURE__ */ jsx(
        Formik,
        {
          initialValues: { email: "" },
          validationSchema: validationSchema$2,
          onSubmit: (values) => handleConfirmEmail(values.email),
          children: ({ isSubmitting, isValid, dirty, touched, errors }) => /* @__PURE__ */ jsxs(Form, { className: "w-full mt-3", children: [
            /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: /* @__PURE__ */ jsx(
              Field,
              {
                as: Input,
                label: "Email",
                id: "email",
                name: "email",
                type: "email",
                placeholder: "m@example.com",
                required: true,
                hasError: touched.email && !!errors.email,
                errorMessage: touched.email && errors.email ? errors.email : ""
              }
            ) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                loading,
                type: "submit",
                className: "w-full mt-8",
                children: "Continue"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm", children: [
        "Recovered your account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "underline font-bold text-blue-500", children: "Log in" })
      ] })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$6,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
const Fb = "data:image/svg+xml,%3csvg%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18.5%209C18.5%204.02948%2014.4705%200%209.5%200C4.52948%200%200.5%204.02948%200.5%209C0.5%2013.2206%203.40592%2016.7623%207.32596%2017.735V11.7504H5.47016V9H7.32596V7.81488C7.32596%204.75164%208.71232%203.3318%2011.7198%203.3318C12.29%203.3318%2013.2739%203.44376%2013.6764%203.55536V6.04836C13.464%206.02604%2013.095%206.01488%2012.6367%206.01488C11.161%206.01488%2010.5908%206.57396%2010.5908%208.02728V9H13.5306L13.0255%2011.7504H10.5908V17.9341C15.0472%2017.3959%2018.5004%2013.6015%2018.5004%209H18.5Z'%20fill='%230866FF'/%3e%3c/svg%3e";
const Gg_icon = "data:image/svg+xml,%3csvg%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.49988%207.36328V10.8487H14.3435C14.1308%2011.9696%2013.4925%2012.9188%2012.5353%2013.5569L15.4562%2015.8233C17.158%2014.2525%2018.1398%2011.9452%2018.1398%209.20428C18.1398%208.56611%2018.0826%207.95242%2017.9762%207.36338L9.49988%207.36328Z'%20fill='%234285F4'/%3e%3cpath%20d='M4.45596%2010.7129L3.79719%2011.2172L1.46533%2013.0335C2.94624%2015.9708%205.98147%2017.9999%209.49962%2017.9999C11.9296%2017.9999%2013.9668%2017.1981%2015.4559%2015.8235L12.535%2013.5572C11.7332%2014.0972%2010.7105%2014.4245%209.49962%2014.4245C7.15963%2014.4245%205.17151%2012.8454%204.45964%2010.7181L4.45596%2010.7129Z'%20fill='%2334A853'/%3e%3cpath%20d='M1.46538%204.9668C0.851781%206.17766%200.5%207.54404%200.5%209.00038C0.5%2010.4567%200.851781%2011.8231%201.46538%2013.034C1.46538%2013.0421%204.45998%2010.7103%204.45998%2010.7103C4.27998%2010.1703%204.17359%209.59764%204.17359%209.00029C4.17359%208.40293%204.27998%207.83024%204.45998%207.29025L1.46538%204.9668Z'%20fill='%23FBBC05'/%3e%3cpath%20d='M9.49981%203.58363C10.8253%203.58363%2012.0034%204.0418%2012.9443%204.92545L15.5216%202.34821C13.9589%200.891874%2011.9298%200%209.49981%200C5.98165%200%202.94624%202.02091%201.46533%204.96637L4.45984%207.29001C5.17161%205.16271%207.15982%203.58363%209.49981%203.58363Z'%20fill='%23EA4335'/%3e%3c/svg%3e";
const Ig = "data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_244_96)'%3e%3cpath%20d='M9%201.6207C11.4047%201.6207%2011.6895%201.63125%2012.6352%201.67344C13.5141%201.71211%2013.9887%201.85977%2014.3051%201.98281C14.7234%202.14453%2015.0258%202.34141%2015.3387%202.6543C15.6551%202.9707%2015.8484%203.26953%2016.0102%203.68789C16.1332%204.0043%2016.2809%204.48242%2016.3195%205.35781C16.3617%206.30703%2016.3723%206.5918%2016.3723%208.99297C16.3723%2011.3977%2016.3617%2011.6824%2016.3195%2012.6281C16.2809%2013.507%2016.1332%2013.9816%2016.0102%2014.298C15.8484%2014.7164%2015.6516%2015.0187%2015.3387%2015.3316C15.0223%2015.648%2014.7234%2015.8414%2014.3051%2016.0031C13.9887%2016.1262%2013.5105%2016.2738%2012.6352%2016.3125C11.6859%2016.3547%2011.4012%2016.3652%209%2016.3652C6.59531%2016.3652%206.31055%2016.3547%205.36484%2016.3125C4.48594%2016.2738%204.01133%2016.1262%203.69492%2016.0031C3.27656%2015.8414%202.97422%2015.6445%202.66133%2015.3316C2.34492%2015.0152%202.15156%2014.7164%201.98984%2014.298C1.8668%2013.9816%201.71914%2013.5035%201.68047%2012.6281C1.63828%2011.6789%201.62773%2011.3941%201.62773%208.99297C1.62773%206.58828%201.63828%206.30351%201.68047%205.35781C1.71914%204.47891%201.8668%204.0043%201.98984%203.68789C2.15156%203.26953%202.34844%202.96719%202.66133%202.6543C2.97773%202.33789%203.27656%202.14453%203.69492%201.98281C4.01133%201.85977%204.48945%201.71211%205.36484%201.67344C6.31055%201.63125%206.59531%201.6207%209%201.6207ZM9%200C6.55664%200%206.25078%200.0105469%205.29102%200.0527344C4.33477%200.0949219%203.67734%200.249609%203.10781%200.471094C2.51367%200.703125%202.01094%201.00898%201.51172%201.51172C1.00898%202.01094%200.703125%202.51367%200.471094%203.1043C0.249609%203.67734%200.0949219%204.33125%200.0527344%205.2875C0.0105469%206.25078%200%206.55664%200%209C0%2011.4434%200.0105469%2011.7492%200.0527344%2012.709C0.0949219%2013.6652%200.249609%2014.3227%200.471094%2014.8922C0.703125%2015.4863%201.00898%2015.9891%201.51172%2016.4883C2.01094%2016.9875%202.51367%2017.2969%203.1043%2017.5254C3.67734%2017.7469%204.33125%2017.9016%205.2875%2017.9437C6.24727%2017.9859%206.55312%2017.9965%208.99648%2017.9965C11.4398%2017.9965%2011.7457%2017.9859%2012.7055%2017.9437C13.6617%2017.9016%2014.3191%2017.7469%2014.8887%2017.5254C15.4793%2017.2969%2015.982%2016.9875%2016.4813%2016.4883C16.9805%2015.9891%2017.2898%2015.4863%2017.5184%2014.8957C17.7398%2014.3227%2017.8945%2013.6687%2017.9367%2012.7125C17.9789%2011.7527%2017.9895%2011.4469%2017.9895%209.00352C17.9895%206.56016%2017.9789%206.2543%2017.9367%205.29453C17.8945%204.33828%2017.7398%203.68086%2017.5184%203.11133C17.2969%202.51367%2016.991%202.01094%2016.4883%201.51172C15.9891%201.0125%2015.4863%200.703125%2014.8957%200.474609C14.3227%200.253125%2013.6688%200.0984375%2012.7125%200.05625C11.7492%200.0105469%2011.4434%200%209%200Z'%20fill='%23E1306C'/%3e%3cpath%20d='M9%204.37695C6.44766%204.37695%204.37695%206.44766%204.37695%209C4.37695%2011.5523%206.44766%2013.623%209%2013.623C11.5523%2013.623%2013.623%2011.5523%2013.623%209C13.623%206.44766%2011.5523%204.37695%209%204.37695ZM9%2011.9988C7.34414%2011.9988%206.00117%2010.6559%206.00117%209C6.00117%207.34414%207.34414%206.00117%209%206.00117C10.6559%206.00117%2011.9988%207.34414%2011.9988%209C11.9988%2010.6559%2010.6559%2011.9988%209%2011.9988Z'%20fill='%23E1306C'/%3e%3cpath%20d='M14.8852%204.19453C14.8852%204.79219%2014.4%205.27383%2013.8059%205.27383C13.2082%205.27383%2012.7266%204.78867%2012.7266%204.19453C12.7266%203.59688%2013.2117%203.11523%2013.8059%203.11523C14.4%203.11523%2014.8852%203.60039%2014.8852%204.19453Z'%20fill='%23E1306C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_244_96'%3e%3crect%20width='18'%20height='18'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex  items-center bg-gray-100 justify-center rounded-lg  p-1 ",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-800 text-gray-500 data-[state=active]:shadow h-8",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const createPasswordValidationSchema = () => {
  return Yup.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long").matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[0-9]/, "Password must contain at least one number").matches(/[@$!%*?&]/, "Password must contain at least one special character").required("Password is required");
};
const meta$8 = () => {
  return [{ title: "Spiral - Login" }];
};
const validationSchema$1 = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  password: createPasswordValidationSchema()
});
const loader$5 = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  authenticator$1.logout;
  return user || null;
};
function Page$5() {
  const { updateUserInfo } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useLoaderData();
  useEffect(() => {
    const handleLogin3rdParty = async () => {
      var _a, _b;
      await login3rdParty("brand", (_b = (_a = user.emails) == null ? void 0 : _a[0]) == null ? void 0 : _b.value, user == null ? void 0 : user.displayName, "").then(
        (res) => {
          var _a2;
          localStorage.setItem("remix_us_tk", (_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.id);
          navigate("/manager/dashboard");
        }
      );
    };
    user && handleLogin3rdParty();
  }, []);
  const handleSubmit = async (values) => {
    setLoading(true);
    await login(values.email, values.password).then((res) => {
      var _a;
      localStorage.setItem("remix_us_tk", (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.id);
      handleLogin();
    }).catch((err) => toast.error(err == null ? void 0 : err.message)).finally(() => setLoading(false));
  };
  const handleLogin = async () => {
    await getMe().then((res) => {
      updateUserInfo(res.data);
      navigate("/");
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full mx-auto h-[100vh] flex items-center bg-white justify-center", children: [
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-asuto flex flex-col items-center w-[460px]", children: [
      /* @__PURE__ */ jsx("img", { src: Logo, alt: "logo", className: "mb-[30px]" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-[30px] text-black font-bold", children: "Log in to your account" }),
      /* @__PURE__ */ jsx(
        Formik,
        {
          initialValues: { email: "", password: "" },
          validationSchema: validationSchema$1,
          validateOnChange: true,
          onSubmit: (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          },
          children: ({ errors, touched, resetForm, isValid, isSubmitting, setFieldError, values, handleChange }) => {
            return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              Tabs,
              {
                className: "w-[460px]",
                children: /* @__PURE__ */ jsxs(Form, { className: "mt-[30px]", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: /* @__PURE__ */ jsx(
                      Field,
                      {
                        onChange: handleChange,
                        as: Input,
                        label: "Business email",
                        id: "email",
                        name: "email",
                        type: "email",
                        placeholder: "m@example.com",
                        hasError: touched.email && !!errors.email,
                        errorMessage: touched.email && errors.email ? errors.email : "",
                        required: true
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                      /* @__PURE__ */ jsx(
                        Field,
                        {
                          as: Input,
                          label: "Password",
                          id: "password",
                          name: "password",
                          type: "password",
                          placeholder: "Password",
                          hasError: touched.password && !!errors.password,
                          errorMessage: touched.password && errors.password ? errors.password : "",
                          required: true
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Link,
                        {
                          to: "/forgot-password",
                          className: "ml-auto inline-block text-gray-800 text-sm underline",
                          children: "Forgot your password?"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "submit",
                        size: "default",
                        loading,
                        className: "w-full mt-1",
                        disabled: !isValid || isSubmitting,
                        children: "Login"
                      }
                    ),
                    /* @__PURE__ */ jsx(CardDescription, { className: "mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-gray-300" }),
                      /* @__PURE__ */ jsx("span", { className: "mx-4 text-gray-500", children: "or Login with" }),
                      /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-gray-300" })
                    ] }) }),
                    /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [
                      /* @__PURE__ */ jsx("img", { className: "mr-1", src: Fb, alt: "Facebook" }),
                      "Login with Facebook"
                    ] }),
                    /* @__PURE__ */ jsx("a", { href: "/auth/google", children: /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [
                      /* @__PURE__ */ jsx("img", { className: "mr-1", src: Gg_icon, alt: "Google" }),
                      "Login with Google"
                    ] }) }),
                    /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [
                      /* @__PURE__ */ jsx("img", { className: "mr-1", src: Ig, alt: "Instagram" }),
                      "Login with Instagram"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm", children: [
                    "Don't have an account?",
                    " ",
                    /* @__PURE__ */ jsx(Link, { to: "/register", className: "underline font-bold text-blue-500", children: "Sign up" })
                  ] })
                ] })
              }
            ) });
          }
        }
      )
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$5,
  loader: loader$5,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
const Privacy_icon = "data:image/svg+xml,%3csvg%20width='46'%20height='46'%20viewBox='0%200%2046%2046'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='vuesax/bulk/lock'%3e%3cg%20id='lock'%3e%3cpath%20id='Vector'%20opacity='0.4'%20d='M23.0001%2033.2542C24.7256%2033.2542%2026.1243%2031.8555%2026.1243%2030.13C26.1243%2028.4046%2024.7256%2027.0059%2023.0001%2027.0059C21.2747%2027.0059%2019.876%2028.4046%2019.876%2030.13C19.876%2031.8555%2021.2747%2033.2542%2023.0001%2033.2542Z'%20fill='%232563EB'/%3e%3cpath%20id='Vector_2'%20d='M31.9127%2018.0933H14.0877C6.22933%2018.0933%203.8335%2020.4891%203.8335%2028.3474V31.9124C3.8335%2039.7708%206.22933%2042.1666%2014.0877%2042.1666H31.9127C39.771%2042.1666%2042.1668%2039.7708%2042.1668%2031.9124V28.3474C42.1668%2020.4891%2039.771%2018.0933%2031.9127%2018.0933ZM23.0002%2035.9183C19.7993%2035.9183%2017.2118%2033.3116%2017.2118%2030.1299C17.2118%2026.9483%2019.7993%2024.3416%2023.0002%2024.3416C26.201%2024.3416%2028.7885%2026.9483%2028.7885%2030.1299C28.7885%2033.3116%2026.201%2035.9183%2023.0002%2035.9183Z'%20fill='%232563EB'/%3e%3cpath%20id='Vector_3'%20opacity='0.4'%20d='M13.6467%2018.1127V15.8702C13.6467%2010.2543%2015.2375%206.51683%2023%206.51683C30.7625%206.51683%2032.3534%2010.2543%2032.3534%2015.8702V18.1127C33.3309%2018.1318%2034.2125%2018.1702%2035.0367%2018.2852V15.8702C35.0367%2010.6952%2033.7909%203.8335%2023%203.8335C12.2092%203.8335%2010.9634%2010.6952%2010.9634%2015.8702V18.266C11.7684%2018.1702%2012.6692%2018.1127%2013.6467%2018.1127Z'%20fill='%232563EB'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const meta$7 = () => {
  return [{ title: "Spiral - Privacy policy" }];
};
function PrivacyPolicy() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("img", { onClick: () => navigate("/login"), className: "h-[45px] cursor-pointer object-contain", src: Logo, alt: "logo" }),
    /* @__PURE__ */ jsxs("div", { className: "w-[720px] flex flex-col mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: Privacy_icon, alt: "icon" }),
        /* @__PURE__ */ jsx("h2", { className: "text-gray-900 text-[30px] font-bold transform translate-y-1", children: "Privacy Policy" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 mb-3", children: [
        /* @__PURE__ */ jsx("h5", { className: "text-gray-800 mb-3 font-semibold", children: "What is Lorem Ipsum?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-800", children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-800 mt-5", children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 mb-3", children: [
        /* @__PURE__ */ jsx("h5", { className: "text-gray-800 mb-3 font-semibold", children: "Why do we use it?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-800", children: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-800 mt-5", children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." })
      ] })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivacyPolicy,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const LoginBanner = "/assets/login-banner-DkUQ0E4H.png";
const PhoneNumberInput = forwardRef(
  ({ value, onChange, className, hasError, ...props }, ref) => {
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");
    const handleBlur = () => {
      setTouched(true);
      if (!value) {
        setError(PHONE_REQUIRED);
      } else if (!isValidPhoneNumber(value)) {
        setError(PHONE_INVALID);
      } else {
        setError("");
      }
    };
    return /* @__PURE__ */ jsxs("div", { className: "w-full -mt-1", children: [
      /* @__PURE__ */ jsx(Label, { children: "Phone number" }),
      /* @__PURE__ */ jsx(
        PhoneInput,
        {
          value,
          onChange: (newValue) => {
            onChange(newValue || "");
            if (touched) {
              handleBlur();
            }
          },
          limitMaxLength: true,
          placeholder: "Enter phone number",
          international: true,
          defaultCountry: "AU",
          className: cn(
            "flex h-9 w-full mt-1 rounded-md border px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-0",
            hasError || error ? "border-red-500" : "border-input focus:border-blue-600",
            className
          ),
          ...props
        }
      ),
      error && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm mt-1", children: error })
    ] });
  }
);
const SelectGroup = ({ value, onChange, label, options }) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Label, { children: label }),
  /* @__PURE__ */ jsx(
    Select,
    {
      className: "mt-1",
      isMulti: true,
      placeholder: "--select--",
      options,
      value: options.filter((option) => value.includes(option.value)),
      onChange: (selectedOptions) => {
        onChange(selectedOptions ? selectedOptions.map((option) => option.value) : []);
      }
    }
  )
] });
const INDUSTRIES = [
  {
    label: "Health care",
    value: "Health care"
  },
  {
    label: "Construction",
    value: "Construction"
  },
  {
    label: "Manufacturing",
    value: "Manufacturing"
  },
  {
    label: "Real Estate",
    value: "Real Estate"
  }
];
const meta$6 = () => {
  return [{ title: "Spiral - Register" }];
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required(FULLNAME_REQUIRED),
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  password: createPasswordValidationSchema(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], PASSWORD_MISSMATCH).required(CONFIRM_PASSWORD_REQUIRED)
});
function Page$4() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const handleSubmit = (values) => {
    setLoading(true);
    delete values.confirmPassword;
    const payload = { ...values, phone };
    const register = registerBrand(payload);
    register.then((res) => {
      var _a;
      return navigate(`/verify-otp/${(_a = res == null ? void 0 : res.data) == null ? void 0 : _a.userId}`, {
        state: { email: values.email }
      });
    }).finally(() => setLoading(false)).catch((err) => toast.error(err == null ? void 0 : err.message));
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[100vh] w-full items-center justify-between", children: [
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-full w-1/2 flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: Logo,
          alt: "logo",
          className: "mb-[30px] h-[45px] object-contain"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "mb-[30px] text-3xl font-bold text-black", children: "Sign up" }),
      /* @__PURE__ */ jsx(
        Formik,
        {
          initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            industry: [""],
            category: [""]
          },
          validationSchema,
          onSubmit: (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          },
          children: ({
            errors,
            touched,
            resetForm,
            isValid,
            isSubmitting,
            values,
            setFieldValue
          }) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
            Tabs,
            {
              defaultValue: "creator",
              className: "w-[460px]",
              children: /* @__PURE__ */ jsxs(Form, { className: "mt-[30px]", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                  /* @__PURE__ */ jsx(
                    Field,
                    {
                      as: Input,
                      label: "Full name",
                      name: "name",
                      type: "text",
                      placeholder: "e.g. John Marr",
                      hasError: touched.name && !!errors.name,
                      errorMessage: touched.name && errors.name ? errors.name : "",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Field,
                    {
                      as: Input,
                      id: "email",
                      name: "email",
                      label: "Business email",
                      type: "email",
                      placeholder: "m@example.com",
                      hasError: touched.email && !!errors.email,
                      errorMessage: touched.email && errors.email ? errors.email : "",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(PhoneNumberInput, { value: phone, onChange: setPhone }),
                  /* @__PURE__ */ jsx(
                    FieldArray,
                    {
                      name: "category",
                      render: () => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                        SelectGroup,
                        {
                          options: INDUSTRIES,
                          label: "Industry",
                          value: values.category,
                          onChange: (value) => setFieldValue("category", value)
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Field,
                    {
                      as: Input,
                      label: "Password",
                      id: "password",
                      name: "password",
                      type: "password",
                      placeholder: "Password",
                      hasError: touched.password && !!errors.password,
                      errorMessage: touched.password && errors.password ? errors.password : "",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Field,
                    {
                      as: Input,
                      label: "Confirm Password",
                      id: "confirmPassword",
                      name: "confirmPassword",
                      type: "password",
                      placeholder: "Confirm Password",
                      hasError: touched.confirmPassword && !!errors.confirmPassword,
                      errorMessage: touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : "",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-full pt-1", children: /* @__PURE__ */ jsx(Checkbox, { defaultChecked: accepted, value: true, onChange: (e) => setAccepted(!accepted) }) }),
                    /* @__PURE__ */ jsxs("div", { className: "text-sm leading-5 text-gray-800", children: [
                      "By clicking on signup you agree to",
                      " ",
                      /* @__PURE__ */ jsxs("a", { href: "/privacy-policy", target: "_blank", children: [
                        /* @__PURE__ */ jsx("span", { className: "cursor-pointer underline", children: "Terms of Services" }),
                        " ",
                        "and",
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "cursor-pointer underline", children: "Privacy Policy" })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => handleSubmit(values),
                      size: "default",
                      disabled: !accepted,
                      loading,
                      className: "mt-1 w-full",
                      children: "Sign Up"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm text-gray-800", children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/login",
                      className: "font-bold text-blue-500 underline",
                      children: "Log in"
                    }
                  )
                ] })
              ] })
            }
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-full w-1/2", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: LoginBanner,
        alt: "banner",
        className: "h-full w-full object-cover"
      }
    ) })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$4,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const Success_IC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjjSURBVHgB7Z1RcttGEoa7B5Ks8uaBewNaylbtW5iXrbK1qVAnsH2AlagTWD5BpBNYOoEo777HPoGZihU9ho9blchGThC+JFEUYibdIzKJhR5gABDkQOJX5bIKIEjgx6Cnp6enAbBkyZIlSxYFQqC0v+211i+hNaY/jYZ26gMII+R/EYy++1d/CIEShMAs5soldHSSdFCpz42BDoBpQyFwyIIbY75SSg2+f9gfQAAsTGAWVf2U9EjQx0abDp1JC2YMIg7A6NNVFQ3+/7AfwwKYu8Afn/e6JOgzamndOkR1gYB9VHg675Y9N4GtsMZ8YYVdLDGCObzY+m8f5kDtAgck7E1istV7dbfo2gRmGxv9bE4MmCeFDgQc0UkN6LgfENQQNcQrKxDf/FSioWX4nyIvA3QbDX5u0HaOhcwOm45VhYd12ehaBN4839k1CRz52ljujIzG12sRvKp6of8463USA10yA48Nej81tZmNmQpsPYNfzBdgzH7+p3EE2hzrj9RR/Gl/BDXQPu+1Iw1dEprPqZ17AOKR/hUP4+3Znc/MBOaLUVq/4T+zPmddJ8Dji0f9VzBHNs96PU+h4zWltmdlMmYisH0sQX8JmeKybcXnF1v9PiwQT6HjCNTT77aqjxArC3xt86jlZtvbY31fHdRlCopin7ax3gcFzzI+NiKRt6uKXEngXHERY5Xg3vefhTFsvcnHX/e6OjInGa25ssilBfYQd7iG+HRRQ1RfrvsOQ+aNhusylUQuJXBeh0bBmtP3/37Zgwax8fXOUYbJKN3xKSiIdcWyvYXDponLvPvs5T5oOHTsbl/RNbff9ArHTgoLbP3cDHHfbb08gIZCIh9kiazu2WsvRCETsXn2n54BPHHsPiZxPQYY4fPg7U6fYsu70j5UUe/i4ckpeOItcKbdpQ7t3aPTT+EWsXG2+62j4xvpK/XAd7TnbSKop5VNA7li7C3ALUMruia6NmFXK7pnTsATrxZs/UVlW28KpdV2qH5uVTKvm7wKn1CnVwumH3Ha3dsqLmOvTcOxtI9j3OBBrsDcsYHLNCh1BLccPVYH9F/K3vIEAk8m5B2fKzB5DeKdogD3YeijtFnAnRkF/p9L+3xacaYNdtogar3kNTyAO8Tm2903UgA/zxZntmCtjOwLUuuFO4brmqkVZ0Xk3AKz30uH99K/hPGiY7pl+ae9pnJMOnPRFmcNoZ0CRzrpStub2Ho58rfxdudHiie83zjbeb95vrdb6otkj6Kl7iU91yFuE2GUeBKrCgbQIISwatvopF8mcEMeheg1USf42HWMU2DJoPN8WpM8h6yYdXQPulAQ61EYnlP8EDITHdcNEwVm70HabkC/hoaQNyGwilAqgO7QoLWyDmLAXhSYXLOuuH0lGkAD8JgnLO3D6ygSZ8O1ljUTBeYsGWHzKA44D3eKj7hVYtbx9Y1JexNQoAUbIf2I7O+dF3cKQtoO04jtE+mzyvENqbvBic0QMPMSl+G8OWFzW+roUgLziQoH03mbGAJlnuIypIX4NK+vQ77AnLEoHUxTJTEEyLzFZVDLWoyFqOPKzQ3GjFuS5RhHUCkrx0450bidbFXHKPNK/6JOqybZLUJcZrwCsdLp7TSAad/cllYyQvFk15NqAtv5PGP2bSJ2AkdqzZSaBp+yKHGLUnjavgyTgUv7w62mU1bkpojLzEVgN8VFbpK4zFwEtqE+eYYWiojcNHGZubVgjbhdReSQxF3VroTHKNVPpQQu4oIUgYeYZUUOreU6XVmEfIHHwoqe6y9NuyBFKSNyiGbBKFkLyZVNm4hL2R2j2WVxhFeUIiKHanNJi7a0XQqGpQSeOP9x+kurmYgPfsNT5FA7NDnaKAfD5HCl8GEagUkhzNL4iByqt0CzPamnWbK/jByuNFqKnLWqzMpK5IssslBxJ8Gw1I13RRtFgZWJxOZ+ZZInMGMKirxwP1dDIgfWlRqI26WN47Gdr0o1+azZ0yp4ihzGIMIx2+7K7hEFnsyeplpxXpJFFXJEDkJcjgi6Zttdx7in7R0zyGpN70NNpEVGfoqCGf66knGo13MuKXAKrH+L+gBiz5iZi1UVFpkTC/V99Xd9Hx+EFFtwZZpmJeNkZldunu1+KdV7QNRPLx797xXcIVwLgLjexMXW6Z7ruMxgD2o8lvdEtbbiEHHmSSvMXHGUKTCHGR2pQt1J5vudICvLP2+dRm640pkXC/iiLo8iJKznkJHln3d8rsCuVgw2bbP4ysemoa4TrNupHZ550l4Bd+edoklMn4UgTcVem6M8jkLcAw+8BLatGNCV9HYy6xhFCLBp4GuT9rHn4FsOzHvKKLmyd0zyi9tXtt7C7UJpR4kcMg1cBgw88RY4azkThxbJZ/ZeXho6G9/svgBHtmTR5WuFJj2tUXetfATT2zjfaXynt3G2k1WW7LjoAqDCs8rXKx8dqawaDposshUX4EDcSaaBCztBQcqXlDHmjbOYEOIRxROeQ4PYsCZOWLbGXFcUKFVSppTAzKRWGq8CdQw2cLimmlIUyXZojkldHEWApYsilU484R/kakwArqRA0+E6NyH7yXxukyIjtYhrvwEqkt+SwZoMesSOQ2nNfjU2q4trvwVmgBUZyRfOKVc4z8LILmzY0eALwMwGEUcGwyitOCW34/uThQi9+U2P4tqT0uZZVOjQxK+DGcLRNbWiD3JqQk6xQtdZwN6agkv9DBLYB79axjOvsTlTgacUKCV7fRK2QLN+Ha1Fg6rvxOC4yFWSPLFvN/Aua86VYfXz4As0/xU2GZjoA1f9MScGRjRLMOREDhqax6iopUcwioQlDNOXmNDN/ATt38XfbMBBrOQ+7tVVGbY2gad4VDhdCPzUYIKHdRd1ql3gKUXNRl3MS9g/fg/mDLfoBHWvsOmoBPJ7j1jYuZchm7vAU6YF7KlF7xZ4W0ABrKhDfruB/hv0F1V9e2EC32RS4ao7eR9GK6NgsgMkt48ENfiVMjAcfwTDEEqaByOwBI8Q7ctIDAkepb2D6UtMLtdhFEp9+CVLlixZEg6/AwpVB0eT7IQEAAAAAElFTkSuQmCC";
const meta$5 = () => {
  return [
    { title: "Spiral - Reset Password" }
  ];
};
const resetPasswordValidationSchema = Yup.object().shape({
  password: createPasswordValidationSchema(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], PASSWORD_MISSMATCH).required(CONFIRM_PASSWORD_REQUIRED)
});
function Page$3() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    await resetPassword(values.password, values.confirmPassword, id).then(() => setIsSuccess(true)).catch((err) => {
      setIsSuccess(false);
      toast.error(err == null ? void 0 : err.message);
    }).finally(() => setLoading(false));
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full mx-auto h-[100vh] flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex flex-col items-center w-[460px] h-full justify-center", children: [
      /* @__PURE__ */ jsx("img", { className: "mb-[170px]", src: Logo, alt: "logo" }),
      isSuccess && /* @__PURE__ */ jsx("img", { className: "mb-8", src: Success_IC }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-2 text-gray-900 font-bold", children: isSuccess ? "Password Updated!" : "Reset Your Password" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm text-center w-[359px]", children: isSuccess ? "Your password has been changed successfully. Use your new password to log in." : "To complete your password reset, please enter your new password below:" }),
      !isSuccess && /* @__PURE__ */ jsx(
        Formik,
        {
          initialValues: { password: "", confirmPassword: "" },
          validationSchema: resetPasswordValidationSchema,
          onSubmit: handleSubmit,
          children: ({ isSubmitting }) => /* @__PURE__ */ jsxs(Form, { className: "w-full mt-10 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New password" }),
              /* @__PURE__ */ jsx(
                Field,
                {
                  as: Input,
                  id: "password",
                  name: "password",
                  type: "password",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(ErrorMessage, { name: "password", component: "div", className: "text-red-600 text-sm" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "confirmPassword", children: "Confirm password" }),
              /* @__PURE__ */ jsx(
                Field,
                {
                  as: Input,
                  id: "confirmPassword",
                  name: "confirmPassword",
                  type: "password",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(ErrorMessage, { name: "confirmPassword", component: "div", className: "text-red-600 text-sm" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                size: "lg",
                loading,
                className: "w-full mt-8",
                disabled: isSubmitting,
                children: "Continue"
              }
            )
          ] })
        }
      ),
      isSuccess && /* @__PURE__ */ jsx("div", { className: "mt-8 w-[460px]", children: /* @__PURE__ */ jsx(Button, { onClick: () => navigate("/login"), className: "w-full", size: "lg", children: "Login now" }) })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$3,
  meta: meta$5,
  resetPasswordValidationSchema
}, Symbol.toStringTag, { value: "Module" }));
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const SingleCharacterInput = (props) => {
  const { focus, autoFocus, className, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: `no-spin text-center border-y text-3xl font-medium bg-transparent border-l 
  w-[73.333px] h-[94px] 
  focus:outline-none focus:border-blue border-gray-400 focus:border ${className}`,
      ref: inputRef,
      ...rest
    }
  );
};
const SingleCharacterInput$1 = memo(SingleCharacterInput);
const InputOTP = (props) => {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    value,
    onChange,
    inputClassName,
    otpClassName,
    ...rest
  } = props;
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array(length).fill(""));
  useEffect(() => {
    if (value === "") {
      setOTPValues(Array(length).fill(""));
      setActiveInput(0);
    }
  }, [value, length]);
  const handleCharacterChange = useCallback(
    (otp) => {
      const otpValue = otp.join("");
      onChange(otpValue);
    },
    [onChange]
  );
  const getRightValue = useCallback(
    (value2) => {
      const changedValue = value2;
      if (!isNumberInput || !changedValue) {
        return changedValue;
      }
      return Number(changedValue) >= 0 ? changedValue : "";
    },
    [isNumberInput]
  );
  const changeCodeAtFocus = useCallback(
    (stringValue) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = stringValue[0] || "";
      setOTPValues(updatedOTPValues);
      handleCharacterChange(updatedOTPValues);
    },
    [activeInput, handleCharacterChange, otpValues]
  );
  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );
  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);
  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);
  const handleOnFocus = useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput]
  );
  const handleOnChange = useCallback(
    (e) => {
      const value2 = getRightValue(e.currentTarget.value);
      if (!value2) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(value2);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);
  const handleOnKeyDown = useCallback(
    (e) => {
      const pressedKey = e.key;
      switch (pressedKey) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );
  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").trim().slice(0, length - activeInput).split("");
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((value2, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || value2);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        handleCharacterChange(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues, handleCharacterChange]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "bg-gray-500 w-fit border-none flex overflow-hidden justify-start rounded-lg",
      ...rest,
      children: Array(length).fill("").map((_, index) => /* @__PURE__ */ jsx(
        SingleCharacterInput$1,
        {
          type: rest.type,
          focus: activeInput === index,
          value: otpValues && otpValues[index],
          autoFocus,
          onFocus: handleOnFocus(index),
          onChange: handleOnChange,
          onKeyDown: handleOnKeyDown,
          onBlur,
          onPaste: handleOnPaste,
          disabled,
          className: ` ${index === 0 ? "rounded-s-lg border-l" : index === length - 1 ? "rounded-e-lg border-r" : ""} ${inputClassName}`
        },
        `SingleInput-${index}`
      ))
    }
  );
};
const InputOTP$1 = memo(InputOTP);
function Loading() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "animate-spin h-5 w-5 mr-2 text-black",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          }
        )
      ]
    }
  );
}
const useCountdown = (initialTime) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          setIsRunning(false);
        }
      }, 1e3);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time]);
  const startCountdown = () => {
    setIsRunning(true);
  };
  const resetCountdown = () => {
    setIsRunning(false);
    setTime(initialTime);
  };
  return {
    time: `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`,
    isRunning,
    startCountdown,
    resetCountdown
  };
};
const meta$4 = () => {
  return [{ title: "Spiral - Verify OTP" }];
};
function Page$2() {
  var _a;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { time, startCountdown, resetCountdown } = useCountdown(600);
  const { time: time2, startCountdown: start2, isRunning, resetCountdown: reset2 } = useCountdown(60);
  const handleReset = () => {
    reset2();
    resetCountdown();
    startCountdown();
    start2();
  };
  const handleVerifyOTP = async () => {
    setLoading(true);
    const payload = { userId: id, otp };
    await verifyOTP(payload).then(() => {
      toast.success("Verify successfully!");
      setTimeout(() => navigate("/login"), 1e3);
    }).finally(() => setLoading(false)).catch((err2) => {
      setErr(err2 == null ? void 0 : err2.message);
    });
  };
  useEffect(() => {
    startCountdown();
    start2();
  }, []);
  useEffect(() => {
    otp.length === 6 && handleVerifyOTP();
  }, [otp]);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[100vh] w-full items-center justify-between", children: [
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-full w-1/2 flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: Logo,
          alt: "logo",
          className: "mb-[30px] h-[45px] object-contain"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold text-black", children: "Email Verification " }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-700", children: "A Verification code has been sent to" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-bold text-sm mt-1", children: (_a = location == null ? void 0 : location.state) == null ? void 0 : _a.email }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 text-sm text-gray-800", children: [
        "OTP Expire: ",
        time
      ] }),
      /* @__PURE__ */ jsx(InputOTP$1, { className: "otpContainer mt-[30px]", inputClassName: "otpInput", length: 6, value: otp, onChange: setOtp }),
      err && /* @__PURE__ */ jsx("span", { className: "mt-2 text-red-500 text-sm", children: err }),
      loading && /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-2 gap-1", children: [
        /* @__PURE__ */ jsx(Loading, {}),
        /* @__PURE__ */ jsx("p", { className: "text-gray-800", children: "Check your code" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-[30px] gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: " text-gray-800 text-sm", children: "Didn’t receive the code?" }),
        /* @__PURE__ */ jsxs("span", { onClick: () => isRunning ? null : handleReset(), className: `text-blue-600 text-sm font-bold  ${isRunning ? "cursor-not-allowed" : "cursor-pointer"}`, children: [
          "Resend code ",
          time2
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-full w-1/2", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: LoginBanner,
        alt: "banner",
        className: "h-full w-full object-cover"
      }
    ) })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$2,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const useCheckAuth = () => {
  const navigate = useNavigate$1();
  const { updateUserInfo } = useAuthContext();
  const location = useLocation$1();
  const getUserInfo = async () => {
    try {
      const res = await getMe();
      updateUserInfo(res.data);
      location.pathname === "/" && navigate("/manager/dashboard");
    } catch (error) {
      updateUserInfo(null);
      navigate("/login");
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
};
function Layout$1() {
  useCheckAuth();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout$1
}, Symbol.toStringTag, { value: "Module" }));
const navItems = [
  { to: "/manager/dashboard", icon: HomeIcon, label: "Dashboard" },
  {
    to: "/manager/campaigns",
    icon: FireIcon,
    label: "Campaigns",
    badge: 6
  },
  {
    to: "/manager/creators",
    icon: UserIcon,
    label: "Creators"
  },
  {
    to: "/manager/contents",
    icon: DocumentChartBarIcon,
    label: "Contents"
  },
  {
    to: "/manager/products",
    icon: ArchiveBoxIcon,
    label: "Products"
  },
  {
    to: "/manager/analytics",
    icon: ChartBarIcon,
    label: "Analytics"
  },
  {
    to: "#",
    icon: ArrowLeftEndOnRectangleIcon,
    label: "Logout"
  }
];
const campaignMenuItems = [
  {
    key: "invite",
    icon: /* @__PURE__ */ jsx(UserPlusIcon, { width: 16, color: "#1F2937" }),
    label: "Invite"
  },
  {
    key: "view",
    icon: /* @__PURE__ */ jsx(EyeIcon$1, { width: 16, color: "#1F2937" }),
    label: "View details"
  },
  {
    key: "edit",
    icon: /* @__PURE__ */ jsx(PencilSquareIcon, { width: 16, color: "#1F2937" }),
    label: "Edit"
  },
  {
    key: "delete",
    icon: /* @__PURE__ */ jsx(TrashIcon, { width: 16, color: "#1F2937" }),
    label: "Delete"
  }
];
const { Header, Sider, Content } = Layout$2;
function page$2() {
  const { handleLogout } = useAuthContext();
  return /* @__PURE__ */ jsxs(Layout$2, { style: { height: "100vh" }, children: [
    /* @__PURE__ */ jsxs(Sider, { width: 200, className: "h-[100vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-[68px] flex items-center bg-[#F9FAFB] px-5 justify-between", children: [
        /* @__PURE__ */ jsx("img", { src: Logo, className: "h-[24px]", alt: "logo" }),
        /* @__PURE__ */ jsx(Badge$1, { size: "small", className: "cursor-pointer", count: 5, children: /* @__PURE__ */ jsx(BellIcon, { width: 20, color: "#374151" }) })
      ] }),
      /* @__PURE__ */ jsx(
        Menu,
        {
          mode: "inline",
          defaultSelectedKeys: ["/manager/dashboard"],
          style: { height: "100%", borderRight: 0, backgroundColor: "#F9FAFB" },
          children: navItems.map((m) => /* @__PURE__ */ jsx(Menu.Item, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", onClick: () => m.label === "Logout" ? handleLogout() : null, children: [
            /* @__PURE__ */ jsx(m.icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx(Link, { to: m.to, children: /* @__PURE__ */ jsx("div", { className: "ml-2", children: m.label }) })
          ] }) }, m.to))
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 w-full p-5 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Avatar$1, { className: "w-[24px]", src: "https://api.dicebear.com/7.x/miniavs/svg?seed=1" }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-[100px] flex-col", children: [
          /* @__PURE__ */ jsx("h6", { className: "text-gray-900 font-medium", children: "Alex" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "khoi.dev@gmail" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex w-full p-8 flex-col h-[100vh] overflow-y-scroll", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: "Module" }));
function page$1() {
  return /* @__PURE__ */ jsx("div", {});
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: "Module" }));
const placeholder = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='1200'%20fill='none'%3e%3crect%20width='1200'%20height='1200'%20fill='%23EAEAEA'%20rx='3'/%3e%3cg%20opacity='.5'%3e%3cg%20opacity='.5'%3e%3cpath%20fill='%23FAFAFA'%20d='M600.709%20736.5c-75.454%200-136.621-61.167-136.621-136.62%200-75.454%2061.167-136.621%20136.621-136.621%2075.453%200%20136.62%2061.167%20136.62%20136.621%200%2075.453-61.167%20136.62-136.62%20136.62Z'/%3e%3cpath%20stroke='%23C9C9C9'%20stroke-width='2.418'%20d='M600.709%20736.5c-75.454%200-136.621-61.167-136.621-136.62%200-75.454%2061.167-136.621%20136.621-136.621%2075.453%200%20136.62%2061.167%20136.62%20136.621%200%2075.453-61.167%20136.62-136.62%20136.62Z'/%3e%3c/g%3e%3cpath%20stroke='url(%23a)'%20stroke-width='2.418'%20d='M0-1.209h553.581'%20transform='scale(1%20-1)%20rotate(45%201163.11%2091.165)'/%3e%3cpath%20stroke='url(%23b)'%20stroke-width='2.418'%20d='M404.846%20598.671h391.726'/%3e%3cpath%20stroke='url(%23c)'%20stroke-width='2.418'%20d='M599.5%20795.742V404.017'/%3e%3cpath%20stroke='url(%23d)'%20stroke-width='2.418'%20d='m795.717%20796.597-391.441-391.44'/%3e%3cpath%20fill='%23fff'%20d='M600.709%20656.704c-31.384%200-56.825-25.441-56.825-56.824%200-31.384%2025.441-56.825%2056.825-56.825%2031.383%200%2056.824%2025.441%2056.824%2056.825%200%2031.383-25.441%2056.824-56.824%2056.824Z'/%3e%3cg%20clip-path='url(%23e)'%3e%3cpath%20fill='%23666'%20fill-rule='evenodd'%20d='M616.426%20586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074%208.463-8.463h2.565l7.18%207.181V586.58Zm-15.715%2014.654%203.698%203.699%201.283%201.282-2.565%202.565-1.282-1.283-5.2-5.199h-6.066l-5.514%205.514-.073.073v2.876a2.418%202.418%200%200%200%202.418%202.418h26.598a2.418%202.418%200%200%200%202.418-2.418v-8.317l-8.463-8.463-7.181%207.181-.071.072Zm-19.347%205.442v4.085a6.045%206.045%200%200%200%206.046%206.045h26.598a6.044%206.044%200%200%200%206.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z'%20clip-rule='evenodd'/%3e%3c/g%3e%3cpath%20stroke='%23C9C9C9'%20stroke-width='2.418'%20d='M600.709%20656.704c-31.384%200-56.825-25.441-56.825-56.824%200-31.384%2025.441-56.825%2056.825-56.825%2031.383%200%2056.824%2025.441%2056.824%2056.825%200%2031.383-25.441%2056.824-56.824%2056.824Z'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='554.061'%20x2='-.48'%20y1='.083'%20y2='.087'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='796.912'%20x2='404.507'%20y1='599.963'%20y2='599.965'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='600.792'%20x2='600.794'%20y1='403.677'%20y2='796.082'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='d'%20x1='404.85'%20x2='796.972'%20y1='403.903'%20y2='796.02'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3cclipPath%20id='e'%3e%3cpath%20fill='%23fff'%20d='M581.364%20580.535h38.689v38.689h-38.689z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Breadcrumb = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ol",
  {
    ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  }
));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "li",
  {
    ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  }
));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("transition-colors hover:text-foreground", className),
      ...props
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "span",
  {
    ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-foreground", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(ChevronRightIcon, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function Campaign() {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/manager/creator/1");
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid min-h-screen w-full grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { className: "hidden md:flex", children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "#", children: "Campaigns" }) }) }),
      /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: "001" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4", children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Campaign Performance" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "Total Clicks" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "12,345" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "Conversion Rate" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "15.2%" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "Cost per Conversion" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "$4.50" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "Total Cost" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "$2,500" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "Total Product Cost" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "$5,000" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4", children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Influencer Performance" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Influencer" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Click Rate" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Conversion Rate" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Cost per Conversion" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Content" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Posted" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "/placeholder-user.jpg" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "I1" })
              ] }),
              /* @__PURE__ */ jsx("div", { children: "Influencer 1" })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "12.5%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "8.2%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$3.75" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "underline", children: "View Content" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Yes" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "/placeholder-user.jpg" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "I2" })
              ] }),
              /* @__PURE__ */ jsx("div", { children: "Influencer 2" })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "9.7%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "6.5%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$4.25" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "underline", children: "View Content" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "No" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "/placeholder-user.jpg" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "I3" })
              ] }),
              /* @__PURE__ */ jsx("div", { children: "Influencer 3" })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "14.3%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "10.1%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$3.25" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "underline", children: "View Content" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Yes" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "/placeholder-user.jpg" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "I4" })
              ] }),
              /* @__PURE__ */ jsx("div", { children: "Influencer 4" })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "11.8%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "7.9%" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$4.00" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Link, { to: "#", className: "underline", children: "View Content" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "No" }) })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4", children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Instagram Posts" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: placeholder,
            width: 300,
            height: 300,
            alt: "Instagram Post 1",
            className: "aspect-square rounded-md object-cover"
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: placeholder,
            width: 300,
            height: 300,
            alt: "Instagram Post 2",
            className: "aspect-square rounded-md object-cover"
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: placeholder,
            width: 300,
            height: 300,
            alt: "Instagram Post 3",
            className: "aspect-square rounded-md object-cover"
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: placeholder,
            width: 300,
            height: 300,
            alt: "Instagram Post 4",
            className: "aspect-square rounded-md object-cover"
          }
        )
      ] }) })
    ] }) })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Campaign
}, Symbol.toStringTag, { value: "Module" }));
const createCampaign = (payload) => {
  return postData("/api/v1/campaign", payload);
};
const countries = [
  { label: "Afghanistan", value: "AF", flag: "🇦🇫" },
  { label: "Albania", value: "AL", flag: "🇦🇱" },
  { label: "Algeria", value: "DZ", flag: "🇩🇿" },
  { label: "Andorra", value: "AD", flag: "🇦🇩" },
  { label: "Angola", value: "AO", flag: "🇦🇴" },
  { label: "Argentina", value: "AR", flag: "🇦🇷" },
  { label: "Armenia", value: "AM", flag: "🇦🇲" },
  { label: "Australia", value: "AU", flag: "🇦🇺" },
  { label: "Austria", value: "AT", flag: "🇦🇹" },
  { label: "Azerbaijan", value: "AZ", flag: "🇦🇿" },
  { label: "Bahamas", value: "BS", flag: "🇧🇸" },
  { label: "Bahrain", value: "BH", flag: "🇧🇭" },
  { label: "Bangladesh", value: "BD", flag: "🇧🇩" },
  { label: "Barbados", value: "BB", flag: "🇧🇧" },
  { label: "Belarus", value: "BY", flag: "🇧🇾" },
  { label: "Belgium", value: "BE", flag: "🇧🇪" },
  { label: "Belize", value: "BZ", flag: "🇧🇿" },
  { label: "Benin", value: "BJ", flag: "🇧🇯" },
  { label: "Bhutan", value: "BT", flag: "🇧🇹" },
  { label: "Bolivia", value: "BO", flag: "🇧🇴" },
  { label: "Bosnia and Herzegovina", value: "BA", flag: "🇧🇦" },
  { label: "Botswana", value: "BW", flag: "🇧🇼" },
  { label: "Brazil", value: "BR", flag: "🇧🇷" },
  { label: "Brunei", value: "BN", flag: "🇧🇳" },
  { label: "Bulgaria", value: "BG", flag: "🇧🇬" },
  { label: "Burkina Faso", value: "BF", flag: "🇧🇫" },
  { label: "Burundi", value: "BI", flag: "🇧🇮" },
  { label: "Cambodia", value: "KH", flag: "🇰🇭" },
  { label: "Cameroon", value: "CM", flag: "🇨🇲" },
  { label: "Canada", value: "CA", flag: "🇨🇦" },
  { label: "Cape Verde", value: "CV", flag: "🇨🇻" },
  { label: "Central African Republic", value: "CF", flag: "🇨🇫" },
  { label: "Chad", value: "TD", flag: "🇹🇩" },
  { label: "Chile", value: "CL", flag: "🇨🇱" },
  { label: "China", value: "CN", flag: "🇨🇳" },
  { label: "Colombia", value: "CO", flag: "🇨🇴" },
  { label: "Comoros", value: "KM", flag: "🇰🇲" },
  { label: "Congo - Brazzaville", value: "CG", flag: "🇨🇬" },
  { label: "Congo - Kinshasa", value: "CD", flag: "🇨🇩" },
  { label: "Costa Rica", value: "CR", flag: "🇨🇷" },
  { label: "Croatia", value: "HR", flag: "🇭🇷" },
  { label: "Cuba", value: "CU", flag: "🇨🇺" },
  { label: "Cyprus", value: "CY", flag: "🇨🇾" },
  { label: "Czechia", value: "CZ", flag: "🇨🇿" },
  { label: "Denmark", value: "DK", flag: "🇩🇰" },
  { label: "Djibouti", value: "DJ", flag: "🇩🇯" },
  { label: "Dominica", value: "DM", flag: "🇩🇲" },
  { label: "Dominican Republic", value: "DO", flag: "🇩🇴" },
  { label: "Ecuador", value: "EC", flag: "🇪🇨" },
  { label: "Egypt", value: "EG", flag: "🇪🇬" },
  { label: "El Salvador", value: "SV", flag: "🇸🇻" },
  { label: "Equatorial Guinea", value: "GQ", flag: "🇬🇶" },
  { label: "Eritrea", value: "ER", flag: "🇪🇷" },
  { label: "Estonia", value: "EE", flag: "🇪🇪" },
  { label: "Eswatini", value: "SZ", flag: "🇸🇿" },
  { label: "Ethiopia", value: "ET", flag: "🇪🇹" },
  { label: "Fiji", value: "FJ", flag: "🇫🇯" },
  { label: "Finland", value: "FI", flag: "🇫🇮" },
  { label: "France", value: "FR", flag: "🇫🇷" },
  { label: "Gabon", value: "GA", flag: "🇬🇦" },
  { label: "Gambia", value: "GM", flag: "🇬🇲" },
  { label: "Georgia", value: "GE", flag: "🇬🇪" },
  { label: "Germany", value: "DE", flag: "🇩🇪" },
  { label: "Ghana", value: "GH", flag: "🇬🇭" },
  { label: "Greece", value: "GR", flag: "🇬🇷" },
  { label: "Grenada", value: "GD", flag: "🇬🇩" },
  { label: "Guatemala", value: "GT", flag: "🇬🇹" },
  { label: "Guinea", value: "GN", flag: "🇬🇳" },
  { label: "Guinea-Bissau", value: "GW", flag: "🇬🇼" },
  { label: "Guyana", value: "GY", flag: "🇬🇾" },
  { label: "Haiti", value: "HT", flag: "🇭🇹" },
  { label: "Honduras", value: "HN", flag: "🇭🇳" },
  { label: "Hungary", value: "HU", flag: "🇭🇺" },
  { label: "Iceland", value: "IS", flag: "🇮🇸" },
  { label: "India", value: "IN", flag: "🇮🇳" },
  { label: "Indonesia", value: "ID", flag: "🇮🇩" },
  { label: "Iran", value: "IR", flag: "🇮🇷" },
  { label: "Iraq", value: "IQ", flag: "🇮🇶" },
  { label: "Ireland", value: "IE", flag: "🇮🇪" },
  { label: "Israel", value: "IL", flag: "🇮🇱" },
  { label: "Italy", value: "IT", flag: "🇮🇹" },
  { label: "Jamaica", value: "JM", flag: "🇯🇲" },
  { label: "Japan", value: "JP", flag: "🇯🇵" },
  { label: "Jordan", value: "JO", flag: "🇯🇴" },
  { label: "Kazakhstan", value: "KZ", flag: "🇰🇿" },
  { label: "Kenya", value: "KE", flag: "🇰🇪" },
  { label: "Kiribati", value: "KI", flag: "🇰🇮" },
  { label: "Kuwait", value: "KW", flag: "🇰🇼" },
  { label: "Kyrgyzstan", value: "KG", flag: "🇰🇬" },
  { label: "Laos", value: "LA", flag: "🇱🇦" },
  { label: "Latvia", value: "LV", flag: "🇱🇻" },
  { label: "Lebanon", value: "LB", flag: "🇱🇧" },
  { label: "Lesotho", value: "LS", flag: "🇱🇸" },
  { label: "Liberia", value: "LR", flag: "🇱🇷" },
  { label: "Libya", value: "LY", flag: "🇱🇾" },
  { label: "Liechtenstein", value: "LI", flag: "🇱🇮" },
  { label: "Lithuania", value: "LT", flag: "🇱🇹" },
  { label: "Luxembourg", value: "LU", flag: "🇱🇺" },
  { label: "Madagascar", value: "MG", flag: "🇲🇬" },
  { label: "Malawi", value: "MW", flag: "🇲🇼" },
  { label: "Malaysia", value: "MY", flag: "🇲🇾" },
  { label: "Maldives", value: "MV", flag: "🇲🇻" },
  { label: "Mali", value: "ML", flag: "🇲🇱" },
  { label: "Malta", value: "MT", flag: "🇲🇹" },
  { label: "Marshall Islands", value: "MH", flag: "🇲🇭" },
  { label: "Mauritania", value: "MR", flag: "🇲🇷" },
  { label: "Mauritius", value: "MU", flag: "🇲🇺" },
  { label: "Mexico", value: "MX", flag: "🇲🇽" },
  { label: "Micronesia", value: "FM", flag: "🇫🇲" },
  { label: "Moldova", value: "MD", flag: "🇲🇩" },
  { label: "Monaco", value: "MC", flag: "🇲🇨" },
  { label: "Mongolia", value: "MN", flag: "🇲🇳" },
  { label: "Montenegro", value: "ME", flag: "🇲🇪" },
  { label: "Morocco", value: "MA", flag: "🇲🇦" },
  { label: "Mozambique", value: "MZ", flag: "🇲🇿" },
  { label: "Myanmar (Burma)", value: "MM", flag: "🇲🇲" },
  { label: "Namibia", value: "NA", flag: "🇳🇦" },
  { label: "Nauru", value: "NR", flag: "🇳🇷" },
  { label: "Nepal", value: "NP", flag: "🇳🇵" },
  { label: "Netherlands", value: "NL", flag: "🇳🇱" },
  { label: "New Zealand", value: "NZ", flag: "🇳🇿" },
  { label: "Nicaragua", value: "NI", flag: "🇳🇮" },
  { label: "Niger", value: "NE", flag: "🇳🇪" },
  { label: "Nigeria", value: "NG", flag: "🇳🇬" },
  { label: "North Macedonia", value: "MK", flag: "🇲🇰" },
  { label: "Norway", value: "NO", flag: "🇳🇴" },
  { label: "Oman", value: "OM", flag: "🇴🇲" },
  { label: "Pakistan", value: "PK", flag: "🇵🇰" },
  { label: "Palau", value: "PW", flag: "🇵🇼" },
  { label: "Panama", value: "PA", flag: "🇵🇦" },
  { label: "Papua New Guinea", value: "PG", flag: "🇵🇬" },
  { label: "Paraguay", value: "PY", flag: "🇵🇾" },
  { label: "Peru", value: "PE", flag: "🇵🇪" },
  { label: "Philippines", value: "PH", flag: "🇵🇭" },
  { label: "Poland", value: "PL", flag: "🇵🇱" },
  { label: "Portugal", value: "PT", flag: "🇵🇹" },
  { label: "Qatar", value: "QA", flag: "🇶🇦" },
  { label: "Romania", value: "RO", flag: "🇷🇴" },
  { label: "Russia", value: "RU", flag: "🇷🇺" },
  { label: "Rwanda", value: "RW", flag: "🇷🇼" },
  { label: "Saint Kitts and Nevis", value: "KN", flag: "🇰🇳" },
  { label: "Saint Lucia", value: "LC", flag: "🇱🇨" },
  { label: "Saint Vincent and the Grenadines", value: "VC", flag: "🇻🇨" },
  { label: "Samoa", value: "WS", flag: "🇼🇸" },
  { label: "San Marino", value: "SM", flag: "🇸🇲" },
  { label: "Sao Tome and Principe", value: "ST", flag: "🇸🇹" },
  { label: "Saudi Arabia", value: "SA", flag: "🇸🇦" },
  { label: "Senegal", value: "SN", flag: "🇸🇳" },
  { label: "Serbia", value: "RS", flag: "🇷🇸" },
  { label: "Seychelles", value: "SC", flag: "🇸🇨" },
  { label: "Sierra Leone", value: "SL", flag: "🇸🇱" },
  { label: "Singapore", value: "SG", flag: "🇸🇬" },
  { label: "Slovakia", value: "SK", flag: "🇸🇰" },
  { label: "Slovenia", value: "SI", flag: "🇸🇮" },
  { label: "Solomon Islands", value: "SB", flag: "🇸🇧" },
  { label: "Somalia", value: "SO", flag: "🇸🇴" },
  { label: "South Africa", value: "ZA", flag: "🇿🇦" },
  { label: "South Korea", value: "KR", flag: "🇰🇷" },
  { label: "South Sudan", value: "SS", flag: "🇸🇸" },
  { label: "Spain", value: "ES", flag: "🇪🇸" },
  { label: "Sri Lanka", value: "LK", flag: "🇱🇰" },
  { label: "Sudan", value: "SD", flag: "🇸🇩" },
  { label: "Suriname", value: "SR", flag: "🇸🇷" },
  { label: "Sweden", value: "SE", flag: "🇸🇪" },
  { label: "Switzerland", value: "CH", flag: "🇨🇭" },
  { label: "Syria", value: "SY", flag: "🇸🇾" },
  { label: "Taiwan", value: "TW", flag: "🇹🇼" },
  { label: "Tajikistan", value: "TJ", flag: "🇹🇯" },
  { label: "Tanzania", value: "TZ", flag: "🇹🇿" },
  { label: "Thailand", value: "TH", flag: "🇹🇭" },
  { label: "Timor-Leste", value: "TL", flag: "🇹🇱" },
  { label: "Togo", value: "TG", flag: "🇹🇬" },
  { label: "Tonga", value: "TO", flag: "🇹🇴" },
  { label: "Trinidad and Tobago", value: "TT", flag: "🇹🇹" },
  { label: "Tunisia", value: "TN", flag: "🇹🇳" },
  { label: "Turkey", value: "TR", flag: "🇹🇷" },
  { label: "Turkmenistan", value: "TM", flag: "🇹🇲" },
  { label: "Tuvalu", value: "TV", flag: "🇹🇻" },
  { label: "Uganda", value: "UG", flag: "🇺🇬" },
  { label: "Ukraine", value: "UA", flag: "🇺🇦" },
  { label: "United Arab Emirates", value: "AE", flag: "🇦🇪" },
  { label: "United Kingdom", value: "GB", flag: "🇬🇧" },
  { label: "United States", value: "US", flag: "🇺🇸" },
  { label: "Uruguay", value: "UY", flag: "🇺🇾" },
  { label: "Uzbekistan", value: "UZ", flag: "🇺🇿" },
  { label: "Vanuatu", value: "VU", flag: "🇻🇺" },
  { label: "Vatican City", value: "VA", flag: "🇻🇦" },
  { label: "Venezuela", value: "VE", flag: "🇻🇪" },
  { label: "Vietnam", value: "VN", flag: "🇻🇳" },
  { label: "Yemen", value: "YE", flag: "🇾🇪" },
  { label: "Zambia", value: "ZM", flag: "🇿🇲" },
  { label: "Zimbabwe", value: "ZW", flag: "🇿🇼" }
];
const Tiktok = "data:image/svg+xml,%3csvg%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.3824%206.4976C14.5399%207.32798%2015.9579%207.81656%2017.4894%207.81656V4.85896C17.1996%204.85902%2016.9105%204.82869%2016.6269%204.7684V7.09645C15.0955%207.09645%2013.6777%206.60787%2012.5199%205.77755V11.8132C12.5199%2014.8325%2010.081%2017.2799%207.07256%2017.2799C5.95005%2017.2799%204.90673%2016.9394%204.04004%2016.3553C5.02922%2017.3703%206.40872%2018%207.93488%2018C10.9435%2018%2013.3825%2015.5525%2013.3825%2012.5331V6.4976H13.3824V6.4976ZM14.4464%203.51375C13.8549%202.86517%2013.4664%202.02701%2013.3824%201.10038V0.719971H12.5651C12.7708%201.89771%2013.4725%202.9039%2014.4464%203.51375ZM5.94286%2014.0384C5.61235%2013.6035%205.43374%2013.0714%205.43454%2012.5244C5.43454%2011.1435%206.5501%2010.0238%207.92639%2010.0238C8.18289%2010.0238%208.43784%2010.0632%208.68228%2010.141V7.11733C8.39662%207.07804%208.10832%207.06136%207.82014%207.06748V9.42098C7.57552%209.34314%207.32044%209.30361%207.06389%209.30385C5.68759%209.30385%204.5721%2010.4234%204.5721%2011.8045C4.5721%2012.781%205.12969%2013.6265%205.94286%2014.0384Z'%20fill='%23FF004F'/%3e%3cpath%20d='M12.5197%205.77749C13.6775%206.60781%2015.0954%207.09639%2016.6268%207.09639V4.76833C15.7719%204.5856%2015.0152%204.1373%2014.4462%203.51375C13.4723%202.90384%2012.7706%201.89765%2012.5649%200.719971H10.4179V12.533C10.4131%2013.9101%209.29943%2015.0252%207.92609%2015.0252C7.11681%2015.0252%206.39784%2014.6381%205.9425%2014.0384C5.12939%2013.6265%204.5718%2012.781%204.5718%2011.8046C4.5718%2010.4236%205.68729%209.30392%207.06359%209.30392C7.32728%209.30392%207.58144%209.34512%207.81984%209.42104V7.06754C4.86429%207.12882%202.4873%209.55238%202.4873%2012.533C2.4873%2014.0209%203.07923%2015.3698%204.03993%2016.3553C4.90662%2016.9394%205.94994%2017.28%207.07245%2017.28C10.0809%2017.28%2012.5198%2014.8324%2012.5198%2011.8132V5.77749H12.5197Z'%20fill='black'/%3e%3cpath%20d='M16.6269%204.76835V4.13886C15.8561%204.14004%2015.1004%203.92339%2014.4464%203.5137C15.0253%204.1498%2015.7877%204.5884%2016.6269%204.76835ZM12.565%200.719988C12.5454%200.607434%2012.5303%200.494138%2012.5199%200.38041V0H9.55551V11.8131C9.55078%2013.1901%208.43719%2014.3052%207.06373%2014.3052C6.6605%2014.3052%206.27979%2014.2091%205.94264%2014.0384C6.39798%2014.6381%207.11695%2015.0252%207.92623%2015.0252C9.29945%2015.0252%2010.4133%2013.9102%2010.4181%2012.533V0.719988H12.565ZM7.8201%207.06755V6.39742C7.57241%206.36344%207.32268%206.34639%207.07265%206.34652C4.06394%206.34645%201.625%208.79404%201.625%2011.8131C1.625%2013.7059%202.58354%2015.374%204.04013%2016.3552C3.07943%2015.3697%202.48751%2014.0208%202.48751%2012.533C2.48751%209.55239%204.86443%207.12883%207.8201%207.06755Z'%20fill='%2300F2EA'/%3e%3c/svg%3e";
const Yb = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_33_17641)'%3e%3cpath%20d='M23.5216%206.18547C23.3859%205.67489%2023.1185%205.20889%2022.7462%204.83413C22.3738%204.45936%2021.9095%204.18897%2021.3998%204.05002C19.5234%203.54547%2012.0234%203.54547%2012.0234%203.54547C12.0234%203.54547%204.52344%203.54547%202.64707%204.05002C2.13737%204.18897%201.6731%204.45936%201.30073%204.83413C0.928354%205.20889%200.660943%205.67489%200.525256%206.18547C0.0234376%208.07002%200.0234375%2012%200.0234375%2012C0.0234375%2012%200.0234376%2015.93%200.525256%2017.8146C0.660943%2018.3251%200.928354%2018.7911%201.30073%2019.1659C1.6731%2019.5407%202.13737%2019.8111%202.64707%2019.95C4.52344%2020.4546%2012.0234%2020.4546%2012.0234%2020.4546C12.0234%2020.4546%2019.5234%2020.4546%2021.3998%2019.95C21.9095%2019.8111%2022.3738%2019.5407%2022.7462%2019.1659C23.1185%2018.7911%2023.3859%2018.3251%2023.5216%2017.8146C24.0234%2015.93%2024.0234%2012%2024.0234%2012C24.0234%2012%2024.0234%208.07002%2023.5216%206.18547Z'%20fill='%23FF0302'/%3e%3cpath%20d='M9.56836%2015.5687V8.4314L15.8411%2012L9.56836%2015.5687Z'%20fill='%23FEFEFE'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_33_17641'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const creatorColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => /* @__PURE__ */ jsx("a", { children: text })
  },
  {
    title: "Platform",
    dataIndex: "platform",
    key: "platform"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country"
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      const isActive = text === "active";
      return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px]  ${isActive ? "bg-teal-100" : "bg-red-100"} `, children: [
        /* @__PURE__ */ jsx("div", { className: ` w-2 h-2 rounded-[50%] ${isActive ? "bg-teal-700" : "bg-red-700"}` }),
        /* @__PURE__ */ jsx("span", { className: `text-[12px] capitalize ${isActive ? "text-teal-700" : "text-red-700"}`, children: text })
      ] });
    }
  }
];
const socials = [
  {
    name: "Facebook",
    icon: Fb
  },
  {
    name: "Instagram",
    icon: Ig
  },
  {
    name: "Youtube",
    icon: Yb
  },
  {
    name: "Tiktok",
    icon: Tiktok
  }
];
const ReactQuill = React__default.lazy(() => import("react-quill"));
const Editor = ({ onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];
  const [code, setCode] = useState("");
  const handleProcedureContentChange = (content, delta, source, editor) => {
    setCode(content);
    onChange(content);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(
    ReactQuill,
    {
      theme: "snow",
      modules,
      formats,
      value: code,
      onChange: handleProcedureContentChange
    }
  ) }) });
};
const meta$3 = () => {
  return [{ title: "Add Campaign" }];
};
const { Option } = Select$1;
const CampaignForm = () => {
  const [form] = Form$1.useForm();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      campaignOverview: value,
      deadline: 0,
      discountType: "percentage",
      socialMedia: "facebook"
    };
    await createCampaign(payload).then((res) => toast.success("Create campaign successfully!")).catch((err) => toast.error(err == null ? void 0 : err.message)).finally(() => setLoading(false));
  };
  const [selectedSocials, setSelectedSocials] = useState([]);
  const handleSelectSocial = (id) => {
    setSelectedSocials(
      (prevSelected) => prevSelected.includes(id) ? prevSelected.filter((socialId) => socialId !== id) : [...prevSelected, id]
    );
  };
  const handleChangeContent = (content) => {
    setValue(content);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsx(
      Breadcrumb$1,
      {
        items: [
          {
            title: /* @__PURE__ */ jsx(Link, { to: "/manager/campaigns", children: "Campaigns" })
          },
          {
            title: /* @__PURE__ */ jsx("p", { className: "text-gray-800", children: "Add Campaign" })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-[750px] mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-gray-900 mt-[52px] mb-5 text-lg font-medium text-center", children: "Add Campaign" }),
      /* @__PURE__ */ jsxs(
        Form$1,
        {
          form,
          layout: "vertical",
          onFinish,
          style: { maxWidth: "600px", margin: "auto" },
          children: [
            /* @__PURE__ */ jsx(
              Form$1.Item,
              {
                label: "Campaign Name",
                name: "name",
                rules: [{ required: true, message: CAMPAIGN_REQUIRED }],
                children: /* @__PURE__ */ jsx(Input$1, {})
              }
            ),
            /* @__PURE__ */ jsx(
              Form$1.Item,
              {
                label: "Campaign Budget",
                name: "budget",
                rules: [{ required: true, message: BUDGET_REQUIRED }],
                children: /* @__PURE__ */ jsx(
                  InputNumber,
                  {
                    prefix: "$",
                    suffix: "USD",
                    min: 0,
                    style: { width: "100%" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("h6", { className: "text-sm text-gray-800 font-medium", children: "Social Media" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-5", children: "Place content posted for" }),
              /* @__PURE__ */ jsx("div", { className: "mt-5 flex items-center gap-3", children: socials.map((s) => /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => handleSelectSocial(s.name),
                  className: `w-[120px] cursor-pointer relative h-[120px] rounded-xl border flex items-center justify-center ${selectedSocials.includes(s.name) ? "border-blue-500" : "border-gray-200"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        checked: selectedSocials.includes(s.name),
                        className: "absolute top-3 left-3"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 items-center justify-center", children: [
                      /* @__PURE__ */ jsx("img", { src: s.icon, alt: "facebook" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[12px] text-gray-700", children: s.name })
                    ] })
                  ]
                }
              )) })
            ] }),
            /* @__PURE__ */ jsx(
              Form$1.Item,
              {
                label: "Campaign Deadline",
                name: "deadline",
                rules: [{ required: true, message: PLEASE_SELECT_DEADLINE }],
                children: /* @__PURE__ */ jsx(DatePicker, { style: { width: "100%" } })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-3", children: [
              /* @__PURE__ */ jsx(
                Form$1.Item,
                {
                  label: "Min Age",
                  name: "minAge",
                  rules: [{ required: true, message: REQUIRED }],
                  children: /* @__PURE__ */ jsx(
                    InputNumber,
                    {
                      min: 0,
                      style: { width: "100%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form$1.Item,
                {
                  label: "Max Age",
                  name: "maxAge",
                  rules: [{ required: true, message: REQUIRED }],
                  children: /* @__PURE__ */ jsx(
                    InputNumber,
                    {
                      min: 0,
                      style: { width: "100%" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Form$1.Item,
                {
                  label: "Gender",
                  name: "gender",
                  rules: [{ required: true, message: PLEASE_SELECT_GENDER }],
                  children: /* @__PURE__ */ jsxs(Select$1, { placeholder: "Select gender", children: [
                    /* @__PURE__ */ jsx(Option, { value: "male", children: "Male" }),
                    /* @__PURE__ */ jsx(Option, { value: "female", children: "Female" }),
                    /* @__PURE__ */ jsx(Option, { value: "all", children: "Other" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                Form$1.Item,
                {
                  label: "Location",
                  name: "location",
                  rules: [{ required: true, message: LOCATION_REQUIRED }],
                  children: /* @__PURE__ */ jsx(
                    Select$1,
                    {
                      placeholder: "Select a country",
                      showSearch: true,
                      allowClear: true,
                      optionFilterProp: "label",
                      children: countries.map((country) => /* @__PURE__ */ jsxs(Select$1.Option, { value: country.value, children: [
                        /* @__PURE__ */ jsx("span", { role: "img", "aria-label": country.label, className: "mr-2", children: country.flag }),
                        country.label
                      ] }, country.value))
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Form$1.Item,
              {
                label: "Discount",
                name: "discount",
                rules: [{ required: true, message: DISCOUNT_REQUIRED }],
                children: /* @__PURE__ */ jsx(
                  InputNumber,
                  {
                    prefix: "%",
                    min: 0,
                    max: 100,
                    style: { width: "100%" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-4  border-t border-gray-200 mb-8 pt-6", children: [
              /* @__PURE__ */ jsx("h6", { className: "text-sm text-gray-800 font-medium", children: "Campaign Overview" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-5", children: "A summary or description of campaign's goals and strategy." }),
              /* @__PURE__ */ jsx(Editor, { onChange: (value2) => handleChangeContent(value2) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-end h-[35px] mb-8  items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "h-full flex items-center", children: /* @__PURE__ */ jsx(Form$1.Item, { name: "status", initialValue: "active", style: { margin: 0 }, children: /* @__PURE__ */ jsxs(Radio.Group, { children: [
                /* @__PURE__ */ jsx(Radio, { value: "active", children: "Active" }),
                /* @__PURE__ */ jsx(Radio, { value: "draft", children: "Draft" }),
                /* @__PURE__ */ jsx(Radio, { value: "archive", children: "Archive" })
              ] }) }) }),
              /* @__PURE__ */ jsx("div", { className: "h-full ml-4", children: /* @__PURE__ */ jsx(Form$1.Item, { children: /* @__PURE__ */ jsx(Button$1, { loading, type: "primary", htmlType: "submit", style: { width: "100%" }, children: "Save changes" }) }) })
            ] })
          ]
        }
      )
    ] })
  ] });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CampaignForm,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function InviteCard() {
  const [invited, setInvited] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-md flex items-center justify-between border border-[#ESE7EB]", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx(Checkbox, {}),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(Avatar$1, { src: "https://api.dicebear.com/7.x/miniavs/svg?seed=1" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "text-[#1F2937] text-sm", children: "Ralph Edwards" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#6B7280] text-sm", children: "khoiliam.dev@gmail.com" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 mt-2", children: [
            /* @__PURE__ */ jsx(Button$1, { type: "text", className: "bg-[#E5E7EB]", children: "Age: 20" }),
            /* @__PURE__ */ jsx(Button$1, { type: "text", className: "bg-[#E5E7EB]", children: "Female" }),
            /* @__PURE__ */ jsx(Button$1, { type: "text", className: "bg-[#E5E7EB]", children: "Vietnam" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { children: invited ? /* @__PURE__ */ jsxs("div", { className: "flex h-[36px] justify-center rounded-md w-[99px] items-center gap-1 bg-[#F3F4F6]", children: [
      /* @__PURE__ */ jsx(CheckIcon, { width: 20 }),
      "Invited"
    ] }) : /* @__PURE__ */ jsx(Button$1, { onClick: () => setInvited(true), type: "primary", children: "Invite" }) })
  ] });
}
function campaignCard() {
  const [isModal, setIsModal] = useState(false);
  const handleMenuClick = (key) => {
    switch (key) {
      case "invite":
        setIsModal(true);
        break;
      case "view":
        console.log("View details clicked");
        break;
      case "edit":
        console.log("Edit clicked");
        break;
      case "delete":
        console.log("Delete clicked");
        break;
    }
  };
  const menu = /* @__PURE__ */ jsx(Menu, { onClick: (e) => handleMenuClick(e.key), children: campaignMenuItems.map((item) => /* @__PURE__ */ jsx(Menu.Item, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
    item.icon,
    item.label
  ] }) }, item.key)) });
  return /* @__PURE__ */ jsxs("div", { className: "h-[300px] p-5 border flex flex-col justify-between border-[#E5E7EB] rounded-[20px] shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "items-center flex justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center px-4   gap-1 rounded-[50px] h-[28px] bg-[#CCFBF1]", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-[#0F766E] w-2 h-2 rounded-[50%]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] ", children: "Active" })
      ] }),
      /* @__PURE__ */ jsx(Dropdown, { overlay: menu, trigger: ["click"], children: /* @__PURE__ */ jsx("button", { className: "hover:bg-[#D1D5DB] bg-[#F3F4F6] transition-all w-7 h-7 flex justify-center items-center rounded-md", children: /* @__PURE__ */ jsx(EllipsisHorizontalIcon, { width: 20 }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4f", children: [
      /* @__PURE__ */ jsx("h5", { className: "text-sm text-[#1F2937] font-medium", children: "Campaign Name 01" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(CalendarDaysIcon, { width: 16, color: "#6B7280" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[#6B7280]", children: "01-09-2024 - 30-09-2024" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-1/2 p-3 h-[100px] flex flex-col justify-between rounded-xl bg-[#F3F4F6]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6B7280] font-semibold", children: "Revenue on investment" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#111827] font-semibold text-[18px]", children: "%20.5" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-1/2 p-3 h-[100px] rounded-xl bg-[#F3F4F6]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6B7280] font-semibold", children: "Performance (CVR ETC)" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#111827] font-semibold text-[18px]", children: "%20.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("button", { className: "bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-semibold rounded-[8px] text-[#1F2937]", children: [
      /* @__PURE__ */ jsx(UserPlusIcon, { width: 16 }),
      "  Invite"
    ] }) }),
    /* @__PURE__ */ jsx(Modal, { width: 650, title: "Invite Incluencer", open: isModal, onCancel: () => setIsModal(false), footer: [
      /* @__PURE__ */ jsxs("div", { className: "flex border-t border-t-gray-300 pt-5 items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(Button$1, { type: "default", children: "Close" }),
        /* @__PURE__ */ jsx(Button$1, { type: "primary", children: "Send Invitation" })
      ] })
    ], children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "text-[#374151] text-center", children: "Invite your Influencer to review collaborate on this campaign." }),
      /* @__PURE__ */ jsxs("div", { className: "flex mt-8 items-center justify-between", children: [
        /* @__PURE__ */ jsx(Checkbox, { children: "Select All" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#1F2937] text-sm", children: "Already in this campaign (0)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "h-[330px] mb-8 mt-4 pr-2 overflow-y-scroll w-full flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {}),
        /* @__PURE__ */ jsx(InviteCard, {})
      ] })
    ] }) })
  ] });
}
const InputSearch = React.forwardRef(
  ({ className, type, hasError, label, errorMessage, ...props }, ref) => {
    return /* @__PURE__ */ jsxs("div", { children: [
      label && /* @__PURE__ */ jsx(Label, { htmlFor: props.id, children: label }),
      /* @__PURE__ */ jsxs("div", { className: cn(
        "flex h-9 w-full mt-1 items-center gap-1 rounded-md border px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-0",
        hasError ? "border-red-500" : "border-input focus:border-blue-600",
        className
      ), children: [
        /* @__PURE__ */ jsx(MagnifyingGlassIcon, { width: 20, color: "#6B7280" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "w-full border-none outline-none",
            type,
            ref,
            ...props
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm mt-1", children: errorMessage })
    ] });
  }
);
InputSearch.displayName = "Input";
const meta$2 = () => {
  return [{ title: "Campaigns" }];
};
function page() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl text-gray-900", children: "Campaigns" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Manage your campaigns and view their sales performance." })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/manager/campaign/add-campaign", children: /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-1", color: "white", width: 20 }),
        "  Add Campaign"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-end justify-between", children: [
      /* @__PURE__ */ jsx(InputSearch, { placeholder: "Campaign name", className: "w-[300px] h-[36px] " }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("button", { className: "bg-[#F3F4F6] px-3 justify-between flex items-center px hover:bg-[#D1D5DB] transition-all text-sm h-[36px] w-[123px] font-semibold rounded-[12px] text-[#1F2937]", children: [
          "All Status",
          /* @__PURE__ */ jsx(ChevronUpDownIcon, { width: 16 })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-semibold rounded-[12px] text-[#1F2937]", children: [
          /* @__PURE__ */ jsx(AdjustmentsHorizontalIcon, { width: 16 }),
          "  Filter"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "bg-[#F3F4F6] hover:bg-[#D1D5DB] transition-all flex items-center justify-center gap-1 text-sm h-[36px] w-[87px] font-semibold rounded-[12px] text-[#1F2937]", children: [
          /* @__PURE__ */ jsx(CloudArrowDownIcon, { width: 16 }),
          "  Export"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-6 mt-5", children: [
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {}),
      /* @__PURE__ */ jsx(campaignCard, {})
    ] })
  ] });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const tiktokCover = "/assets/tiktok-cover-o2rR4eid.jpeg";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex select-none cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden cursor-pointer rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon$1, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function ContentManagment() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full min-h-screen", children: /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-muted/40", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "#",
          className: "flex items-center gap-2 text-lg font-semibold sm:text-base mr-4",
          children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Social Media Dashboard" })
        }
      ),
      /* @__PURE__ */ jsxs("nav", { className: "hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "#", className: "font-bold", children: "Instagram" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-muted-foreground", children: "TikTok" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-muted-foreground", children: "Facebook" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-muted-foreground", children: "Twitter" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto w-full flex items-center gap-4 justify-end", children: [
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "flex-1 justify-between max-w-60",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Filter by Campaign" }),
                /* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-4 h-4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", className: "w-full", children: [
            /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Select Campaign" }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: true, children: "Summer Collection" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Holiday Promo" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Back to School" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "flex-1 justify-between max-w-60",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Filter by Influencer" }),
                /* @__PURE__ */ jsx(ChevronDownIcon, { className: "w-4 h-4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", className: "w-full", children: [
            /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Select Influencer" }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: true, children: "@jaredpalmer" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "@shadcn" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "@maxleiter" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "@shuding_" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl w-full mx-auto", children: [
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "1.2K views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "250 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Summer Collection" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@jaredpalmer" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "800 views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "180 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Holiday Promo" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@shadcn" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "1.5K views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "300 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Back to School" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@maxleiter" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "2.1K views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "400 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Summer Collection" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@shuding_" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "900 views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "150 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Holiday Promo" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@jaredpalmer" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "1.1K views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "220 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Back to School" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@shadcn" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "1.1K views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "220 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Back to School" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@shadcn" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: tiktokCover,
              width: 400,
              height: 400,
              alt: "Image",
              className: "object-cover w-full aspect-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "grid gap-2 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "1.1K views" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsx(HeartIcon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "220 likes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Back to School" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "@shadcn" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function ChevronDownIcon(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
function EyeIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
      ]
    }
  );
}
function HeartIcon(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
    }
  );
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContentManagment
}, Symbol.toStringTag, { value: "Module" }));
const avatar = "/assets/avatar-k5i8dFE7.jpeg";
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartTooltipContent = React.forwardRef(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart();
    const tooltipLabel = React.useMemo(() => {
      var _a;
      if (hideLabel || !(payload == null ? void 0 : payload.length)) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
      if (labelFormatter) {
        return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      }
      if (!value) {
        return null;
      }
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey
    ]);
    if (!active || !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        ),
        children: [
          !nestLabel ? tooltipLabel : null,
          /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                ),
                children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                          nestLabel ? tooltipLabel : null,
                          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
                        ] }),
                        item.value && /* @__PURE__ */ jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              item.dataKey
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegendContent = React.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!(payload == null ? void 0 : payload.length)) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        ),
        children: payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              ),
              children: [
                (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-2 w-2 shrink-0 rounded-[2px]",
                    style: {
                      backgroundColor: item.color
                    }
                  }
                ),
                itemConfig == null ? void 0 : itemConfig.label
              ]
            },
            item.value
          );
        })
      }
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const chartData$1 = [
  { month: "TikTok", desktop: 186 },
  { month: "Instagram", desktop: 285 },
  { month: "X", desktop: 237 },
  { month: "Youtube", desktop: 203 },
  { month: "Facebook", desktop: 209 },
  { month: "Threads", desktop: 264 }
];
const chartConfig$1 = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))"
  }
};
function AudienceChart() {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "items-center pb-4", children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Audience Breakdown" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Demographic breakdown of the influencer's audience." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "pb-0", children: /* @__PURE__ */ jsx(
      ChartContainer,
      {
        config: chartConfig$1,
        className: "mx-auto aspect-square max-h-[250px]",
        children: /* @__PURE__ */ jsxs(RadarChart, { data: chartData$1, children: [
          /* @__PURE__ */ jsx(
            ChartTooltip,
            {
              cursor: false,
              content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true })
            }
          ),
          /* @__PURE__ */ jsx(PolarGrid, { className: "fill-[--color-desktop] opacity-20" }),
          /* @__PURE__ */ jsx(PolarAngleAxis, { dataKey: "month" }),
          /* @__PURE__ */ jsx(
            Radar,
            {
              dataKey: "desktop",
              fill: "var(--color-desktop)",
              fillOpacity: 0.5
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex-col gap-2 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-medium leading-none", children: [
        "Trending up by 5.2% this month ",
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 leading-none text-muted-foreground", children: "January - June 2024" })
    ] })
  ] });
}
function Profile() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Breadcrumb, { className: "hidden md:flex mb-6", children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "#", children: "Creators" }) }) }),
      /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: "001" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "w-full bg-background", children: [
      /* @__PURE__ */ jsx("header", { className: "bg-muted px-4 py-6 md:px-6 md:py-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex max-w-6xl items-center gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-20 w-20 md:h-24 md:w-24", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: avatar,
                alt: "Influencer Profile",
                className: "rounded-full",
                width: 96,
                height: 96
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-medium" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold md:text-3xl", children: "Amelia Williamson" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsx(MapPinIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Los Angeles, CA" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "#",
                className: "text-muted-foreground hover:text-primary",
                children: /* @__PURE__ */ jsx(InstagramIcon, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "#",
                className: "text-muted-foreground hover:text-primary",
                children: /* @__PURE__ */ jsx(TwitterIcon, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "#",
                className: "text-muted-foreground hover:text-primary",
                children: /* @__PURE__ */ jsx(YoutubeIcon, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "#",
                className: "text-muted-foreground hover:text-primary",
                children: /* @__PURE__ */ jsx(TwitterIcon, { className: "h-6 w-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Button, { children: "Collaborate" }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Message" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("main", { className: "container mx-auto max-w-6xl py-8 md:py-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardDescription, { children: "Followers" }),
                /* @__PURE__ */ jsx(CardTitle, { children: "345K" })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(TrendingUpIcon, { className: "h-4 w-4 text-green-500" }),
                /* @__PURE__ */ jsx("span", { children: "+12.5% this month" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardDescription, { children: "Engagement Rate" }),
                /* @__PURE__ */ jsx(CardTitle, { children: "5.6%" })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(TrendingDownIcon, { className: "h-4 w-4 text-red-500" }),
                /* @__PURE__ */ jsx("span", { children: "-1.2% this month" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardDescription, { children: "Audience Age" }),
                /* @__PURE__ */ jsx(CardTitle, { children: "25-34 years" })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(UsersIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "65% female, 35% male" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardDescription, { children: "Audience Location" }),
                /* @__PURE__ */ jsx(CardTitle, { children: "United States" })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsx(MapPinIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: "Top cities: Los Angeles, New York, Chicago" })
              ] }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Influence Score" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Estimated influence based on followers, engagement, and content." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-6xl font-bold", children: "87" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 mt-8 md:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2", children: /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Engagement Metrics" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Average engagement rate, likes, comments, and shares." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsx(LinechartChart, { className: "aspect-[9/4]" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx(AudienceChart, {}) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 mt-8", children: /* @__PURE__ */ jsxs(Card, { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Portfolio" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Past collaborations and sponsored content." })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 225,
                  alt: "Portfolio Item",
                  className: "rounded-lg object-cover aspect-video"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Sponsored Post" }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Skincare" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 225,
                  alt: "Portfolio Item",
                  className: "rounded-lg object-cover aspect-video"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Collaboration" }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Fashion" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 225,
                  alt: "Portfolio Item",
                  className: "rounded-lg object-cover aspect-video"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Sponsored Content" }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Travel" })
              ] })
            ] })
          ] })
        ] }) })
      ] })
    ] }) })
  ] });
}
function InstagramIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }),
        /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
        /* @__PURE__ */ jsx("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" })
      ]
    }
  );
}
function LinechartChart(props) {
  return /* @__PURE__ */ jsx("div", { ...props, children: /* @__PURE__ */ jsx(
    ChartContainer,
    {
      config: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-3a))"
        }
      },
      children: /* @__PURE__ */ jsxs(
        LineChart,
        {
          accessibilityLayer: true,
          data: [
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 }
          ],
          margin: {
            left: 12,
            right: 12
          },
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "month",
                tickLine: false,
                axisLine: false,
                tickMargin: 8,
                tickFormatter: (value) => value.slice(0, 3)
              }
            ),
            /* @__PURE__ */ jsx(
              ChartTooltip,
              {
                cursor: false,
                content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true })
              }
            ),
            /* @__PURE__ */ jsx(
              Line,
              {
                dataKey: "desktop",
                type: "natural",
                stroke: "var(--color-desktop)",
                strokeWidth: 2,
                dot: false
              }
            )
          ]
        }
      )
    }
  ) });
}
function MapPinIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
      ]
    }
  );
}
function TrendingDownIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }),
        /* @__PURE__ */ jsx("polyline", { points: "16 17 22 17 22 11" })
      ]
    }
  );
}
function TrendingUpIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }),
        /* @__PURE__ */ jsx("polyline", { points: "16 7 22 7 22 13" })
      ]
    }
  );
}
function TwitterIcon(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" })
    }
  );
}
function UsersIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
        /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
        /* @__PURE__ */ jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
        /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
      ]
    }
  );
}
function YoutubeIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" }),
        /* @__PURE__ */ jsx("path", { d: "m10 15 5-3-5-3z" })
      ]
    }
  );
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [{ title: "Creators" }];
};
const data = [
  {
    id: "234",
    name: "John Brown",
    platform: "Facebook",
    email: "john.brown@example.com",
    country: "USA",
    score: 85,
    status: "active"
  },
  {
    id: "2344",
    name: "Jim Green",
    platform: "Twitter",
    email: "jim.green@example.com",
    country: "UK",
    score: 72,
    status: "inactive"
  },
  {
    id: "23434",
    name: "Joe Black",
    platform: "Instagram",
    email: "joe.black@example.com",
    country: "Australia",
    score: 90,
    status: "active"
  },
  {
    id: "234234",
    name: "Lucy White",
    platform: "LinkedIn",
    email: "lucy.white@example.com",
    country: "Canada",
    score: 60,
    status: "inactive"
  },
  {
    id: "234324",
    name: "Mark Grey",
    platform: "TikTok",
    email: "mark.grey@example.com",
    country: "USA",
    score: 95,
    status: "active"
  }
];
const Page$1 = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "flex w-full justify-end mb-5", children: /* @__PURE__ */ jsxs(Button$1, { type: "primary", children: [
      /* @__PURE__ */ jsx(CloudArrowDownIcon, { width: 20 }),
      " Import CSV"
    ] }) }),
    /* @__PURE__ */ jsx(Table$1, { columns: creatorColumns, dataSource: data })
  ] });
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        // @ts-ignore
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const chartData = [
  { date: "2024-04-01", total: 222, MRR: 150 },
  { date: "2024-04-02", total: 97, MRR: 180 },
  { date: "2024-04-03", total: 167, MRR: 120 },
  { date: "2024-04-04", total: 242, MRR: 260 },
  { date: "2024-04-05", total: 373, MRR: 290 },
  { date: "2024-04-06", total: 301, MRR: 340 },
  { date: "2024-04-07", total: 245, MRR: 180 },
  { date: "2024-04-08", total: 409, MRR: 320 },
  { date: "2024-04-09", total: 59, MRR: 110 },
  { date: "2024-04-10", total: 261, MRR: 190 },
  { date: "2024-04-11", total: 327, MRR: 350 },
  { date: "2024-04-12", total: 292, MRR: 210 },
  { date: "2024-04-13", total: 342, MRR: 380 },
  { date: "2024-04-14", total: 137, MRR: 220 },
  { date: "2024-04-15", total: 120, MRR: 170 },
  { date: "2024-04-16", total: 138, MRR: 190 },
  { date: "2024-04-17", total: 446, MRR: 360 },
  { date: "2024-04-18", total: 364, MRR: 410 },
  { date: "2024-04-19", total: 243, MRR: 180 },
  { date: "2024-04-20", total: 89, MRR: 150 },
  { date: "2024-04-21", total: 137, MRR: 200 },
  { date: "2024-04-22", total: 224, MRR: 170 },
  { date: "2024-04-23", total: 138, MRR: 230 },
  { date: "2024-04-24", total: 387, MRR: 290 },
  { date: "2024-04-25", total: 215, MRR: 250 },
  { date: "2024-04-26", total: 75, MRR: 130 },
  { date: "2024-04-27", total: 383, MRR: 420 },
  { date: "2024-04-28", total: 122, MRR: 180 },
  { date: "2024-04-29", total: 315, MRR: 240 },
  { date: "2024-04-30", total: 454, MRR: 380 },
  { date: "2024-05-01", total: 165, MRR: 220 },
  { date: "2024-05-02", total: 293, MRR: 310 },
  { date: "2024-05-03", total: 247, MRR: 190 },
  { date: "2024-05-04", total: 385, MRR: 420 },
  { date: "2024-05-05", total: 481, MRR: 390 },
  { date: "2024-05-06", total: 498, MRR: 520 },
  { date: "2024-05-07", total: 388, MRR: 300 },
  { date: "2024-05-08", total: 149, MRR: 210 },
  { date: "2024-05-09", total: 227, MRR: 180 },
  { date: "2024-05-10", total: 293, MRR: 330 },
  { date: "2024-05-11", total: 335, MRR: 270 },
  { date: "2024-05-12", total: 197, MRR: 240 },
  { date: "2024-05-13", total: 197, MRR: 160 },
  { date: "2024-05-14", total: 448, MRR: 490 },
  { date: "2024-05-15", total: 473, MRR: 380 },
  { date: "2024-05-16", total: 338, MRR: 400 },
  { date: "2024-05-17", total: 499, MRR: 420 },
  { date: "2024-05-18", total: 315, MRR: 350 },
  { date: "2024-05-19", total: 235, MRR: 180 },
  { date: "2024-05-20", total: 177, MRR: 230 },
  { date: "2024-05-21", total: 82, MRR: 140 },
  { date: "2024-05-22", total: 81, MRR: 120 },
  { date: "2024-05-23", total: 252, MRR: 290 },
  { date: "2024-05-24", total: 294, MRR: 220 },
  { date: "2024-05-25", total: 201, MRR: 250 },
  { date: "2024-05-26", total: 213, MRR: 170 },
  { date: "2024-05-27", total: 420, MRR: 460 },
  { date: "2024-05-28", total: 233, MRR: 190 },
  { date: "2024-05-29", total: 78, MRR: 130 },
  { date: "2024-05-30", total: 340, MRR: 280 },
  { date: "2024-05-31", total: 178, MRR: 230 },
  { date: "2024-06-01", total: 178, MRR: 200 },
  { date: "2024-06-02", total: 470, MRR: 410 },
  { date: "2024-06-03", total: 103, MRR: 160 },
  { date: "2024-06-04", total: 439, MRR: 380 },
  { date: "2024-06-05", total: 88, MRR: 140 },
  { date: "2024-06-06", total: 294, MRR: 250 },
  { date: "2024-06-07", total: 323, MRR: 370 },
  { date: "2024-06-08", total: 385, MRR: 320 },
  { date: "2024-06-09", total: 438, MRR: 480 },
  { date: "2024-06-10", total: 155, MRR: 200 },
  { date: "2024-06-11", total: 92, MRR: 150 },
  { date: "2024-06-12", total: 492, MRR: 420 },
  { date: "2024-06-13", total: 81, MRR: 130 },
  { date: "2024-06-14", total: 426, MRR: 380 },
  { date: "2024-06-15", total: 307, MRR: 350 },
  { date: "2024-06-16", total: 371, MRR: 310 },
  { date: "2024-06-17", total: 475, MRR: 520 },
  { date: "2024-06-18", total: 107, MRR: 170 },
  { date: "2024-06-19", total: 341, MRR: 290 },
  { date: "2024-06-20", total: 408, MRR: 450 },
  { date: "2024-06-21", total: 169, MRR: 210 },
  { date: "2024-06-22", total: 317, MRR: 270 },
  { date: "2024-06-23", total: 480, MRR: 530 },
  { date: "2024-06-24", total: 132, MRR: 180 },
  { date: "2024-06-25", total: 141, MRR: 190 },
  { date: "2024-06-26", total: 434, MRR: 380 },
  { date: "2024-06-27", total: 448, MRR: 490 },
  { date: "2024-06-28", total: 149, MRR: 200 },
  { date: "2024-06-29", total: 103, MRR: 160 },
  { date: "2024-06-30", total: 446, MRR: 400 }
];
const chartConfig = {
  views: {
    label: "Page Views"
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))"
  },
  MRR: {
    label: "MRR",
    color: "hsl(var(--chart-2))"
  }
};
function RevenueChart() {
  const [date, setDate] = React.useState();
  const [activeChart, setActiveChart] = React.useState("total");
  const total = React.useMemo(
    () => ({
      total: chartData.reduce((acc, curr) => acc + curr.total, 0),
      MRR: chartData.reduce((acc, curr) => acc + curr.MRR, 0)
    }),
    []
  );
  const className = "datetimeRange";
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Revenue" }),
        /* @__PURE__ */ jsx(CardDescription, { children: /* @__PURE__ */ jsx("div", { className: cn("grid gap-2", className), children: /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              id: "date",
              variant: "outline",
              className: cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              ),
              children: [
                /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                (date == null ? void 0 : date.from) ? date.to ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  format(date.from, "LLL dd, y"),
                  " -",
                  " ",
                  format(date.to, "LLL dd, y")
                ] }) : format(date.from, "LLL dd, y") : /* @__PURE__ */ jsx("span", { children: "Pick a date" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              initialFocus: true,
              mode: "range",
              defaultMonth: date == null ? void 0 : date.from,
              selected: date,
              onSelect: setDate,
              numberOfMonths: 2
            }
          ) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex", children: ["total", "MRR"].map((key) => {
        const chart = key;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            "data-active": activeChart === chart,
            className: "relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6",
            onClick: () => setActiveChart(chart),
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: chartConfig[chart].label }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold leading-none sm:text-3xl", children: total[key].toLocaleString() })
            ]
          },
          chart
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "px-2 sm:p-6", children: /* @__PURE__ */ jsx(
      ChartContainer,
      {
        config: chartConfig,
        className: "aspect-auto h-[250px] w-full",
        children: /* @__PURE__ */ jsxs(
          BarChart,
          {
            accessibilityLayer: true,
            data: chartData,
            margin: {
              left: 12,
              right: 12
            },
            children: [
              /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
              /* @__PURE__ */ jsx(
                XAxis,
                {
                  dataKey: "date",
                  tickLine: false,
                  axisLine: false,
                  tickMargin: 8,
                  minTickGap: 32,
                  tickFormatter: (value) => {
                    const date2 = new Date(value);
                    return date2.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    });
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                ChartTooltip,
                {
                  content: /* @__PURE__ */ jsx(
                    ChartTooltipContent,
                    {
                      className: "w-[150px]",
                      nameKey: "views",
                      labelFormatter: (value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        });
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(Bar, { dataKey: activeChart, fill: `var(--color-${activeChart})` })
            ]
          }
        )
      }
    ) })
  ] });
}
function Charts() {
  return /* @__PURE__ */ jsx("div", { className: "chart-wrapper flex flex-col flex-wrap items-start justify-center gap-6 sm:flex-row", children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx(RevenueChart, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between my-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "max-w-xs", "x-chunk": "charts-01-chunk-6", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-4 pb-0", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Total Reach" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "You're total reach has increased by 40%. Good job!" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-row items-baseline gap-4 p-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none", children: [
            "80",
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "%" })
          ] }),
          /* @__PURE__ */ jsx(
            ChartContainer,
            {
              config: {
                calories: {
                  label: "Calories",
                  color: "hsl(var(--chart-1))"
                }
              },
              className: "ml-auto w-[64px]"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-xs", "x-chunk": "charts-01-chunk-6", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-4 pb-0", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Total Engangment" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "You're total reach has increased by 40%. Good job!" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-row items-baseline gap-4 p-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none", children: [
            "80",
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "%" })
          ] }),
          /* @__PURE__ */ jsx(
            ChartContainer,
            {
              config: {
                calories: {
                  label: "Calories",
                  color: "hsl(var(--chart-1))"
                }
              },
              className: "ml-auto w-[64px]"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-xs", "x-chunk": "charts-01-chunk-6", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-4 pb-0", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Total Conversion" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "You're total reach has increased by 40%. Good job!" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-row items-baseline gap-4 p-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none", children: [
            "80",
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "%" })
          ] }),
          /* @__PURE__ */ jsx(
            ChartContainer,
            {
              config: {
                calories: {
                  label: "Calories",
                  color: "hsl(var(--chart-1))"
                }
              },
              className: "ml-auto w-[64px]"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "max-w-xs", "x-chunk": "charts-01-chunk-6", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-4 pb-0", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Total Clicks" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "You're total reach has increased by 40%. Good job!" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-row items-baseline gap-4 p-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none", children: [
            "80",
            /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "%" })
          ] }),
          /* @__PURE__ */ jsx(
            ChartContainer,
            {
              config: {
                calories: {
                  label: "Calories",
                  color: "hsl(var(--chart-1))"
                }
              },
              className: "ml-auto w-[64px]"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const meta = () => {
  return [{ title: "Dashboard" }];
};
function Page() {
  return /* @__PURE__ */ jsxs("main", { className: "flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold md:text-2xl", children: "Dashboard for managers" }) }),
    /* @__PURE__ */ jsx(Charts, {}),
    /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-05-chunk-3", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Deadlines" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Upcoming deadlines" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Creator" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Platform" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Campaign" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Deadline" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { className: "bg-accent", children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Liam Johnson" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "liam@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-23" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$250.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Olivia Smith" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "olivia@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Refund" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "outline", children: "Declined" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-24" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$150.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Noah Williams" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "noah@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Subscription" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-25" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$350.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Emma Brown" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "emma@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-26" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$450.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Liam Johnson" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "liam@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-23" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$250.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Olivia Smith" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "olivia@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Refund" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "outline", children: "Declined" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-24" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$150.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Emma Brown" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "emma@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "#4321" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Campaign Name goes here" }) })
            ] }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-26" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$450.00" })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-05-chunk-3", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Active campaigns" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Currently active campaigns" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Creator" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Platform" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Deadline" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { className: "bg-accent", children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Liam Johnson" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "liam@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-23" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$250.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Olivia Smith" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "olivia@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Refund" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "outline", children: "Declined" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-24" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$150.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Noah Williams" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "noah@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Subscription" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-25" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$350.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Emma Brown" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "emma@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-26" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$450.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Liam Johnson" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "liam@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-23" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$250.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Olivia Smith" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "olivia@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Refund" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "outline", children: "Declined" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-24" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$150.00" })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxs(TableCell, { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Emma Brown" }),
              /* @__PURE__ */ jsx("div", { className: "hidden text-sm text-muted-foreground md:inline", children: "emma@example.com" })
            ] }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: "Sale" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Fulfilled" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-06-26" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$450.00" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function ProductManagment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const products = [
    {
      id: 1,
      title: "Cozy Sweater",
      image: "/placeholder.svg",
      price: 49.99
    },
    {
      id: 2,
      title: "Leather Backpack",
      image: "/placeholder.svg",
      price: 79.99
    },
    {
      id: 3,
      title: "Floral Dress",
      image: "/placeholder.svg",
      price: 59.99
    },
    {
      id: 4,
      title: "Hiking Boots",
      image: "/placeholder.svg",
      price: 99.99
    },
    {
      id: 5,
      title: "Ceramic Mug",
      image: "/placeholder.svg",
      price: 14.99
    },
    {
      id: 6,
      title: "Bamboo Sunglasses",
      image: "/placeholder.svg",
      price: 29.99
    }
  ];
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  const handleProductSelect = (product) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  const handleImport = () => {
    console.log("Importing selected products:", selectedProducts);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col h-screen", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx("header", { className: "bg-muted/40 py-4 px-6", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Import Products from Shopify" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto py-8 px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "search",
          placeholder: "Search products...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full rounded-md max-w-96 bg-background px-4 py-2 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: filteredProducts.map((product) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-background rounded-md shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  alt: product.title,
                  width: 300,
                  height: 300,
                  className: "w-full h-48 object-cover",
                  style: { aspectRatio: "300/300", objectFit: "cover" }
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: `absolute top-2 right-2 bg-background rounded-full p-2 transition-colors ${selectedProducts.some((p) => p.id === product.id) ? "text-primary" : "text-muted-foreground hover:text-primary"}`,
                  onClick: () => handleProductSelect(product),
                  children: /* @__PURE__ */ jsx(PackagePlusIcon, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: product.title }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
                "$",
                product.price
              ] })
            ] })
          ]
        },
        product.id
      )) })
    ] }) }),
    selectedProducts.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-muted py-4 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium mb-2", children: "Selected Products" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedProducts.map((product) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: placeholder,
              alt: product.title,
              width: 40,
              height: 40,
              className: "rounded-md",
              style: { aspectRatio: "40/40", objectFit: "cover" }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: product.title }),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "$",
            product.price.toFixed(2)
          ] })
        ] }, product.id)) })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: handleImport, className: "shrink-0", children: "Import Selected" })
    ] }) })
  ] }) });
}
function PackagePlusIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M16 16h6" }),
        /* @__PURE__ */ jsx("path", { d: "M19 13v6" }),
        /* @__PURE__ */ jsx("path", { d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" }),
        /* @__PURE__ */ jsx("path", { d: "m7.5 4.27 9 5.15" }),
        /* @__PURE__ */ jsx("polyline", { points: "3.29 7 12 12 20.71 7" }),
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "22", y2: "12" })
      ]
    }
  );
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductManagment
}, Symbol.toStringTag, { value: "Module" }));
function Index$1() {
  useCheckAuth();
  return /* @__PURE__ */ jsx(Fragment, {});
}
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const authenticator = new Authenticator(sessionStorage);
let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: `https://spiral-tawny.vercel.app/auth/google/callback`
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return profile;
  }
);
authenticator.use(googleStrategy);
let loader$4 = async ({ request }) => {
  return authenticator.authenticate("google", request);
};
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
let loader$3 = async ({ request }) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/login",
    failureRedirect: "/login"
  });
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
function singleton(name, value) {
  var _a;
  const g = global;
  g.__singletons ?? (g.__singletons = {});
  (_a = g.__singletons)[name] ?? (_a[name] = value());
  return g.__singletons[name];
}
const db = singleton("db", () => ({
  _counter: 0,
  getCount() {
    return this._counter;
  },
  increment() {
    this._counter++;
  }
}));
async function loader$2() {
  return json({ count: await db.getCount() });
}
async function action() {
  await db.increment();
  return redirect("/counter");
}
function Counter() {
  const data2 = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "m-8", children: /* @__PURE__ */ jsx(Form$2, { method: "post", children: /* @__PURE__ */ jsxs(
    "button",
    {
      className: "rounded-md bg-red-500 px-4 py-2 text-white",
      type: "submit",
      children: [
        "Count: ",
        data2.count
      ]
    }
  ) }) });
}
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Counter,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function notFound(message) {
  return new Response(message, {
    status: 404,
    statusText: "Not Found"
  });
}
function invalid(message) {
  return new Response(message, {
    status: 405,
    statusText: "Method Not Allowed"
  });
}
function badRequest(message, errors) {
  return json(
    { message, errors },
    { status: 400, statusText: "Bad Request" }
  );
}
function notLoggedIn(message) {
  return new Response(message, {
    status: 401,
    statusText: "Not Logged In"
  });
}
function forbidden(message) {
  return new Response(message, {
    status: 403,
    statusText: "Forbidden"
  });
}
const loader$1 = async ({ request }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  switch (type) {
    case "throw":
      throw new Error("test server error");
    case "notfound":
      throw notFound("Page Not Found");
    case "badrequest":
      throw badRequest("Bad Request", [
        "missing param",
        "value must be number",
        "etc"
      ]);
    case "notloggedin":
      throw notLoggedIn("Not Logged In");
    case "forbidden":
      throw forbidden("Not Authorized");
    case "invalid":
      throw invalid("Invalid");
  }
  return json({});
};
function Layout({ children }) {
  const handleClick = () => {
    setTimeout(() => alert("View console for error"), 1);
    throw new Error("test client error");
  };
  return /* @__PURE__ */ jsxs("div", { className: "m-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold", children: "Test Error" }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "underline decoration-dotted", children: "Return Home" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded bg-red-500 px-2 py-1 text-white",
          onClick: handleClick,
          children: "Throw Client Error"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "?type=throw",
          className: "rounded bg-red-500 px-2 py-1 text-white",
          children: "Throw Server Document Error"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "?type=throw",
          className: "rounded bg-red-500 px-2 py-1 text-white",
          children: "Throw Server Data Error"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "?type=notfound",
          className: "rounded bg-blue-200 px-2 py-1 text-blue-900",
          children: "Return Not Found Error"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "?type=badrequest",
          className: "rounded bg-yellow-200 px-2 py-1  text-yellow-900",
          children: "Return Bad Request Error"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "?type=notloggedin",
          className: "rounded bg-purple-200 px-2 py-1 text-purple-900",
          children: "Return Not Logged In Error"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "?type=forbidden",
          className: "rounded bg-orange-200 px-2 py-1 text-orange-900",
          children: "Return Forbidden Error"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "?type=invalid",
          className: "rounded bg-yellow-200 px-2 py-1 text-yellow-900",
          children: "Return Invalid Error"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children })
  ] });
}
function Index() {
  return /* @__PURE__ */ jsx(Layout, {});
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(DefaultErrorBoundary, {}) });
}
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: Index,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
let loader = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
  return redirect("/login");
};
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-rwBf1_pL.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/index-DLo6RHam.js", "/assets/index-Fe4a85aj.js", "/assets/components-T8sgp3wV.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-JN94y1GN.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/index-DLo6RHam.js", "/assets/index-Fe4a85aj.js", "/assets/components-T8sgp3wV.js", "/assets/error-boundary-DIcMk9Ug.js", "/assets/auth.context-CHxM0nCf.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js"], "css": ["/assets/root-CxVq0pGn.css"] }, "routes/_auth.forgot-password": { "id": "routes/_auth.forgot-password", "parentId": "root", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.forgot-password-DjxXEMEM.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-toastify.esm-CK8iYHYl.js", "/assets/index.esm-B0fxYW-1.js", "/assets/auth-CWqnw3Po.js", "/assets/logo-DszzMTaQ.js", "/assets/button-BOZHsJ4N.js", "/assets/input-D5AbOShC.js", "/assets/messages.constant-BqquFt89.js", "/assets/components-T8sgp3wV.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/axiosClient-9asyDyVF.js", "/assets/index-BpNdDISV.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/label-Dt7bNMTL.js", "/assets/index-6o9Yse_D.js", "/assets/index-DLo6RHam.js", "/assets/index-Fe4a85aj.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.login": { "id": "routes/_auth.login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.login-DXLseWcW.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-toastify.esm-CK8iYHYl.js", "/assets/index.esm-B0fxYW-1.js", "/assets/auth-CWqnw3Po.js", "/assets/insta-CxS8NGUb.js", "/assets/logo-DszzMTaQ.js", "/assets/button-BOZHsJ4N.js", "/assets/card-RI5J82o5.js", "/assets/input-D5AbOShC.js", "/assets/tabs-3Aonoci5.js", "/assets/messages.constant-BqquFt89.js", "/assets/auth.context-CHxM0nCf.js", "/assets/account.validator-5uHJvGE0.js", "/assets/index-Fe4a85aj.js", "/assets/components-T8sgp3wV.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/axiosClient-9asyDyVF.js", "/assets/index-BpNdDISV.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/label-Dt7bNMTL.js", "/assets/index-6o9Yse_D.js", "/assets/index-DLo6RHam.js", "/assets/index-Cd5qH5R9.js", "/assets/index-CK9DHiHK.js", "/assets/index-BXYUa_hh.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.privacy-policy": { "id": "routes/_auth.privacy-policy", "parentId": "root", "path": "privacy-policy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.privacy-policy-WsTQWJZ9.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/logo-DszzMTaQ.js", "/assets/index-Fe4a85aj.js"], "css": [] }, "routes/_auth.register": { "id": "routes/_auth.register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.register-CLuchZmw.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-toastify.esm-CK8iYHYl.js", "/assets/index.esm-B0fxYW-1.js", "/assets/auth-CWqnw3Po.js", "/assets/login-banner-CF0bpVHV.js", "/assets/logo-DszzMTaQ.js", "/assets/button-BOZHsJ4N.js", "/assets/input-D5AbOShC.js", "/assets/index-DG5MiYio.js", "/assets/context-DHMrI8qT.js", "/assets/messages.constant-BqquFt89.js", "/assets/index-BpNdDISV.js", "/assets/label-Dt7bNMTL.js", "/assets/typeof-QjJsDpFa.js", "/assets/index-DLo6RHam.js", "/assets/floating-ui.dom-DUxIRmir.js", "/assets/tabs-3Aonoci5.js", "/assets/account.validator-5uHJvGE0.js", "/assets/index-Fe4a85aj.js", "/assets/index-xIRXI4rp.js", "/assets/components-T8sgp3wV.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/axiosClient-9asyDyVF.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-6o9Yse_D.js", "/assets/index-Cd5qH5R9.js", "/assets/index-CK9DHiHK.js", "/assets/index-BXYUa_hh.js"], "css": ["/assets/_auth-D32zUxz1.css", "/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.reset-password.$id": { "id": "routes/_auth.reset-password.$id", "parentId": "root", "path": "reset-password/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.reset-password._id-tzjRxjMf.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-toastify.esm-CK8iYHYl.js", "/assets/index.esm-B0fxYW-1.js", "/assets/auth-CWqnw3Po.js", "/assets/logo-DszzMTaQ.js", "/assets/button-BOZHsJ4N.js", "/assets/input-D5AbOShC.js", "/assets/label-Dt7bNMTL.js", "/assets/messages.constant-BqquFt89.js", "/assets/account.validator-5uHJvGE0.js", "/assets/index-Fe4a85aj.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/axiosClient-9asyDyVF.js", "/assets/index-BpNdDISV.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-6o9Yse_D.js", "/assets/index-DLo6RHam.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.verify-otp.$id": { "id": "routes/_auth.verify-otp.$id", "parentId": "root", "path": "verify-otp/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.verify-otp._id-BUCPg7wp.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-toastify.esm-CK8iYHYl.js", "/assets/auth-CWqnw3Po.js", "/assets/login-banner-CF0bpVHV.js", "/assets/logo-DszzMTaQ.js", "/assets/index-Fe4a85aj.js", "/assets/clsx-B-dksMZM.js", "/assets/axiosClient-9asyDyVF.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_dash": { "id": "routes/_dash", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash-BgZRjt1f.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/useCheckAuth-PyTxIbRx.js", "/assets/index-Fe4a85aj.js", "/assets/auth-CWqnw3Po.js", "/assets/axiosClient-9asyDyVF.js", "/assets/auth.context-CHxM0nCf.js"], "css": [] }, "routes/_dash.manager": { "id": "routes/_dash.manager", "parentId": "routes/_dash", "path": "manager", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager-DizPFQDn.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/logo-DszzMTaQ.js", "/assets/manager.constant-Dmuqsk9x.js", "/assets/auth.context-CHxM0nCf.js", "/assets/context-DHMrI8qT.js", "/assets/index-D5xnw7mv.js", "/assets/components-T8sgp3wV.js", "/assets/index-Fe4a85aj.js", "/assets/useBreakpoint-6PL27xTZ.js", "/assets/index-DLo6RHam.js", "/assets/typeof-QjJsDpFa.js"], "css": [] }, "routes/_dash.manager.analytics": { "id": "routes/_dash.manager.analytics", "parentId": "routes/_dash.manager", "path": "analytics", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.analytics-D0l0-y1c.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js"], "css": [] }, "routes/_dash.manager.campaign.$id": { "id": "routes/_dash.manager.campaign.$id", "parentId": "routes/_dash.manager", "path": "campaign/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.campaign._id-BkKWCB2e.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/placeholder-BjUczgjq.js", "/assets/index-CK9DHiHK.js", "/assets/index-6o9Yse_D.js", "/assets/index-BpNdDISV.js", "/assets/react-icons.esm-BNSl66oo.js", "/assets/breadcrumb-v674ye97.js", "/assets/card-RI5J82o5.js", "/assets/table-CwKd_xAe.js", "/assets/index-Fe4a85aj.js", "/assets/components-T8sgp3wV.js", "/assets/index-DLo6RHam.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js"], "css": [] }, "routes/_dash.manager.campaign.add-campaign": { "id": "routes/_dash.manager.campaign.add-campaign", "parentId": "routes/_dash.manager", "path": "campaign/add-campaign", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.campaign.add-campaign-bKq-rF7A.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-toastify.esm-CK8iYHYl.js", "/assets/axiosClient-9asyDyVF.js", "/assets/creator.constant-CB3kHNq1.js", "/assets/messages.constant-BqquFt89.js", "/assets/context-DHMrI8qT.js", "/assets/index-D5xnw7mv.js", "/assets/dropdown-CkESRCZg.js", "/assets/ExclamationCircleFilled-CepBj_Rs.js", "/assets/components-T8sgp3wV.js", "/assets/typeof-QjJsDpFa.js", "/assets/index-xIRXI4rp.js", "/assets/index-DLo6RHam.js", "/assets/clsx-B-dksMZM.js", "/assets/insta-CxS8NGUb.js", "/assets/index-Fe4a85aj.js"], "css": ["/assets/_dash.manager.campaign-DIxs8W_A.css", "/assets/react-toastify-BTGsrsBX.css"] }, "routes/_dash.manager.campaigns": { "id": "routes/_dash.manager.campaigns", "parentId": "routes/_dash.manager", "path": "campaigns", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.campaigns-DMN9jWVu.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/manager.constant-Dmuqsk9x.js", "/assets/index-xIRXI4rp.js", "/assets/dropdown-CkESRCZg.js", "/assets/index-D5xnw7mv.js", "/assets/CloudArrowDownIcon-EE0C53QQ.js", "/assets/context-DHMrI8qT.js", "/assets/ExclamationCircleFilled-CepBj_Rs.js", "/assets/typeof-QjJsDpFa.js", "/assets/button-BOZHsJ4N.js", "/assets/index-BpNdDISV.js", "/assets/label-Dt7bNMTL.js", "/assets/components-T8sgp3wV.js", "/assets/useBreakpoint-6PL27xTZ.js", "/assets/index-DLo6RHam.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-6o9Yse_D.js", "/assets/index-Fe4a85aj.js"], "css": [] }, "routes/_dash.manager.contents": { "id": "routes/_dash.manager.contents", "parentId": "routes/_dash.manager", "path": "contents", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.contents-D1ZU_3gE.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/react-icons.esm-BNSl66oo.js", "/assets/button-BOZHsJ4N.js", "/assets/card-RI5J82o5.js", "/assets/index-BpNdDISV.js", "/assets/index-Cd5qH5R9.js", "/assets/index-CK9DHiHK.js", "/assets/index-6o9Yse_D.js", "/assets/index-BXYUa_hh.js", "/assets/Combination-IF2PxEEo.js", "/assets/components-T8sgp3wV.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-DLo6RHam.js", "/assets/floating-ui.dom-DUxIRmir.js", "/assets/index-Fe4a85aj.js"], "css": [] }, "routes/_dash.manager.creator.$id": { "id": "routes/_dash.manager.creator.$id", "parentId": "routes/_dash.manager", "path": "creator/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.creator._id-Kupyl4OE.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/placeholder-BjUczgjq.js", "/assets/card-RI5J82o5.js", "/assets/chart-yD_788MR.js", "/assets/isEqual-DkU09Arl.js", "/assets/clsx-B-dksMZM.js", "/assets/react-icons.esm-BNSl66oo.js", "/assets/breadcrumb-v674ye97.js", "/assets/button-BOZHsJ4N.js", "/assets/components-T8sgp3wV.js", "/assets/index-BpNdDISV.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-DG5MiYio.js", "/assets/index-8JwjhRSi.js", "/assets/index-DLo6RHam.js", "/assets/index-Fe4a85aj.js"], "css": [] }, "routes/_dash.manager.creators": { "id": "routes/_dash.manager.creators", "parentId": "routes/_dash.manager", "path": "creators", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.creators-CpT7Vz2F.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/creator.constant-CB3kHNq1.js", "/assets/dropdown-CkESRCZg.js", "/assets/CloudArrowDownIcon-EE0C53QQ.js", "/assets/context-DHMrI8qT.js", "/assets/index-DLo6RHam.js", "/assets/typeof-QjJsDpFa.js", "/assets/index-D5xnw7mv.js", "/assets/index-xIRXI4rp.js", "/assets/useBreakpoint-6PL27xTZ.js", "/assets/insta-CxS8NGUb.js"], "css": [] }, "routes/_dash.manager.dashboard": { "id": "routes/_dash.manager.dashboard", "parentId": "routes/_dash.manager", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.dashboard-C278qgAf.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/button-BOZHsJ4N.js", "/assets/index-BpNdDISV.js", "/assets/react-icons.esm-BNSl66oo.js", "/assets/card-RI5J82o5.js", "/assets/chart-yD_788MR.js", "/assets/index-Cd5qH5R9.js", "/assets/index-CK9DHiHK.js", "/assets/Combination-IF2PxEEo.js", "/assets/index-6o9Yse_D.js", "/assets/typeof-QjJsDpFa.js", "/assets/table-CwKd_xAe.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/isEqual-DkU09Arl.js", "/assets/index-DG5MiYio.js", "/assets/index-8JwjhRSi.js", "/assets/index-DLo6RHam.js", "/assets/floating-ui.dom-DUxIRmir.js"], "css": [] }, "routes/_dash.manager.products": { "id": "routes/_dash.manager.products", "parentId": "routes/_dash.manager", "path": "products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.products-BE4W-tSD.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/placeholder-BjUczgjq.js", "/assets/button-BOZHsJ4N.js", "/assets/card-RI5J82o5.js", "/assets/input-D5AbOShC.js", "/assets/index-BpNdDISV.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/label-Dt7bNMTL.js", "/assets/index-6o9Yse_D.js", "/assets/index-DLo6RHam.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DYASxszi.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/useCheckAuth-PyTxIbRx.js", "/assets/auth-CWqnw3Po.js", "/assets/axiosClient-9asyDyVF.js", "/assets/auth.context-CHxM0nCf.js", "/assets/index-Fe4a85aj.js"], "css": [] }, "routes/auth.google": { "id": "routes/auth.google", "parentId": "root", "path": "auth/google", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.google-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.google.callback": { "id": "routes/auth.google.callback", "parentId": "routes/auth.google", "path": "callback", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.google.callback-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/counter": { "id": "routes/counter", "parentId": "root", "path": "counter", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/counter-D6oVnRNT.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/components-T8sgp3wV.js", "/assets/index-DLo6RHam.js", "/assets/index-Fe4a85aj.js"], "css": [] }, "routes/error": { "id": "routes/error", "parentId": "root", "path": "error", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/error-m27jE7A7.js", "imports": ["/assets/jsx-runtime-CHwbkWbZ.js", "/assets/error-boundary-DIcMk9Ug.js", "/assets/components-T8sgp3wV.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-Fe4a85aj.js", "/assets/index-DLo6RHam.js"], "css": [] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-196eb0c1.js", "version": "196eb0c1" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_auth.forgot-password": {
    id: "routes/_auth.forgot-password",
    parentId: "root",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_auth.login": {
    id: "routes/_auth.login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_auth.privacy-policy": {
    id: "routes/_auth.privacy-policy",
    parentId: "root",
    path: "privacy-policy",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_auth.register": {
    id: "routes/_auth.register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_auth.reset-password.$id": {
    id: "routes/_auth.reset-password.$id",
    parentId: "root",
    path: "reset-password/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_auth.verify-otp.$id": {
    id: "routes/_auth.verify-otp.$id",
    parentId: "root",
    path: "verify-otp/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_dash": {
    id: "routes/_dash",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_dash.manager": {
    id: "routes/_dash.manager",
    parentId: "routes/_dash",
    path: "manager",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_dash.manager.analytics": {
    id: "routes/_dash.manager.analytics",
    parentId: "routes/_dash.manager",
    path: "analytics",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_dash.manager.campaign.$id": {
    id: "routes/_dash.manager.campaign.$id",
    parentId: "routes/_dash.manager",
    path: "campaign/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_dash.manager.campaign.add-campaign": {
    id: "routes/_dash.manager.campaign.add-campaign",
    parentId: "routes/_dash.manager",
    path: "campaign/add-campaign",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_dash.manager.campaigns": {
    id: "routes/_dash.manager.campaigns",
    parentId: "routes/_dash.manager",
    path: "campaigns",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_dash.manager.contents": {
    id: "routes/_dash.manager.contents",
    parentId: "routes/_dash.manager",
    path: "contents",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_dash.manager.creator.$id": {
    id: "routes/_dash.manager.creator.$id",
    parentId: "routes/_dash.manager",
    path: "creator/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_dash.manager.creators": {
    id: "routes/_dash.manager.creators",
    parentId: "routes/_dash.manager",
    path: "creators",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_dash.manager.dashboard": {
    id: "routes/_dash.manager.dashboard",
    parentId: "routes/_dash.manager",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/_dash.manager.products": {
    id: "routes/_dash.manager.products",
    parentId: "routes/_dash.manager",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route18
  },
  "routes/auth.google": {
    id: "routes/auth.google",
    parentId: "root",
    path: "auth/google",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/auth.google.callback": {
    id: "routes/auth.google.callback",
    parentId: "routes/auth.google",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/counter": {
    id: "routes/counter",
    parentId: "root",
    path: "counter",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/error": {
    id: "routes/error",
    parentId: "root",
    path: "error",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
