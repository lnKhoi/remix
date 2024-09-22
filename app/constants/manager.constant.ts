import {
  Home,
  LineChart,
  LogOutIcon,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';

export const navItems = [
    { to: "/manager/dashboard", icon: Home, label: "Dashboard" },
    {
      to: "/manager/campaigns",
      icon: ShoppingCart,
      label: "Campaigns",
      badge: 6,
    },
    {
      to: "/manager/creator-managment",
      icon: Package,
      label: "Creators",
    },
    { to: "content-managment", icon: Users, label: "Contents" },
    { to: "product-managment", icon: LineChart, label: "Products" },
    { to: "#", icon: LineChart, label: "Analytics" },
    { to: "#", icon: LineChart, label: "Finance" },
    { to: "#", icon: LineChart, label: "User Management" },
    {
      to: "#",
      icon: LogOutIcon,
      label: "Logout",
    },
  ];