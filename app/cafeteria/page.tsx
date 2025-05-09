"use client";

import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for cafeteria locations
const CAFETERIA_LOCATIONS = [
  {
    id: "c1",
    name: "Main Hall Cafeteria",
    description:
      "The primary dining facility on campus with multiple food stations and seating areas.",
    hours: "7:00 AM - 10:00 PM",
    mealPlan: true,
    rating: 4.2,
    image: "/cafeteria1.jpg",
    cuisineTypes: ["American", "International", "Vegetarian"],
    specialOffers: ["All-you-can-eat breakfast", "Late night snacks"],
  },
  {
    id: "c2",
    name: "Science Building Café",
    description:
      "Quick grab-and-go options ideal for busy students between classes.",
    hours: "8:00 AM - 6:00 PM",
    mealPlan: true,
    rating: 4.5,
    image: "/cafeteria2.jpg",
    cuisineTypes: ["Coffee", "Sandwiches", "Salads"],
    specialOffers: ["Coffee specials", "Loyalty program"],
  },
  {
    id: "c3",
    name: "Student Union Food Court",
    description:
      "Multiple food vendors offering various options in one central location.",
    hours: "10:00 AM - 10:00 PM",
    mealPlan: true,
    rating: 4.7,
    image: "/cafeteria3.jpg",
    cuisineTypes: ["Pizza", "Mexican", "Asian", "Burgers"],
    specialOffers: ["Student discounts", "Weekly specials"],
  },
  {
    id: "c4",
    name: "Library Café",
    description:
      "Quiet study-friendly café offering coffee, snacks, and light meals.",
    hours: "7:30 AM - 11:00 PM",
    mealPlan: true,
    rating: 4.0,
    image: "/cafeteria4.jpg",
    cuisineTypes: ["Coffee", "Pastries", "Sandwiches"],
    specialOffers: ["Study group packages", "Extended hours during finals"],
  },
  {
    id: "c5",
    name: "The Quad Grill",
    description:
      "Outdoor seasonal grill with patio seating and popular comfort foods.",
    hours: "11:00 AM - 7:00 PM (Weather permitting)",
    mealPlan: true,
    rating: 4.6,
    image: "/cafeteria5.jpg",
    cuisineTypes: ["BBQ", "Burgers", "Salads"],
    specialOffers: ["BBQ Fridays", "Outdoor events"],
  },
  {
    id: "c6",
    name: "Health Sciences Eatery",
    description:
      "Health-focused dining options catering to nutrition-conscious students.",
    hours: "7:00 AM - 8:00 PM",
    mealPlan: true,
    rating: 4.3,
    image: "/cafeteria6.jpg",
    cuisineTypes: ["Healthy", "Organic", "Vegan"],
    specialOffers: ["Nutritionist consultations", "Meal prep workshops"],
  },
];

// Menu items for different meal types
const MENU_ITEMS = {
  breakfast: [
    {
      name: "Scrambled Eggs",
      price: "$3.99",
      dietary: ["Vegetarian", "Gluten-Free"],
      calories: 240,
    },
    {
      name: "Pancakes",
      price: "$4.50",
      dietary: ["Vegetarian"],
      calories: 450,
    },
    {
      name: "Avocado Toast",
      price: "$5.99",
      dietary: ["Vegan", "Vegetarian"],
      calories: 320,
    },
    { name: "Breakfast Burrito", price: "$6.50", dietary: [], calories: 580 },
    {
      name: "Oatmeal with Fruit",
      price: "$3.50",
      dietary: ["Vegan", "Vegetarian", "Gluten-Free"],
      calories: 290,
    },
    {
      name: "Greek Yogurt Parfait",
      price: "$4.25",
      dietary: ["Vegetarian"],
      calories: 310,
    },
  ],
  lunch: [
    {
      name: "Grilled Chicken Sandwich",
      price: "$7.99",
      dietary: [],
      calories: 420,
    },
    {
      name: "Veggie Burger",
      price: "$6.99",
      dietary: ["Vegetarian"],
      calories: 380,
    },
    {
      name: "Caesar Salad",
      price: "$6.50",
      dietary: ["Vegetarian"],
      calories: 320,
    },
    { name: "Turkey Club Wrap", price: "$7.50", dietary: [], calories: 450 },
    {
      name: "Quinoa Bowl",
      price: "$8.25",
      dietary: ["Vegan", "Vegetarian", "Gluten-Free"],
      calories: 410,
    },
    {
      name: "Pasta Primavera",
      price: "$7.25",
      dietary: ["Vegetarian"],
      calories: 540,
    },
  ],
  dinner: [
    {
      name: "Grilled Salmon",
      price: "$12.99",
      dietary: ["Gluten-Free"],
      calories: 480,
    },
    {
      name: "Vegetable Stir Fry",
      price: "$9.99",
      dietary: ["Vegan", "Vegetarian"],
      calories: 350,
    },
    {
      name: "Steak with Roasted Potatoes",
      price: "$14.50",
      dietary: ["Gluten-Free"],
      calories: 720,
    },
    {
      name: "Eggplant Parmesan",
      price: "$10.99",
      dietary: ["Vegetarian"],
      calories: 590,
    },
    { name: "Chicken Alfredo", price: "$11.25", dietary: [], calories: 680 },
    {
      name: "Black Bean Burrito Bowl",
      price: "$8.99",
      dietary: ["Vegan", "Vegetarian", "Gluten-Free"],
      calories: 520,
    },
  ],
};

