import { FC } from 'react';
import { Sidebar } from 'flowbite-react';
import { ThemeType } from '@/constants/index';
import HomeIcon from '../icon/HomeIcon';
import UsersIcon from '../icon/UsersIcon';

const SidebarCustom: FC<{ groups: Array<ThemeType>; collapsed: boolean }> = ({
  groups,
  collapsed,
}) => {
  return (
    <Sidebar collapsed={collapsed}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href='/' icon={HomeIcon}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse label='Groups' icon={UsersIcon}>
            {groups?.map((group) => (
              <Sidebar.Item href={`/groups/${group._id}`} key={group._id}>
                {group.name}
              </Sidebar.Item>
            ))}
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarCustom;
