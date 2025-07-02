import { Header } from "@/components/marketplace/header";
import { HeroSection } from "@/components/marketplace/hero-section";
import { SearchBar } from "@/components/marketplace/search-bar";
import { CategoryGrid } from "@/components/marketplace/category-grid";
import { FeaturedProducts } from "@/components/marketplace/featured-products";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Search Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Search for Parts
              </h2>
              <p className="text-muted-foreground">
                Enter part name, number, or scan your VIN for instant
                compatibility
              </p>
            </div>
            <SearchBar />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto">
            <CategoryGrid />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <FeaturedProducts />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GN</span>
                </div>
                <span className="text-xl font-bold">GearNest</span>
              </div>
              <p className="text-slate-300 text-sm">
                Your trusted source for quality car parts with fast shipping and
                expert support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Help Center</li>
                <li>Returns & Exchanges</li>
                <li>Shipping Info</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Help Center</li>
                <li>Returns & Exchanges</li>
                <li>Shipping Info</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-background/70">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
            © 2024 GearNest Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
