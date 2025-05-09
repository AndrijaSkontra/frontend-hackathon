"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useLocale } from "next-intl";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
};

export default function ProfilePage({}: {}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // Check for user session
    const checkUserSession = async () => {
      setIsLoading(true);
      try {
        // For demo purposes, we're checking localStorage
        // In a real app, you would fetch the user session from your API
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Redirect to login if no user is found
          router.push(`/${locale}/login`);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        toast.error("Unable to load profile information");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [locale, router]);

  // Generate user initials
  const getInitials = () => {
    if (!user) return "";
    return `${user.firstName[0]}${user.lastName[0]}`;
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    toast.success("You have been signed out");
    router.push(`/${locale}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <p className="mb-4">You need to be logged in to view this page</p>
            <Button asChild>
              <Link href={`/${locale}/login`}>Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={user.profileImage}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <AvatarFallback className="bg-black text-white text-xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                <nav className="space-y-2 mb-6">
                  <Link
                    href={`/${locale}/profile`}
                    className="w-full block px-4 py-2 rounded-lg bg-gray-100 font-medium"
                  >
                    Profile Overview
                  </Link>
                  <Link
                    href={`/${locale}/profile/postings`}
                    className="w-full block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
                  >
                    My Postings
                  </Link>
                  <Link
                    href={`/${locale}/profile/saved`}
                    className="w-full block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
                  >
                    Saved Items
                  </Link>
                  <Link
                    href={`/${locale}/profile/settings`}
                    className="w-full block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
                  >
                    Settings
                  </Link>
                </nav>

                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">Profile Overview</h1>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Your basic profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          First Name
                        </dt>
                        <dd className="mt-1 text-lg">{user.firstName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Last Name
                        </dt>
                        <dd className="mt-1 text-lg">{user.lastName}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 text-lg">{user.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          User ID
                        </dt>
                        <dd className="mt-1 text-lg font-mono">{user.id}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent interactions on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-12 text-gray-500">
                      You have no recent activity yet
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
