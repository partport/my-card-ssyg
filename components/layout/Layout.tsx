import React, { FC, useState } from 'react';
import NavbarCustom from './NavbarCustom';
import SidebarCustom from './SidebarCustom';
import { ThemeType } from '@/constants/index';

const Layout: FC<{ groups: Array<ThemeType>; children: React.ReactNode }> = ({
  groups,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenu = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <NavbarCustom title='superstar yg' onClickMenu={handleMenu} />
      <div className='flex h-full overflow-hidden bg-gray-100 dark:bg-gray-900 '>
        <SidebarCustom groups={groups} collapsed={sidebarCollapsed} />
        <main className='flex-1 overflow-auto p-4 '>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