export default function CafeteriaPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const filteredLocations = CAFETERIA_LOCATIONS.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-8">
          {selectedLocation ? (
            // Detailed view of a selected cafeteria
            <div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex items-center text-primary mb-6 hover:underline"
              >
                <span>← Back to all cafeterias</span>
              </button>

              {(() => {
                const location = CAFETERIA_LOCATIONS.find(
                  (l) => l.id === selectedLocation,
                );
                if (!location) return null;

                return (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="h-64 bg-gray-100 flex items-center justify-center">
                      <div className="text-6xl">🍽️</div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold">{location.name}</h1>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-amber-500 mr-1">⭐</span>
                          <span className="font-medium">{location.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {location.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Hours</h3>
                          <p>{location.hours}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Cuisine Types</h3>
                          <div className="flex flex-wrap gap-2">
                            {location.cuisineTypes.map((cuisine) => (
                              <span
                                key={cuisine}
                                className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                              >
                                {cuisine}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Special Offers</h3>
                          <ul className="list-disc list-inside">
                            {location.specialOffers.map((offer) => (
                              <li key={offer} className="text-sm">
                                {offer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-6">
                          Today's Menu
                        </h2>

                        <Tabs defaultValue="breakfast" className="w-full">
                          <TabsList className="mb-6 bg-transparent w-full flex space-x-8 border-b">
                            <TabsTrigger
                              value="breakfast"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                            >
                              Breakfast
                            </TabsTrigger>
                            <TabsTrigger
                              value="lunch"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                            >
                              Lunch
                            </TabsTrigger>
                            <TabsTrigger
                              value="dinner"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
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
                                  {MENU_ITEMS[mealType].map((item, idx) => (
                                    <Card
                                      key={idx}
                                      className="p-4 hover:shadow-md transition-all"
                                    >
                                      <div className="flex justify-between mb-2">
                                        <h3 className="font-bold">
                                          {item.name}
                                        </h3>
                                        <span className="font-bold">
                                          {item.price}
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <div className="flex gap-1">
                                          {item.dietary.map((diet) => (
                                            <span
                                              key={diet}
                                              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                                            >
                                              {diet}
                                            </span>
                                          ))}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          {item.calories} cal
                                        </span>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </TabsContent>
                            ),
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
                <h1 className="text-3xl font-bold mb-4 md:mb-0">
                  Campus Dining Options
                </h1>
                <div className="w-full md:w-1/3">
                  <Input
                    type="search"
                    placeholder="Search cafeterias..."
                    className="rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="h-48 bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🍽️</div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 text-black font-bold text-sm px-2 py-1 rounded-lg flex items-center">
                        <span className="text-amber-500 mr-1">⭐</span>
                        <span>{location.rating}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded-lg">
                        {location.hours}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-2">
                        {location.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {location.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {location.cuisineTypes.slice(0, 3).map((cuisine) => (
                          <span
                            key={cuisine}
                            className="bg-gray-100 text-xs px-2 py-1 rounded-full"
                          >
                            {cuisine}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          {location.mealPlan && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Meal Plan Accepted
                            </span>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full hover:bg-black hover:text-white"
                          onClick={() => setSelectedLocation(location.id)}
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
