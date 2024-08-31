"use client";
import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex justify-between items-center px-4 bg-blue-600 text-white">
      <Link
        onClick={() => setIsSidebarOpen(false)}
        href="/"
        className="md:bg-white  p-2 mr-2 md:text-blue-600 rounded"
      >
        Home
      </Link>
      <div className="md:hidden">
        <button onClick={toggleSidebar}>
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
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-600 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:relative md:bg-transparent md:w-auto z-10`}
      >
        <div className="flex flex-col p-4 text-white">
          <button className="self-end md:hidden" onClick={toggleSidebar}>
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="flex flex-nowrap">
            <Link
              onClick={toggleSidebar}
              href="/jobs"
              className="bg-white p-2 mr-2 text-blue-600 rounded hover:bg-blue-100"
            >
              Jobs
            </Link>
            <Link
              onClick={toggleSidebar}
              href="/liked"
              className="bg-white p-2 mr-2 text-blue-600 rounded hover:bg-blue-100"
            >
              Likes
            </Link>
            <Link
              onClick={toggleSidebar}
              href="/create-profile"
              className="bg-white p-2 mr-2 text-blue-600 rounded hover:bg-blue-100"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
