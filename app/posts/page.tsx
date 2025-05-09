"use client";

import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Sample data for different posting types
const JOB_POSTS = [
  {
    id: "j1",
    title: "Teaching Assistant - Computer Science",
    company: "University CS Department",
    location: "On Campus",
    salary: "$18-22/hr",
    posted: "2 days ago",
    deadline: "Application closes May 10",
    type: "Part-time",
    image: "/job1.jpg",
  },
  {
    id: "j2",
    title: "Research Assistant - Biology Lab",
    company: "University Bio Department",
    location: "Science Building",
    salary: "$20-25/hr",
    posted: "1 week ago",
    deadline: "Open until filled",
    type: "Part-time",
    image: "/job2.jpg",
  },
  {
    id: "j3",
    title: "Campus Tour Guide",
    company: "University Admissions",
    location: "Various Campus Locations",
    salary: "$15-17/hr",
    posted: "3 days ago",
    deadline: "Applications due May 15",
    type: "Flexible hours",
    image: "/job3.jpg",
  },
  {
    id: "j4",
    title: "Library Assistant",
    company: "University Library",
    location: "Main Library",
    salary: "$16-19/hr",
    posted: "Just now",
    deadline: "Hiring immediately",
    type: "Part-time",
    image: "/job4.jpg",
  },
  {
    id: "j5",
    title: "Marketing Intern",
    company: "University Marketing",
    location: "Admin Building",
    salary: "$17-20/hr",
    posted: "5 days ago",
    deadline: "Interview process starting soon",
    type: "Internship",
    image: "/job5.jpg",
  },
  {
    id: "j6",
    title: "IT Help Desk Support",
    company: "University IT Department",
    location: "Tech Building",
    salary: "$19-23/hr",
    posted: "1 day ago",
    deadline: "Positions filling quickly",
    type: "Part-time",
    image: "/job6.jpg",
  },
];

const MARKETPLACE_POSTS = [
  {
    id: "m1",
    title: "Textbooks for Sale - Computer Science 101",
    price: "$45",
    condition: "Like new",
    seller: "Alex J.",
    location: "North Dorms",
    posted: "Just now",
    image: "/marketplace1.jpg",
  },
  {
    id: "m2",
    title: "Dorm Mini Fridge",
    price: "$60",
    condition: "Good",
    seller: "Taylor S.",
    location: "West Campus Apts",
    posted: "2 hours ago",
    image: "/marketplace2.jpg",
  },
  {
    id: "m3",
    title: "Desk Lamp - Adjustable",
    price: "$15",
    condition: "Excellent",
    seller: "Jamie L.",
    location: "South Dorms",
    posted: "Yesterday",
    image: "/marketplace3.jpg",
  },
  {
    id: "m4",
    title: "Calculus Textbook + Solutions Manual",
    price: "$55",
    condition: "Like new",
    seller: "Casey M.",
    location: "Library Area",
    posted: "3 days ago",
    image: "/marketplace4.jpg",
  },
  {
    id: "m5",
    title: "Dorm Room Desk Chair",
    price: "$40",
    condition: "Good",
    seller: "Jordan P.",
    location: "East Campus",
    posted: "5 days ago",
    image: "/marketplace5.jpg",
  },
  {
    id: "m6",
    title: "Bluetooth Speakers",
    price: "$35",
    condition: "Excellent",
    seller: "Riley T.",
    location: "Student Center",
    posted: "1 week ago",
    image: "/marketplace6.jpg",
  },
];

const EVENT_POSTS = [
  {
    id: "e1",
    title: "Spring Concert Series",
    date: "May 15, 2024",
    time: "7:00 PM",
    location: "Main Quad",
    organizer: "Student Activities Board",
    attendees: 124,
    category: "Entertainment",
    image: "/event1.jpg",
  },
  {
    id: "e2",
    title: "Career Fair - STEM Focus",
    date: "May 20, 2024",
    time: "10:00 AM - 3:00 PM",
    location: "Student Union Ballroom",
    organizer: "Career Center",
    attendees: 285,
    category: "Career",
    image: "/event2.jpg",
  },
  {
    id: "e3",
    title: "End of Semester Party",
    date: "June 2, 2024",
    time: "8:00 PM",
    location: "Campus Recreation Center",
    organizer: "Student Government",
    attendees: 210,
    category: "Social",
    image: "/event3.jpg",
  },
  {
    id: "e4",
    title: "Wellness Wednesday Workshop",
    date: "Every Wednesday",
    time: "12:00 PM - 1:00 PM",
    location: "Health Center",
    organizer: "Campus Health Services",
    attendees: 45,
    category: "Health",
    image: "/event4.jpg",
  },
  {
    id: "e5",
    title: "International Food Festival",
    date: "May 25, 2024",
    time: "5:00 PM - 9:00 PM",
    location: "Dining Commons",
    organizer: "International Student Association",
    attendees: 350,
    category: "Cultural",
    image: "/event5.jpg",
  },
  {
    id: "e6",
    title: "Study Group - Finals Prep",
    date: "May 28-30, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Library Study Rooms",
    organizer: "Academic Success Center",
    attendees: 78,
    category: "Academic",
    image: "/event6.jpg",
  },
];

