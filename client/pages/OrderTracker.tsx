import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  MessageCircle,
  ArrowRight,
  Calendar,
  Star
} from "lucide-react";
import { useState } from "react";

interface OrderStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: Date;
  icon: React.ReactNode;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  estimatedDelivery: Date;
  trackingNumber: string;
  carrier: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  currentStep: number;
}

export default function OrderTracker() {
  const [activeOrder, setActiveOrder] = useState<string>('ORD-2024-001');

  const mockOrder: Order = {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'In Transit',
    estimatedDelivery: new Date(Date.now() + 86400000), // Tomorrow
    trackingNumber: '1Z999AA1234567890',
    carrier: 'UPS',
    items: [
      {
        name: 'Premium Brake Pad Set - Front Axle',
        quantity: 1,
        price: 89.99,
        image: '/placeholder.svg'
      },
      {
        name: 'OEM Oil Filter',
        quantity: 2,
        price: 12.49,
        image: '/placeholder.svg'
      }
    ],
    shippingAddress: {
      name: 'John Smith',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    },
    currentStep: 2
  };

  const orderSteps: OrderStep[] = [
    {
      id: 'placed',
      title: 'Order Placed',
      description: 'Your order has been confirmed and is being prepared',
      status: 'completed',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'Items are being picked and packed',
      status: 'completed',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      icon: <Package className="h-5 w-5" />
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Package is on its way to you',
      status: 'current',
      timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Package has been delivered',
      status: 'pending',
      icon: <MapPin className="h-5 w-5" />
    }
  ];

  const recentOrders = [
    { id: 'ORD-2024-001', status: 'In Transit', date: '2024-06-20' },
    { id: 'ORD-2024-002', status: 'Delivered', date: '2024-06-15' },
    { id: 'ORD-2024-003', status: 'Processing', date: '2024-06-22' }
  ];

  const getProgressPercentage = (currentStep: number, totalSteps: number) => {
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 border-green-300';
      case 'current':
        return 'text-blue-600 bg-blue-100 border-blue-300';
      default:
        return 'text-gray-400 bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Order Tracking</h1>
          <p className="text-muted-foreground">Monitor your order status and delivery progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeOrder === order.id
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-border'
                  }`}
                  onClick={() => setActiveOrder(order.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{order.id}</span>
                    <Badge
                      variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Main Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order {mockOrder.orderNumber}</CardTitle>
                    <p className="text-muted-foreground">
                      Estimated delivery: {mockOrder.estimatedDelivery.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {mockOrder.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Tracking Information</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Tracking #:</span>{' '}
                        {mockOrder.trackingNumber}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Carrier:</span>{' '}
                        {mockOrder.carrier}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Delivery Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{mockOrder.shippingAddress.name}</p>
                      <p>{mockOrder.shippingAddress.address}</p>
                      <p>
                        {mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state}{' '}
                        {mockOrder.shippingAddress.zip}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Progress</CardTitle>
                <div className="space-y-2">
                  <Progress
                    value={getProgressPercentage(mockOrder.currentStep, orderSteps.length)}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Step {mockOrder.currentStep + 1} of {orderSteps.length}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStepStatusColor(
                          step.status
                        )}`}
                      >
                        {step.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{step.title}</h4>
                          {step.timestamp && (
                            <span className="text-xs text-muted-foreground">
                              {step.timestamp.toLocaleDateString()}{' '}
                              {step.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        
                        {step.status === 'current' && (
                          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Your package is currently on the delivery truck and will arrive today between 10 AM - 6 PM
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {index < orderSteps.length - 1 && (
                        <div className="absolute left-[1.25rem] mt-10 w-0.5 h-6 bg-gray-200 dark:bg-gray-700" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Items in this Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-muted"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-lg">
                        ${mockOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Carrier
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat with Support
              </Button>
              <Button className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Rate & Review
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
