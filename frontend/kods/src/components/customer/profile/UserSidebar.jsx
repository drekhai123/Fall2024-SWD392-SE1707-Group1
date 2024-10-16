import { Avatar } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ items, userData }) => {
  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Extract the pathname

  // Custom function to check if the current path matches the item link
  const isActiveLink = (link) => {
    return currentPath === link || currentPath.startsWith(link + "/");
  };

  console.log("userData: ", userData);
  return (
    <aside className="group/sidebar flex flex-col h-full shrink-0 lg:w-[350px] w-[300px] transition-all duration-300 ease-in-out m-0 relative bg-white border-r border-r-dashed border-r-neutral-200">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center mr-5">
          <Avatar
            className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
            alt="avatar image"
          />
          <div className="mr-2">
            <div className="hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium text-secondary-inverse">
              {userData?.userName || "User Name"}
            </div>
            <span className="text-secondary-dark font-medium block text-[0.85rem]">
              {userData?.role || "unknown"}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

      <div className="relative pl-3 my-5 overflow-hidden">
        <div className="flex flex-col w-full font-medium">
          {items.map((item, index) => (
            <div key={index}>
              <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <Link
                  to={item.link}
                  className={`flex items-center flex-grow text-[1.15rem] ${
                    isActiveLink(item.link)
                      ? "bg-gray-100 text-black font-bold rounded-md"
                      : "text-black"
                  } p-2 transition-all duration-200`}
                >
                  {item.label}
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
