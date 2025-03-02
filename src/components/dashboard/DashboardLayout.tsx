
import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  File, 
  Package, 
  Users, 
  MessageSquare, 
  Image, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Pages', href: '/dashboard/pages', icon: File },
  { name: 'Services', href: '/dashboard/services', icon: Package },
  { name: 'Testimonials', href: '/dashboard/testimonials', icon: Users },
  { name: 'Blog Posts', href: '/dashboard/blog', icon: MessageSquare },
  { name: 'Media', href: '/dashboard/media', icon: Image },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-marketing-500">DigitalShehar</h1>
        <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                isActive ? "bg-gray-100 text-marketing-600 dark:bg-gray-800 dark:text-marketing-400" : "text-gray-600 dark:text-gray-300"
              )}
              onClick={() => setOpen(false)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t">
        {user && (
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-marketing-100 flex items-center justify-center">
              <span className="text-marketing-600 font-medium">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium truncate max-w-[150px]">{user.email}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        )}
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2" 
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  // If user is not yet loaded, show loading
  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Navigation */}
      {isMobile ? (
        <>
          <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
                <NavContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </>
      ) : (
        // Desktop Navigation
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden md:flex w-64 flex-col border-r bg-background">
            <NavContent />
          </aside>
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {/* Mobile main content */}
      {isMobile && (
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
