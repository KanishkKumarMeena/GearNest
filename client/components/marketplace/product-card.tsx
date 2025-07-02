import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  brandLogo?: string;
  price: number;
  originalPrice?: number;
  image: string;
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  compatibility: string[];
  isOnSale?: boolean;
  isFeatured?: boolean;
}

export function ProductCard({
  id,
  name,
  brand,
  brandLogo,
  price,
  originalPrice,
  image,
  deliveryTime,
  rating,
  reviewCount,
  compatibility,
  isOnSale = false,
  isFeatured = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // TODO: In a real app, this would add the item to cart state/context
    console.log("Add to cart:", id);
    // Navigate to cart page after adding item
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  const handleViewDetails = () => {
    // Navigate to product details page
    navigate(`/part/${id}`);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-2 hover:border-primary/20 bg-card/60 backdrop-blur-sm hover:bg-card/80">
      {isOnSale && (
        <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground">
          Sale
        </Badge>
      )}
      {isFeatured && (
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground"
        >
          Featured
        </Badge>
      )}

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/60 backdrop-blur-sm hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 bg-background/60 backdrop-blur-sm hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleViewDetails}
        >
          <Eye className="h-4 w-4 text-foreground" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          {brand && (
            <div className="flex items-center gap-2 mt-1">
              {brandLogo && (
                <img
                  src={brandLogo}
                  alt={`${brand} logo`}
                  className="w-4 h-4 object-contain"
                />
              )}
              <span className="text-sm text-muted-foreground">{brand}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount})</span>
        </div>

        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-1">
            Compatible with:
          </div>
          <div className="flex flex-wrap gap-1">
            {compatibility.slice(0, 2).map((comp, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {comp}
              </Badge>
            ))}
            {compatibility.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{compatibility.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{deliveryTime}</div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
