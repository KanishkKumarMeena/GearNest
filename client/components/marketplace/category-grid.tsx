import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  Zap,
  CircuitBoard,
  Gauge,
  Disc3,
  Filter,
  Lightbulb,
  Fuel,
} from "lucide-react";

const categories = [
  {
    id: "engine",
    name: "Engine",
    icon: Wrench,
    count: "2,450+ parts",
    description: "Engine components and performance parts",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    count: "1,830+ parts",
    description: "Wiring, batteries, and electrical systems",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: CircuitBoard,
    count: "1,200+ parts",
    description: "ECUs, sensors, and control modules",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    icon: Gauge,
    count: "890+ parts",
    description: "Gauges, displays, and interior electronics",
  },
  {
    id: "brakes",
    name: "Brakes",
    icon: Disc3,
    count: "1,650+ parts",
    description: "Brake pads, rotors, and brake systems",
  },
  {
    id: "filters",
    name: "Filters",
    icon: Filter,
    count: "750+ parts",
    description: "Air, oil, and fuel filters",
  },
  {
    id: "lighting",
    name: "Lighting",
    icon: Lightbulb,
    count: "620+ parts",
    description: "Headlights, taillights, and LED upgrades",
  },
  {
    id: "fuel",
    name: "Fuel System",
    icon: Fuel,
    count: "480+ parts",
    description: "Fuel pumps, injectors, and fuel lines",
  },
];

export function CategoryGrid() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Shop by Category
        </h2>
        <p className="text-muted-foreground">
          Find the exact parts you need for your vehicle
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-primary/20 bg-card/60 backdrop-blur-sm hover:bg-card/80"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors backdrop-blur-sm">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {category.count}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
