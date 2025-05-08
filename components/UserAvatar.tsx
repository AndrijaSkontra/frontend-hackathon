"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
};

export function UserAvatar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract the locale from the pathname
  const locale = pathname?.split('/')[1] || 'en';
  
  useEffect(() => {
    // Check for window resize to determine mobile view
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    // Simulate checking for user session
    const checkUserSession = async () => {
      setIsLoading(true);
      try {
        // Replace this with your actual user session retrieval logic
        // e.g., const response = await fetch('/api/user/session');
        // For now, we'll check localStorage as a simple example
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserSession();
  }, []);
  
  const handleSignOut = () => {
    // Replace with your actual logout logic
    localStorage.removeItem('user');
    setUser(null);
    router.push(`/${locale}`);
  };
  
  // Generate user initials
  const getInitials = () => {
    if (!user) return "GU"; // Guest User
    return `${user.firstName[0]}${user.lastName[0]}`;
  };
  
  if (isLoading) {
    return (
      <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }
  
  if (!user) {
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
            <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
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
              <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="bg-black text-white text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-xl">{user.firstName} {user.lastName}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
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
        <button className="h-9 w-9 rounded-full overflow-hidden">
          <Avatar>
            <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-black text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-bold">{user.firstName} {user.lastName}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
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