export default function PostsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Campus Marketplace</h2>
              <div className="mb-6">
                <Input
                  type="search"
                  placeholder="Search postings..."
                  className="rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeCategory === "all" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  All Categories
                </button>
                <button
                  onClick={() => setActiveCategory("jobs")}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeCategory === "jobs" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  Jobs
                </button>
                <button
                  onClick={() => setActiveCategory("marketplace")}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeCategory === "marketplace" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  Marketplace
                </button>
                <button
                  onClick={() => setActiveCategory("events")}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium ${activeCategory === "events" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  Events
                </button>
              </div>

              <div className="mt-10">
                <Button className="w-full rounded-full bg-black hover:bg-black/80">
                  Create New Posting
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 bg-transparent w-full flex justify-between border-b">
                  <div className="flex space-x-6">
                    <TabsTrigger
                      value="all"
                      className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      All Postings
                    </TabsTrigger>
                    <TabsTrigger
                      value="jobs"
                      className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      Jobs
                    </TabsTrigger>
                    <TabsTrigger
                      value="marketplace"
                      className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      Marketplace
                    </TabsTrigger>
                    <TabsTrigger
                      value="events"
                      className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      Events
                    </TabsTrigger>
                  </div>
                  <div>
                    <select className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <option>Sort by: Newest</option>
                      <option>Sort by: Oldest</option>
                      <option>Sort by: Popular</option>
                    </select>
                  </div>
                </TabsList>

                {/* All Postings Tab */}
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Jobs */}
                    {JOB_POSTS.slice(0, 2).map((job) => (
                      <Card
                        key={job.id}
                        className="overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="bg-blue-50 p-3 border-b flex justify-between items-center">
                          <div className="bg-blue-100 text-blue-800 font-medium text-xs px-2 py-1 rounded-full">
                            JOB
                          </div>
                          <span className="text-xs text-gray-500">
                            {job.posted}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {job.company}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span className="mr-3">📍 {job.location}</span>
                            <span>💰 {job.salary}</span>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                              {job.type}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {/* Marketplace */}
                    {MARKETPLACE_POSTS.slice(0, 2).map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="relative h-40">
                          <div className="absolute top-3 left-3 bg-green-100 text-green-800 font-medium text-xs px-2 py-1 rounded-full">
                            MARKETPLACE
                          </div>
                          <div className="absolute top-3 right-3 bg-white/90 text-black font-bold text-sm px-2 py-1 rounded-lg">
                            {item.price}
                          </div>
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-4xl">📚</div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Condition: {item.condition}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-3">👤 {item.seller}</span>
                            <span>📍 {item.location}</span>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-500">
                              {item.posted}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              Message Seller
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {/* Events */}
                    {EVENT_POSTS.slice(0, 2).map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="bg-purple-50 p-3 border-b flex justify-between items-center">
                          <div className="bg-purple-100 text-purple-800 font-medium text-xs px-2 py-1 rounded-full">
                            EVENT
                          </div>
                          <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {event.category}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="mr-3">📅 {event.date}</span>
                            <span>⏰ {event.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            📍 {event.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            By {event.organizer}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs bg-purple-50 text-purple-800 px-2 py-1 rounded-full">
                              {event.attendees} attending
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              I'm Interested
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Jobs Tab */}
                <TabsContent value="jobs" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_POSTS.map((job) => (
                      <Card
                        key={job.id}
                        className="overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="bg-blue-50 p-3 border-b flex justify-between items-center">
                          <div className="bg-blue-100 text-blue-800 font-medium text-xs px-2 py-1 rounded-full">
                            JOB
                          </div>
                          <span className="text-xs text-gray-500">
                            {job.posted}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {job.company}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span className="mr-3">📍 {job.location}</span>
                            <span>💰 {job.salary}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">
                            {job.deadline}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                              {job.type}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Marketplace Tab */}
                <TabsContent value="marketplace" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MARKETPLACE_POSTS.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="relative h-40">
                          <div className="absolute top-3 left-3 bg-green-100 text-green-800 font-medium text-xs px-2 py-1 rounded-full">
                            MARKETPLACE
                          </div>
                          <div className="absolute top-3 right-3 bg-white/90 text-black font-bold text-sm px-2 py-1 rounded-lg">
                            {item.price}
                          </div>
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-4xl">📚</div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Condition: {item.condition}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-3">👤 {item.seller}</span>
                            <span>📍 {item.location}</span>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-500">
                              {item.posted}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              Message Seller
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Events Tab */}
                <TabsContent value="events" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EVENT_POSTS.map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="bg-purple-50 p-3 border-b flex justify-between items-center">
                          <div className="bg-purple-100 text-purple-800 font-medium text-xs px-2 py-1 rounded-full">
                            EVENT
                          </div>
                          <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {event.category}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="mr-3">📅 {event.date}</span>
                            <span>⏰ {event.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            📍 {event.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            By {event.organizer}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs bg-purple-50 text-purple-800 px-2 py-1 rounded-full">
                              {event.attendees} attending
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              I'm Interested
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
