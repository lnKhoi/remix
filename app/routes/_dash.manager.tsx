import { useState } from 'react';

import {
  Avatar,
  Badge,
  Layout,
  Menu,
  Popover,
} from 'antd';
import Logo from '~/assets/logo.svg';
import {
  navItems,
  profileTab,
} from '~/constants/manager.constant';
import { useAuthContext } from '~/contexts/auth.context';

import { BellIcon } from '@heroicons/react/24/outline';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from '@remix-run/react';

const { Header, Sider, Content } = Layout;

function page() {
  const { handleLogout, userInfo } = useAuthContext()
  const [modal, setModal] = useState<boolean>(false)

  const param = useLocation()
  const navigate = useNavigate()

  const handleViewInfo = (to:string) => {
     navigate(to)
     setModal(false)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={200} className='h-[100vh] overflow-hidden'>
        <div className='h-[60px] flex items-center bg-[#F9FAFB] pr-5 pl-[27px] justify-between'>
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
              <div className='flex relative  w-full items-center justify-between' onClick={() => m.label === 'Logout' ? handleLogout() : null}>
                <Link to={m.to}><div className='flex items-center gap-2'>
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
        <Popover
          content={<div >
            <div className='pb-2.5 border-b border-b-gray-200 flex items-center gap-2'>
              <Avatar className='w-[24px]' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              <div className='flex w-[100px] flex-col'>
                <h6 className='text-gray-900 font-medium'>{userInfo?.name}</h6>
                <p className='text-gray-500 text-sm'>{userInfo?.email}</p>
              </div>
            </div>

            <Menu
              style={{ borderRight: 0, width: 220, }}
            >
              {profileTab.map(m => (
                  <Menu.Item key={m.label} >
                    <div
                      className='flex relative w-full -ml-4'
                      onClick={() => m.label === 'Logout' ? handleLogout() : handleViewInfo(m.to)}>
                      <div className='flex items-center gap-2'>
                        <m.icon className="h-4 w-4" />
                        {m.label}
                      </div>
                    </div>
                  </Menu.Item>

              ))}
            </Menu>

            <div className='pt-2 border-t border-t-gray-200'>
              <div
                className='flex relative w-full'>
                <div onClick={handleLogout} className='flex text-sm pl-1 w-full text-gray-800 py-2 cursor-pointer hover:bg-gray-100 transition-all rounded-md items-center gap-2'>
                  Sign out
                </div>
              </div>
            </div>
          </div>}
          trigger="click"
          placement={'topRight'}
          open={modal}
          onOpenChange={(): void => setModal(!modal)}
        >
          <div className='absolute m-5 cursor-pointer bottom-0 left-0 w-ful flex items-center gap-2'>
            <Avatar className='w-[24px]' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <div className='flex w-[100px] flex-col'>
              <h6 className='text-gray-900 font-medium'>{userInfo?.name}</h6>
              <p className='text-gray-500 text-sm'>{userInfo?.email?.slice(0, 15)}...</p>
            </div>
          </div>
        </Popover>
      </Sider>
      <div className='flex w-full bg-white p-5 flex-col h-[100vh] overflow-y-scroll'>
        <Outlet />
      </div>
    </Layout>
  )
}

export default page
