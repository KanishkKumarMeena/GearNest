import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Car, 
  Settings, 
  MapPin, 
  CreditCard, 
  Bell,
  Star,
  Calendar,
  Trash2,
  Edit,
  Plus,
  Package
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SavedPart {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  savedDate: Date;
  inStock: boolean;
}

interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  vin?: string;
  nickname?: string;
  isDefault: boolean;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("saved");
  const navigate = useNavigate();
  
  const user = {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg",
    memberSince: new Date("2023-01-15"),
    totalOrders: 12,
    totalSaved: 89.50
  };

  const savedParts: SavedPart[] = [
    {
      id: "1",
      name: "Premium Brake Pad Set",
      brand: "Akebono",
      price: 89.99,
      image: "/placeholder.svg",
      savedDate: new Date(Date.now() - 86400000),
      inStock: true
    },
    {
      id: "2",
      name: "Oil Filter",
      brand: "Honda",
      price: 12.49,
      image: "/placeholder.svg",
      savedDate: new Date(Date.now() - 172800000),
      inStock: true
    },
    {
      id: "3",
      name: "Air Filter",
      brand: "K&N",
      price: 45.99,
      image: "/placeholder.svg",
      savedDate: new Date(Date.now() - 259200000),
      inStock: false
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: "1",
      year: 2020,
      make: "Honda",
      model: "Accord",
      vin: "1HGBH41JXMN109186",
      nickname: "Daily Driver",
      isDefault: true
    },
    {
      id: "2",
      year: 2018,
      make: "Toyota",
      model: "Camry",
      nickname: "Weekend Car",
      isDefault: false
    }
  ];

  const recentOrders = [
    { id: "ORD-2024-001", date: "2024-06-20", total: 89.99, status: "Delivered" },
    { id: "ORD-2024-002", date: "2024-06-15", total: 156.48, status: "Delivered" },
    { id: "ORD-2024-003", date: "2024-06-10", total: 67.99, status: "Delivered" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your profile, vehicles, and saved items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-2">
                  Member since {user.memberSince.getFullYear()}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{user.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">${user.totalSaved}</div>
                  <div className="text-sm text-muted-foreground">Total Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="garage" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span className="hidden sm:inline">Garage</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Address</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Saved Parts */}
              <TabsContent value="saved" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Saved Parts ({savedParts.length})</h2>
                  <Button variant="outline" size="sm">
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {savedParts.map((part) => (
                    <Card key={part.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="relative mb-3">
                          <img
                            src={part.image}
                            alt={part.name}
                            className="w-full h-32 object-cover rounded-lg bg-muted"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm line-clamp-2">{part.name}</h3>
                          <p className="text-sm text-muted-foreground">{part.brand}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold">${part.price}</span>
                            <Badge variant={part.inStock ? "default" : "secondary"}>
                              {part.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Saved {part.savedDate.toLocaleDateString()}
                          </p>
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              // TODO: In a real app, this would add the item to cart state/context
                              console.log("Add to cart:", part.id);
                              navigate('/cart');
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* My Garage */}
              <TabsContent value="garage" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">My Garage ({vehicles.length})</h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Vehicle
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </h3>
                              {vehicle.isDefault && (
                                <Badge variant="default" className="text-xs">Default</Badge>
                              )}
                            </div>
                            {vehicle.nickname && (
                              <p className="text-sm text-muted-foreground">"{vehicle.nickname}"</p>
                            )}
                            {vehicle.vin && (
                              <p className="text-xs text-muted-foreground mt-2">
                                VIN: {vehicle.vin}
                              </p>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Find Parts
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Maintenance
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Order History */}
              <TabsContent value="orders" className="space-y-4">
                <h2 className="text-xl font-semibold">Order History</h2>
                
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                              <span>${order.total}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="default">{order.status}</Badge>
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Addresses */}
              <TabsContent value="addresses" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Shipping Addresses</h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Address
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">John Smith</h3>
                          <Badge variant="default" className="text-xs">Default</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>123 Main Street</p>
                          <p>San Francisco, CA 94102</p>
                          <p>United States</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-xl font-semibold">Account Settings</h2>
                
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Smith" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Price Drops</p>
                          <p className="text-sm text-muted-foreground">Alert when saved items go on sale</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Products</p>
                          <p className="text-sm text-muted-foreground">Notifications about new parts for your vehicles</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
