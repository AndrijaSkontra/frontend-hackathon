import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <FeaturesSection />

        {/* Popular Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Explore Popular Categories
            </h2>

            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="study">Study Groups</TabsTrigger>
                <TabsTrigger value="dining">Dining</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Campus Music Festival",
                      date: "May 15",
                      location: "Main Quad",
                    },
                    {
                      title: "Movie Night",
                      date: "May 20",
                      location: "Student Center",
                    },
                    {
                      title: "Hackathon 2024",
                      date: "May 28-30",
                      location: "Tech Building",
                    },
                  ].map((event, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/20 to-primary/10 h-40 flex items-center justify-center">
                        <span className="text-4xl">🎉</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {event.date} • {event.location}
                        </p>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="study">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Computer Science Study Group",
                      subject: "Data Structures",
                      time: "Tuesdays, 5PM",
                    },
                    {
                      title: "Physics Lab Prep",
                      subject: "Mechanics",
                      time: "Wednesdays, 4PM",
                    },
                    {
                      title: "Economics Review",
                      subject: "Macroeconomics",
                      time: "Fridays, 3PM",
                    },
                  ].map((group, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/10 h-40 flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {group.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {group.subject} • {group.time}
                        </p>
                        <Button variant="outline" size="sm">
                          Join Group
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dining">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Student Union Café",
                      special: "Taco Tuesday",
                      hours: "7AM - 8PM",
                    },
                    {
                      name: "The Commons",
                      special: "Pasta Bar",
                      hours: "10AM - 9PM",
                    },
                    {
                      name: "Green Leaf",
                      special: "Vegetarian Specials",
                      hours: "9AM - 7PM",
                    },
                  ].map((venue, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500/20 to-green-400/10 h-40 flex items-center justify-center">
                        <span className="text-4xl">🍽️</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                        <p className="text-muted-foreground mb-4">
                          {venue.special} • {venue.hours}
                        </p>
                        <Button variant="outline" size="sm">
                          View Menu
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="jobs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      position: "Research Assistant",
                      department: "Biology Dept",
                      type: "Part-time",
                    },
                    {
                      position: "Student Ambassador",
                      department: "Admissions",
                      type: "Flexible",
                    },
                    {
                      position: "IT Help Desk",
                      department: "Campus Tech",
                      type: "Part-time",
                    },
                  ].map((job, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500/20 to-purple-400/10 h-40 flex items-center justify-center">
                        <span className="text-4xl">💼</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {job.position}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {job.department} • {job.type}
                        </p>
                        <Button variant="outline" size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="bg-secondary/50 py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 CampusConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
