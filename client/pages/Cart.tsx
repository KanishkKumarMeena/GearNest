import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  Lock,
  ArrowRight,
  Tag,
  Percent
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrandLogo } from "@/lib/brand-logos";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  brandLogo: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  maxQuantity: number;
  category: string;
  partNumber: string;
  fitVerified: boolean;
}

export default function Cart() {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Premium Brake Pad Set - Front Axle',
      brand: 'Akebono',
      brandLogo: getBrandLogo('akebono'),
      price: 89.99,
      originalPrice: 109.99,
      quantity: 1,
      image: '/placeholder.svg',
      inStock: true,
      maxQuantity: 5,
      category: 'Brakes',
      partNumber: 'AKE-EUR1451',
      fitVerified: true
    },
    {
      id: '2',
      name: 'OEM Oil Filter',
      brand: 'Honda',
      brandLogo: getBrandLogo('honda'),
      price: 12.49,
      quantity: 2,
      image: '/placeholder.svg',
      inStock: true,
      maxQuantity: 10,
      category: 'Engine',
      partNumber: 'HON-15400-PLM-A02',
      fitVerified: true
    },
    {
      id: '3',
      name: 'High Performance Air Filter',
      brand: 'K&N',
      brandLogo: getBrandLogo('k&n'),
      price: 45.99,
      quantity: 1,
      image: '/placeholder.svg',
      inStock: false,
      maxQuantity: 3,
      category: 'Engine',
      partNumber: 'KN-33-2499',
      fitVerified: true
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    // In a real app, this would add to wishlist and remove from cart
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const hasOutOfStockItems = cartItems.some(item => !item.inStock);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Start shopping to add items to your cart
            </p>
            <Button onClick={() => navigate('/parts')} size="lg">
              Browse Parts
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {hasOutOfStockItems && (
                <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                  <CardContent className="p-4">
                    <p className="text-orange-800 dark:text-orange-200 text-sm">
                      ⚠️ Some items in your cart are currently out of stock. 
                      You can still checkout with available items.
                    </p>
                  </CardContent>
                </Card>
              )}

              {cartItems.map((item) => (
                <Card key={item.id} className={`${!item.inStock ? 'opacity-75' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg bg-muted"
                        />
                        {item.fitVerified && (
                          <Badge className="absolute -top-2 -right-2 bg-green-600 hover:bg-green-700 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold line-clamp-2 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-1">
                              <img
                                src={item.brandLogo}
                                alt={item.brand}
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-muted-foreground">{item.brand}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{item.category}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Part #: {item.partNumber}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-3">
                          {item.inStock ? (
                            <Badge variant="secondary" className="text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200">
                              Out of Stock
                            </Badge>
                          )}
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-lg">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Actions */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveToWishlist(item.id)}
                              className="text-muted-foreground hover:text-primary"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Promo Code</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button
                        variant="outline"
                        onClick={applyPromoCode}
                        disabled={promoApplied || !promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600">✓ SAVE10 applied!</p>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings</span>
                        <span>-${savings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount (10%)</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Free Shipping Threshold */}
                  {shipping > 0 && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Add ${(75 - subtotal).toFixed(2)} more for FREE shipping!
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => navigate('/checkout')}
                    disabled={hasOutOfStockItems && cartItems.every(item => !item.inStock)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Secure Checkout
                  </Button>

                  {/* Security Info */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3" />
                      <span>SSL Secured Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-3 w-3" />
                      <span>Free shipping on orders over $75</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3 w-3" />
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/parts')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}

        {/* You might also like */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 1, name: 'Spark Plug Set', brand: 'NGK', price: 24.99 },
                { id: 2, name: 'Engine Oil', brand: 'Castrol', price: 34.99 },
                { id: 3, name: 'Cabin Air Filter', brand: 'Mann', price: 18.99 },
                { id: 4, name: 'Brake Fluid', brand: 'Bosch', price: 12.99 }
              ].map((product) => (
                <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src="/placeholder.svg"
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg bg-muted mb-3"
                    />
                    <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={getBrandLogo(product.brand.toLowerCase())}
                        alt={`${product.brand} logo`}
                        className="w-4 h-4 object-contain"
                      />
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${product.price}</span>
                      <Button size="sm" variant="outline">
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
