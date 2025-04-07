import Link from "next/link";
import { IUser } from "@/models/user.model";
import { menuItems } from "@/constants/navbar";
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";

interface SidebarProps {
  onNavClick: (page: string) => void;
  activeMenuItem: string;
  user: IUser;
}

function Sidebar(props: SidebarProps): JSX.Element {
  const { onNavClick, activeMenuItem, user } = props;
  const [collapsed, setCollapsed] = useState(false); // Add state variable

  const filteredMenuItems = menuItems.filter((nav) =>
    nav.role.includes(user.role)
  );

  return (
    <aside
      className={`flex flex-col w-10 ${
        collapsed ? "" : "md:w-56"
      } transition-all `}
    >
      <h2 className="p-3 text-lg font-semibold hidden md:block">
        {collapsed ? (
          <AiFillDashboard className="text-red" />
        ) : (
          " Admin Dashboard"
        )}
      </h2>
      <nav className="flex-grow">
        <ul className="flex flex-col py-2 space-y-2">
          {filteredMenuItems.map((menuItem) => (
            <li
              key={menuItem.label}
              className={`flex items-center justify-center md:justify-normal cursor-pointer md:px-3 w-full md:w-auto py-2 ${
                activeMenuItem === menuItem.label
                  ? "bg-pink text-red"
                  : "hover:text-red"
              }`}
              onClick={() => onNavClick(menuItem.label)}
            >
              <span className={`mr-2`}>
                <menuItem.icon />
              </span>
              <span
                className={`hidden ${
                  collapsed ? "" : "md:block"
                } transition-all`}
              >
                {menuItem.label}
              </span>
            </li>
          ))}
          <div className="m-1  flex justify-center items-center ">
            <button
              className="focus:outline-none border p-[2px] border-red text-red rounded text-xs"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <IoChevronForward size={15} /> : "Collapse"}
            </button>
          </div>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
