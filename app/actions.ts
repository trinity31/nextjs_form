"use server";

import db from "@/lib/db";

const ITEMS_PER_PAGE = 20;

export async function getTweets(page: number) {
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