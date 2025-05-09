"use client";

import { Header } from "@/components/Header";
import { useState, useMemo, useRef, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

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

// Define scroll sections for detailed view
const DETAIL_SECTIONS = ["intro", "menu"] as const;
type DetailSection = (typeof DETAIL_SECTIONS)[number];

export default function CafeteriaPage({ cafeterias }: CafeteriaPageProps) {
  const t = useTranslations("CafeteriaPage");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [excludedAllergies, setExcludedAllergies] = useState<string[]>([]);

  // For scroll animation in detailed view
  const [activeDetailSection, setActiveDetailSection] =
    useState<DetailSection>("intro");
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<
    Record<DetailSection, React.RefObject<HTMLDivElement>>
  >({
    intro: useRef<HTMLDivElement>(null),
    menu: useRef<HTMLDivElement>(null),
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll animation for detail view
  useEffect(() => {
    if (!mounted || !selectedLocation) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionType = entry.target.getAttribute(
            "data-section"
          ) as DetailSection;
          if (sectionType) {
            setActiveDetailSection(sectionType);
          }
        }
      });
    }, options);

    DETAIL_SECTIONS.forEach((section) => {
      if (sectionRefs.current[section].current) {
        observer.observe(sectionRefs.current[section].current!);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted, selectedLocation]);

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

  const scrollToSection = (section: DetailSection) => {
    if (sectionRefs.current[section].current) {
      smoothScrollTo(sectionRefs.current[section].current!);
    }
  };

  const smoothScrollTo = (element: HTMLElement) => {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + start;
    const startTime = performance.now();
    const duration = 300; // Faster scroll

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const ease = easeOutQuad(progress);

      window.scrollTo(0, start + (target - start) * ease);

      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const easeOutQuad = (t: number) => t * (2 - t);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.15 },
    },
  };

  const introBackgroundVariants = {
    initial: { scale: 1.05 },
    animate: {
      scale: 1,
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className={`flex-1 ${
          selectedLocation
            ? "bg-gradient-to-br from-orange-50 to-amber-100"
            : "bg-amber-50"
        } pt-20`}
      >
        {selectedLocation ? (
          // Enhanced detailed view with scroll animations
          <div>
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
              <div className="flex flex-col gap-3">
                {DETAIL_SECTIONS.map((section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-4 h-4 rounded-full border-2 border-orange-500 transition-all duration-200 ${
                      activeDetailSection === section
                        ? "bg-orange-500 scale-125"
                        : "bg-transparent"
                    }`}
                    aria-label={`Scroll to ${section}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedLocation(null)}
              className="fixed top-24 left-6 z-50 flex items-center text-amber-700 mb-6 hover:underline"
            >
              <span>← {t("backToAll")}</span>
            </button>

            <div
              ref={detailContainerRef}
              className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
            >
              {(() => {
                const location = filteredCafeterias.find(
                  (l) => l.cafeteriaId === selectedLocation
                );
                if (!location) return null;

                return (
                  <>
                    {/* Intro Section */}
                    <section
                      ref={sectionRefs.current.intro}
                      data-section="intro"
                      className="h-screen snap-start relative flex items-center justify-center overflow-hidden"
                    >
                      <div className="absolute inset-0 z-0">
                        <motion.div
                          className="absolute inset-0"
                          variants={introBackgroundVariants}
                          initial="initial"
                          animate="animate"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/40 via-amber-300/30 to-yellow-200/40"></div>
                          <div className="absolute inset-0 bg-black/30"></div>
                        </motion.div>

                        <motion.div
                          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-400/30 blur-xl"
                          animate={{
                            x: [0, 10, 0],
                            y: [0, 15, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <motion.div
                          className="absolute bottom-40 -right-32 w-96 h-96 rounded-full bg-yellow-300/40 blur-xl"
                          animate={{
                            x: [0, -20, 0],
                            y: [0, -15, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                      </div>

                      <div className="container mx-auto px-6 z-10">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`intro-${activeDetailSection === "intro"}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate={
                              activeDetailSection === "intro"
                                ? "visible"
                                : "hidden"
                            }
                            exit="exit"
                            className="text-center"
                          >
                            <motion.div
                              className="relative mx-auto mb-8 max-w-2xl"
                              variants={itemVariants}
                            >
                              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
                                <div className="aspect-video bg-orange-100 relative z-10 overflow-hidden">
                                  <div className="absolute inset-0 flex items-center justify-center bg-orange-200">
                                    <span className="text-7xl">🍽️</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              variants={itemVariants}
                              className="text-center mb-12"
                            >
                              <div className="inline-block bg-black/80 text-yellow-300 font-medium text-sm py-2 px-4 rounded-full mb-6">
                                UNIVERSITY DINING
                              </div>
                              <motion.h1
                                variants={itemVariants}
                                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                              >
                                {location.name}
                              </motion.h1>
                              <motion.div
                                variants={itemVariants}
                                className="flex justify-center gap-4 text-white"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="bg-orange-500/20 p-2 rounded-full">
                                    <span className="text-xl">📍</span>
                                  </div>
                                  <span>
                                    {location.address} {location.streetNumber},{" "}
                                    {location.city}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="bg-orange-500/20 p-2 rounded-full">
                                    <span className="text-xl">⏰</span>
                                  </div>
                                  <span>
                                    {formatWorkingTime(location.workingTime)}
                                  </span>
                                </div>
                              </motion.div>
                            </motion.div>

                            <motion.div
                              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                              animate={{ y: [0, 10, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            ></motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </section>

                    {/* Menu Section */}
                    <section
                      ref={sectionRefs.current.menu}
                      data-section="menu"
                      className="min-h-screen snap-start relative flex items-center justify-center overflow-hidden py-20"
                    >
                      <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-300/30 via-amber-200/20 to-yellow-100/30"></div>

                        <motion.div
                          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-300/20 blur-xl"
                          animate={{
                            x: [0, 10, 0],
                            y: [0, 15, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                        <motion.div
                          className="absolute bottom-40 -right-32 w-96 h-96 rounded-full bg-yellow-200/30 blur-xl"
                          animate={{
                            x: [0, -20, 0],
                            y: [0, -15, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                      </div>

                      <div className="container mx-auto px-6 z-10">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`menu-${activeDetailSection === "menu"}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate={
                              activeDetailSection === "menu"
                                ? "visible"
                                : "hidden"
                            }
                            exit="exit"
                          >
                            <motion.h2
                              variants={itemVariants}
                              className="text-3xl md:text-5xl font-bold mb-12 text-orange-900 text-center"
                            >
                              {t("todaysMenu")}
                            </motion.h2>

                            <motion.div variants={itemVariants}>
                              <Tabs defaultValue="BREAKFAST" className="w-full">
                                <TabsList className="flex justify-center mb-8 p-1 bg-orange-100/80 rounded-full max-w-xl mx-auto">
                                  <TabsTrigger
                                    value="BREAKFAST"
                                    className="flex items-center gap-2 py-3 px-6 rounded-full data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                  >
                                    <span>{t("breakfast")}</span>
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="LUNCH"
                                    className="flex items-center gap-2 py-3 px-6 rounded-full data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                  >
                                    <span>{t("lunch")}</span>
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="DINNER"
                                    className="flex items-center gap-2 py-3 px-6 rounded-full data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                                  >
                                    <span>{t("dinner")}</span>
                                  </TabsTrigger>
                                </TabsList>

                                {(
                                  ["BREAKFAST", "LUNCH", "DINNER"] as const
                                ).map((mealType) => (
                                  <TabsContent
                                    key={mealType}
                                    value={mealType}
                                    className="mt-6"
                                  >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                      {location.menus
                                        .filter(
                                          (menu) => menu.menuType === mealType
                                        )
                                        .map((menu) => (
                                          <Dialog
                                            key={menu.id}
                                            open={openDialogId === menu.id}
                                            onOpenChange={(open) =>
                                              setOpenDialogId(
                                                open ? menu.id : null
                                              )
                                            }
                                          >
                                            <DialogTrigger asChild>
                                              <motion.div
                                                variants={itemVariants}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                              >
                                                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-orange-200">
                                                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-400/10 px-6 py-4 flex justify-between items-center border-b">
                                                    <span className="text-3xl">
                                                      {mealType === "BREAKFAST"
                                                        ? "🍳"
                                                        : mealType === "LUNCH"
                                                        ? "🍲"
                                                        : "🍽️"}
                                                    </span>
                                                    <div className="text-xs text-orange-600 font-medium">
                                                      {new Date(
                                                        menu.date
                                                      ).toLocaleDateString()}
                                                    </div>
                                                  </div>
                                                  <div className="p-6">
                                                    <h3 className="text-xl font-bold mb-2 text-orange-900">
                                                      {menu.name}
                                                    </h3>
                                                    <p className="text-orange-700 mb-4">
                                                      {menu.foodDetails.length}{" "}
                                                      items
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                      <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="rounded-full hover:bg-orange-600 hover:text-white border-orange-600 text-orange-600"
                                                      >
                                                        View Details
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Card>
                                              </motion.div>
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
                                                {menu.foodDetails.map(
                                                  (food) => (
                                                    <div
                                                      key={food.id}
                                                      className="space-y-2"
                                                    >
                                                      <h4 className="font-medium text-orange-900">
                                                        {food.name}
                                                      </h4>
                                                      <div className="flex flex-wrap gap-2">
                                                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
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
                                                  )
                                                )}
                                              </div>
                                              <DialogFooter>
                                                <Button
                                                  variant="outline"
                                                  className="bg-orange-100 hover:bg-orange-200 border-orange-300"
                                                  onClick={() =>
                                                    setOpenDialogId(null)
                                                  }
                                                >
                                                  {t("close")}
                                                </Button>
                                              </DialogFooter>
                                            </DialogContent>
                                          </Dialog>
                                        ))}
                                    </div>

                                    {location.menus.filter(
                                      (menu) => menu.menuType === mealType
                                    ).length === 0 && (
                                      <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
                                        <p className="text-orange-800">
                                          No {mealType.toLowerCase()} menus
                                          available today
                                        </p>
                                      </div>
                                    )}
                                  </TabsContent>
                                ))}
                              </Tabs>
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </section>
                  </>
                );
              })()}
            </div>
          </div>
        ) : (
          // List of all cafeterias (original design preserved)
          <div className="container mx-auto px-6 py-8">
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
      </main>
    </div>
  );
}
