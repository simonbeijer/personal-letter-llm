"use client";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/userContext";
import Dropdown from "./dropdown";

export default function Header() {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const logoutUser = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (response.ok) {
        const data = await response.json();
        console.log('[Auth] User logged out successfully');
        setUser(null);
        router.push("/login");
      } else {
        console.error('[Auth] Logout failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('[Auth] Logout error:', error.message);
    }
  };
  return (
    <header className="bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Personal Letter LLM
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
              Dashboard
            </a>
            <a href="/generate" className="text-foreground hover:text-primary transition-colors font-medium">
              Generate Letter
            </a>
          </nav>
          <div className="flex items-center">
            <Dropdown logoutUser={logoutUser} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
