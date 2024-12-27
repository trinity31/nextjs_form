import db from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

async function getTweet(id: string) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!tweet) notFound();
  return tweet;
}

export default async function TweetDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const tweet = await getTweet(id);

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to tweets
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-blue-500">@{tweet.user.username}</span>
          <span className="text-sm text-neutral-500">
            {new Date(tweet.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-neutral-700 text-lg">{tweet.tweet}</p>
      </div>
    </div>
  );
} 