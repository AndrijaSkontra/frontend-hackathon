"use client";

import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Cafeteria {
  cafeteriaId: string;
  name: string;
  workingTime: string;
  address: string;
  streetNumber: number;
  city: string;
}

interface Menu {
  cafeteriaId: string;
  name: string;
  menuType: "BREAKFAST" | "LUNCH" | "DINNER";
  date: string;
  foodIds: string[];
}

interface CafeteriaWithMenu extends Cafeteria {
  menus: Menu[];
}

interface CafeteriaPageProps {
  cafeterias: CafeteriaWithMenu[];
}

export default function CafeteriaPage({ cafeterias }: CafeteriaPageProps) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const filteredLocations = cafeterias.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatWorkingTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 bg-amber-50">
        <div className="container mx-auto px-6 py-8">
          {selectedLocation ? (
            // Detailed view of a selected cafeteria
            <div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex items-center text-amber-700 mb-6 hover:underline"
              >
                <span>← Back to all cafeterias</span>
              </button>

              {(() => {
                const location = cafeterias.find(
                  (l) => l.cafeteriaId === selectedLocation
                );
                if (!location) return null;

                return (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-amber-200">
                    <div className="h-64 bg-amber-100 flex items-center justify-center">
                      <div className="text-6xl">🍽️</div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-amber-900">
                          {location.name}
                        </h1>
                        <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                          <span className="text-amber-500 mr-1">🕒</span>
                          <span className="font-medium text-amber-900">
                            {formatWorkingTime(location.workingTime)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <h3 className="font-medium mb-2 text-amber-900">
                            Address
                          </h3>
                          <p className="text-amber-800">
                            {location.address} {location.streetNumber},{" "}
                            {location.city}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-6 text-amber-900">
                          Today's Menu
                        </h2>

                        <Tabs defaultValue="breakfast" className="w-full">
                          <TabsList className="mb-6 bg-transparent w-full flex space-x-8 border-b border-amber-200">
                            <TabsTrigger
                              value="breakfast"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none text-amber-800"
                            >
                              Breakfast
                            </TabsTrigger>
                            <TabsTrigger
                              value="lunch"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none text-amber-800"
                            >
                              Lunch
                            </TabsTrigger>
                            <TabsTrigger
                              value="dinner"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none text-amber-800"
                            >
                              Dinner
                            </TabsTrigger>
                          </TabsList>

                          {(["breakfast", "lunch", "dinner"] as const).map(
                            (mealType) => (
                              <TabsContent
                                key={mealType}
                                value={mealType}
                                className="mt-6"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {location.menus
                                    .filter(
                                      (menu) =>
                                        menu.menuType === mealType.toUpperCase()
                                    )
                                    .map((menu, idx) => (
                                      <Card
                                        key={idx}
                                        className="p-4 hover:shadow-md transition-all border-amber-200"
                                      >
                                        <div className="flex justify-between mb-2">
                                          <h3 className="font-bold text-amber-900">
                                            {menu.name}
                                          </h3>
                                        </div>
                                        <div className="text-sm text-amber-600">
                                          {new Date(
                                            menu.date
                                          ).toLocaleDateString()}
                                        </div>
                                      </Card>
                                    ))}
                                </div>
                              </TabsContent>
                            )
                          )}
                        </Tabs>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            // List of all cafeterias
            <div>
              <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <h1 className="text-3xl font-bold mb-4 md:mb-0 text-amber-900">
                  Campus Dining Options
                </h1>
                <div className="w-full md:w-1/3">
                  <Input
                    type="search"
                    placeholder="Search cafeterias..."
                    className="rounded-full border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.cafeteriaId}
                    className="overflow-hidden hover:shadow-xl transition-all border-amber-200"
                  >
                    <div className="h-48 bg-amber-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🍽️</div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 text-amber-900 font-bold text-sm px-2 py-1 rounded-lg flex items-center">
                        <span className="text-amber-500 mr-1">🕒</span>
                        <span>{formatWorkingTime(location.workingTime)}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-amber-900/80 text-white text-xs px-2 py-1 rounded-lg">
                        {location.city}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-2 text-amber-900">
                        {location.name}
                      </h3>
                      <p className="text-amber-800 text-sm mb-4">
                        {location.address} {location.streetNumber}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            {location.menus.length} Menus Available
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white"
                          onClick={() =>
                            setSelectedLocation(location.cafeteriaId)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
