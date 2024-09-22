import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json, redirect } from "@remix-run/node";
import { RemixServer, useRouteError, isRouteErrorResponse, Link, useNavigate, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts, useParams, useLocation, Form as Form$1 } from "@remix-run/react";
import { isbot } from "isbot";
import { createThemeSessionResolver, ThemeProvider, useTheme, Theme } from "remix-themes";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import { createContext, useState, useContext, useEffect, forwardRef, useRef, memo, useLayoutEffect, useCallback, useMemo } from "react";
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
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, ChevronRightIcon, DotFilledIcon, Cross2Icon, ChevronLeftIcon, CaretSortIcon, ChevronUpIcon, ChevronDownIcon as ChevronDownIcon$1, UploadIcon as UploadIcon$1, FileTextIcon, MagnifyingGlassIcon, ArrowLeftIcon as ArrowLeftIcon$1, CalendarIcon } from "@radix-ui/react-icons";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Select$1 from "react-select";
import { useNavigate as useNavigate$1 } from "react-router-dom";
import { Sun, Moon, Shell, Bell, Menu, Package2, Home, ShoppingCart, Package, Users, LineChart, Search, LogOut, LogOutIcon, ListFilter, File, PlusCircle, MoreHorizontal, TrendingUp } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as RechartsPrimitive from "recharts";
import { BarChart, CartesianGrid, XAxis, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart as LineChart$1, Line } from "recharts";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Command as Command$1, CommandList as CommandList$1 } from "cmdk";
import Dropzone from "react-dropzone";
import { toast as toast$1 } from "sonner";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as Papa from "papaparse";
import { format } from "date-fns";
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
  const { message: message2, stack } = error;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-red-100 p-4", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-4 text-2xl text-red-900", children: [
        /* @__PURE__ */ jsx(Icon, { name: "exclamation-circle", className: "h-8 w-8" }),
        message2 || "App Error"
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
  let message2;
  let data = {};
  if (typeof caught.data === "string") {
    message2 = caught.data;
  } else {
    data = caught.data;
    message2 = data.message;
  }
  switch (caught.status) {
    case 400:
      return /* @__PURE__ */ jsx(BadRequest, { message: message2, data });
    case 401:
      return /* @__PURE__ */ jsx(Unauthorized, { message: message2, data });
    case 403:
      return /* @__PURE__ */ jsx(Forbidden, { message: message2, data });
    case 404:
      return /* @__PURE__ */ jsx(NotFound, { message: message2, data });
    case 405:
      return /* @__PURE__ */ jsx(Invalid, { message: message2, data });
    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status} ${caught.data}}`
      );
  }
}
function Unauthorized({ message: message2, data }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-purple-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-purple-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "minus-circle", className: "h-8 w-8" }),
      message2 || "Unauthorized"
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
  message: message2,
  data
}) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-yellow-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-red-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "exclamation-triangle", className: "h-8 w-8" }),
      message2 || "Bad Request"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "You made an invalid request. The following errors have occurred." }),
    (data == null ? void 0 : data.errors) && /* @__PURE__ */ jsx("ul", { className: "ml-4 list-disc", children: data.errors.map((error, i) => /* @__PURE__ */ jsx("li", { children: error }, i)) })
  ] });
}
function Invalid({ message: message2, data }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-yellow-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-red-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "exclamation-triangle", className: "h-8 w-8" }),
      message2 || "Invalid"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "You made an invalid request." })
  ] });
}
function Forbidden({ message: message2, data }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-orange-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-orange-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "shield-exclamation", className: "h-8 w-8" }),
      message2 || "Not Authorized"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-1 text-lg", children: "You are not authorized to access this page." })
  ] });
}
function NotFound({ message: message2, data }) {
  return /* @__PURE__ */ jsxs("div", { className: "m-2 rounded bg-blue-100 p-4", children: [
    /* @__PURE__ */ jsxs("h1", { className: "font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-blue-900", children: [
      /* @__PURE__ */ jsx(Icon, { name: "magnifying-glass", className: "h-8 w-8" }),
      message2 || "Not Found"
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
    callbackURL: `${"/"}/auth/google/callback`
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
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(ThemeProvider, { specifiedTheme: data.theme, themeAction: "/action/set-theme", children: /* @__PURE__ */ jsx(AuthContextProvider, { children: /* @__PURE__ */ jsx(App, {}) }) });
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
  ({ message: message2, response }) => {
    var _a, _b, _c;
    if ((response == null ? void 0 : response.status) === 401) {
      localStorage.removeItem("remix_us_tk");
      window.location.replace("/login");
      return;
    }
    const errorMessage = ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.message) || ((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.error) || message2;
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
const postData = async (url, data = {}) => {
  try {
    const result = await axiosClient.post(url, data, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json"
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
const registerCreator = (payload) => {
  return postData(`/api/v1/auth/register/creator`, payload);
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
  return postData("/api/v1/auth/validate-otp", payload);
};
const login3rdParty = (role, email, name, phone) => {
  return postData(`/api/v1/auth/login-3rd-party/${role}`, { email, name, phone });
};
const Logo = "/assets/logo-Os7jrbJO.svg";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatBytes(bytes, opts = {}) {
  const { decimals = 0, sizeType = "normal" } = opts;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"}`;
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
const meta$5 = () => {
  return [{ title: "Spiral - Forgot Password" }];
};
const validationSchema$2 = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED)
});
function Page$5() {
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
  default: Page$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const Fb_icon = "data:image/svg+xml,%3csvg%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18.5%209C18.5%204.02948%2014.4705%200%209.5%200C4.52948%200%200.5%204.02948%200.5%209C0.5%2013.2206%203.40592%2016.7623%207.32596%2017.735V11.7504H5.47016V9H7.32596V7.81488C7.32596%204.75164%208.71232%203.3318%2011.7198%203.3318C12.29%203.3318%2013.2739%203.44376%2013.6764%203.55536V6.04836C13.464%206.02604%2013.095%206.01488%2012.6367%206.01488C11.161%206.01488%2010.5908%206.57396%2010.5908%208.02728V9H13.5306L13.0255%2011.7504H10.5908V17.9341C15.0472%2017.3959%2018.5004%2013.6015%2018.5004%209H18.5Z'%20fill='%230866FF'/%3e%3c/svg%3e";
const Gg_icon = "data:image/svg+xml,%3csvg%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.49988%207.36328V10.8487H14.3435C14.1308%2011.9696%2013.4925%2012.9188%2012.5353%2013.5569L15.4562%2015.8233C17.158%2014.2525%2018.1398%2011.9452%2018.1398%209.20428C18.1398%208.56611%2018.0826%207.95242%2017.9762%207.36338L9.49988%207.36328Z'%20fill='%234285F4'/%3e%3cpath%20d='M4.45596%2010.7129L3.79719%2011.2172L1.46533%2013.0335C2.94624%2015.9708%205.98147%2017.9999%209.49962%2017.9999C11.9296%2017.9999%2013.9668%2017.1981%2015.4559%2015.8235L12.535%2013.5572C11.7332%2014.0972%2010.7105%2014.4245%209.49962%2014.4245C7.15963%2014.4245%205.17151%2012.8454%204.45964%2010.7181L4.45596%2010.7129Z'%20fill='%2334A853'/%3e%3cpath%20d='M1.46538%204.9668C0.851781%206.17766%200.5%207.54404%200.5%209.00038C0.5%2010.4567%200.851781%2011.8231%201.46538%2013.034C1.46538%2013.0421%204.45998%2010.7103%204.45998%2010.7103C4.27998%2010.1703%204.17359%209.59764%204.17359%209.00029C4.17359%208.40293%204.27998%207.83024%204.45998%207.29025L1.46538%204.9668Z'%20fill='%23FBBC05'/%3e%3cpath%20d='M9.49981%203.58363C10.8253%203.58363%2012.0034%204.0418%2012.9443%204.92545L15.5216%202.34821C13.9589%200.891874%2011.9298%200%209.49981%200C5.98165%200%202.94624%202.02091%201.46533%204.96637L4.45984%207.29001C5.17161%205.16271%207.15982%203.58363%209.49981%203.58363Z'%20fill='%23EA4335'/%3e%3c/svg%3e";
const Is_icon = "data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_244_96)'%3e%3cpath%20d='M9%201.6207C11.4047%201.6207%2011.6895%201.63125%2012.6352%201.67344C13.5141%201.71211%2013.9887%201.85977%2014.3051%201.98281C14.7234%202.14453%2015.0258%202.34141%2015.3387%202.6543C15.6551%202.9707%2015.8484%203.26953%2016.0102%203.68789C16.1332%204.0043%2016.2809%204.48242%2016.3195%205.35781C16.3617%206.30703%2016.3723%206.5918%2016.3723%208.99297C16.3723%2011.3977%2016.3617%2011.6824%2016.3195%2012.6281C16.2809%2013.507%2016.1332%2013.9816%2016.0102%2014.298C15.8484%2014.7164%2015.6516%2015.0187%2015.3387%2015.3316C15.0223%2015.648%2014.7234%2015.8414%2014.3051%2016.0031C13.9887%2016.1262%2013.5105%2016.2738%2012.6352%2016.3125C11.6859%2016.3547%2011.4012%2016.3652%209%2016.3652C6.59531%2016.3652%206.31055%2016.3547%205.36484%2016.3125C4.48594%2016.2738%204.01133%2016.1262%203.69492%2016.0031C3.27656%2015.8414%202.97422%2015.6445%202.66133%2015.3316C2.34492%2015.0152%202.15156%2014.7164%201.98984%2014.298C1.8668%2013.9816%201.71914%2013.5035%201.68047%2012.6281C1.63828%2011.6789%201.62773%2011.3941%201.62773%208.99297C1.62773%206.58828%201.63828%206.30351%201.68047%205.35781C1.71914%204.47891%201.8668%204.0043%201.98984%203.68789C2.15156%203.26953%202.34844%202.96719%202.66133%202.6543C2.97773%202.33789%203.27656%202.14453%203.69492%201.98281C4.01133%201.85977%204.48945%201.71211%205.36484%201.67344C6.31055%201.63125%206.59531%201.6207%209%201.6207ZM9%200C6.55664%200%206.25078%200.0105469%205.29102%200.0527344C4.33477%200.0949219%203.67734%200.249609%203.10781%200.471094C2.51367%200.703125%202.01094%201.00898%201.51172%201.51172C1.00898%202.01094%200.703125%202.51367%200.471094%203.1043C0.249609%203.67734%200.0949219%204.33125%200.0527344%205.2875C0.0105469%206.25078%200%206.55664%200%209C0%2011.4434%200.0105469%2011.7492%200.0527344%2012.709C0.0949219%2013.6652%200.249609%2014.3227%200.471094%2014.8922C0.703125%2015.4863%201.00898%2015.9891%201.51172%2016.4883C2.01094%2016.9875%202.51367%2017.2969%203.1043%2017.5254C3.67734%2017.7469%204.33125%2017.9016%205.2875%2017.9437C6.24727%2017.9859%206.55312%2017.9965%208.99648%2017.9965C11.4398%2017.9965%2011.7457%2017.9859%2012.7055%2017.9437C13.6617%2017.9016%2014.3191%2017.7469%2014.8887%2017.5254C15.4793%2017.2969%2015.982%2016.9875%2016.4813%2016.4883C16.9805%2015.9891%2017.2898%2015.4863%2017.5184%2014.8957C17.7398%2014.3227%2017.8945%2013.6687%2017.9367%2012.7125C17.9789%2011.7527%2017.9895%2011.4469%2017.9895%209.00352C17.9895%206.56016%2017.9789%206.2543%2017.9367%205.29453C17.8945%204.33828%2017.7398%203.68086%2017.5184%203.11133C17.2969%202.51367%2016.991%202.01094%2016.4883%201.51172C15.9891%201.0125%2015.4863%200.703125%2014.8957%200.474609C14.3227%200.253125%2013.6688%200.0984375%2012.7125%200.05625C11.7492%200.0105469%2011.4434%200%209%200Z'%20fill='%23E1306C'/%3e%3cpath%20d='M9%204.37695C6.44766%204.37695%204.37695%206.44766%204.37695%209C4.37695%2011.5523%206.44766%2013.623%209%2013.623C11.5523%2013.623%2013.623%2011.5523%2013.623%209C13.623%206.44766%2011.5523%204.37695%209%204.37695ZM9%2011.9988C7.34414%2011.9988%206.00117%2010.6559%206.00117%209C6.00117%207.34414%207.34414%206.00117%209%206.00117C10.6559%206.00117%2011.9988%207.34414%2011.9988%209C11.9988%2010.6559%2010.6559%2011.9988%209%2011.9988Z'%20fill='%23E1306C'/%3e%3cpath%20d='M14.8852%204.19453C14.8852%204.79219%2014.4%205.27383%2013.8059%205.27383C13.2082%205.27383%2012.7266%204.78867%2012.7266%204.19453C12.7266%203.59688%2013.2117%203.11523%2013.8059%203.11523C14.4%203.11523%2014.8852%203.60039%2014.8852%204.19453Z'%20fill='%23E1306C'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_244_96'%3e%3crect%20width='18'%20height='18'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const TT_icon = "data:image/svg+xml,%3csvg%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.3824%206.4976C14.5399%207.32798%2015.9579%207.81656%2017.4894%207.81656V4.85896C17.1996%204.85902%2016.9105%204.82869%2016.6269%204.7684V7.09645C15.0955%207.09645%2013.6777%206.60787%2012.5199%205.77755V11.8132C12.5199%2014.8325%2010.081%2017.2799%207.07256%2017.2799C5.95005%2017.2799%204.90673%2016.9394%204.04004%2016.3553C5.02922%2017.3703%206.40872%2018%207.93488%2018C10.9435%2018%2013.3825%2015.5525%2013.3825%2012.5331V6.4976H13.3824V6.4976ZM14.4464%203.51375C13.8549%202.86517%2013.4664%202.02701%2013.3824%201.10038V0.719971H12.5651C12.7708%201.89771%2013.4725%202.9039%2014.4464%203.51375ZM5.94286%2014.0384C5.61235%2013.6035%205.43374%2013.0714%205.43454%2012.5244C5.43454%2011.1435%206.5501%2010.0238%207.92639%2010.0238C8.18289%2010.0238%208.43784%2010.0632%208.68228%2010.141V7.11733C8.39662%207.07804%208.10832%207.06136%207.82014%207.06748V9.42098C7.57552%209.34314%207.32044%209.30361%207.06389%209.30385C5.68759%209.30385%204.5721%2010.4234%204.5721%2011.8045C4.5721%2012.781%205.12969%2013.6265%205.94286%2014.0384Z'%20fill='%23FF004F'/%3e%3cpath%20d='M12.5197%205.77749C13.6775%206.60781%2015.0954%207.09639%2016.6268%207.09639V4.76833C15.7719%204.5856%2015.0152%204.1373%2014.4462%203.51375C13.4723%202.90384%2012.7706%201.89765%2012.5649%200.719971H10.4179V12.533C10.4131%2013.9101%209.29943%2015.0252%207.92609%2015.0252C7.11681%2015.0252%206.39784%2014.6381%205.9425%2014.0384C5.12939%2013.6265%204.5718%2012.781%204.5718%2011.8046C4.5718%2010.4236%205.68729%209.30392%207.06359%209.30392C7.32728%209.30392%207.58144%209.34512%207.81984%209.42104V7.06754C4.86429%207.12882%202.4873%209.55238%202.4873%2012.533C2.4873%2014.0209%203.07923%2015.3698%204.03993%2016.3553C4.90662%2016.9394%205.94994%2017.28%207.07245%2017.28C10.0809%2017.28%2012.5198%2014.8324%2012.5198%2011.8132V5.77749H12.5197Z'%20fill='black'/%3e%3cpath%20d='M16.6269%204.76835V4.13886C15.8561%204.14004%2015.1004%203.92339%2014.4464%203.5137C15.0253%204.1498%2015.7877%204.5884%2016.6269%204.76835ZM12.565%200.719988C12.5454%200.607434%2012.5303%200.494138%2012.5199%200.38041V0H9.55551V11.8131C9.55078%2013.1901%208.43719%2014.3052%207.06373%2014.3052C6.6605%2014.3052%206.27979%2014.2091%205.94264%2014.0384C6.39798%2014.6381%207.11695%2015.0252%207.92623%2015.0252C9.29945%2015.0252%2010.4133%2013.9102%2010.4181%2012.533V0.719988H12.565ZM7.8201%207.06755V6.39742C7.57241%206.36344%207.32268%206.34639%207.07265%206.34652C4.06394%206.34645%201.625%208.79404%201.625%2011.8131C1.625%2013.7059%202.58354%2015.374%204.04013%2016.3552C3.07943%2015.3697%202.48751%2014.0208%202.48751%2012.533C2.48751%209.55239%204.86443%207.12883%207.8201%207.06755Z'%20fill='%2300F2EA'/%3e%3c/svg%3e";
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
const meta$4 = () => {
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
function Page$4() {
  const { updateUserInfo } = useAuthContext();
  const [userType, setUserType] = useState("creator");
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
          userType === "creator" ? navigate("/creator/dashboard") : navigate("/manager/dashboard");
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
      res.data.role === "CREATOR" ? navigate("/creator/dashboard") : navigate("/manager/dashboard");
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
            return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
              Tabs,
              {
                onValueChange: (e) => {
                  setUserType(e);
                  resetForm();
                  localStorage.setItem("remix_tab", e);
                },
                defaultValue: userType,
                className: "w-[460px]",
                children: [
                  /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
                    /* @__PURE__ */ jsx(TabsTrigger, { value: "creator", children: "Creator" }),
                    /* @__PURE__ */ jsx(TabsTrigger, { value: "brand", children: "Brands" })
                  ] }),
                  /* @__PURE__ */ jsxs(Form, { className: "mt-[30px]", children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: /* @__PURE__ */ jsx(
                        Field,
                        {
                          onChange: handleChange,
                          as: Input,
                          label: userType === "creator" ? "Email" : "Business email",
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
                        /* @__PURE__ */ jsx("img", { className: "mr-1", src: Fb_icon, alt: "Facebook" }),
                        "Login with Facebook"
                      ] }),
                      /* @__PURE__ */ jsx("a", { href: "/auth/google", children: /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [
                        /* @__PURE__ */ jsx("img", { className: "mr-1", src: Gg_icon, alt: "Google" }),
                        "Login with Google"
                      ] }) }),
                      userType === "creator" && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [
                        /* @__PURE__ */ jsx("img", { className: "mr-1", src: TT_icon, alt: "Tiktok" }),
                        "Login with Tiktok"
                      ] }),
                      /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [
                        /* @__PURE__ */ jsx("img", { className: "mr-1", src: Is_icon, alt: "Instagram" }),
                        "Login with Instagram"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm", children: [
                      "Don't have an account?",
                      " ",
                      /* @__PURE__ */ jsx(Link, { to: "/register", className: "underline font-bold text-blue-500", children: "Sign up" })
                    ] })
                  ] })
                ]
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
  default: Page$4,
  loader: loader$5,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const Privacy_icon = "data:image/svg+xml,%3csvg%20width='46'%20height='46'%20viewBox='0%200%2046%2046'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='vuesax/bulk/lock'%3e%3cg%20id='lock'%3e%3cpath%20id='Vector'%20opacity='0.4'%20d='M23.0001%2033.2542C24.7256%2033.2542%2026.1243%2031.8555%2026.1243%2030.13C26.1243%2028.4046%2024.7256%2027.0059%2023.0001%2027.0059C21.2747%2027.0059%2019.876%2028.4046%2019.876%2030.13C19.876%2031.8555%2021.2747%2033.2542%2023.0001%2033.2542Z'%20fill='%232563EB'/%3e%3cpath%20id='Vector_2'%20d='M31.9127%2018.0933H14.0877C6.22933%2018.0933%203.8335%2020.4891%203.8335%2028.3474V31.9124C3.8335%2039.7708%206.22933%2042.1666%2014.0877%2042.1666H31.9127C39.771%2042.1666%2042.1668%2039.7708%2042.1668%2031.9124V28.3474C42.1668%2020.4891%2039.771%2018.0933%2031.9127%2018.0933ZM23.0002%2035.9183C19.7993%2035.9183%2017.2118%2033.3116%2017.2118%2030.1299C17.2118%2026.9483%2019.7993%2024.3416%2023.0002%2024.3416C26.201%2024.3416%2028.7885%2026.9483%2028.7885%2030.1299C28.7885%2033.3116%2026.201%2035.9183%2023.0002%2035.9183Z'%20fill='%232563EB'/%3e%3cpath%20id='Vector_3'%20opacity='0.4'%20d='M13.6467%2018.1127V15.8702C13.6467%2010.2543%2015.2375%206.51683%2023%206.51683C30.7625%206.51683%2032.3534%2010.2543%2032.3534%2015.8702V18.1127C33.3309%2018.1318%2034.2125%2018.1702%2035.0367%2018.2852V15.8702C35.0367%2010.6952%2033.7909%203.8335%2023%203.8335C12.2092%203.8335%2010.9634%2010.6952%2010.9634%2015.8702V18.266C11.7684%2018.1702%2012.6692%2018.1127%2013.6467%2018.1127Z'%20fill='%232563EB'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const meta$3 = () => {
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
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const LoginBanner = "/assets/login-banner-DkUQ0E4H.png";
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "h-4 w-4 shrink-0 border border-primary rounded-[5px] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center bg-blue-600 h-4 w-4 rounded-[5px] justify-center text-current"),
        children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4", color: "white" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
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
    Select$1,
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
const CATEGORIES = [
  {
    label: "Food & Beverage",
    value: "Food & Beverage"
  },
  {
    label: "Fashion",
    value: "Fashion"
  },
  {
    label: "Beauty",
    value: "Beauty"
  },
  {
    label: "Cosmetic",
    value: "Cosmetic"
  }
];
const meta$2 = () => {
  return [{ title: "Spiral - Register" }];
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required(FULLNAME_REQUIRED),
  email: Yup.string().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  password: createPasswordValidationSchema(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], PASSWORD_MISSMATCH).required(CONFIRM_PASSWORD_REQUIRED)
});
function Page$3() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("creator");
  const handleSubmit = (values) => {
    setLoading(true);
    delete values.confirmPassword;
    const payload = { ...values, phone };
    const register = userType === "brand" ? registerBrand(payload) : registerCreator(payload);
    register.then((res) => {
      var _a;
      return navigate(`/verify-otp/${(_a = res == null ? void 0 : res.data) == null ? void 0 : _a.userId}`, {
        state: { email: values.email }
      });
    }).finally(() => setLoading(false)).catch((err) => toast.error(err == null ? void 0 : err.message));
  };
  const isBrand = userType === "brand";
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
          }) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
            Tabs,
            {
              onValueChange: (e) => {
                setUserType(e);
                resetForm();
                setPhone("");
              },
              defaultValue: "creator",
              className: "w-[460px]",
              children: [
                /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
                  /* @__PURE__ */ jsx(TabsTrigger, { value: "creator", children: "Creator" }),
                  /* @__PURE__ */ jsx(TabsTrigger, { value: "brand", children: "Brands" })
                ] }),
                /* @__PURE__ */ jsxs(Form, { className: "mt-[30px]", children: [
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
                        label: userType === "creator" ? "Email" : "Business email",
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
                        name: isBrand ? "category" : "industry",
                        render: () => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                          SelectGroup,
                          {
                            options: isBrand ? INDUSTRIES : CATEGORIES,
                            label: isBrand ? "Industry" : "Category/Niche",
                            value: isBrand ? values.category : values.industry,
                            onChange: (value) => setFieldValue(isBrand ? "category" : "industry", value)
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
                      /* @__PURE__ */ jsx("div", { className: "h-full pt-1", children: /* @__PURE__ */ jsx(Checkbox, { defaultChecked: true }) }),
                      /* @__PURE__ */ jsxs("div", { className: "text-sm leading-5 text-gray-800", children: [
                        "By clicking on signup you agree to",
                        " ",
                        /* @__PURE__ */ jsxs(Link, { to: "/privacy-policy", children: [
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
              ]
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
  default: Page$3,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const Success_IC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjjSURBVHgB7Z1RcttGEoa7B5Ks8uaBewNaylbtW5iXrbK1qVAnsH2AlagTWD5BpBNYOoEo777HPoGZihU9ho9blchGThC+JFEUYibdIzKJhR5gABDkQOJX5bIKIEjgx6Cnp6enAbBkyZIlSxYFQqC0v+211i+hNaY/jYZ26gMII+R/EYy++1d/CIEShMAs5soldHSSdFCpz42BDoBpQyFwyIIbY75SSg2+f9gfQAAsTGAWVf2U9EjQx0abDp1JC2YMIg7A6NNVFQ3+/7AfwwKYu8Afn/e6JOgzamndOkR1gYB9VHg675Y9N4GtsMZ8YYVdLDGCObzY+m8f5kDtAgck7E1istV7dbfo2gRmGxv9bE4MmCeFDgQc0UkN6LgfENQQNcQrKxDf/FSioWX4nyIvA3QbDX5u0HaOhcwOm45VhYd12ehaBN4839k1CRz52ljujIzG12sRvKp6of8463USA10yA48Nej81tZmNmQpsPYNfzBdgzH7+p3EE2hzrj9RR/Gl/BDXQPu+1Iw1dEprPqZ17AOKR/hUP4+3Znc/MBOaLUVq/4T+zPmddJ8Dji0f9VzBHNs96PU+h4zWltmdlMmYisH0sQX8JmeKybcXnF1v9PiwQT6HjCNTT77aqjxArC3xt86jlZtvbY31fHdRlCopin7ax3gcFzzI+NiKRt6uKXEngXHERY5Xg3vefhTFsvcnHX/e6OjInGa25ssilBfYQd7iG+HRRQ1RfrvsOQ+aNhusylUQuJXBeh0bBmtP3/37Zgwax8fXOUYbJKN3xKSiIdcWyvYXDponLvPvs5T5oOHTsbl/RNbff9ArHTgoLbP3cDHHfbb08gIZCIh9kiazu2WsvRCETsXn2n54BPHHsPiZxPQYY4fPg7U6fYsu70j5UUe/i4ckpeOItcKbdpQ7t3aPTT+EWsXG2+62j4xvpK/XAd7TnbSKop5VNA7li7C3ALUMruia6NmFXK7pnTsATrxZs/UVlW28KpdV2qH5uVTKvm7wKn1CnVwumH3Ha3dsqLmOvTcOxtI9j3OBBrsDcsYHLNCh1BLccPVYH9F/K3vIEAk8m5B2fKzB5DeKdogD3YeijtFnAnRkF/p9L+3xacaYNdtogar3kNTyAO8Tm2903UgA/zxZntmCtjOwLUuuFO4brmqkVZ0Xk3AKz30uH99K/hPGiY7pl+ae9pnJMOnPRFmcNoZ0CRzrpStub2Ho58rfxdudHiie83zjbeb95vrdb6otkj6Kl7iU91yFuE2GUeBKrCgbQIISwatvopF8mcEMeheg1USf42HWMU2DJoPN8WpM8h6yYdXQPulAQ61EYnlP8EDITHdcNEwVm70HabkC/hoaQNyGwilAqgO7QoLWyDmLAXhSYXLOuuH0lGkAD8JgnLO3D6ygSZ8O1ljUTBeYsGWHzKA44D3eKj7hVYtbx9Y1JexNQoAUbIf2I7O+dF3cKQtoO04jtE+mzyvENqbvBic0QMPMSl+G8OWFzW+roUgLziQoH03mbGAJlnuIypIX4NK+vQ77AnLEoHUxTJTEEyLzFZVDLWoyFqOPKzQ3GjFuS5RhHUCkrx0450bidbFXHKPNK/6JOqybZLUJcZrwCsdLp7TSAad/cllYyQvFk15NqAtv5PGP2bSJ2AkdqzZSaBp+yKHGLUnjavgyTgUv7w62mU1bkpojLzEVgN8VFbpK4zFwEtqE+eYYWiojcNHGZubVgjbhdReSQxF3VroTHKNVPpQQu4oIUgYeYZUUOreU6XVmEfIHHwoqe6y9NuyBFKSNyiGbBKFkLyZVNm4hL2R2j2WVxhFeUIiKHanNJi7a0XQqGpQSeOP9x+kurmYgPfsNT5FA7NDnaKAfD5HCl8GEagUkhzNL4iByqt0CzPamnWbK/jByuNFqKnLWqzMpK5IssslBxJ8Gw1I13RRtFgZWJxOZ+ZZInMGMKirxwP1dDIgfWlRqI26WN47Gdr0o1+azZ0yp4ihzGIMIx2+7K7hEFnsyeplpxXpJFFXJEDkJcjgi6Zttdx7in7R0zyGpN70NNpEVGfoqCGf66knGo13MuKXAKrH+L+gBiz5iZi1UVFpkTC/V99Xd9Hx+EFFtwZZpmJeNkZldunu1+KdV7QNRPLx797xXcIVwLgLjexMXW6Z7ruMxgD2o8lvdEtbbiEHHmSSvMXHGUKTCHGR2pQt1J5vudICvLP2+dRm640pkXC/iiLo8iJKznkJHln3d8rsCuVgw2bbP4ysemoa4TrNupHZ550l4Bd+edoklMn4UgTcVem6M8jkLcAw+8BLatGNCV9HYy6xhFCLBp4GuT9rHn4FsOzHvKKLmyd0zyi9tXtt7C7UJpR4kcMg1cBgw88RY4azkThxbJZ/ZeXho6G9/svgBHtmTR5WuFJj2tUXetfATT2zjfaXynt3G2k1WW7LjoAqDCs8rXKx8dqawaDposshUX4EDcSaaBCztBQcqXlDHmjbOYEOIRxROeQ4PYsCZOWLbGXFcUKFVSppTAzKRWGq8CdQw2cLimmlIUyXZojkldHEWApYsilU484R/kakwArqRA0+E6NyH7yXxukyIjtYhrvwEqkt+SwZoMesSOQ2nNfjU2q4trvwVmgBUZyRfOKVc4z8LILmzY0eALwMwGEUcGwyitOCW34/uThQi9+U2P4tqT0uZZVOjQxK+DGcLRNbWiD3JqQk6xQtdZwN6agkv9DBLYB79axjOvsTlTgacUKCV7fRK2QLN+Ha1Fg6rvxOC4yFWSPLFvN/Aua86VYfXz4As0/xU2GZjoA1f9MScGRjRLMOREDhqax6iopUcwioQlDNOXmNDN/ATt38XfbMBBrOQ+7tVVGbY2gad4VDhdCPzUYIKHdRd1ql3gKUXNRl3MS9g/fg/mDLfoBHWvsOmoBPJ7j1jYuZchm7vAU6YF7KlF7xZ4W0ABrKhDfruB/hv0F1V9e2EC32RS4ao7eR9GK6NgsgMkt48ENfiVMjAcfwTDEEqaByOwBI8Q7ctIDAkepb2D6UtMLtdhFEp9+CVLlixZEg6/AwpVB0eT7IQEAAAAAElFTkSuQmCC";
const meta$1 = () => {
  return [
    { title: "Spiral - Reset Password" }
  ];
};
const resetPasswordValidationSchema = Yup.object().shape({
  password: createPasswordValidationSchema(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], PASSWORD_MISSMATCH).required(CONFIRM_PASSWORD_REQUIRED)
});
function Page$2() {
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
  default: Page$2,
  meta: meta$1,
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
const meta = () => {
  return [{ title: "Spiral - Verify OTP" }];
};
function Page$1() {
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
  default: Page$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const useCheckAuth = () => {
  const navigate = useNavigate$1();
  const { updateUserInfo } = useAuthContext();
  const getUserInfo = async () => {
    var _a;
    try {
      const res = await getMe();
      updateUserInfo(res.data);
      if (((_a = res.data) == null ? void 0 : _a.role) === "MANAGER") {
        navigate("/manager/dashboard");
      } else {
        navigate("/creator/dashboard");
      }
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
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
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
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
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
function ThemeToggle() {
  const [, setTheme] = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme(Theme.LIGHT), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme(Theme.DARK), children: "Dark" })
    ] })
  ] });
}
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
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
function ManagerLayout$1() {
  const location = useLocation();
  const { handleLogout } = useAuthContext();
  const navItems2 = [
    { to: "/creator/dashboard", icon: Home, label: "Dashboard" },
    {
      to: "/creator/jobs",
      icon: ShoppingCart,
      label: "Jobs",
      badge: 6
    },
    {
      to: "/creator/upload",
      icon: Package,
      label: "Upload"
    },
    {
      to: "/creator/finance",
      icon: Users,
      label: "Finance"
    },
    {
      to: "",
      icon: LogOut,
      label: "Logout"
    }
  ];
  const isActive = (path) => {
    if (path === "#") return false;
    return location.pathname.startsWith(path);
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden border-r bg-muted/40 md:block", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full max-h-screen flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/login", className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(Shell, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsx("span", { className: "", children: "Spiral Inc" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", className: "ml-auto h-8 w-8", children: [
          /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle notifications" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("nav", { className: "grid items-start px-2 text-sm font-medium lg:px-4", children: navItems2.map((item) => /* @__PURE__ */ jsx("div", { onClick: () => item.label === "Logout" ? handleLogout() : null, children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.to,
          className: `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive(item.to) ? "bg-muted text-primary" : "text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
            item.label,
            item.badge && /* @__PURE__ */ jsx(Badge, { className: "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full", children: item.badge })
          ]
        },
        item.label
      ) })) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto p-4", children: /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-02-chunk-0", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-2 pt-0 md:p-4", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Upgrade to Pro" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Unlock all features and get unlimited access to our support team." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "p-2 pt-0 md:p-4 md:pt-0", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "w-full", children: "Upgrade" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6", children: [
        /* @__PURE__ */ jsxs(Sheet, { children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "shrink-0 md:hidden",
              children: [
                /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle navigation menu" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(SheetContent, { side: "left", className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("nav", { className: "grid gap-2 text-lg font-medium", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "flex items-center gap-2 text-lg font-semibold",
                  children: [
                    /* @__PURE__ */ jsx(Package2, { className: "h-6 w-6" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Acme Inc" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Home, { className: "h-5 w-5" }),
                    "Dashboard"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" }),
                    "Campaign",
                    /* @__PURE__ */ jsx(Badge, { className: "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full", children: "6" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Package, { className: "h-5 w-5" }),
                    "Products"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
                    "Customers"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(LineChart, { className: "h-5 w-5" }),
                    "Analytics"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Upgrade to Pro" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Unlock all features and get unlimited access to our support team." })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "w-full", children: "Upgrade" }) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex-1", children: /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", { className: "relative flex justify-between", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "search",
              placeholder: "Search...",
              className: "w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            }
          ),
          /* @__PURE__ */ jsx(ThemeToggle, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ManagerLayout$1
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
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
function CreatorDashboard() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen w-full flex-col", children: /* @__PURE__ */ jsxs("main", { className: "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2", children: [
      /* @__PURE__ */ jsxs(Card, { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Connect Your Accounts" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Seamlessly connect your Instagram, TikTok, and Facebook accounts to import your content and metrics." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-6 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx(InstagramIcon$1, { className: "w-8 h-8 mb-4 text-[#e1306c]" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "flex items-center gap-2",
                children: "Connected"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-6 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx(TwitterIcon$1, { className: "w-8 h-8 mb-4 text-[#69c9d0]" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "flex items-center gap-2",
                children: "Connect"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-6 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx(FacebookIcon, { className: "w-8 h-8 mb-4 text-[#1877f2]" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "flex items-center gap-2",
                children: "Connect"
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Your Content" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "View, filter, and manage your imported content from connected accounts." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "all", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxs(TabsList, { children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "all", children: "All" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "instagram", children: "Instagram" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "tiktok", children: "TikTok" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "facebook", children: "Facebook" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-7 gap-1 text-sm",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only", children: "Filter" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                  /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Filter by" }),
                  /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                  /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: true, children: "Images" }),
                  /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Videos" }),
                  /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Reels" }),
                  /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Stories" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 gap-1 text-sm",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only", children: "Export" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "all", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 400,
                  alt: "Content",
                  className: "object-cover aspect-square rounded-lg"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(Avatar, { className: "w-6 h-6", children: [
                    /* @__PURE__ */ jsx(
                      AvatarImage,
                      {
                        src: "/placeholder-user.jpg",
                        alt: "@shadcn"
                      }
                    ),
                    /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "@shadcn" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(HeartIcon$2, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "1.2K" }),
                  /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "120" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 400,
                  alt: "Content",
                  className: "object-cover aspect-square rounded-lg"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(Avatar, { className: "w-6 h-6", children: [
                    /* @__PURE__ */ jsx(
                      AvatarImage,
                      {
                        src: "/placeholder-user.jpg",
                        alt: "@jaredpalmer"
                      }
                    ),
                    /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "@jaredpalmer" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(HeartIcon$2, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "2.5K" }),
                  /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "250" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 400,
                  alt: "Content",
                  className: "object-cover aspect-square rounded-lg"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(Avatar, { className: "w-6 h-6", children: [
                    /* @__PURE__ */ jsx(
                      AvatarImage,
                      {
                        src: "/placeholder-user.jpg",
                        alt: "@maxleiter"
                      }
                    ),
                    /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "@maxleiter" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(HeartIcon$2, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "800" }),
                  /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "80" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: placeholder,
                  width: 400,
                  height: 400,
                  alt: "Content",
                  className: "object-cover aspect-square rounded-lg"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(Avatar, { className: "w-6 h-6", children: [
                    /* @__PURE__ */ jsx(
                      AvatarImage,
                      {
                        src: "/placeholder-user.jpg",
                        alt: "@shuding_"
                      }
                    ),
                    /* @__PURE__ */ jsx(AvatarFallback, { children: "SD" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "@shuding_" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(HeartIcon$2, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "1.5K" }),
                  /* @__PURE__ */ jsx(MessageCircleIcon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "150" })
                ] })
              ] })
            ] }) })
          ] }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-start bg-muted/50", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-0.5", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Your Performance" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "View your content performance metrics at a glance." })
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "p-6 text-sm", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-4 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "12.3K" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Followers" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-4 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "2.5K" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Likes" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-4 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "350" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Comments" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-4 bg-background rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: "120" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Shares" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Separator, { className: "my-4" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Content Performance" }),
          /* @__PURE__ */ jsx(BarchartChart$1, {})
        ] })
      ] }) })
    ] }) })
  ] }) });
}
function BarchartChart$1(props) {
  return /* @__PURE__ */ jsx("div", { ...props, children: /* @__PURE__ */ jsx(
    ChartContainer,
    {
      config: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))"
        }
      },
      className: "min-h-[200px]",
      children: /* @__PURE__ */ jsxs(
        BarChart,
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
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "month",
                tickLine: false,
                tickMargin: 10,
                axisLine: false,
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
            /* @__PURE__ */ jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", radius: 8 })
          ]
        }
      )
    }
  ) });
}
function FacebookIcon(props) {
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
      children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
    }
  );
}
function HeartIcon$2(props) {
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
function InstagramIcon$1(props) {
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
function MessageCircleIcon(props) {
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
      children: /* @__PURE__ */ jsx("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" })
    }
  );
}
function TwitterIcon$1(props) {
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
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatorDashboard
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
function Finance() {
  return /* @__PURE__ */ jsxs("main", { className: "flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", children: [
        /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Back" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-semibold text-lg md:text-xl", children: "Finances" }),
      /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: /* @__PURE__ */ jsxs(Popover, { children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            id: "date",
            variant: "outline",
            className: "w-[280px] justify-start text-left font-normal",
            children: [
              /* @__PURE__ */ jsx(CalendarClockIcon, { className: "mr-2 h-4 w-4" }),
              "June 01, 2023 - June 30, 2023"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "end", children: /* @__PURE__ */ jsx(Calendar, { initialFocus: true, mode: "range", numberOfMonths: 2 }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardDescription, { children: "Total Balance" }),
            /* @__PURE__ */ jsx(CardTitle, { children: "$12,345.67" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(AreachartgradientChart, {}) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardDescription, { children: "Monthly Revenue" }),
            /* @__PURE__ */ jsx(CardTitle, { children: "$3,456.78" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(BarchartChart, {}) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardDescription, { children: "Request Withdrawal" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Input, { type: "number", placeholder: "Enter withdrawal amount" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Cancel" }),
              /* @__PURE__ */ jsx(Button, { children: "Submit" })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "font-semibold text-lg md:text-xl", children: "Payouts" }),
      /* @__PURE__ */ jsx("div", { className: "border shadow-sm rounded-lg", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Brand" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Campaign" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: "Jun 15, 2023" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Acme Inc." }),
            /* @__PURE__ */ jsx(TableCell, { children: "Website Redesign" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$2,500.00" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Paid" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
              /* @__PURE__ */ jsx(DownloadIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Download" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: "Jun 01, 2023" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Globex Corp." }),
            /* @__PURE__ */ jsx(TableCell, { children: "Social Media Campaign" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$1,800.00" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Paid" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
              /* @__PURE__ */ jsx(DownloadIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Download" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: "May 25, 2023" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Stark Industries" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Video Production" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$3,000.00" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Paid" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
              /* @__PURE__ */ jsx(DownloadIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Download" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: "May 10, 2023" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Stark Industries" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Branding Assets" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$1,200.00" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Paid" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
              /* @__PURE__ */ jsx(DownloadIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Download" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: "Apr 30, 2023" }),
            /* @__PURE__ */ jsx(TableCell, { children: "Acme Inc." }),
            /* @__PURE__ */ jsx(TableCell, { children: "Email Marketing" }),
            /* @__PURE__ */ jsx(TableCell, { children: "$900.00" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { className: "text-xs", variant: "secondary", children: "Paid" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
              /* @__PURE__ */ jsx(DownloadIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Download" })
            ] }) })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function AreachartgradientChart(props) {
  return /* @__PURE__ */ jsx("div", { ...props, children: /* @__PURE__ */ jsx(
    ChartContainer,
    {
      config: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))"
        },
        mobile: {
          label: "Mobile",
          color: "hsl(var(--chart-2))"
        }
      },
      className: "min-h-[100px]",
      children: /* @__PURE__ */ jsxs(
        AreaChart,
        {
          accessibilityLayer: true,
          data: [
            { month: "January", desktop: 186, mobile: 80 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "June", desktop: 214, mobile: 140 }
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
            /* @__PURE__ */ jsx(ChartTooltip, { cursor: false, content: /* @__PURE__ */ jsx(ChartTooltipContent, {}) }),
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "fillDesktop", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    offset: "5%",
                    stopColor: "var(--color-desktop)",
                    stopOpacity: 0.8
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    offset: "95%",
                    stopColor: "var(--color-desktop)",
                    stopOpacity: 0.1
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "fillMobile", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    offset: "5%",
                    stopColor: "var(--color-mobile)",
                    stopOpacity: 0.8
                  }
                ),
                /* @__PURE__ */ jsx(
                  "stop",
                  {
                    offset: "95%",
                    stopColor: "var(--color-mobile)",
                    stopOpacity: 0.1
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "mobile",
                type: "natural",
                fill: "url(#fillMobile)",
                fillOpacity: 0.4,
                stroke: "var(--color-mobile)",
                stackId: "a"
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "desktop",
                type: "natural",
                fill: "url(#fillDesktop)",
                fillOpacity: 0.4,
                stroke: "var(--color-desktop)",
                stackId: "a"
              }
            )
          ]
        }
      )
    }
  ) });
}
function ArrowLeftIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "m12 19-7-7 7-7" }),
        /* @__PURE__ */ jsx("path", { d: "M19 12H5" })
      ]
    }
  );
}
function BarchartChart(props) {
  return /* @__PURE__ */ jsx("div", { ...props, children: /* @__PURE__ */ jsx(
    ChartContainer,
    {
      config: {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))"
        }
      },
      className: "min-h-[100px]",
      children: /* @__PURE__ */ jsxs(
        BarChart,
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
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "month",
                tickLine: false,
                tickMargin: 10,
                axisLine: false,
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
            /* @__PURE__ */ jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", radius: 8 })
          ]
        }
      )
    }
  ) });
}
function CalendarClockIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" }),
        /* @__PURE__ */ jsx("path", { d: "M16 2v4" }),
        /* @__PURE__ */ jsx("path", { d: "M8 2v4" }),
        /* @__PURE__ */ jsx("path", { d: "M3 10h5" }),
        /* @__PURE__ */ jsx("path", { d: "M17.5 17.5 16 16.3V14" }),
        /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "6" })
      ]
    }
  );
}
function DownloadIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        /* @__PURE__ */ jsx("polyline", { points: "7 10 12 15 17 10" }),
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "15", y2: "3" })
      ]
    }
  );
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Finance
}, Symbol.toStringTag, { value: "Module" }));
function CreatorJobs() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen w-full flex-col", children: /* @__PURE__ */ jsx("main", { className: "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Upcoming Deadlines" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Project" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Deadline" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Client" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Blog Content Creation" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "2023-06-30" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Acme Inc" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Social Media Graphics" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "2023-07-15" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Globex Corp" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Product Photography" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "2023-08-01" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Stark Industries" }) })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Completed Jobs" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Project" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Client" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Completed" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Website Design" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Stark Industries" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "2023-04-15" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Video Production" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Globex Corp" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "2023-05-01" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Branding Guidelines" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Acme Inc" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "2023-06-01" }) })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Available Jobs" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Job Title" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Description" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Client" }),
          /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Apply" }) })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Graphic Designer" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Create visually appealing graphics for social media and marketing materials." }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Acme Inc" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "Apply" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Content Writer" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Write engaging and informative blog posts and website content." }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Globex Corp" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "Apply" }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Videographer" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Capture high-quality video footage for product demonstrations and marketing campaigns." }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { children: "Stark Industries" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: "Apply" }) })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Favorite Brands" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "#",
            className: "text-primary hover:underline",
            prefetch: false,
            children: "View All"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Acme Inc." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Lifestyle" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "rounded-full",
                children: /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-5 h-5 fill-primary" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Acme Inc. is a leading lifestyle brand known for their high-quality products and innovative marketing campaigns." }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Widgets Co." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Technology" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "rounded-full",
                children: /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-5 h-5 fill-primary" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Widgets Co. is a tech startup known for their innovative products and cutting-edge design." }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Gizmos Inc." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Technology" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "rounded-full",
                children: /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-5 h-5 fill-primary" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Gizmos Inc. is a leading technology company known for their high-quality gadgets and electronics." }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Fashions Unlimited" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Fashion" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "rounded-full",
                children: /* @__PURE__ */ jsx(HeartIcon$1, { className: "w-5 h-5 fill-primary" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Fashions Unlimited is a fashion brand known for their trendy and affordable clothing lines." }) })
        ] })
      ] })
    ] })
  ] }) }) });
}
function HeartIcon$1(props) {
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
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatorJobs
}, Symbol.toStringTag, { value: "Module" }));
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(CaretSortIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon$1, {})
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function CreatorUpload() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen w-full flex-col", children: /* @__PURE__ */ jsx("main", { className: "flex flex-1 gap-4 md:gap-8", children: /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-4 md:grid-cols-[minmax(200px,_1fr)_2fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-background p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Campaigns" }),
        /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "sm", children: [
          /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
          "New Campaign"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Summer Promotion" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Promote our summer product line" })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Active" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
                /* @__PURE__ */ jsx(FilePenIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Edit campaign" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
                /* @__PURE__ */ jsx(TrashIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Delete campaign" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Holiday Deals" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Promote our holiday product line" })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Active" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
                /* @__PURE__ */ jsx(FilePenIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Edit campaign" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
                /* @__PURE__ */ jsx(TrashIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Delete campaign" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Back to School" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Promote our back to school product line" })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Paused" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
                /* @__PURE__ */ jsx(FilePenIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Edit campaign" })
              ] }),
              /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", children: [
                /* @__PURE__ */ jsx(TrashIcon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Delete campaign" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-background p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Content Library" }),
        /* @__PURE__ */ jsxs(Button, { variant: "secondary", size: "sm", children: [
          /* @__PURE__ */ jsx(UploadIcon, { className: "h-4 w-4" }),
          "Upload Content"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "search",
              placeholder: "Search content...",
              className: "flex-1 rounded-md bg-muted pl-8"
            }
          ),
          /* @__PURE__ */ jsx(SearchIcon, { className: "absolute left-2 top-2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxs(Select, { children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Filter by" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "images", children: "Images" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "videos", children: "Videos" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "documents", children: "Documents" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center pt-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: placeholder,
                width: "100",
                height: "100",
                alt: "Content thumbnail",
                className: "h-full w-full rounded-md object-cover",
                style: { aspectRatio: "100/100", objectFit: "cover" }
              }
            ) }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to campaign" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center pt-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: placeholder,
                width: "100",
                height: "100",
                alt: "Content thumbnail",
                className: "h-full w-full rounded-md object-cover",
                style: { aspectRatio: "100/100", objectFit: "cover" }
              }
            ) }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to campaign" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center pt-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: placeholder,
                width: "100",
                height: "100",
                alt: "Content thumbnail",
                className: "h-full w-full rounded-md object-cover",
                style: { aspectRatio: "100/100", objectFit: "cover" }
              }
            ) }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to campaign" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center pt-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: placeholder,
                width: "100",
                height: "100",
                alt: "Content thumbnail",
                className: "h-full w-full rounded-md object-cover",
                style: { aspectRatio: "100/100", objectFit: "cover" }
              }
            ) }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to campaign" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center pt-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: placeholder,
                width: "100",
                height: "100",
                alt: "Content thumbnail",
                className: "h-full w-full rounded-md object-cover",
                style: { aspectRatio: "100/100", objectFit: "cover" }
              }
            ) }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to campaign" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center pt-6", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: placeholder,
                width: "100",
                height: "100",
                alt: "Content thumbnail",
                className: "h-full w-full rounded-md object-cover",
                style: { aspectRatio: "100/100", objectFit: "cover" }
              }
            ) }),
            /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "ml-auto", children: [
              /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Add to campaign" })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
function FilePenIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" }),
        /* @__PURE__ */ jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }),
        /* @__PURE__ */ jsx("path", { d: "M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" })
      ]
    }
  );
}
function PlusIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "M5 12h14" }),
        /* @__PURE__ */ jsx("path", { d: "M12 5v14" })
      ]
    }
  );
}
function SearchIcon(props) {
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
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function TrashIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "M3 6h18" }),
        /* @__PURE__ */ jsx("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
        /* @__PURE__ */ jsx("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
      ]
    }
  );
}
function UploadIcon(props) {
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
        /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        /* @__PURE__ */ jsx("polyline", { points: "17 8 12 3 7 8" }),
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "3", y2: "15" })
      ]
    }
  );
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatorUpload
}, Symbol.toStringTag, { value: "Module" }));
const navItems = [
  { to: "/manager/dashboard", icon: Home, label: "Dashboard" },
  {
    to: "/manager/campaigns",
    icon: ShoppingCart,
    label: "Campaigns",
    badge: 6
  },
  {
    to: "/manager/creator-managment",
    icon: Package,
    label: "Creators"
  },
  { to: "content-managment", icon: Users, label: "Contents" },
  { to: "product-managment", icon: LineChart, label: "Products" },
  { to: "#", icon: LineChart, label: "Analytics" },
  { to: "#", icon: LineChart, label: "Finance" },
  { to: "#", icon: LineChart, label: "User Management" },
  {
    to: "#",
    icon: LogOutIcon,
    label: "Logout"
  }
];
function ManagerLayout() {
  const location = useLocation();
  const { handleLogout } = useAuthContext();
  const isActive = (path) => {
    if (path === "#") return false;
    return location.pathname.startsWith(path);
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden border-r bg-muted/40 md:block", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full max-h-screen flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/login", className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(Shell, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsx("span", { className: "", children: "Spiral Inc" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", className: "ml-auto h-8 w-8", children: [
          /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle notifications" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("nav", { className: "grid items-start px-2 text-sm font-medium lg:px-4", children: navItems.map((item) => /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => item.label === "Logout" ? handleLogout() : null,
          children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive(item.to) ? "bg-muted text-primary" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
                item.label,
                item.badge && /* @__PURE__ */ jsx(Badge, { className: "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full", children: item.badge })
              ]
            },
            item.label
          )
        }
      )) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto p-4", children: /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-02-chunk-0", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "p-2 pt-0 md:p-4", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Upgrade to Pro" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Unlock all features and get unlimited access to our support team." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "p-2 pt-0 md:p-4 md:pt-0", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "w-full", children: "Upgrade" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6", children: [
        /* @__PURE__ */ jsxs(Sheet, { children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "shrink-0 md:hidden",
              children: [
                /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle navigation menu" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(SheetContent, { side: "left", className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("nav", { className: "grid gap-2 text-lg font-medium", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "flex items-center gap-2 text-lg font-semibold",
                  children: [
                    /* @__PURE__ */ jsx(Package2, { className: "h-6 w-6" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Acme Inc" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Home, { className: "h-5 w-5" }),
                    "Dashboard"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" }),
                    "Campaign",
                    /* @__PURE__ */ jsx(Badge, { className: "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full", children: "6" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Package, { className: "h-5 w-5" }),
                    "Products"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
                    "Customers"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "#",
                  className: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(LineChart, { className: "h-5 w-5" }),
                    "Analytics"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Upgrade to Pro" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Unlock all features and get unlimited access to our support team." })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "w-full", children: "Upgrade" }) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex-1", children: /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", { className: "relative flex justify-between", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "search",
              placeholder: "Search...",
              className: "w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            }
          ),
          /* @__PURE__ */ jsx(ThemeToggle, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ManagerLayout
}, Symbol.toStringTag, { value: "Module" }));
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
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Campaign
}, Symbol.toStringTag, { value: "Module" }));
const avatar = "/assets/avatar-k5i8dFE7.jpeg";
function Campaigns() {
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate("/manager/campaign/1");
  };
  return /* @__PURE__ */ jsx("main", { className: "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "all", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "all", children: "All" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "active", children: "Active" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "draft", children: "Draft" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "archived", className: "hidden sm:flex", children: "Archived" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-7 gap-1", children: [
            /* @__PURE__ */ jsx(ListFilter, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only sm:whitespace-nowrap", children: "Filter" })
          ] }) }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Filter by" }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: true, children: "Active" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Draft" }),
            /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Archived" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1", children: [
          /* @__PURE__ */ jsx(File, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only sm:whitespace-nowrap", children: "Export" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", className: "h-7 gap-1", children: [
          /* @__PURE__ */ jsx(PlusCircle, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only sm:whitespace-nowrap", children: "Add Campaign" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "all", children: /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-06-chunk-0", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Campaigns" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage your campaigns and view their sales performance." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden w-[100px] sm:table-cell", children: /* @__PURE__ */ jsx("span", { children: "Creators" }) }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { children: "ROI" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Performance (CVR ETC)" }),
          /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Date" }),
          /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Campaign 001" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "+9" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Draft" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "$499.99" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "25" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-07-12 10:42 AM" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Edit" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delete" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Campaign 001" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "+9" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Active" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "$129.99" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "100" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-10-18 03:21 PM" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Edit" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delete" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Campaign 001" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "+9" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Active" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "$39.99" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "50" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-11-29 08:15 AM" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Edit" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delete" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Campaign 001" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "+9" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Draft" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "$2.99" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "0" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2023-12-25 11:59 PM" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Edit" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delete" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Campaign 001" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "+9" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Active" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "$59.99" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "75" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2024-01-01 12:00 AM" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Edit" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delete" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(TableRow, { onClick: () => handleRowClick(), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Campaign 001" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-background", children: [
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "JP" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "ML" })
              ] }),
              /* @__PURE__ */ jsxs(Avatar, { children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "+9" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Active" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: "$199.99" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "30" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell", children: "2024-02-14 02:14 PM" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Edit" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Delete" })
              ] })
            ] }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "Showing ",
        /* @__PURE__ */ jsx("strong", { children: "1-10" }),
        " of ",
        /* @__PURE__ */ jsx("strong", { children: "32" }),
        " campaigns"
      ] }) })
    ] }) })
  ] }) });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Campaigns
}, Symbol.toStringTag, { value: "Module" }));
const tiktokCover = "/assets/tiktok-cover-o2rR4eid.jpeg";
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
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContentManagment
}, Symbol.toStringTag, { value: "Module" }));
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
function useCallbackRef(callback) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(
    () => (...args) => {
      var _a;
      return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
    },
    []
  );
}
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  }
}) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);
  const setValue = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value2 = typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value2 !== prop) handleChange(value2);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const uncontrolledState = React.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);
  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}
function FileUploader(props) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = {
      "image/*": []
    },
    maxSize = 1024 * 1024 * 2,
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;
  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange
  });
  const onDrop = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast$1.error("Cannot upload more than 1 file at a time");
        return;
      }
      if (((files == null ? void 0 : files.length) ?? 0) + acceptedFiles.length > maxFileCount) {
        toast$1.error(`Cannot upload more than ${maxFileCount} files`);
        return;
      }
      const newFiles = acceptedFiles.map(
        (file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      const updatedFiles = files ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast$1.error(`File ${file.name} was rejected`);
        });
      }
      if (onUpload && updatedFiles.length > 0 && updatedFiles.length <= maxFileCount) {
        const target = updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;
        toast$1.promise(onUpload(updatedFiles), {
          loading: `Uploading ${target}...`,
          success: () => {
            setFiles([]);
            return `${target} uploaded`;
          },
          error: `Failed to upload ${target}`
        });
      }
    },
    [files, maxFileCount, multiple, onUpload, setFiles]
  );
  function onRemove(index) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange == null ? void 0 : onValueChange(newFiles);
  }
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);
  const isDisabled = disabled || ((files == null ? void 0 : files.length) ?? 0) >= maxFileCount;
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col gap-6 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      Dropzone,
      {
        onDrop,
        accept,
        maxSize,
        maxFiles: maxFileCount,
        multiple: maxFileCount > 1 || multiple,
        disabled: isDisabled,
        children: ({ getRootProps, getInputProps, isDragActive }) => /* @__PURE__ */ jsxs(
          "div",
          {
            ...getRootProps(),
            className: cn(
              "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-muted-foreground/50",
              isDisabled && "pointer-events-none opacity-60",
              className
            ),
            ...dropzoneProps,
            children: [
              /* @__PURE__ */ jsx("input", { ...getInputProps() }),
              isDragActive ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 sm:px-5", children: [
                /* @__PURE__ */ jsx("div", { className: "rounded-full border border-dashed p-3", children: /* @__PURE__ */ jsx(
                  UploadIcon$1,
                  {
                    className: "size-7 text-muted-foreground",
                    "aria-hidden": "true"
                  }
                ) }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-muted-foreground", children: "Drop the files here" })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 sm:px-5", children: [
                /* @__PURE__ */ jsx("div", { className: "rounded-full border border-dashed p-3", children: /* @__PURE__ */ jsx(
                  UploadIcon$1,
                  {
                    className: "size-7 text-muted-foreground",
                    "aria-hidden": "true"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-px", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-medium text-muted-foreground", children: [
                    "Drag ",
                    `'n'`,
                    " drop files here, or click to select files"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground/70", children: [
                    "You can upload",
                    maxFileCount > 1 ? ` ${maxFileCount === Infinity ? "multiple" : maxFileCount}
                      files (up to ${formatBytes(maxSize)} each)` : ` a file with ${formatBytes(maxSize)}`
                  ] })
                ] })
              ] })
            ]
          }
        )
      }
    ),
    (files == null ? void 0 : files.length) ? /* @__PURE__ */ jsx(ScrollArea, { className: "h-fit w-full px-3", children: /* @__PURE__ */ jsx("div", { className: "flex max-h-48 flex-col gap-4", children: files == null ? void 0 : files.map((file, index) => /* @__PURE__ */ jsx(
      FileCard,
      {
        file,
        onRemove: () => onRemove(index),
        progress: progresses == null ? void 0 : progresses[file.name]
      },
      index
    )) }) }) : null
  ] });
}
function FileCard({ file, progress, onRemove }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-2.5", children: [
      isFileWithPreview(file) ? /* @__PURE__ */ jsx(FilePreview, { file }) : null,
      /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-px", children: [
          /* @__PURE__ */ jsx("p", { className: "line-clamp-1 text-sm font-medium text-foreground/80", children: file.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatBytes(file.size) })
        ] }),
        progress ? /* @__PURE__ */ jsx(Progress, { value: progress }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "icon",
        className: "size-7",
        onClick: onRemove,
        children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "size-4", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Remove file" })
        ]
      }
    ) })
  ] });
}
function isFileWithPreview(file) {
  return "preview" in file && typeof file.preview === "string";
}
function FilePreview({ file }) {
  if (file.type.startsWith("image/")) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: file.preview,
        alt: file.name,
        width: 48,
        height: 48,
        loading: "lazy",
        className: "aspect-square shrink-0 rounded-md object-cover"
      }
    );
  }
  return /* @__PURE__ */ jsx(
    FileTextIcon,
    {
      className: "size-10 text-muted-foreground",
      "aria-hidden": "true"
    }
  );
}
const Dialog = SheetPrimitive.Root;
const DialogTrigger = SheetPrimitive.Trigger;
const DialogPortal = SheetPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
function useParseCsv({
  fields,
  onSuccess,
  onError,
  showEmptyFields,
  ...props
}) {
  const [csvState, setCsvState] = React.useState({
    fileName: "",
    data: {
      parsed: [],
      mapped: []
    },
    fieldMappings: {
      current: {},
      original: {}
    },
    error: null
  });
  function onParse({ file, limit = Infinity }) {
    let count = 0;
    const allResults = [];
    Papa.parse(file, {
      ...props,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      beforeFirstChunk: (chunk) => {
        const parsedChunk = Papa.parse(chunk, {
          header: false,
          skipEmptyLines: true
        });
        const rows = parsedChunk.data;
        const columns = rows[0] ?? [];
        const newColumns = columns.map((column, index) => {
          if (column.trim() === "" && !showEmptyFields) {
            const hasNonEmptyValue = rows.slice(1).some(
              (row) => row[index] !== "" && row[index] !== null && row[index] !== void 0
            );
            if (!hasNonEmptyValue) {
              return null;
            }
          }
          return column.trim() === "" ? `Field ${index + 1}` : column;
        }).filter((column) => column !== null);
        rows[0] = newColumns;
        return Papa.unparse(rows);
      },
      step: (results, parser) => {
        var _a;
        try {
          if (count === 0) {
            const mappings = (_a = results.meta.fields ?? []) == null ? void 0 : _a.reduce(
              (acc, field) => ({
                ...acc,
                [field]: field
              }),
              {}
            );
            setCsvState((prevState) => ({
              ...prevState,
              fieldMappings: {
                original: mappings,
                current: mappings
              }
            }));
            count++;
          } else if (count <= limit) {
            allResults.push(results.data);
            count++;
          } else {
            parser.abort();
            throw new Error(`Only ${limit} rows are allowed`);
          }
        } catch (err) {
          setCsvState((prevState) => ({ ...prevState, error: message }));
          onError == null ? void 0 : onError(message);
        }
      },
      complete: (_, localFile) => {
        setCsvState((prevState) => ({
          ...prevState,
          fileName: (localFile == null ? void 0 : localFile.name) ? localFile.name.replace(/\.[^/.]+$/, "") : "Untitled",
          data: {
            parsed: allResults,
            mapped: allResults
          }
        }));
        onSuccess == null ? void 0 : onSuccess(allResults);
      }
    });
  }
  function onFieldChange({
    oldValue,
    newValue
  }) {
    setCsvState((prevState) => ({
      ...prevState,
      fieldMappings: {
        ...prevState.fieldMappings,
        current: { ...prevState.fieldMappings.current, [newValue]: oldValue }
      },
      data: {
        ...prevState.data,
        mapped: prevState.data.mapped.map((row, index) => {
          var _a;
          return {
            ...row,
            [newValue]: (_a = prevState.data.parsed[index]) == null ? void 0 : _a[oldValue]
          };
        })
      }
    }));
  }
  function onFieldToggle({
    value,
    checked
  }) {
    setCsvState((prevState) => ({
      ...prevState,
      fieldMappings: {
        ...prevState.fieldMappings,
        current: {
          ...prevState.fieldMappings.current,
          [value]: checked ? "" : void 0
        }
      },
      data: {
        ...prevState.data,
        mapped: prevState.data.mapped.map((row) => {
          const { [value]: _, ...rest } = row;
          return rest;
        })
      }
    }));
  }
  function onFieldsReset() {
    setCsvState((prevState) => ({
      ...prevState,
      fieldMappings: {
        ...prevState.fieldMappings,
        current: prevState.fieldMappings.original
      },
      data: {
        ...prevState.data,
        mapped: prevState.data.parsed
      }
    }));
  }
  function getSanitizedData({ data }) {
    return data.map(
      (row) => Object.keys(row).reduce(
        (acc, key) => ({
          ...acc,
          [key]: row[key] === null ? "" : row[key]
        }),
        {}
      )
    );
  }
  return {
    fileName: csvState.fileName,
    data: csvState.data.mapped,
    fieldMappings: csvState.fieldMappings,
    error: csvState.error,
    getSanitizedData,
    onParse,
    onFieldChange,
    onFieldToggle,
    onFieldsReset
  };
}
function useUploadFile(endpoint, { defaultUploadedFiles = [], ...props } = {}) {
  const [uploadedFiles, setUploadedFiles] = React.useState(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);
  async function onUpload(files) {
    setIsUploading(true);
    try {
      const res = {};
      setUploadedFiles((prev) => prev ? [...prev, ...res] : res);
    } catch (err) {
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }
  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading
  };
}
function CsvImporter({
  fields,
  onImport,
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState("upload");
  const {
    data,
    fieldMappings,
    onParse,
    onFieldChange,
    onFieldToggle,
    onFieldsReset,
    getSanitizedData
  } = useParseCsv({ fields });
  const { onUpload, isUploading } = useUploadFile();
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: cn("w-fit", className), ...props, children: "Import CSV" }) }),
    step === "upload" ? /* @__PURE__ */ jsxs(DialogContent, { className: "p-8 sm:max-w-xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Upload CSV" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Drag and drop your files here or click to browse." })
      ] }),
      /* @__PURE__ */ jsx(
        FileUploader,
        {
          accept: { "text/csv": [] },
          multiple: false,
          maxSize: 4 * 1024 * 1024,
          maxFileCount: 1,
          onUpload: async (files) => {
            const file = files[0];
            if (!file) return;
            await onUpload(files);
            onParse({ file, limit: 1001 });
            setStep("map");
          },
          disabled: isUploading
        }
      )
    ] }) : /* @__PURE__ */ jsxs(DialogContent, { className: "overflow-hidden p-8 sm:max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "flex-1", children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Map fields" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "Map the CSV fields to the corresponding table fields." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            className: "w-full sm:w-fit",
            onClick: onFieldsReset,
            children: "Reset"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid h-[26.25rem] w-full overflow-hidden rounded-md border", children: /* @__PURE__ */ jsxs(Table, { className: "border-b", children: [
        /* @__PURE__ */ jsx(TableHeader, { className: "sticky top-0 z-10 bg-background shadow", children: /* @__PURE__ */ jsx(TableRow, { className: "bg-muted/50", children: fields.map((field) => /* @__PURE__ */ jsx(
          PreviewTableHead,
          {
            field,
            onFieldChange: (f) => {
              onFieldChange({
                oldValue: f.value,
                newValue: field.value
              });
            },
            onFieldToggle,
            originalFieldMappings: fieldMappings.original,
            currentFieldMapping: fieldMappings.current[field.value],
            className: "border-r"
          },
          field.value
        )) }) }),
        /* @__PURE__ */ jsx(TableBody, { children: data.map((row, i) => /* @__PURE__ */ jsx(TableRow, { className: "h-10", children: fields.map((field) => /* @__PURE__ */ jsx(
          TableCell,
          {
            className: "border-r last:border-r-0",
            children: /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: String(row[field.value] ?? "") })
          },
          field.value
        )) }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:space-x-0", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setStep("upload"), children: "Back" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              onImport(getSanitizedData({ data }));
              setOpen(false);
              setStep("upload");
            },
            children: "Import"
          }
        )
      ] })
    ] })
  ] });
}
function PreviewTableHead({
  field,
  onFieldChange,
  onFieldToggle,
  currentFieldMapping,
  originalFieldMappings,
  className,
  ...props
}) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsx(TableHead, { className: cn("whitespace-nowrap py-2", className), ...props, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pr-1.5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          id: `${id}-${field.value}`,
          defaultChecked: true,
          onCheckedChange: (checked) => {
            onFieldToggle({
              value: field.value,
              checked: !!checked
            });
          },
          disabled: field.required
        }
      ),
      /* @__PURE__ */ jsx(Label, { htmlFor: `${id}-${field.value}`, className: "truncate", children: field.label })
    ] }),
    /* @__PURE__ */ jsx(ArrowLeftIcon$1, { className: "size-4", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          role: "combobox",
          "aria-expanded": open,
          className: "w-48 justify-between",
          children: [
            currentFieldMapping || "Select field...",
            /* @__PURE__ */ jsx(CaretSortIcon, { className: "ml-2 size-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(PopoverContent, { className: "w-[var(--radix-popover-trigger-width)] p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
        /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search field..." }),
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No field found." }),
        /* @__PURE__ */ jsx(CommandList$1, { children: /* @__PURE__ */ jsx(CommandGroup, { children: [...new Set(Object.values(originalFieldMappings))].map(
          (fm) => /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: fm,
              onSelect: () => {
                onFieldChange({
                  value: fm ?? ""
                });
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsx(
                  CheckIcon,
                  {
                    className: cn(
                      "mr-2 size-4",
                      currentFieldMapping === fm ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: fm })
              ]
            },
            fm
          )
        ) }) })
      ] }) })
    ] })
  ] }) });
}
const dataConfig = {
  users: [
    {
      id: "2793478372",
      name: "Alice Johnson",
      platform: "Instagram",
      email: "alice.johnson@example.com",
      country: "USA",
      score: 95
    },
    {
      id: "2793478372",
      name: "Bob Smith",
      platform: "YouTube",
      email: "bob.smith@example.com",
      country: "Canada",
      score: 88
    },
    {
      id: "2793478372",
      name: "Charlie Brown",
      platform: "TikTok",
      email: "charlie.brown@example.com",
      country: "UK",
      score: 92
    },
    {
      id: "2793478372",
      name: "Diana Prince",
      platform: "Twitter",
      email: "diana.prince@example.com",
      country: "Australia",
      score: 85
    },
    {
      id: "2793478372",
      name: "Ethan Hunt",
      platform: "Facebook",
      email: "ethan.hunt@example.com",
      country: "Germany",
      score: 89
    },
    {
      id: "2793478372",
      name: "Fiona Gallagher",
      platform: "LinkedIn",
      email: "fiona.gallagher@example.com",
      country: "Ireland",
      score: 91
    },
    {
      id: "2793478372",
      name: "George Clooney",
      platform: "Instagram",
      email: "george.clooney@example.com",
      country: "Italy",
      score: 87
    },
    {
      id: "2793478372",
      name: "Hannah Montana",
      platform: "YouTube",
      email: "hannah.montana@example.com",
      country: "Spain",
      score: 90
    },
    {
      id: "2793478372",
      name: "Isaac Newton",
      platform: "TikTok",
      email: "isaac.newton@example.com",
      country: "Netherlands",
      score: 93
    },
    {
      id: "2793478372",
      name: "Julia Roberts",
      platform: "Twitter",
      email: "julia.roberts@example.com",
      country: "France",
      score: 86
    },
    {
      id: "2793478372",
      name: "Kevin Hart",
      platform: "Facebook",
      email: "kevin.hart@example.com",
      country: "Brazil",
      score: 94
    },
    {
      id: "2793478372",
      name: "Linda Carter",
      platform: "LinkedIn",
      email: "linda.carter@example.com",
      country: "Sweden",
      score: 84
    },
    {
      id: "2793478372",
      name: "Michael Jordan",
      platform: "Instagram",
      email: "michael.jordan@example.com",
      country: "USA",
      score: 97
    },
    {
      id: "2793478372",
      name: "Nina Simone",
      platform: "YouTube",
      email: "nina.simone@example.com",
      country: "South Africa",
      score: 89
    },
    {
      id: "2793478372",
      name: "Oscar Wilde",
      platform: "TikTok",
      email: "oscar.wilde@example.com",
      country: "Ireland",
      score: 92
    },
    {
      id: "2793478372",
      name: "Pablo Picasso",
      platform: "Twitter",
      email: "pablo.picasso@example.com",
      country: "Spain",
      score: 90
    }
  ]
};
function TricksTable() {
  const [data, setData] = React.useState(dataConfig.users);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx(
      CsvImporter,
      {
        fields: [
          { label: "Name", value: "name", required: true },
          { label: "Platform", value: "platform" },
          { label: "Email", value: "email" },
          { label: "Country", value: "country" },
          { label: "Score", value: "score" }
        ],
        onImport: (parsedData) => {
          const formattedData = parsedData.map((item) => ({
            id: crypto.randomUUID(),
            name: String(item.name ?? ""),
            platform: String(item.platform ?? ""),
            email: String(item.email ?? ""),
            country: String(item.country ?? ""),
            score: Number.isNaN(Number(item.score)) ? 0 : Number(item.points)
          }));
          setData((prev) => [...prev, ...formattedData]);
        },
        className: "self-end"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Platform" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Country" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Score" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: data.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: item.name }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: item.platform }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: item.email }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: item.country }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: item.score }) })
      ] }, item.id)) })
    ] }) })
  ] });
}
function CreatorManagment() {
  return /* @__PURE__ */ jsx("main", { className: "grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8", children: /* @__PURE__ */ jsx(TricksTable, {}) });
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatorManagment
}, Symbol.toStringTag, { value: "Module" }));
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
        LineChart$1,
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
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
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
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
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
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductManagment
}, Symbol.toStringTag, { value: "Module" }));
function Index$1() {
  useCheckAuth();
  return /* @__PURE__ */ jsx(Fragment, {});
}
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const authenticator = new Authenticator(sessionStorage);
let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return profile;
  }
);
authenticator.use(googleStrategy);
let loader$4 = async ({ request }) => {
  return authenticator.authenticate("google", request);
};
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
let loader$3 = async ({ request }) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/login",
    failureRedirect: "/login"
  });
};
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  const data = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "m-8", children: /* @__PURE__ */ jsx(Form$1, { method: "post", children: /* @__PURE__ */ jsxs(
    "button",
    {
      className: "rounded-md bg-red-500 px-4 py-2 text-white",
      type: "submit",
      children: [
        "Count: ",
        data.count
      ]
    }
  ) }) });
}
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Counter,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function notFound(message2) {
  return new Response(message2, {
    status: 404,
    statusText: "Not Found"
  });
}
function invalid(message2) {
  return new Response(message2, {
    status: 405,
    statusText: "Method Not Allowed"
  });
}
function badRequest(message2, errors) {
  return json(
    { message: message2, errors },
    { status: 400, statusText: "Bad Request" }
  );
}
function notLoggedIn(message2) {
  return new Response(message2, {
    status: 401,
    statusText: "Not Logged In"
  });
}
function forbidden(message2) {
  return new Response(message2, {
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
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: Index,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
let loader = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
  return redirect("/login");
};
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CVCdmYCE.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/index-BJ3mzL9c.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-BBzIpjew.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/index-BJ3mzL9c.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js", "/assets/index-Ci7yfjs1.js", "/assets/error-boundary-8P-gqUxe.js", "/assets/auth.context-BpjR6wCg.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js"], "css": ["/assets/root-yBfaYXzc.css"] }, "routes/_auth.forgot-password": { "id": "routes/_auth.forgot-password", "parentId": "root", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.forgot-password-iQ1fp37g.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/react-toastify.esm-Cjr834P9.js", "/assets/messages.constant-CuOiyucR.js", "/assets/auth-CdFHSnW-.js", "/assets/logo-DszzMTaQ.js", "/assets/button-DJsvUUoM.js", "/assets/input-hez_YNCu.js", "/assets/components-CF6Lyjm6.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/index-D-_HBbpy.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/label-D6OP4dC9.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-Dt0pqFoG.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.login": { "id": "routes/_auth.login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.login-Cxw7c_eD.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/react-toastify.esm-Cjr834P9.js", "/assets/messages.constant-CuOiyucR.js", "/assets/auth-CdFHSnW-.js", "/assets/logo-DszzMTaQ.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/input-hez_YNCu.js", "/assets/tabs-BvxL7FIh.js", "/assets/auth.context-BpjR6wCg.js", "/assets/account.validator-nHmxUCqi.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/index-D-_HBbpy.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/label-D6OP4dC9.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-CkEvnFlc.js", "/assets/index-rbnsDBgO.js", "/assets/index-C9_5vQis.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js", "/assets/index-DoSCzDgX.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.privacy-policy": { "id": "routes/_auth.privacy-policy", "parentId": "root", "path": "privacy-policy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.privacy-policy-0S5S6D9G.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/logo-DszzMTaQ.js", "/assets/index-Dt0pqFoG.js"], "css": [] }, "routes/_auth.register": { "id": "routes/_auth.register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.register-n3iMGCrH.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/react-toastify.esm-Cjr834P9.js", "/assets/messages.constant-CuOiyucR.js", "/assets/auth-CdFHSnW-.js", "/assets/login-banner-CF0bpVHV.js", "/assets/logo-DszzMTaQ.js", "/assets/button-DJsvUUoM.js", "/assets/extends-6t0ctBfZ.js", "/assets/input-hez_YNCu.js", "/assets/index-B6evGIRX.js", "/assets/index-D-_HBbpy.js", "/assets/label-D6OP4dC9.js", "/assets/typeof-QjJsDpFa.js", "/assets/index-BJ3mzL9c.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/tabs-BvxL7FIh.js", "/assets/account.validator-nHmxUCqi.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/index-rbnsDBgO.js", "/assets/index-CkEvnFlc.js", "/assets/index-Bh4uNrYX.js", "/assets/index-DoSCzDgX.js", "/assets/index-CXn0XhFA.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-C9_5vQis.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js"], "css": ["/assets/_auth-D32zUxz1.css", "/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.reset-password.$id": { "id": "routes/_auth.reset-password.$id", "parentId": "root", "path": "reset-password/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.reset-password._id-B6ZYKxEd.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/react-toastify.esm-Cjr834P9.js", "/assets/messages.constant-CuOiyucR.js", "/assets/auth-CdFHSnW-.js", "/assets/logo-DszzMTaQ.js", "/assets/button-DJsvUUoM.js", "/assets/input-hez_YNCu.js", "/assets/label-D6OP4dC9.js", "/assets/account.validator-nHmxUCqi.js", "/assets/index-Dt0pqFoG.js", "/assets/clsx-B-dksMZM.js", "/assets/index-8JwjhRSi.js", "/assets/index-D-_HBbpy.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_auth.verify-otp.$id": { "id": "routes/_auth.verify-otp.$id", "parentId": "root", "path": "verify-otp/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.verify-otp._id-DOl8xtgU.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/react-toastify.esm-Cjr834P9.js", "/assets/auth-CdFHSnW-.js", "/assets/login-banner-CF0bpVHV.js", "/assets/logo-DszzMTaQ.js", "/assets/index-Dt0pqFoG.js", "/assets/clsx-B-dksMZM.js"], "css": ["/assets/react-toastify-BTGsrsBX.css"] }, "routes/_dash": { "id": "routes/_dash", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash-Cee-nB3m.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/useCheckAuth-CkkafqVZ.js", "/assets/index-Dt0pqFoG.js", "/assets/auth-CdFHSnW-.js", "/assets/auth.context-BpjR6wCg.js"], "css": [] }, "routes/_dash.creator": { "id": "routes/_dash.creator", "parentId": "routes/_dash", "path": "creator", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.creator-CW7aUPGI.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/sheet-Cy2fvOGq.js", "/assets/badge-DoZU9Y0b.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/input-hez_YNCu.js", "/assets/auth.context-BpjR6wCg.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js", "/assets/createLucideIcon-CNREb4lW.js", "/assets/index-Ci7yfjs1.js", "/assets/dropdown-menu-qhEEXNsH.js", "/assets/index-CkEvnFlc.js", "/assets/index-rbnsDBgO.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js", "/assets/Combination-cLXY6OQW.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-DoSCzDgX.js", "/assets/index-C9_5vQis.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-BBbPvPNJ.js", "/assets/label-D6OP4dC9.js"], "css": [] }, "routes/_dash.creator.dashboard": { "id": "routes/_dash.creator.dashboard", "parentId": "routes/_dash.creator", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.creator.dashboard-Be8L_XbB.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/placeholder-BjUczgjq.js", "/assets/avatar-CoGnTw_B.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/chart-CzEyyXC7.js", "/assets/dropdown-menu-qhEEXNsH.js", "/assets/index-CXn0XhFA.js", "/assets/index-D-_HBbpy.js", "/assets/tabs-BvxL7FIh.js", "/assets/BarChart-DYhdzxI2.js", "/assets/index-rbnsDBgO.js", "/assets/clsx-B-dksMZM.js", "/assets/index-B6evGIRX.js", "/assets/index-8JwjhRSi.js", "/assets/index-CkEvnFlc.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js", "/assets/Combination-cLXY6OQW.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-BJ3mzL9c.js", "/assets/index-DoSCzDgX.js", "/assets/index-C9_5vQis.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/bundle-mjs-BOZU2X2x.js"], "css": [] }, "routes/_dash.creator.finance": { "id": "routes/_dash.creator.finance", "parentId": "routes/_dash.creator", "path": "finance", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.creator.finance-CmMWNUcr.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/badge-DoZU9Y0b.js", "/assets/button-DJsvUUoM.js", "/assets/calendar-BJ-SltLw.js", "/assets/card-K50EQWi4.js", "/assets/chart-CzEyyXC7.js", "/assets/input-hez_YNCu.js", "/assets/popover-CipqMWF6.js", "/assets/table-CbnvU6sX.js", "/assets/clsx-B-dksMZM.js", "/assets/BarChart-DYhdzxI2.js", "/assets/index-D-_HBbpy.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-B6evGIRX.js", "/assets/index-8JwjhRSi.js", "/assets/label-D6OP4dC9.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-CkEvnFlc.js", "/assets/index-rbnsDBgO.js", "/assets/Combination-cLXY6OQW.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-DoSCzDgX.js"], "css": [] }, "routes/_dash.creator.jobs": { "id": "routes/_dash.creator.jobs", "parentId": "routes/_dash.creator", "path": "jobs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.creator.jobs-Cadc2c5S.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/table-CbnvU6sX.js", "/assets/components-CF6Lyjm6.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-BJ3mzL9c.js", "/assets/index-Dt0pqFoG.js"], "css": [] }, "routes/_dash.creator.upload": { "id": "routes/_dash.creator.upload", "parentId": "routes/_dash.creator", "path": "upload", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.creator.upload-pmcSPeY9.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/placeholder-BjUczgjq.js", "/assets/badge-DoZU9Y0b.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/input-hez_YNCu.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-BJ3mzL9c.js", "/assets/index-BdQq_4o_.js", "/assets/index-CkEvnFlc.js", "/assets/index-DT_FEOMJ.js", "/assets/index-D-_HBbpy.js", "/assets/index-rbnsDBgO.js", "/assets/index-B1D3Qepx.js", "/assets/Combination-cLXY6OQW.js", "/assets/index-CXn0XhFA.js", "/assets/index-Bh4uNrYX.js", "/assets/index-8_hiZHEZ.js", "/assets/label-D6OP4dC9.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/floating-ui.dom-AbZImF0A.js"], "css": [] }, "routes/_dash.manager": { "id": "routes/_dash.manager", "parentId": "routes/_dash", "path": "manager", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager-CRPTCnew.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/sheet-Cy2fvOGq.js", "/assets/badge-DoZU9Y0b.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/input-hez_YNCu.js", "/assets/auth.context-BpjR6wCg.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js", "/assets/createLucideIcon-CNREb4lW.js", "/assets/index-Ci7yfjs1.js", "/assets/dropdown-menu-qhEEXNsH.js", "/assets/index-CkEvnFlc.js", "/assets/index-rbnsDBgO.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js", "/assets/Combination-cLXY6OQW.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-DoSCzDgX.js", "/assets/index-C9_5vQis.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-BBbPvPNJ.js", "/assets/label-D6OP4dC9.js"], "css": [] }, "routes/_dash.manager.campaign.$id": { "id": "routes/_dash.manager.campaign.$id", "parentId": "routes/_dash.manager", "path": "campaign/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.campaign._id-B_9qtXUV.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/placeholder-BjUczgjq.js", "/assets/avatar-CoGnTw_B.js", "/assets/badge-DoZU9Y0b.js", "/assets/breadcrumb-Cz48KpDL.js", "/assets/card-K50EQWi4.js", "/assets/table-CbnvU6sX.js", "/assets/index-Dt0pqFoG.js", "/assets/components-CF6Lyjm6.js", "/assets/index-rbnsDBgO.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/react-icons.esm-B0rbFDiC.js"], "css": [] }, "routes/_dash.manager.campaigns": { "id": "routes/_dash.manager.campaigns", "parentId": "routes/_dash.manager", "path": "campaigns", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.campaigns-QuJQXVlf.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/avatar-sl75FB_g.js", "/assets/avatar-CoGnTw_B.js", "/assets/badge-DoZU9Y0b.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/dropdown-menu-qhEEXNsH.js", "/assets/table-CbnvU6sX.js", "/assets/tabs-BvxL7FIh.js", "/assets/index-Dt0pqFoG.js", "/assets/createLucideIcon-CNREb4lW.js", "/assets/index-rbnsDBgO.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-CkEvnFlc.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js", "/assets/Combination-cLXY6OQW.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-DoSCzDgX.js", "/assets/index-C9_5vQis.js", "/assets/react-icons.esm-B0rbFDiC.js"], "css": [] }, "routes/_dash.manager.content-managment": { "id": "routes/_dash.manager.content-managment", "parentId": "routes/_dash.manager", "path": "content-managment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.content-managment-5KKiByrt.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/badge-DoZU9Y0b.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/dropdown-menu-qhEEXNsH.js", "/assets/components-CF6Lyjm6.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-CkEvnFlc.js", "/assets/index-rbnsDBgO.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js", "/assets/index-DT_FEOMJ.js", "/assets/index-B1D3Qepx.js", "/assets/Combination-cLXY6OQW.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-DoSCzDgX.js", "/assets/index-C9_5vQis.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-Dt0pqFoG.js"], "css": [] }, "routes/_dash.manager.creator-managment": { "id": "routes/_dash.manager.creator-managment", "parentId": "routes/_dash.manager", "path": "creator-managment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.creator-managment-DbtKIJ_N.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/extends-6t0ctBfZ.js", "/assets/index-BJ3mzL9c.js", "/assets/Combination-cLXY6OQW.js", "/assets/index-B6evGIRX.js", "/assets/button-DJsvUUoM.js", "/assets/index-rbnsDBgO.js", "/assets/index-CXn0XhFA.js", "/assets/index-D-_HBbpy.js", "/assets/index-DoSCzDgX.js", "/assets/index-B1D3Qepx.js", "/assets/index-BdQq_4o_.js", "/assets/index-CkEvnFlc.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-BBbPvPNJ.js", "/assets/label-D6OP4dC9.js", "/assets/popover-CipqMWF6.js", "/assets/table-CbnvU6sX.js", "/assets/index-Bh4uNrYX.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js"], "css": [] }, "routes/_dash.manager.creator.$id": { "id": "routes/_dash.manager.creator.$id", "parentId": "routes/_dash.manager", "path": "creator/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.creator._id-CKpZMOrC.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/avatar-sl75FB_g.js", "/assets/placeholder-BjUczgjq.js", "/assets/card-K50EQWi4.js", "/assets/chart-CzEyyXC7.js", "/assets/clsx-B-dksMZM.js", "/assets/createLucideIcon-CNREb4lW.js", "/assets/badge-DoZU9Y0b.js", "/assets/breadcrumb-Cz48KpDL.js", "/assets/button-DJsvUUoM.js", "/assets/components-CF6Lyjm6.js", "/assets/index-D-_HBbpy.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-B6evGIRX.js", "/assets/index-8JwjhRSi.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/index-BJ3mzL9c.js", "/assets/index-Dt0pqFoG.js"], "css": [] }, "routes/_dash.manager.dashboard": { "id": "routes/_dash.manager.dashboard", "parentId": "routes/_dash.manager", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.dashboard-BZCyO4zn.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/button-DJsvUUoM.js", "/assets/calendar-BJ-SltLw.js", "/assets/card-K50EQWi4.js", "/assets/chart-CzEyyXC7.js", "/assets/popover-CipqMWF6.js", "/assets/index-D-_HBbpy.js", "/assets/react-icons.esm-B0rbFDiC.js", "/assets/typeof-QjJsDpFa.js", "/assets/BarChart-DYhdzxI2.js", "/assets/badge-DoZU9Y0b.js", "/assets/table-CbnvU6sX.js", "/assets/index-CkEvnFlc.js", "/assets/index-rbnsDBgO.js", "/assets/Combination-cLXY6OQW.js", "/assets/index-DoSCzDgX.js", "/assets/index-CXn0XhFA.js", "/assets/index-8_hiZHEZ.js", "/assets/clsx-B-dksMZM.js", "/assets/index-B6evGIRX.js", "/assets/index-8JwjhRSi.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/floating-ui.dom-AbZImF0A.js", "/assets/index-BJ3mzL9c.js"], "css": [] }, "routes/_dash.manager.product-managment": { "id": "routes/_dash.manager.product-managment", "parentId": "routes/_dash.manager", "path": "product-managment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_dash.manager.product-managment-BpkMWH0c.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/placeholder-BjUczgjq.js", "/assets/button-DJsvUUoM.js", "/assets/card-K50EQWi4.js", "/assets/input-hez_YNCu.js", "/assets/index-D-_HBbpy.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/label-D6OP4dC9.js", "/assets/index-CXn0XhFA.js", "/assets/index-BJ3mzL9c.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-H8sEG1MA.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/useCheckAuth-CkkafqVZ.js", "/assets/auth-CdFHSnW-.js", "/assets/auth.context-BpjR6wCg.js", "/assets/index-Dt0pqFoG.js"], "css": [] }, "routes/auth.google": { "id": "routes/auth.google", "parentId": "root", "path": "auth/google", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.google-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.google.callback": { "id": "routes/auth.google.callback", "parentId": "routes/auth.google", "path": "callback", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.google.callback-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/counter": { "id": "routes/counter", "parentId": "root", "path": "counter", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/counter-B4IAteIS.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/components-CF6Lyjm6.js", "/assets/index-BJ3mzL9c.js", "/assets/index-Dt0pqFoG.js"], "css": [] }, "routes/error": { "id": "routes/error", "parentId": "root", "path": "error", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/error---urw7Jy.js", "imports": ["/assets/jsx-runtime-BEJf7xDi.js", "/assets/error-boundary-8P-gqUxe.js", "/assets/components-CF6Lyjm6.js", "/assets/clsx-B-dksMZM.js", "/assets/bundle-mjs-BOZU2X2x.js", "/assets/index-Dt0pqFoG.js", "/assets/index-BJ3mzL9c.js"], "css": [] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-aa3f1aec.js", "version": "aa3f1aec" };
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
  "routes/_dash.creator": {
    id: "routes/_dash.creator",
    parentId: "routes/_dash",
    path: "creator",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_dash.creator.dashboard": {
    id: "routes/_dash.creator.dashboard",
    parentId: "routes/_dash.creator",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_dash.creator.finance": {
    id: "routes/_dash.creator.finance",
    parentId: "routes/_dash.creator",
    path: "finance",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_dash.creator.jobs": {
    id: "routes/_dash.creator.jobs",
    parentId: "routes/_dash.creator",
    path: "jobs",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_dash.creator.upload": {
    id: "routes/_dash.creator.upload",
    parentId: "routes/_dash.creator",
    path: "upload",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_dash.manager": {
    id: "routes/_dash.manager",
    parentId: "routes/_dash",
    path: "manager",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_dash.manager.campaign.$id": {
    id: "routes/_dash.manager.campaign.$id",
    parentId: "routes/_dash.manager",
    path: "campaign/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_dash.manager.campaigns": {
    id: "routes/_dash.manager.campaigns",
    parentId: "routes/_dash.manager",
    path: "campaigns",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_dash.manager.content-managment": {
    id: "routes/_dash.manager.content-managment",
    parentId: "routes/_dash.manager",
    path: "content-managment",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/_dash.manager.creator-managment": {
    id: "routes/_dash.manager.creator-managment",
    parentId: "routes/_dash.manager",
    path: "creator-managment",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/_dash.manager.creator.$id": {
    id: "routes/_dash.manager.creator.$id",
    parentId: "routes/_dash.manager",
    path: "creator/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/_dash.manager.dashboard": {
    id: "routes/_dash.manager.dashboard",
    parentId: "routes/_dash.manager",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/_dash.manager.product-managment": {
    id: "routes/_dash.manager.product-managment",
    parentId: "routes/_dash.manager",
    path: "product-managment",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route21
  },
  "routes/auth.google": {
    id: "routes/auth.google",
    parentId: "root",
    path: "auth/google",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/auth.google.callback": {
    id: "routes/auth.google.callback",
    parentId: "routes/auth.google",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/counter": {
    id: "routes/counter",
    parentId: "root",
    path: "counter",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/error": {
    id: "routes/error",
    parentId: "root",
    path: "error",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route26
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
