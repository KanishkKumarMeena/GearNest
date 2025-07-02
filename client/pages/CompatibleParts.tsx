import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, Star, Truck, Clock, CheckCircle, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getBrandLogo } from "@/lib/brand-logos";

interface Part {
  id: string;
  name: string;
  brand: string;
  brandLogo?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  compatibility: string;
  inStock: boolean;
  eta: string;
  fitVerified: boolean;
  featured?: boolean;
}

export default function CompatibleParts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const mockParts: Part[] = [
    {
      id: '1',
      name: 'Premium Brake Pad Set',
      brand: 'Akebono',
      brandLogo: getBrandLogo('akebono'),
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.8,
      reviews: 342,
      image: '/placeholder.svg',
      compatibility: '2018-2023 Honda Accord',
      inStock: true,
      eta: '2-3 business days',
      fitVerified: true,
      featured: true
    },
    {
      id: '2',
      name: 'OEM Oil Filter',
      brand: 'Honda',
      brandLogo: getBrandLogo('honda'),
      price: 12.49,
      rating: 4.9,
      reviews: 156,
      image: '/placeholder.svg',
      compatibility: '2018-2023 Honda Accord',
      inStock: true,
      eta: '1-2 business days',
      fitVerified: true
    },
    {
      id: '3',
      name: 'High Performance Air Filter',
      brand: 'K&N',
      brandLogo: getBrandLogo('k&n'),
      price: 45.99,
      rating: 4.7,
      reviews: 289,
      image: '/placeholder.svg',
      compatibility: '2018-2023 Honda Accord',
      inStock: false,
      eta: '5-7 business days',
      fitVerified: true
    },
    {
      id: '4',
      name: 'LED Headlight Bulb Set',
      brand: 'Philips',
      brandLogo: getBrandLogo('philips'),
      price: 67.99,
      rating: 4.6,
      reviews: 198,
      image: '/placeholder.svg',
      compatibility: '2018-2023 Honda Accord',
      inStock: true,
      eta: '2-3 business days',
      fitVerified: true
    }
  ];

  const brands = ['Akebono', 'Honda', 'K&N', 'Philips', 'Bosch', 'NGK'];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Compatible Parts</h1>
              <p className="text-muted-foreground">
                Showing results for: <span className="font-medium">{searchQuery || 'All parts'}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Refine search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <Card className="lg:w-80 h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Customer Rating</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="mb-2"
                  />
                </div>

                {/* Brands */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Brands</label>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
                        <label htmlFor={brand} className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Availability</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inStock" />
                      <label htmlFor="inStock" className="text-sm">In Stock</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fitVerified" />
                      <label htmlFor="fitVerified" className="text-sm">Fit Verified</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Parts Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {mockParts.length} results
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockParts.map((part) => (
                <Card
                  key={part.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => navigate(`/part/${part.id}`)}
                >
                  <CardContent className="p-4">
                    {/* Image and Badge */}
                    <div className="relative mb-4">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-48 object-cover rounded-lg bg-muted"
                      />
                      {part.fitVerified && (
                        <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Fit Verified
                        </Badge>
                      )}
                      {part.featured && (
                        <Badge className="absolute top-2 right-2 bg-orange-600 hover:bg-orange-700">
                          Featured
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Part Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm line-clamp-2">{part.name}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {part.brandLogo && (
                          <img
                            src={part.brandLogo}
                            alt={`${part.brand} logo`}
                            className="w-5 h-5 object-contain"
                          />
                        )}
                        <p className="text-sm text-muted-foreground">{part.brand}</p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(part.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {part.rating} ({part.reviews})
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground">{part.compatibility}</p>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">${part.price}</span>
                        {part.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${part.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        {part.inStock ? (
                          <Badge variant="secondary" className="text-green-700 bg-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-orange-700 bg-orange-100">
                            <Clock className="h-3 w-3 mr-1" />
                            Backorder
                          </Badge>
                        )}
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          {part.eta}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
