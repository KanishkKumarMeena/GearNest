import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, 
  CheckCircle, 
  Heart, 
  Share, 
  Truck, 
  Shield, 
  ArrowLeft,
  MessageCircle,
  ThumbsUp,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBrandLogo } from "@/lib/brand-logos";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export default function PartDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const part = {
    id: id || '1',
    name: 'Premium Brake Pad Set - Front Axle',
    brand: 'Akebono',
    brandLogo: getBrandLogo('akebono'),
    partNumber: 'AKE-EUR1451',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviews: 342,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    compatibility: '2018-2023 Honda Accord',
    inStock: true,
    stockCount: 24,
    eta: '2-3 business days',
    fitVerified: true,
    warranty: '12 months',
    features: [
      'OEM Quality Construction',
      'Low Dust Formula',
      'Quiet Operation',
      'Extended Wear Life',
      'Heat Resistant'
    ],
    specifications: {
      'Material': 'Semi-Metallic',
      'Position': 'Front Axle',
      'Quantity': '4 pieces',
      'Weight': '2.1 lbs',
      'Dimensions': '11.5" x 4.2" x 0.7"'
    }
  };

  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Mike Johnson',
      rating: 5,
      date: '2024-06-15',
      title: 'Excellent quality, perfect fit',
      content: 'These brake pads are fantastic. Installation was straightforward and they fit perfectly on my 2020 Accord. No noise and great stopping power.',
      verified: true,
      helpful: 23,
      images: ['/placeholder.svg']
    },
    {
      id: '2',
      author: 'Sarah Chen',
      rating: 4,
      date: '2024-06-10',
      title: 'Good value for money',
      content: 'Quality parts at a reasonable price. Delivery was fast and packaging was secure. Would recommend.',
      verified: true,
      helpful: 15
    },
    {
      id: '3',
      author: 'David Wilson',
      rating: 5,
      date: '2024-06-05',
      title: 'Professional grade quality',
      content: 'As a mechanic, I can say these are top-notch. Great stopping power and very little dust compared to OEM.',
      verified: true,
      helpful: 31
    }
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to results
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={part.images[selectedImage]}
                alt={part.name}
                className="w-full h-96 object-cover rounded-lg bg-muted"
              />
              {part.fitVerified && (
                <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Fit Verified
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {part.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${part.name} view ${index + 1}`}
                    className="w-full h-full object-cover bg-muted"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold">{part.name}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                {part.brandLogo && (
                  <img
                    src={part.brandLogo}
                    alt={`${part.brand} logo`}
                    className="w-6 h-6 object-contain"
                  />
                )}
                <p className="text-lg text-muted-foreground">{part.brand}</p>
              </div>
              <p className="text-sm text-muted-foreground">Part #: {part.partNumber}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(part.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{part.rating}</span>
              <span className="text-muted-foreground">({part.reviews} reviews)</span>
            </div>

            {/* Compatibility */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Compatible with your vehicle</span>
                </div>
                <p className="text-muted-foreground">{part.compatibility}</p>
              </CardContent>
            </Card>

            {/* Price and Stock */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">${part.price}</span>
                {part.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${part.originalPrice}
                  </span>
                )}
                {part.originalPrice && (
                  <Badge variant="destructive">
                    Save ${(part.originalPrice - part.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">In Stock ({part.stockCount} available)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>{part.eta}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => {
                    // TODO: In a real app, this would add the item to cart state/context
                    console.log("Add to cart:", part.id, "quantity:", quantity);
                    navigate('/cart');
                  }}
                >
                  Add to Cart - ${(part.price * quantity).toFixed(2)}
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask Expert
                </Button>
              </div>
            </div>

            {/* Warranty */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{part.warranty} Warranty</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({part.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The Akebono Premium Brake Pad Set delivers exceptional stopping power and reliability for your vehicle. 
                    Manufactured to OEM specifications, these brake pads provide consistent performance and long-lasting durability.
                  </p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {part.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(part.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compatibility">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">
                        Verified Compatible
                      </span>
                    </div>
                    <p className="text-green-700 dark:text-green-300">{part.compatibility}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    This part has been verified to fit your vehicle. If you're unsure about compatibility, 
                    please contact our technical support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {/* Rating Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{part.rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(part.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{part.reviews} reviews</p>
                  </div>
                  
                  <div className="space-y-2">
                    {ratingDistribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-2">
                        <span className="text-sm w-8">{item.stars}★</span>
                        <Progress value={item.percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-10">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {review.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.author}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">{review.title}</h4>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                        
                        {review.images && (
                          <div className="flex gap-2">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-lg bg-muted"
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Button variant="ghost" size="sm" className="p-0 h-auto">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
