import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Grid, List, Filter, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  partCount: number;
  subcategories: string[];
  featured?: boolean;
}

export default function Categories() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: Category[] = [
    {
      id: 'engine',
      name: 'Engine & Performance',
      description: 'Engine components, performance parts, and tuning accessories',
      icon: '⚙️',
      partCount: 2543,
      subcategories: ['Air Filters', 'Oil Filters', 'Spark Plugs', 'Turbochargers', 'Engine Mounts'],
      featured: true
    },
    {
      id: 'brakes',
      name: 'Brakes & Safety',
      description: 'Brake pads, rotors, calipers, and safety equipment',
      icon: '🛑',
      partCount: 1876,
      subcategories: ['Brake Pads', 'Brake Rotors', 'Brake Calipers', 'Brake Lines', 'ABS Components'],
      featured: true
    },
    {
      id: 'suspension',
      name: 'Suspension & Steering',
      description: 'Shocks, struts, springs, and steering components',
      icon: '🔧',
      partCount: 1234,
      subcategories: ['Shocks', 'Struts', 'Springs', 'Control Arms', 'Tie Rods'],
      featured: true
    },
    {
      id: 'electrical',
      name: 'Electrical & Lighting',
      description: 'Batteries, alternators, lighting, and electrical systems',
      icon: '⚡',
      partCount: 987,
      subcategories: ['Batteries', 'Alternators', 'Headlights', 'Tail Lights', 'Wiring']
    },
    {
      id: 'transmission',
      name: 'Transmission & Drivetrain',
      description: 'Transmission parts, clutches, and drivetrain components',
      icon: '⚙️',
      partCount: 756,
      subcategories: ['Transmission Fluid', 'Clutch Kits', 'CV Joints', 'Differentials', 'Drive Shafts']
    },
    {
      id: 'cooling',
      name: 'Cooling & Climate',
      description: 'Radiators, thermostats, AC components, and cooling systems',
      icon: '❄️',
      partCount: 643,
      subcategories: ['Radiators', 'Thermostats', 'AC Compressors', 'Cooling Fans', 'Heater Cores']
    },
    {
      id: 'exhaust',
      name: 'Exhaust & Emissions',
      description: 'Exhaust systems, catalytic converters, and emission controls',
      icon: '💨',
      partCount: 521,
      subcategories: ['Mufflers', 'Catalytic Converters', 'Exhaust Pipes', 'Headers', 'Gaskets']
    },
    {
      id: 'body',
      name: 'Body & Exterior',
      description: 'Body panels, mirrors, bumpers, and exterior accessories',
      icon: '🚗',
      partCount: 432,
      subcategories: ['Bumpers', 'Mirrors', 'Door Handles', 'Trim', 'Weather Stripping']
    },
    {
      id: 'interior',
      name: 'Interior & Comfort',
      description: 'Seats, dashboard, carpets, and interior accessories',
      icon: '🪑',
      partCount: 389,
      subcategories: ['Seats', 'Dashboard', 'Floor Mats', 'Seat Covers', 'Interior Trim']
    },
    {
      id: 'wheels',
      name: 'Wheels & Tires',
      description: 'Wheels, tires, tire pressure sensors, and wheel accessories',
      icon: '🛞',
      partCount: 298,
      subcategories: ['Wheels', 'Tires', 'TPMS Sensors', 'Lug Nuts', 'Wheel Covers']
    }
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const allCategories = categories.filter(cat => !cat.featured);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCategoryClick = (category: Category) => {
    navigate(`/parts?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
          <p className="text-muted-foreground mb-6">
            Find parts by category or search for specific components
          </p>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        {!searchQuery && featuredCategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                  onClick={() => handleCategoryClick(category)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Featured
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.partCount.toLocaleString()} parts</span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Categories */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {searchQuery ? `Search Results (${filteredCategories.length})` : 'All Categories'}
          </h2>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(searchQuery ? filteredCategories : allCategories).map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCategoryClick(category)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="text-sm font-medium text-primary">
                        {category.partCount.toLocaleString()} parts
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(searchQuery ? filteredCategories : allCategories).map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCategoryClick(category)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {category.subcategories.slice(0, 3).map((sub, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {sub}
                              </Badge>
                            ))}
                            {category.subcategories.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{category.subcategories.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary mb-1">
                          {category.partCount.toLocaleString()} parts
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* No Results */}
        {searchQuery && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or browse all categories
            </p>
            <Button onClick={() => setSearchQuery('')} variant="outline">
              View All Categories
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
