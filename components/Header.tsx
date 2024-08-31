import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/">Home</Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/jobs" className="hover:text-gray-200">
            Jobs
          </Link>
          <Link href="/liked" className="hover:text-gray-200">
            Likes
          </Link>
          <Link href="/create-profile" className="hover:text-gray-200">
            Profile
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
