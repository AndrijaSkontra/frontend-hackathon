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

// Sample data for different posting types
const JOB_POSTS: JobPost[] = [
  {
    id: "j1",
    title: "Teaching Assistant - Computer Science",
    company: "University CS Department",
    location: "On Campus",
    salary: "$18-22/hr",
    posted: "2 days ago",
    type: "Part-time",
    category: "jobs",
  },
  {
    id: "j2",
    title: "Research Assistant - Biology Lab",
    company: "University Bio Department",
    location: "Science Building",
    salary: "$20-25/hr",
    posted: "1 week ago",
    type: "Part-time",
    category: "jobs",
  },
  {
    id: "j3",
    title: "Campus Tour Guide",
    company: "University Admissions",
    location: "Various Campus Locations",
    salary: "$15-17/hr",
    posted: "3 days ago",
    type: "Flexible hours",
    category: "jobs",
  },
  {
    id: "j4",
    title: "Library Assistant",
    company: "University Library",
    location: "Main Library",
    salary: "$16-19/hr",
    posted: "Just now",
    type: "Part-time",
    category: "jobs",
  },
];

const MARKETPLACE_POSTS: MarketplacePost[] = [
  {
    id: "m1",
    title: "Textbooks for Sale - Computer Science 101",
    price: "$45",
    condition: "Like new",
    seller: "Alex J.",
    location: "North Dorms",
    posted: "Just now",
    category: "marketplace",
  },
  {
    id: "m2",
    title: "Dorm Mini Fridge",
    price: "$60",
    condition: "Good",
    seller: "Taylor S.",
    location: "West Campus Apts",
    posted: "2 hours ago",
    category: "marketplace",
  },
  {
    id: "m3",
    title: "Desk Lamp - Adjustable",
    price: "$15",
    condition: "Excellent",
    seller: "Jamie L.",
    location: "South Dorms",
    posted: "Yesterday",
    category: "marketplace",
  },
  {
    id: "m4",
    title: "Calculus Textbook + Solutions Manual",
    price: "$55",
    condition: "Like new",
    seller: "Casey M.",
    location: "Library Area",
    posted: "3 days ago",
    category: "marketplace",
  },
];

const EVENT_POSTS: EventPost[] = [
  {
    id: "e1",
    title: "Spring Concert Series",
    date: "May 15, 2024",
    time: "7:00 PM",
    location: "Main Quad",
    organizer: "Student Activities Board",
    attendees: 124,
    category: "events",
  },
  {
    id: "e2",
    title: "Career Fair - STEM Focus",
    date: "May 20, 2024",
    time: "10:00 AM - 3:00 PM",
    location: "Student Union Ballroom",
    organizer: "Career Center",
    attendees: 285,
    category: "events",
  },
  {
    id: "e3",
    title: "End of Semester Party",
    date: "June 2, 2024",
    time: "8:00 PM",
    location: "Campus Recreation Center",
    organizer: "Student Government",
    attendees: 210,
    category: "events",
  },
  {
    id: "e4",
    title: "Wellness Wednesday Workshop",
    date: "Every Wednesday",
    time: "12:00 PM - 1:00 PM",
    location: "Health Center",
    organizer: "Campus Health Services",
    attendees: 45,
    category: "events",
  },
];

// Combine all posts into one array
const ALL_POSTS: Post[] = [...JOB_POSTS, ...MARKETPLACE_POSTS, ...EVENT_POSTS];

export default function PostsPage() {
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
            {filteredPosts.map((post) => {
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
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
