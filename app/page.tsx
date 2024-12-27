import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import FormButton from "@/components/form-btn";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ITEMS_PER_PAGE = 20;

async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
  });

  const totalTweets = await db.tweet.count();
  const totalPages = Math.ceil(totalTweets / ITEMS_PER_PAGE);

  return { tweets, totalPages };
}

const logOut = async () => {
  "use server";
  const session = await getSession();
  await session.destroy();
  redirect("/auth");
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getSession();
  if (!session.id) {
    redirect("/auth");
  }
  
  const params = await searchParams;
  let currentPage = 1;
  try {
    currentPage = params.page ? parseInt(params.page) : 1;
    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  } catch (e) {
    currentPage = 1;
  }
  
  const { tweets, totalPages } = await getTweets(currentPage);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Latest Tweets</h1>
        <form action={logOut} className="px-4">
          <FormButton text="Log out" className="px-6" />
        </form>
      </div>
      <div className="flex flex-col divide-y divide-neutral-800">
        {tweets.map((tweet) => (
          <Link
            href={`/tweets/${tweet.id}`}
            key={tweet.id}
            className="p-4 first:pt-0 hover:bg-neutral-400 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-blue-500">@{tweet.user.username}</span>
                <span className="text-sm text-neutral-500">
                  {new Date(tweet.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-neutral-700">{tweet.tweet}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-4 items-center mt-4">
        <Link
          href={`/?page=${currentPage - 1}`}
          className={`p-2 rounded-full hover:bg-neutral-100 ${
            currentPage <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`/?page=${currentPage + 1}`}
          className={`p-2 rounded-full hover:bg-neutral-100 ${
            currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
