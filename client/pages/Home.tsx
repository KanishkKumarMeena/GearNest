import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Search, Scan, Camera, MapPin, Clock, Wrench, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleVinScan = () => {
    toast({
      title: "VIN Scanner Activated",
      description: "Point your camera at the VIN barcode or dashboard",
      duration: 3000,
    });
    // Simulate VIN detection after 2 seconds
    setTimeout(() => {
      toast({
        title: "VIN Detected!",
        description: "1HGBH41JXMN109186 - 2021 Honda Accord",
        duration: 4000,
      });
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/parts?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const recentSearches = [
    "Brake pads",
    "Oil filter",
    "Spark plugs",
    "Air filter"
  ];

  const quickCategories = [
    { name: "Engine", icon: "⚙️", count: "2.5k+" },
    { name: "Brakes", icon: "🛑", count: "1.8k+" },
    { name: "Suspension", icon: "🔧", count: "1.2k+" },
    { name: "Electrical", icon: "⚡", count: "980+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Find Your Perfect
            <span className="text-primary block">Auto Parts</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search by part name, VIN scan, or browse our extensive catalog of verified compatible parts
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search for parts by name, part number, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="px-8">
                  Search
                </Button>
              </div>

              {/* VIN Scanner */}
              <div className="flex items-center justify-center gap-4 py-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleVinScan}
                  className="flex items-center gap-2 h-12 px-6"
                >
                  <Scan className="h-5 w-5" />
                  Scan VIN
                </Button>
                <span className="text-muted-foreground">or</span>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-12 px-6"
                >
                  <Camera className="h-5 w-5" />
                  Upload Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(search);
                    navigate(`/parts?search=${encodeURIComponent(search)}`);
                  }}
                  className="text-sm"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickCategories.map((category, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/parts?category=${encodeURIComponent(category.name)}`)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} parts</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/chat')}>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Ask a Mechanic</h3>
              <p className="text-sm text-muted-foreground">Get expert advice and part recommendations</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/orders')}>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Track Orders</h3>
              <p className="text-sm text-muted-foreground">Monitor your order status and delivery</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/profile')}>
            <CardContent className="p-6 text-center">
              <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">My Garage</h3>
              <p className="text-sm text-muted-foreground">Manage your vehicles and saved parts</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
