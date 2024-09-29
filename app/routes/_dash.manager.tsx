import {
  Avatar,
  Badge,
  Layout,
  Menu,
} from 'antd';
import Logo from '~/assets/logo.svg';
import { navItems } from '~/constants/manager.constant';
import { useAuthContext } from '~/contexts/auth.context';

import { BellIcon } from '@heroicons/react/24/outline';
import {
  Link,
  Outlet,
  useLocation,
} from '@remix-run/react';

const { Header, Sider, Content } = Layout;

function page() {
  const { handleLogout } = useAuthContext()

  const param = useLocation()


  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={200} className='h-[100vh] overflow-hidden'>
        <div className='h-[60px] flex items-center bg-[#F9FAFB] px-5 justify-between'>
          <img src={Logo} className='h-[24px]' alt="logo" />
          <Badge size='small' className='cursor-pointer' count={5}>
            <BellIcon width={20} color='#374151' />
          </Badge>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[param?.pathname]}
          style={{ height: '100%', borderRight: 0, backgroundColor: '#F9FAFB' }}
        >
          {navItems.map(m => (
            <Menu.Item key={m.to}>
              <div className='flex relative w-full items-center justify-between' onClick={() => m.label === 'Logout' ? handleLogout() : null}>
                <Link to={m.to}><div className='ml-2 flex items-center gap-2'>
                  <m.icon className="h-4 w-4" />
                  {m.label}

                  {m.label === 'Campaigns' && (
                    <div className='flex justify-end w-full absolute right-0'>
                      <Badge color='#3B82F6' size='small' count={25} ></Badge>
                    </div>
                  )}
                </div>
                </Link>
              </div>
            </Menu.Item>
          ))}

        </Menu>
        <div className='absolute bottom-0 left-0 w-full p-5 flex items-center gap-2'>
          <Avatar className='w-[24px]' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          <div className='flex w-[100px] flex-col'>
            <h6 className='text-gray-900 font-medium'>Alex</h6>
            <p className='text-gray-500 text-sm'>khoi.dev@gmail</p>
          </div>
        </div>
      </Sider>
      <div className='flex w-full p-5 flex-col h-[100vh] overflow-y-scroll'>
        <Outlet />
      </div>
    </Layout>
  )
}

export default page
