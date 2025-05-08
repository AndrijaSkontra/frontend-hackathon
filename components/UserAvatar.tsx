"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    accessToken: string;
  } & Session["user"];
}

export function UserAvatar() {
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: string;
  };
  const [isMobileView, setIsMobileView] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Extract the locale from the pathname
  const locale = pathname?.split("/")[1] || "en";

  useEffect(() => {
    // Check for window resize to determine mobile view
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  // Generate user initials
  const getInitials = () => {
    if (!session?.user) return "GU"; // Guest User
    const firstName = session.user.firstName || "";
    const lastName = session.user.lastName || "";
    return `${firstName[0]}${lastName[0]}`;
  };

  if (status === "loading") {
    return (
      <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (!session?.user) {
    return (
      <Button variant="default" className="rounded-full px-6" asChild>
        <Link href={`/${locale}/login`}>Login</Link>
      </Button>
    );
  }

  // User is logged in, show avatar and dropdown
  return isMobileView ? (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-9 w-9 rounded-full overflow-hidden">
          <Avatar>
            <AvatarImage
              src={session.user.profileImage}
              alt={`${session.user.firstName} ${session.user.lastName}`}
            />
            <AvatarFallback className="bg-black text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="pb-6">
          <SheetTitle>Your Profile</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={session.user.profileImage}
                alt={`${session.user.firstName} ${session.user.lastName}`}
              />
              <AvatarFallback className="bg-black text-white text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-xl">
                {session.user.firstName} {session.user.lastName}
              </h3>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
          </div>

          <nav className="flex flex-col space-y-2 mb-8">
            <Link
              href={`/${locale}/profile`}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <span className="mr-3">👤</span>
              <span>My Profile</span>
            </Link>
            <Link
              href={`/${locale}/profile/postings`}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <span className="mr-3">📝</span>
              <span>My Postings</span>
            </Link>
            <Link
              href={`/${locale}/profile/saved`}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <span className="mr-3">🔖</span>
              <span>Saved Items</span>
            </Link>
            <Link
              href={`/${locale}/profile/settings`}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center"
            >
              <span className="mr-3">⚙️</span>
              <span>Settings</span>
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
      </SheetContent>
    </Sheet>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-9 w-9 rounded-full">
          <Avatar>
            <AvatarImage
              src={session.user.profileImage}
              alt={`${session.user.firstName} ${session.user.lastName}`}
            />
            <AvatarFallback className="bg-yellow-500 text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-bold">
              {session.user.firstName} {session.user.lastName}
            </span>
            <span className="text-xs text-gray-500">{session.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/profile`}>My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/profile/postings`}>My Postings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/profile/saved`}>Saved Items</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${locale}/profile/settings`}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
