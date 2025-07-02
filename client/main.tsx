import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import CompatibleParts from "./pages/CompatibleParts";
import PartDetails from "./pages/PartDetails";
import MechanicChat from "./pages/MechanicChat";
import OrderTracker from "./pages/OrderTracker";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Deals from "./pages/Deals";
import Support from "./pages/Support";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.PROD ? '/GearNest' : '/'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Index />} />
            <Route path="/parts" element={<CompatibleParts />} />
            <Route path="/part/:id" element={<PartDetails />} />
            <Route path="/chat" element={<MechanicChat />} />
            <Route path="/orders" element={<OrderTracker />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/products/:id"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl">Product Details - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="/cart"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl">Shopping Cart - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="/wishlist"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl">Wishlist - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="/checkout"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl">Checkout - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="/account"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl">My Account - Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="/messages"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl">Messages - Coming Soon</h1>
                </div>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
