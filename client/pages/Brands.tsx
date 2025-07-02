import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star, Filter, Grid, List, Award, Verified } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrandLogo } from "@/lib/brand-logos";

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  partCount: number;
  categories: string[];
  isOEM: boolean;
  isPremium: boolean;
  foundedYear: number;
  countryOfOrigin: string;
}

export default function Brands() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'oem' | 'premium'>('all');

  const brands: Brand[] = [
    {
      id: 'honda',
      name: 'Honda',
      logo: getBrandLogo('honda'),
      description: 'Original Equipment Manufacturer for Honda vehicles',
      rating: 4.9,
      partCount: 15420,
      categories: ['Engine', 'Transmission', 'Brakes', 'Electrical'],
      isOEM: true,
      isPremium: true,
      foundedYear: 1948,
      countryOfOrigin: 'Japan'
    },
    {
      id: 'toyota',
      name: 'Toyota',
      logo: getBrandLogo('toyota'),
      description: 'Genuine Toyota parts and accessories',
      rating: 4.8,
      partCount: 14230,
      categories: ['Engine', 'Suspension', 'Body', 'Interior'],
      isOEM: true,
      isPremium: true,
      foundedYear: 1937,
      countryOfOrigin: 'Japan'
    },
    {
      id: 'bosch',
      name: 'Bosch',
      logo: getBrandLogo('bosch'),
      description: 'Leading automotive technology and parts manufacturer',
      rating: 4.7,
      partCount: 8930,
      categories: ['Electrical', 'Engine', 'Brakes', 'Fuel System'],
      isOEM: false,
      isPremium: true,
      foundedYear: 1886,
      countryOfOrigin: 'Germany'
    },
    {
      id: 'akebono',
      name: 'Akebono',
      logo: getBrandLogo('akebono'),
      description: 'Premium brake systems and components',
      rating: 4.6,
      partCount: 2840,
      categories: ['Brakes'],
      isOEM: false,
      isPremium: true,
      foundedYear: 1929,
      countryOfOrigin: 'Japan'
    },
    {
      id: 'denso',
      name: 'Denso',
      logo: getBrandLogo('denso'),
      description: 'Advanced automotive technology and components',
      rating: 4.8,
      partCount: 7650,
      categories: ['Electrical', 'Cooling', 'Engine', 'AC'],
      isOEM: true,
      isPremium: true,
      foundedYear: 1949,
      countryOfOrigin: 'Japan'
    },
    {
      id: 'ngk',
      name: 'NGK',
      logo: getBrandLogo('ngk'),
      description: 'Spark plugs and ignition system specialists',
      rating: 4.7,
      partCount: 3200,
      categories: ['Engine', 'Electrical'],
      isOEM: false,
      isPremium: true,
      foundedYear: 1936,
      countryOfOrigin: 'Japan'
    },
    {
      id: 'kn',
      name: 'K&N',
      logo: getBrandLogo('k&n'),
      description: 'High-performance air filters and intake systems',
      rating: 4.5,
      partCount: 1890,
      categories: ['Engine', 'Performance'],
      isOEM: false,
      isPremium: true,
      foundedYear: 1969,
      countryOfOrigin: 'USA'
    },
    {
      id: 'bilstein',
      name: 'Bilstein',
      logo: getBrandLogo('bilstein'),
      description: 'Premium suspension systems and components',
      rating: 4.8,
      partCount: 2100,
      categories: ['Suspension'],
      isOEM: false,
      isPremium: true,
      foundedYear: 1873,
      countryOfOrigin: 'Germany'
    },
    {
      id: 'mann',
      name: 'Mann Filter',
      logo: getBrandLogo('mann'),
      description: 'Professional filtration solutions',
      rating: 4.6,
      partCount: 4560,
      categories: ['Engine', 'Transmission', 'Fuel System'],
      isOEM: false,
      isPremium: false,
      foundedYear: 1941,
      countryOfOrigin: 'Germany'
    },
    {
      id: 'gates',
      name: 'Gates',
      logo: getBrandLogo('gates'),
      description: 'Belts, hoses, and fluid power products',
      rating: 4.4,
      partCount: 3780,
      categories: ['Engine', 'Cooling', 'Transmission'],
      isOEM: false,
      isPremium: false,
      foundedYear: 1911,
      countryOfOrigin: 'USA'
    }
  ];

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'oem' && brand.isOEM) ||
                         (filterType === 'premium' && brand.isPremium);
    
    return matchesSearch && matchesFilter;
  });

  const handleBrandClick = (brand: Brand) => {
    navigate(`/parts?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop by Brand</h1>
          <p className="text-muted-foreground mb-6">
            Choose from trusted automotive brands and manufacturers
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All Brands
                </Button>
                <Button
                  variant={filterType === 'oem' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('oem')}
                  className="flex items-center gap-1"
                >
                  <Verified className="h-3 w-3" />
                  OEM
                </Button>
                <Button
                  variant={filterType === 'premium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('premium')}
                  className="flex items-center gap-1"
                >
                  <Award className="h-3 w-3" />
                  Premium
                </Button>
              </div>
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
        </div>

        {/* Brands Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Card
                key={brand.id}
                className="cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => handleBrandClick(brand)}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-16 w-16 mx-auto">
                        <AvatarImage src={brand.logo} alt={brand.name} />
                        <AvatarFallback className="text-lg font-bold">
                          {brand.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {brand.isOEM && (
                        <Badge className="absolute -top-1 -right-1 bg-green-600 hover:bg-green-700 text-xs">
                          <Verified className="h-3 w-3 mr-1" />
                          OEM
                        </Badge>
                      )}
                      {brand.isPremium && !brand.isOEM && (
                        <Badge className="absolute -top-1 -right-1 bg-orange-600 hover:bg-orange-700 text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {brand.description}
                    </p>
                    
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(brand.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {brand.rating}
                      </span>
                    </div>
                    
                    <div className="text-sm font-medium text-primary mb-2">
                      {brand.partCount.toLocaleString()} parts
                    </div>
                    
                    <div className="flex flex-wrap gap-1 justify-center">
                      {brand.categories.slice(0, 2).map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {brand.categories.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{brand.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBrands.map((brand) => (
              <Card
                key={brand.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleBrandClick(brand)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={brand.logo} alt={brand.name} />
                        <AvatarFallback className="text-lg font-bold">
                          {brand.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {brand.isOEM && (
                        <Badge className="absolute -top-1 -right-1 bg-green-600 hover:bg-green-700 text-xs">
                          <Verified className="h-3 w-3 mr-1" />
                          OEM
                        </Badge>
                      )}
                      {brand.isPremium && !brand.isOEM && (
                        <Badge className="absolute -top-1 -right-1 bg-orange-600 hover:bg-orange-700 text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-xl">{brand.name}</h3>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(brand.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-1">
                              {brand.rating}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-primary">
                            {brand.partCount.toLocaleString()} parts
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{brand.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {brand.categories.map((category, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Founded {brand.foundedYear} • {brand.countryOfOrigin}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No brands found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setSearchQuery('')} variant="outline">
                Clear Search
              </Button>
              <Button onClick={() => setFilterType('all')} variant="outline">
                Show All Brands
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
