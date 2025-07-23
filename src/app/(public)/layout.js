import { UserProvider } from "../context/userContext";
export default function PublicLayout({ children }) {
  return (
    <UserProvider>
      <main>{children}</main>
    </UserProvider>
  );
}
