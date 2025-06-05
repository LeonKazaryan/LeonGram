import {
  ChatBubbleLeftIcon,
  UserCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="bg-[#212121] text-white md:w-[280px] md:h-screen md:fixed md:left-0 md:top-0 w-full fixed bottom-0 z-50">
      {/* App Name - Only show on desktop */}
      <div className="p-4 border-b border-gray-700 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-400">Leongram</h1>
      </div>

      {/* Navigation Items */}
      <div className="md:flex-1">
        <div className="flex md:flex-col justify-around md:p-2 md:space-y-1">
          {/* Home Section */}
          <Link
            to="/"
            className="flex items-center md:space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex-col md:flex-row"
          >
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200 text-xs md:text-base">Home</span>
          </Link>

          {/* Chats Section */}
          <Link
            to="/chats"
            className="flex items-center md:space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex-col md:flex-row"
          >
            <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200 text-xs md:text-base">Chats</span>
          </Link>

          {/* Profile Section */}
          <Link
            to="/profile"
            className="flex items-center md:space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors flex-col md:flex-row"
          >
            <UserCircleIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200 text-xs md:text-base">Profile</span>
          </Link>

          {/* Settings */}
          {/* <div className="hidden md:flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
            <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200">Settings</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
