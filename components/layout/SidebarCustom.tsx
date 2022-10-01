import { FC } from 'react';
import { Sidebar } from 'flowbite-react';
import { ThemeType } from '@/constants/index';
import HomeIcon from '@/components/icons/HomeIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import ChartBarIcon from '@/components/icons/ChartBarIcon';
import PlayIcon from '@/components/icons/PlayIcon';

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
          <Sidebar.Item href='/songs' icon={PlayIcon}>
            Songs
          </Sidebar.Item>
          <Sidebar.Item href='/stats' icon={ChartBarIcon}>
            Stats
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarCustom;
