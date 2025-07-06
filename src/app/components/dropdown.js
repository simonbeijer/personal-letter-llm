"use client";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Spinner from "./spinner";

export default function Dropdown({ user, logoutUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 7000);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button className="flex items-center" onClick={toggleDropdown}>
        <UserCircleIcon className="h-8 w-8"></UserCircleIcon>
      </button>
      <div
        className={`transition-all duration-500 transform absolute right-0 mt-2 p-4 border rounded-md shadow-md text-right bg-background text-foreground ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {user ? (
          <>
            <p>{user.name}</p>
            <button
              className="text-grey font-bold"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="h-[60px] w-[60px] flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
