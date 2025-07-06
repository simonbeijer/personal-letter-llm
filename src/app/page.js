import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col gap-8">
        <button className="px-4 py-2 border rounded bg-foreground text-white dark:text-black border-gray-300 hover:border-grey-500">
          <Link href="login">Login</Link>
        </button>
      </main>
    </div>
  );
}
