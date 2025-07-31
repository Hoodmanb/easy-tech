import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useAuthStore from "@/store/useAuthStaor";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)
  const { toast } = useToast()
  const navigate = useNavigate();

  const logout = async () => {
    const result = await clearUser()
    console.log(result)
    if (result === "successfully logged out") {
      toast({
        title: "Logout Successful",
        description: "successfully logged out",
      });
      navigate("/");
    } else {
      toast({
        title: "Logout Failed",
        description: "error logging out",
        variant: "destructive",
      });
    }
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Machines", path: "/machines" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-card shadow-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-md"></div>
            <span className="text-xl font-bold text-foreground">
              Easy Technologies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActivePath(item.path)
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="accent" size="sm" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActivePath(item.path)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {user && (<div className="pt-2">
                <Button variant="accent" size="sm" className="w-full" asChild>
                  <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" className="w-full mt-4"
                  onClick={async () => {
                    await logout()
                    setIsMenuOpen(false)
                  }} >
                  Logout
                </Button>
              </div>)}


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;