import { FC } from 'react';

import {
  ArchiveBoxIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  EyeIcon,
  FireIcon,
  HomeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

export type NavItem = {
  to: string;
  icon: FC<{ className?: string }> | null;
  label: string;
  badge?: number;
  children?: NavItem[];
}


export const navItems: NavItem[] = [
  { to: "/manager/dashboard", icon: HomeIcon, label: "Dashboard" },
  {
    to: "/manager/campaigns",
    icon: FireIcon,
    label: "Campaigns",
  },
  {
    to: "/manager/creators",
    icon: UserIcon,
    label: "Creators",
  },
  {
    to: "/manager/contents",
    icon: DocumentChartBarIcon,
    label: "Contents",
  },
  {
    to: "",
    icon: ArchiveBoxIcon,
    label: "Products",
    children: [
      { label: 'Order Tracking', to: '/manager/products/order-tracking', icon: null },
    ],
  },
  {
    to: "/manager/finance",
    icon: ChartBarSquareIcon,
    label: "Finance",
  },
  {
    to: "/manager/analytics",
    icon: ChartBarIcon,
    label: "Analytics",
  },
];

export const profileTab = [
  { to: "/manager/my-profile", icon: UserCircleIcon, label: "My Profile" },
  { to: "#", icon: Cog6ToothIcon, label: "Setting" },
  { to: "/manager/my-profile", icon: CreditCardIcon, label: "Payment Methods" },
];

export const campaignMenuItems = [
  {
    key: 'invite',
    icon: <UserPlusIcon width={16} color='#1F2937' />,
    label: 'Invite',
  },
  {
    key: 'view',
    icon: <EyeIcon width={16} color='#1F2937' />,
    label: 'View details',
  },
  {
    key: 'edit',
    icon: <PencilSquareIcon width={16} color='#1F2937' />,
    label: 'Edit',
  },
  {
    key: 'delete',
    icon: <TrashIcon width={16} color='#1F2937' />,
    label: 'Delete',
  },
];

