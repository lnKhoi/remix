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
import Logo from '~/assets/logo.svg';
import {
  NavItem,
  navItems,
  profileTab,
} from '~/constants/manager.constant';
import { useAuthContext } from '~/contexts/auth.context';
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

// Sidebar Menu Component
function SidebarMenu({
  items,
  onLogout,
}: {
  items: NavItem[];
  onLogout: () => void;
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
            icon={renderIcon(item.icon)}
            title={item.label}
          >
            {item.children.map((child) => (
              <Menu.Item key={child.to}>
                <Link to={child.to}>
                  <div className="flex items-center gap-2">
                    {renderIcon(child.icon)}
                    {child.label}
                  </div>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.to}>
            <Link to={item.to}>
              <div
                className="flex items-center gap-2"
                onClick={() => item.label === "Logout" && onLogout()}
              >
                {renderIcon(item.icon)}
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
  userInfo: { name: string; email: string };
  profileTab: NavItem[];
  onLogout: () => void;
  onNavigate: (to: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Popover
      content={
        <div>
          <div className="pb-2.5 border-b border-b-gray-200 flex items-center gap-2">
            <Avatar
              className="w-[24px]"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
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
                    : onNavigate(tab.to)
                }
              >
                <div className="flex items-center gap-2">
                  {renderIcon(tab.icon)}
                  {tab.label}
                </div>
              </Menu.Item>
            ))}
          </Menu>
          <div className="pt-2 border-t border-t-gray-200">
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
        <Avatar
          className="w-[24px]"
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        />
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

// Main Page Component
function Page() {
  const { handleLogout, userInfo } = useAuthContext();
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={200} className="h-[100vh] overflow-hidden">
        <div className="h-[60px] flex items-center bg-[#F9FAFB] pr-5 pl-[27px] justify-between">
          <img src={Logo} className="h-[24px]" alt="logo" />
          <Badge size="small" className="cursor-pointer" count={5}>
            <BellIcon width={20} color="#374151" />
          </Badge>
        </div>
        <SidebarMenu items={navItems} onLogout={handleLogout} />
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
