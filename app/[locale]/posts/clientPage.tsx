"use client";

import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

// Define types for different post categories
type JobPost = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  type: string;
  category: "jobs";
};

type MarketplacePost = {
  id: string;
  title: string;
  price: string;
  condition: string;
  seller: string;
  location: string;
  posted: string;
  category: "marketplace";
};

type EventPost = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  category: "events";
};

type Post = JobPost | MarketplacePost | EventPost;

interface PostsPageProps {
  allPosts: any[];
  jobPosts: any[];
  marketplacePosts: any[];
  eventPosts: any[];
}

export default function PostsPage({
  allPosts,
  jobPosts,
  marketplacePosts,
  eventPosts,
}: PostsPageProps) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "jobs" | "marketplace" | "events"
  >("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Map API data to our component's expected format
  // Note: You'll need to adjust these mappings based on your actual API response structure
  const mappedJobPosts: JobPost[] = jobPosts.map((post: any) => ({
    id: post.id || post._id,
    title: post.title,
    company: post.company || "Not specified",
    location: post.location || "Remote",
    salary: post.salary || "Not specified",
    posted: post.createdAt
      ? formatTimeAgo(new Date(post.createdAt))
      : "Recently",
    type: post.jobType || "Not specified",
    category: "jobs",
  }));

  const mappedMarketplacePosts: MarketplacePost[] = marketplacePosts.map(
    (post: any) => ({
      id: post.id || post._id,
      title: post.title,
      price: post.price || "Not specified",
      condition: post.condition || "Not specified",
      seller: post.seller?.name || post.sellerName || "Anonymous",
      location: post.location || "Not specified",
      posted: post.createdAt
        ? formatTimeAgo(new Date(post.createdAt))
        : "Recently",
      category: "marketplace",
    }),
  );

  const mappedEventPosts: EventPost[] = eventPosts.map((post: any) => ({
    id: post.id || post._id,
    title: post.title,
    date: post.date || formatDate(post.eventDate),
    time: post.time || formatTime(post.eventTime),
    location: post.location || "Not specified",
    organizer: post.organizer || post.organizerName || "Not specified",
    attendees: post.attendees || post.attendeeCount || 0,
    category: "events",
  }));

  // Combine all posts into one array
  const ALL_POSTS: Post[] = [
    ...mappedJobPosts,
    ...mappedMarketplacePosts,
    ...mappedEventPosts,
  ];

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "all"
      ? ALL_POSTS
      : ALL_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />

      <main className="flex-1 pt-24">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-6">Campus Posts</h1>

            {/* Category buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                className={`rounded-full px-6 ${activeCategory === "all" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-500 text-amber-700 hover:bg-amber-100"}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </Button>
              <Button
                variant={
                  activeCategory === "marketplace" ? "default" : "outline"
                }
                className={`rounded-full px-6 ${activeCategory === "marketplace" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-500 text-amber-700 hover:bg-amber-100"}`}
                onClick={() => setActiveCategory("marketplace")}
              >
                Marketplace
              </Button>
              <Button
                variant={activeCategory === "jobs" ? "default" : "outline"}
                className={`rounded-full px-6 ${activeCategory === "jobs" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-500 text-amber-700 hover:bg-amber-100"}`}
                onClick={() => setActiveCategory("jobs")}
              >
                Jobs
              </Button>
              <Button
                variant={activeCategory === "events" ? "default" : "outline"}
                className={`rounded-full px-6 ${activeCategory === "events" ? "bg-amber-500 hover:bg-amber-600" : "border-amber-500 text-amber-700 hover:bg-amber-100"}`}
                onClick={() => setActiveCategory("events")}
              >
                Events
              </Button>
              <Button
                variant="default"
                className="rounded-full px-6 bg-black hover:bg-gray-800"
                onClick={() => alert("Add new post clicked")}
              >
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                // Render different card layouts based on post category
                if (post.category === "jobs") {
                  const jobPost = post as JobPost;
                  return (
                    <Card
                      key={jobPost.id}
                      className="overflow-hidden hover:shadow-lg transition-all bg-white"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg">{jobPost.title}</h3>
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            {jobPost.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">{jobPost.company}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span className="mr-3">📍 {jobPost.location}</span>
                          <span>{jobPost.salary}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Posted {jobPost.posted}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-amber-600 border-amber-300 hover:bg-amber-50"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                } else if (post.category === "marketplace") {
                  const marketPost = post as MarketplacePost;
                  return (
                    <Card
                      key={marketPost.id}
                      className="overflow-hidden hover:shadow-lg transition-all bg-white"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg">
                            {marketPost.title}
                          </h3>
                          <span className="font-bold text-amber-600">
                            {marketPost.price}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                          Condition: {marketPost.condition}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span className="mr-3">📍 {marketPost.location}</span>
                          <span>👤 {marketPost.seller}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Posted {marketPost.posted}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-amber-600 border-amber-300 hover:bg-amber-50"
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                } else if (post.category === "events") {
                  const eventPost = post as EventPost;
                  return (
                    <Card
                      key={eventPost.id}
                      className="overflow-hidden hover:shadow-lg transition-all bg-white"
                    >
                      <div className="p-5">
                        <h3 className="font-bold text-lg">{eventPost.title}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="mr-3">📅 {eventPost.date}</span>
                          <span>⏰ {eventPost.time}</span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm">
                          📍 {eventPost.location}
                        </p>
                        <p className="text-gray-500 mt-1 text-sm">
                          By {eventPost.organizer}
                        </p>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <span className="text-xs bg-amber-100 px-2 py-1 rounded-full text-amber-800">
                            {eventPost.attendees} attending
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-amber-600 border-amber-300 hover:bg-amber-50"
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                }
                return null;
              })
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">
                  No posts found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper functions for formatting dates and times
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function formatDate(dateString?: string): string {
  if (!dateString) return "Date not specified";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
}

function formatTime(timeString?: string): string {
  if (!timeString) return "Time not specified";

  // If it's a date string with time
  if (timeString.includes("T") || timeString.includes("-")) {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return timeString;
    }
  }

  return timeString;
}
