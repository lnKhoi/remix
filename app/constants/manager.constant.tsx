import {
  ArchiveBoxIcon,
  ArrowLeftEndOnRectangleIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  EyeIcon,
  FireIcon,
  HomeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

export const navItems = [
    { to: "/manager/dashboard", icon: HomeIcon, label: "Dashboard" },
    {
      to: "/manager/campaigns",
      icon: FireIcon,
      label: "Campaigns",
      badge: 6,
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
      to: "/manager/products",
      icon: ArchiveBoxIcon,
      label: "Products",
    },
    {
      to: "/manager/analytics",
      icon: ChartBarIcon,
      label: "Analytics",
    },
    {
      to: "#",
      icon: ArrowLeftEndOnRectangleIcon,
      label: "Logout",
    },
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

  