import {
  ChatBubbleLeftIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="h-screen w-[280px] bg-[#212121] text-white flex flex-col fixed left-0 top-0">
      {/* App Name */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">Leongram</h1>
      </div>

      {/* Navigation Items */}
      <div className="flex-1">
        <div className="p-2 space-y-1">
          {/* Home Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200">Home</span>
          </Link>

          {/* Chats Section */}
          <Link
            to="/chats"
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200">Chats</span>
          </Link>

          {/* Profile Section */}
          <Link
            to="/profile"
            className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <UserCircleIcon className="h-6 w-6 text-gray-400" />
            <span className="text-gray-200">Profile</span>
          </Link>
        </div>
      </div>

      {/* Settings */}
      <div className="p-2 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
          <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
          <span className="text-gray-200">Settings</span>
        </div>
      </div>
    </div>
  );
}
