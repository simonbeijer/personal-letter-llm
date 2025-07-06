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
        const data = response.json();
        console.log(data)
        setUser(null);
        router.push("/login");
      } else {
        console.log("response logout error", response);
      }
    } catch (error) {
      console.log("logout catch error", error);
    }
  };
  return (
    <header className="bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">
              Personal Letter LLM
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="/generate" className="text-foreground hover:text-primary transition-colors">
              Generate Letter
            </a>
          </nav>
          <div>
            <Dropdown logoutUser={logoutUser} user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
