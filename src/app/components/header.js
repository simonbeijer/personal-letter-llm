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
    <header className="relative flex justify-between items-center h-12 px-4">
      <div />
      <nav className="absolute left-1/2 transform -translate-x-1/2">
        My navbar
      </nav>
      <div>
          <Dropdown logoutUser={logoutUser} user={user} />
      </div>
    </header>
  );
}
