import { FC } from "react";
import { Sidebar } from "flowbite-react";
import { ThemeType } from "@/constants/index";

const SidebarCustom: FC<{ groups: Array<ThemeType> }> = ({ groups }) => {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/"
          // icon={HomeIcon}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse label="Groups"
          // icon={UserGroupIcon}
          >
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
