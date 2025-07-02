import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Truck, Clock, Star } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto mb-8">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            ✨ New AR Preview Feature Available
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find the Perfect
            <span className="text-primary block">Car Parts</span>
            for Your Vehicle
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Search millions of parts with VIN scanning, AR preview, and instant
            compatibility checking. Trusted by over 100,000+ mechanics and car
            enthusiasts.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Guaranteed Quality</div>
            <div className="text-xs text-muted-foreground">
              OEM & Aftermarket
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Fast Shipping</div>
            <div className="text-xs text-muted-foreground">
              Same Day Available
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Easy Returns</div>
            <div className="text-xs text-muted-foreground">30-Day Policy</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div className="text-sm font-medium">Expert Support</div>
            <div className="text-xs text-muted-foreground">24/7 Available</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
          >
            Browse All Parts
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 px-8 py-6 text-lg"
          >
            Chat with Mechanic
          </Button>
        </div>
      </div>
    </div>
  );
}
