import {
  createElement,
  useState,
} from 'react';

import {
  Avatar,
  Badge,
  Layout,
  Menu,
  Popover,
} from 'antd';
import DefaultAvatar from '~/assets/avatar.jpeg';
import Logo from '~/assets/logo.svg';
import Notification from '~/components/notification/Notification';
import {
  NavItem,
  navItems,
  profileTab,
} from '~/constants/manager.constant';
import { useAuthContext } from '~/contexts/auth.context';
import { Permission } from '~/models/role.model';
import { User } from '~/models/User.model';

import { BellIcon } from '@heroicons/react/24/outline';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from '@remix-run/react';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Utility to render icons dynamically
const renderIcon = (Icon: React.ComponentType<any> | null, className = "h-4 w-4") => {
  return Icon ? createElement(Icon, { className }) : null;
};

// Helper function to check permissions
const hasMatchingPermission = (item: NavItem, permsToCheck: string[]) =>
  !item.permissions || item.permissions.some((perm) => permsToCheck.includes(perm));

// Sidebar Menu Component
function SidebarMenu({
  items,
  onLogout,
  permissions,
}: {
  items: NavItem[];
  onLogout: () => void;
  permissions: Permission[];
}) {
  const location = useLocation();


  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      style={{
        height: "100%",
        borderRight: 0,
        backgroundColor: "#F9FAFB",
      }}
    >
      {items.map((item) =>
        item.children ? (
          <SubMenu
            key={item.to}
            title={
              <div
                className="flex items-center gap-2"
                style={{
                  fontSize: 14,
                  alignItems: "center",
                  height: 39,
                  display: "flex",
                  width: "100%",
                  marginTop: 4,
                  marginBottom: 4,
                  marginLeft: 4,
                }}
              >
                {item.icon && renderIcon(item.icon)}
                <span>{item.label}</span>
              </div>
            }
          >
            {item.children.map((child) => (
              <Menu.Item key={child.to}>
                <Link to={child.to}>
                  <div className="flex items-center gap-2">
                    {child.icon && renderIcon(child.icon)}
                    <span>{child.label}</span>
                  </div>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item
            style={{ height: 35, marginTop: 4, width: 180, marginLeft: 10, padding: 20 }}
            key={item.to}
          >
            <Link to={item.to}>
              <div
                style={{ fontSize: 14, display: "flex" }}
                className="flex items-center h-full gap-2"
              >
                {item.icon && renderIcon(item?.icon)}
                {item.label}
              </div>
            </Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
}

// User Profile Popover Component
function UserProfilePopover({
  userInfo,
  profileTab,
  onLogout,
  onNavigate,
}: {
  userInfo: User;
  profileTab: NavItem[];
  onLogout: () => void;
  onNavigate: (to: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Popover
      content={
        <div>
          <div className="p-3 border-b border-b-gray-200 flex items-center gap-2">
            <Avatar
              shape="circle"
              className="w-[36px] h-[36px] object-cover"
              src={DefaultAvatar}
            />
            <div className="flex w-[100px] flex-col">
              <h6 className="text-gray-900 font-medium">{userInfo?.name}</h6>
              <p className="text-gray-500 text-sm">{userInfo?.email}</p>
            </div>
          </div>
          <Menu style={{ borderRight: 0, width: 220 }}>
            {profileTab.map((tab) => (
              <Menu.Item
                key={tab.label}
                onClick={() =>
                  tab.label === "Logout"
                    ? onLogout()
                    : (onNavigate(tab.to), setModalOpen(false), localStorage.setItem('profile-tab', (tab?.active || 'Profile Details')))
                }
              >
                <div className="flex items-center gap-2">
                  {tab.icon && renderIcon(tab.icon)}
                  {tab.label}
                </div>
              </Menu.Item>
            ))}
          </Menu>
          <div className="p-3 border-t border-t-gray-200">
            <div
              className="flex text-sm text-gray-800 py-2 cursor-pointer hover:bg-gray-100 transition-all rounded-md items-center gap-2"
              onClick={onLogout}
            >
              Sign out
            </div>
          </div>
        </div>
      }
      trigger="click"
      placement="topRight"
      open={modalOpen}
      onOpenChange={() => setModalOpen(!modalOpen)}
    >
      <div className="absolute m-5 cursor-pointer bottom-0 left-0 flex items-center gap-2">
        <img style={{ width: 36, height: 36, borderRadius: 36 }} src={DefaultAvatar} alt="avatar" />
        <div className="flex w-[100px] flex-col">
          <h6 className="text-gray-900 font-medium">{userInfo?.name}</h6>
          <p className="text-gray-500 text-sm">
            {userInfo?.email?.slice(0, 15)}...
          </p>
        </div>
      </div>
    </Popover>
  );
}

// Main Page Component with Route Protection
function Page() {
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = () => {
    navigate('/login')
    localStorage.clear()
    sessionStorage.clear()
  }


  const filterMenu = (menu: NavItem[], userPermissions: Permission[]): NavItem[] => {
    return menu
      .map(item => {
        const hasPermission =
          !item?.permissions || item?.permissions?.some(p => userPermissions?.includes(p as Permission));

        if (!hasPermission) return null; // Exclude item if user lacks permissions

        // If the item has children, filter them recursively
        const filteredChildren = item?.children ? filterMenu(item?.children, userPermissions) : [];

        if (item?.children && filteredChildren?.length === 0) return null; // Remove if no valid children

        return { ...item, children: filteredChildren?.length > 0 ? filteredChildren : undefined };
      })
      .filter((item) => item !== null); // Remove null values and ensure correct type
  };

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={200} className="h-[100vh] overflow-hidden">
        <div className="h-[60px] flex notification items-center bg-[#F9FAFB] pr-5 pl-[27px] justify-between">
          <img src={Logo} className="h-[24px]" alt="logo" />
          <Popover
            trigger="click"
            placement="bottomLeft"
            title={<div className="w-[475px] h-[350px]"><Notification /></div>}
          >
            <Badge size="small" className="cursor-pointer" count={5}>
              <BellIcon width={20} color="#374151" />
            </Badge>
          </Popover>
        </div>
        <SidebarMenu
          items={filterMenu(navItems, userInfo?.permissions as Permission[])}
          onLogout={handleLogout}
          permissions={userInfo?.permissions as Permission[] || []}
        />
        <UserProfilePopover
          userInfo={userInfo as User}
          profileTab={profileTab}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      </Sider>
      <div className="flex w-full bg-white p-5 flex-col h-[100vh] overflow-y-scroll">
        <Outlet />
      </div>
    </Layout>
  );
}

export default Page;