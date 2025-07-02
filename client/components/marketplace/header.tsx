import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ShoppingCart,
  User,
  MessageCircle,
  Menu,
  Search,
  Heart,
  X,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(7);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-20 md:w-[105px] h-8 md:h-10 bg-primary rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => navigate('/')}
              >
                <span className="text-white font-bold text-sm md:text-xl">
                  <span className="hidden sm:inline">GearNest</span>
                  <span className="sm:hidden">GN</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Button variant="ghost" className="text-foreground" onClick={() => navigate('/parts')}>
              Parts
            </Button>
            <Button variant="ghost" className="text-foreground" onClick={() => navigate('/categories')}>
              Categories
            </Button>
            <Button variant="ghost" className="text-foreground" onClick={() => navigate('/brands')}>
              Brands
            </Button>
            <Button variant="ghost" className="text-foreground" onClick={() => navigate('/deals')}>
              Deals
            </Button>
            <Button variant="ghost" className="text-foreground" onClick={() => navigate('/support')}>
              Support
            </Button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Wishlist - Hidden on very small screens */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden xs:flex"
              onClick={() => navigate('/profile')}
            >
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                  {cartCount > 9 ? '9+' : cartCount}
                </Badge>
              )}
            </Button>

            {/* Messages - Hidden on small screens */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </Button>

            {/* Theme toggle - Hidden on very small screens */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* User - Hidden on small screens */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-foreground"
                >
                  <Menu className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground h-12"
                      onClick={() => { navigate('/parts'); setMobileMenuOpen(false); }}
                    >
                      Parts
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground h-12"
                      onClick={() => { navigate('/categories'); setMobileMenuOpen(false); }}
                    >
                      Categories
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground h-12"
                      onClick={() => { navigate('/brands'); setMobileMenuOpen(false); }}
                    >
                      Brands
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground h-12"
                      onClick={() => { navigate('/deals'); setMobileMenuOpen(false); }}
                    >
                      Deals
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground h-12"
                      onClick={() => { navigate('/support'); setMobileMenuOpen(false); }}
                    >
                      Support
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex flex-col gap-2">
                      {/* Show hidden items on mobile */}
                      <Button 
                        variant="ghost" 
                        className="justify-start sm:hidden h-12"
                        onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cart
                        {cartCount > 0 && (
                          <Badge className="ml-auto">{cartCount}</Badge>
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start sm:hidden h-12"
                        onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                        {wishlistCount > 0 && (
                          <Badge className="ml-auto">{wishlistCount}</Badge>
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start sm:hidden h-12"
                        onClick={() => { navigate('/chat'); setMobileMenuOpen(false); }}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Messages
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start sm:hidden h-12"
                        onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Account
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start sm:hidden h-12"
                        onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Orders
                      </Button>
                      <div className="flex items-center justify-between sm:hidden pt-2 px-3">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
