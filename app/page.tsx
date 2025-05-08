"use client";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function Home() {
  // Add client-side only state for hydration safety
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define content outside the rendering to ensure consistency
  const posts = [
    {
      title: "Looking for Study Partners",
      author: "Alex Kim",
      category: "Study",
      time: "2 hours ago",
      icon: "📚",
      likes: 15,
      comments: 7,
    },
    {
      title: "Lost Keys at Library",
      author: "Jamie Brown",
      category: "Lost & Found",
      time: "5 hours ago",
      icon: "🔑",
      likes: 8,
      comments: 12,
    },
    {
      title: "CS Department Job Fair",
      author: "Taylor Moore",
      category: "Events",
      time: "Yesterday",
      icon: "💼",
      likes: 32,
      comments: 4,
    },
  ];

  const cafeteriaVenues = [
    {
      name: "Main Hall Cafeteria",
      meal: "Today's Special: Pasta Bar",
      hours: "7AM - 8PM",
      rating: "4.2",
      icon: "🍝",
      status: "Open Now",
    },
    {
      name: "Science Building Café",
      meal: "Today's Special: Sandwich Platters",
      hours: "8AM - 6PM",
      rating: "4.5",
      icon: "🥪",
      status: "Open Now",
    },
    {
      name: "Student Union Food Court",
      meal: "Today's Special: Taco Tuesday",
      hours: "10AM - 10PM",
      rating: "4.7",
      icon: "🌮",
      status: "Closing Soon",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <FeaturesSection />

        {/* Popular Categories Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block bg-black/80 text-yellow-300 font-medium text-sm py-2 px-4 rounded-full mb-6">
                EXPLORE POPULAR CATEGORIES
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                Find what interests you
              </h2>
            </div>

            {mounted && (
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="flex justify-center mb-10 p-1 bg-gray-100 rounded-full max-w-xl mx-auto">
                  <TabsTrigger
                    value="posts"
                    className="flex items-center gap-2 py-3 px-6 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <span className="text-xl">📝</span>
                    <span>Posts</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cafeteria"
                    className="flex items-center gap-2 py-3 px-6 rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <span className="text-xl">🍽️</span>
                    <span>Cafeteria</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                      <Card
                        key={i}
                        className="overflow-hidden group hover:shadow-xl transition-all duration-300"
                      >
                        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-6 py-4 flex justify-between items-center border-b">
                          <span className="text-3xl">{post.icon}</span>
                          <div className="text-xs text-gray-500">
                            {post.time}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            By {post.author} • {post.category}
                          </p>
                          <div className="flex justify-between items-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              View Post
                            </Button>
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                ❤️ {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                💬 {post.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cafeteria" className="mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cafeteriaVenues.map((venue, i) => (
                      <Card
                        key={i}
                        className="overflow-hidden group hover:shadow-xl transition-all duration-300"
                      >
                        <div className="bg-gradient-to-r from-orange-500/20 to-red-400/20 p-4 flex justify-between items-center border-b">
                          <span className="text-3xl">{venue.icon}</span>
                          <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                            {venue.status}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{venue.name}</h3>
                            <div className="flex items-center gap-1 text-amber-500">
                              ⭐{" "}
                              <span className="text-black">{venue.rating}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {venue.meal}
                          </p>
                          <p className="text-xs text-gray-500 mb-4">
                            Hours: {venue.hours}
                          </p>
                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-black hover:text-white"
                            >
                              View Menu
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-black hover:text-white bg-green-50"
                            >
                              Order Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 CampusConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
