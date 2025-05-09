import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "@/i18n/navigation";
import PostsPage from "@/app/[locale]/posts/clientPage";

interface ExtendedSession extends Session {
  user: {
    accessToken: string;
  } & Session["user"];
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = (await auth()) as ExtendedSession;
  const { locale } = await params;

  if (!session?.user?.accessToken) {
    redirect({ href: "/login", locale: locale });
  }

  // Fetch all posts
  const postsRes = await fetch(`${process.env.BACKEND_URL}/api/v1/posts`, {
    next: {
      revalidate: 300,
    },
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!postsRes.ok) {
    throw new Error(`Failed to fetch posts: ${postsRes.status}`);
  }

  const allPosts = await postsRes.json();

  // Fetch job posts
  const jobPostsRes = await fetch(
    `${process.env.BACKEND_URL}/api/v1/posts?type=JOB`,
    {
      next: {
        revalidate: 300,
      },
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  if (!jobPostsRes.ok) {
    throw new Error(`Failed to fetch job posts: ${jobPostsRes.status}`);
  }

  const jobPosts = await jobPostsRes.json();

  // Fetch marketplace posts (assuming there's a MARKETPLACE type)
  const marketplacePostsRes = await fetch(
    `${process.env.BACKEND_URL}/api/v1/posts?type=MARKETPLACE`,
    {
      next: {
        revalidate: 300,
      },
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  let marketplacePosts = [];
  if (marketplacePostsRes.ok) {
    marketplacePosts = await marketplacePostsRes.json();
  }

  // Fetch event posts (assuming there's an EVENT type)
  const eventPostsRes = await fetch(
    `${process.env.BACKEND_URL}/api/v1/posts?type=EVENT`,
    {
      next: {
        revalidate: 300,
      },
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  let eventPosts = [];
  if (eventPostsRes.ok) {
    eventPosts = await eventPostsRes.json();
  }

  return (
    <div>
      <PostsPage
        allPosts={allPosts}
        jobPosts={jobPosts}
        marketplacePosts={marketplacePosts}
        eventPosts={eventPosts}
      />
    </div>
  );
}
