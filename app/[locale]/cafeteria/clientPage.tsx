"use client";

import { Header } from "@/components/Header";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Cafeteria {
  cafeteriaId: string;
  name: string;
  workingTime: string;
  address: string;
  streetNumber: number;
  city: string;
}

interface Menu {
  id: string;
  cafeteriaId: string;
  name: string;
  menuType: "BREAKFAST" | "LUNCH" | "DINNER";
  date: string;
  foodIds: string[];
  foodDetails: {
    id: string;
    name: string;
    allergies: string[];
    foodType: string;
  }[];
}

interface CafeteriaWithMenu extends Cafeteria {
  menus: Menu[];
}

interface CafeteriaPageProps {
  cafeterias: CafeteriaWithMenu[];
}

const ALL_ALLERGIES = [
  "MILK",
  "EGGS",
  "SOY",
  "WHEAT",
  "NUTS",
  "FISH",
  "SHELLFISH",
  "PEANUTS",
] as const;

export default function CafeteriaPage({ cafeterias }: CafeteriaPageProps) {
  const t = useTranslations("CafeteriaPage");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [excludedAllergies, setExcludedAllergies] = useState<string[]>([]);

  const filteredCafeterias = useMemo(() => {
    return cafeterias
      .filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((cafeteria) => {
        // Filter menus that don't contain any excluded allergies
        const filteredMenus = cafeteria.menus.filter((menu) => {
          // Check if any food in the menu contains excluded allergies
          const hasExcludedAllergies = menu.foodDetails.some((food) =>
            food.allergies.some((allergy) =>
              excludedAllergies.includes(allergy)
            )
          );
          return !hasExcludedAllergies;
        });

        return {
          ...cafeteria,
          menus: filteredMenus,
        };
      })
      .filter((cafeteria) => cafeteria.menus.length > 0);
  }, [cafeterias, searchQuery, excludedAllergies]);

  const formatWorkingTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleAllergyChange = (allergy: string) => {
    setExcludedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    );
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
                <span>← {t("backToAll")}</span>
              </button>

              {(() => {
                const location = filteredCafeterias.find(
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
                            {t("address")}
                          </h3>
                          <p className="text-amber-800">
                            {location.address} {location.streetNumber},{" "}
                            {location.city}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-6 text-amber-900">
                          {t("todaysMenu")}
                        </h2>

                        <Tabs defaultValue="breakfast" className="w-full">
                          <TabsList className="mb-6 bg-transparent w-full flex space-x-8 border-b border-amber-200">
                            <TabsTrigger
                              value="breakfast"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none text-amber-800"
                            >
                              {t("breakfast")}
                            </TabsTrigger>
                            <TabsTrigger
                              value="lunch"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none text-amber-800"
                            >
                              {t("lunch")}
                            </TabsTrigger>
                            <TabsTrigger
                              value="dinner"
                              className="px-1 py-2 text-lg font-medium data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none text-amber-800"
                            >
                              {t("dinner")}
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
                                      <div key={idx}>
                                        <Dialog
                                          open={openDialogId === menu.id}
                                          onOpenChange={(open) =>
                                            setOpenDialogId(
                                              open ? menu.id : null
                                            )
                                          }
                                        >
                                          <DialogTrigger asChild>
                                            <Card className="p-4 hover:shadow-md transition-all border-amber-200 cursor-pointer">
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
                                          </DialogTrigger>
                                          <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                              <DialogTitle>
                                                {menu.name}
                                              </DialogTitle>
                                              <DialogDescription>
                                                {t("menuDetails")}{" "}
                                                {new Date(
                                                  menu.date
                                                ).toLocaleDateString()}
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                              {menu.foodDetails.map((food) => (
                                                <div
                                                  key={food.id}
                                                  className="space-y-2"
                                                >
                                                  <h4 className="font-medium text-amber-900">
                                                    {food.name}
                                                  </h4>
                                                  <div className="flex flex-wrap gap-2">
                                                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                                      {food.foodType}
                                                    </span>
                                                    {food.allergies.map(
                                                      (allergy) => (
                                                        <span
                                                          key={allergy}
                                                          className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full"
                                                        >
                                                          {allergy}
                                                        </span>
                                                      )
                                                    )}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                            <DialogFooter>
                                              <Button
                                                variant="outline"
                                                className="bg-amber-100 hover:bg-amber-200"
                                                onClick={() =>
                                                  setOpenDialogId(null)
                                                }
                                              >
                                                {t("close")}
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                      </div>
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
                  {t("campusDining")}
                </h1>
                <div className="w-full md:w-1/3">
                  <Input
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    className="rounded-full border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-8">
                <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-900 font-medium">
                        Filter by allergies:
                      </span>
                      {excludedAllergies.length > 0 && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700"
                        >
                          {excludedAllergies.length}{" "}
                          {excludedAllergies.length === 1
                            ? "allergy"
                            : "allergies"}{" "}
                          excluded
                        </Badge>
                      )}
                    </div>
                    <Select onValueChange={handleAllergyChange} value="">
                      <SelectTrigger
                        className={`w-[200px] ${
                          excludedAllergies.length > 0 ? "border-amber-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select allergy to exclude" />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_ALLERGIES.map((allergy) => (
                          <SelectItem
                            key={allergy}
                            value={allergy}
                            disabled={excludedAllergies.includes(allergy)}
                          >
                            {allergy}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {excludedAllergies.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExcludedAllergies([])}
                        className="text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                      >
                        Clear all filters
                      </Button>
                    )}
                  </div>
                  {excludedAllergies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-amber-100">
                      {excludedAllergies.map((allergy) => (
                        <Badge
                          key={allergy}
                          variant="secondary"
                          className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1"
                        >
                          {allergy}
                          <button
                            onClick={() => handleAllergyChange(allergy)}
                            className="hover:text-red-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {filteredCafeterias.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-amber-200">
                  <p className="text-amber-900 text-lg">
                    {excludedAllergies.length > 0 ? (
                      <>
                        No cafeterias found matching your allergy filters.
                        <br />
                        <Button
                          variant="link"
                          onClick={() => setExcludedAllergies([])}
                          className="text-amber-700 hover:text-amber-900 mt-2"
                        >
                          Clear all filters
                        </Button>
                      </>
                    ) : (
                      "No cafeterias found matching your search"
                    )}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCafeterias.map((location) => (
                    <Card
                      key={location.cafeteriaId}
                      className={`overflow-hidden hover:shadow-xl transition-all border-amber-200 ${
                        excludedAllergies.length > 0
                          ? "ring-1 ring-amber-500"
                          : ""
                      }`}
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
                              {location.menus.length} {t("menusAvailable")}
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
                            {t("viewDetails")}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
