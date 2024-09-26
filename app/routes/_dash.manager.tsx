// import {
//   Bell,
//   Shell,
// } from 'lucide-react';
// import { Badge } from '~/components/ui/badge';
// import { Button } from '~/components/ui/button';
// import { navItems } from '~/constants/manager.constant';
// import { useAuthContext } from '~/contexts/auth.context';

// export default function ManagerLayout() {
//   const location = useLocation();
//   const { handleLogout } = useAuthContext()
//   const isActive = (path: string) => {
//     if (path === "#") return false;
//     return location.pathname.startsWith(path);
//   };
//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       <div className="hidden h-full overflow-hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//             <Link to="/login" className="flex items-center gap-2 font-semibold">
//               <Shell className="h-6 w-6" />
//               <span className="">Spiral Inc</span>
//             </Link>
//             <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
//               <Bell className="h-4 w-4" />
//               <span className="sr-only">Toggle notifications</span>
//             </Button>
//           </div>
//           <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//               {navItems.map((item) => (
//                 <div onClick={() => item.label === 'Logout' ? handleLogout() : null}
//                 >
//                   <Link
//                     key={item.label}
//                     to={item.to}
//                     className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive(item.to)
//                         ? "bg-muted text-primary"
//                         : "text-muted-foreground"
//                       }`}
//                   >
//                     <item.icon className="h-4 w-4" />
//                     {item.label}
//                     {item.badge && (
//                       <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                         {item.badge}
//                       </Badge>
//                     )}
//                   </Link>
//                 </div>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col h-[100vh] overflow-y-scroll">
//         <main className="flex flex-1 flex-col p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
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
} from '@remix-run/react';

const { Header, Sider, Content } = Layout;

function page() {
  const { handleLogout } = useAuthContext()
  
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={200} className='h-[100vh] overflow-hidden'>
        <div className='h-[68px] flex items-center bg-[#F9FAFB] px-5 justify-between'>
          <img src={Logo} className='h-[24px]' alt="logo" />
          <Badge size='small' className='cursor-pointer' count={5}>
            <BellIcon width={20} color='#374151' />
          </Badge>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/manager/dashboard']}
          style={{ height: '100%', borderRight: 0, backgroundColor: '#F9FAFB' }}
        >
          {navItems.map(m => (
            <Menu.Item  key={m.to}>
              <div className='flex items-center' onClick={() => m.label === 'Logout' ? handleLogout() : null}>
              <m.icon className="h-4 w-4" />
              <Link to={m.to}><div className='ml-2'>{m.label}</div></Link>
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
      <div className='flex w-full p-8 flex-col h-[100vh] overflow-y-scroll'>
        <Outlet />
      </div>
    </Layout>
  )
}

export default page
