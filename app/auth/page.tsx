import Link from "next/link";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl ">Carrot Assignment 10</h1>
        <h2 className="text-2xl">Tweets & Pagination</h2>
        <h4 className="text-xl">12/26~12/27</h4>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/create-account"
          className="w-full bg-orange-500 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-orange-400 transition-colors"
        >
          Create Account
        </Link>
       <Link
          href="/log-in"
          className="w-full bg-white text-orange-500 text-lg font-medium py-2.5 rounded-md text-center hover:bg-orange-400 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}