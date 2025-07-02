import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Percent, 
  Clock, 
  Star, 
  Calendar, 
  ShoppingCart,
  Heart,
  Filter,
  ArrowRight,
  Tag,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrandLogo } from "@/lib/brand-logos";

interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  brand: string;
  brandLogo?: string;
  category: string;
  rating: number;
  reviews: number;
  timeLeft: string;
  stockLeft?: number;
  dealType: 'flash' | 'clearance' | 'bulk' | 'seasonal';
  isHot?: boolean;
  isFeatured?: boolean;
}

export default function Deals() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'flash' | 'clearance' | 'bulk' | 'seasonal'>('all');

  const deals: Deal[] = [
    {
      id: '1',
      title: 'Premium Brake Pad Set - Front & Rear',
      description: 'Complete brake pad set for Honda Accord 2018-2023',
      originalPrice: 189.99,
      salePrice: 119.99,
      discount: 37,
      image: '/placeholder.svg',
      brand: 'Akebono',
      brandLogo: getBrandLogo('akebono'),
      category: 'Brakes',
      rating: 4.8,
      reviews: 342,
      timeLeft: '2d 14h 32m',
      stockLeft: 12,
      dealType: 'flash',
      isHot: true,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Oil Filter 5-Pack Bundle',
      description: 'Genuine Honda oil filters - buy 4 get 1 free',
      originalPrice: 62.45,
      salePrice: 49.99,
      discount: 20,
      image: '/placeholder.svg',
      brand: 'Honda',
      brandLogo: getBrandLogo('honda'),
      category: 'Engine',
      rating: 4.9,
      reviews: 156,
      timeLeft: '5d 8h 15m',
      dealType: 'bulk',
      isFeatured: true
    },
    {
      id: '3',
      title: 'LED Headlight Conversion Kit',
      description: 'High-performance LED headlights with 3-year warranty',
      originalPrice: 299.99,
      salePrice: 199.99,
      discount: 33,
      image: '/placeholder.svg',
      brand: 'Philips',
      brandLogo: getBrandLogo('philips'),
      category: 'Lighting',
      rating: 4.6,
      reviews: 289,
      timeLeft: '1d 6h 45m',
      stockLeft: 8,
      dealType: 'flash',
      isHot: true
    },
    {
      id: '4',
      title: 'Winter Tire Clearance',
      description: 'All-season and winter tires up to 50% off',
      originalPrice: 599.99,
      salePrice: 299.99,
      discount: 50,
      image: '/placeholder.svg',
      brand: 'Michelin',
      brandLogo: getBrandLogo('michelin'),
      category: 'Tires',
      rating: 4.7,
      reviews: 198,
      timeLeft: '15d 0h 0m',
      dealType: 'seasonal'
    },
    {
      id: '5',
      title: 'Air Filter Mega Pack',
      description: 'High-flow air filters - 3 for the price of 2',
      originalPrice: 135.99,
      salePrice: 89.99,
      discount: 34,
      image: '/placeholder.svg',
      brand: 'K&N',
      brandLogo: getBrandLogo('k&n'),
      category: 'Engine',
      rating: 4.5,
      reviews: 423,
      timeLeft: '3d 12h 20m',
      dealType: 'bulk'
    },
    {
      id: '6',
      title: 'Suspension Strut Assembly',
      description: 'Factory overstock - limited quantity clearance',
      originalPrice: 449.99,
      salePrice: 279.99,
      discount: 38,
      image: '/placeholder.svg',
      brand: 'Monroe',
      brandLogo: getBrandLogo('monroe'),
      category: 'Suspension',
      rating: 4.4,
      reviews: 87,
      timeLeft: '7d 18h 30m',
      stockLeft: 5,
      dealType: 'clearance'
    }
  ];

  const filteredDeals = deals.filter(deal => 
    activeFilter === 'all' || deal.dealType === activeFilter
  );

  const featuredDeals = deals.filter(deal => deal.isFeatured);
  const hotDeals = deals.filter(deal => deal.isHot);

  const getDealTypeColor = (type: string) => {
    switch (type) {
      case 'flash': return 'bg-red-600 hover:bg-red-700';
      case 'clearance': return 'bg-orange-600 hover:bg-orange-700';
      case 'bulk': return 'bg-blue-600 hover:bg-blue-700';
      case 'seasonal': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getDealTypeIcon = (type: string) => {
    switch (type) {
      case 'flash': return <Zap className="h-3 w-3" />;
      case 'clearance': return <Tag className="h-3 w-3" />;
      case 'bulk': return <ShoppingCart className="h-3 w-3" />;
      case 'seasonal': return <Calendar className="h-3 w-3" />;
      default: return <Percent className="h-3 w-3" />;
    }
  };

  const getStockProgress = (stockLeft?: number) => {
    if (!stockLeft) return 100;
    const maxStock = 20;
    return (stockLeft / maxStock) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Special Deals & Offers</h1>
          <p className="text-muted-foreground mb-6">
            Limited-time offers on quality auto parts - save big while supplies last!
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              All Deals
            </Button>
            <Button
              variant={activeFilter === 'flash' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('flash')}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Flash Sales
            </Button>
            <Button
              variant={activeFilter === 'clearance' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('clearance')}
              className="flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              Clearance
            </Button>
            <Button
              variant={activeFilter === 'bulk' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('bulk')}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Bulk Deals
            </Button>
            <Button
              variant={activeFilter === 'seasonal' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('seasonal')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Seasonal
            </Button>
          </div>
        </div>

        {/* Featured Deals */}
        {activeFilter === 'all' && featuredDeals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Deals
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredDeals.map((deal) => (
                <Card
                  key={deal.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                  onClick={() => navigate(`/part/${deal.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-24 h-24 object-cover rounded-lg bg-muted"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">{deal.title}</h3>
                            <div className="flex items-center gap-2">
                              {deal.brandLogo && (
                                <img
                                  src={deal.brandLogo}
                                  alt={`${deal.brand} logo`}
                                  className="w-4 h-4 object-contain"
                                />
                              )}
                              <p className="text-sm text-muted-foreground">{deal.brand} • {deal.category}</p>
                            </div>
                          </div>
                          {deal.isHot && (
                            <Badge className="bg-red-600 hover:bg-red-700 animate-pulse">
                              🔥 HOT
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold text-primary">${deal.salePrice}</span>
                          <span className="text-lg text-muted-foreground line-through">${deal.originalPrice}</span>
                          <Badge className={`${getDealTypeColor(deal.dealType)} text-white`}>
                            {getDealTypeIcon(deal.dealType)}
                            -{deal.discount}%
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(deal.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {deal.rating} ({deal.reviews} reviews)
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span className="text-red-600 font-medium">Ends in {deal.timeLeft}</span>
                          </div>
                          
                          {deal.stockLeft && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Stock Level</span>
                                <span className="text-red-600">{deal.stockLeft} left</span>
                              </div>
                              <Progress 
                                value={getStockProgress(deal.stockLeft)} 
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Deals Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">
            {activeFilter === 'all' ? 'All Deals' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Deals`}
            <span className="text-lg text-muted-foreground ml-2">({filteredDeals.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card
              key={deal.id}
              className="cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => navigate(`/part/${deal.id}`)}
            >
              <CardContent className="p-4">
                {/* Image and Badges */}
                <div className="relative mb-4">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-40 object-cover rounded-lg bg-muted"
                  />
                  <Badge className={`absolute top-2 left-2 ${getDealTypeColor(deal.dealType)} text-white`}>
                    {getDealTypeIcon(deal.dealType)}
                    -{deal.discount}%
                  </Badge>
                  {deal.isHot && (
                    <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 animate-pulse">
                      🔥 HOT
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

                {/* Deal Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold line-clamp-2 mb-1">{deal.title}</h3>
                    <div className="flex items-center gap-2">
                      {deal.brandLogo && (
                        <img
                          src={deal.brandLogo}
                          alt={`${deal.brand} logo`}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      <p className="text-sm text-muted-foreground">{deal.brand} • {deal.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(deal.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {deal.rating} ({deal.reviews})
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">${deal.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-red-500" />
                      <span className="text-red-600 font-medium">Ends in {deal.timeLeft}</span>
                    </div>
                    
                    {deal.stockLeft && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Stock Level</span>
                          <span className="text-red-600">{deal.stockLeft} left</span>
                        </div>
                        <Progress 
                          value={getStockProgress(deal.stockLeft)} 
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💸</div>
            <h3 className="text-xl font-semibold mb-2">No deals found</h3>
            <p className="text-muted-foreground mb-6">
              Try browsing other deal categories or check back later for new offers
            </p>
            <Button onClick={() => setActiveFilter('all')} variant="outline">
              View All Deals
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-2">Don't Miss Out!</h3>
          <p className="text-muted-foreground mb-6">
            New deals are added daily. Sign up for notifications to get the best offers delivered to your inbox.
          </p>
          <div className="flex gap-3 justify-center">
            <Button size="lg">
              Subscribe to Deals
            </Button>
            <Button size="lg" variant="outline">
              View All Categories
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
