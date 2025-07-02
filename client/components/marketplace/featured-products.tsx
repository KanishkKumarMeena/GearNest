import { ProductCard } from "./product-card";
import { getBrandLogo } from "@/lib/brand-logos";

const featuredProducts = [
  {
    id: "1",
    name: "Premium Brake Pad Set - Front",
    brand: "Akebono",
    brandLogo: getBrandLogo("akebono"),
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg",
    deliveryTime: "2–3 days",
    rating: 4.8,
    reviewCount: 156,
    compatibility: ["Honda Civic", "Honda Accord", "Acura TSX"],
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "High-Performance Air Filter",
    brand: "K&N",
    brandLogo: getBrandLogo("k&n"),
    price: 34.99,
    image: "/placeholder.svg",
    deliveryTime: "1–2 days",
    rating: 4.6,
    reviewCount: 89,
    compatibility: ["Toyota Camry", "Toyota Corolla"],
    isFeatured: true,
  },
  {
    id: "3",
    name: "LED Headlight Conversion Kit",
    brand: "Philips",
    brandLogo: getBrandLogo("philips"),
    price: 159.99,
    originalPrice: 199.99,
    image: "/placeholder.svg",
    deliveryTime: "3–5 days",
    rating: 4.9,
    reviewCount: 203,
    compatibility: ["Ford F-150", "Ford Explorer"],
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Synthetic Motor Oil 5W-30",
    brand: "Mobil",
    brandLogo: getBrandLogo("mobil"),
    price: 24.99,
    image: "/placeholder.svg",
    deliveryTime: "1–2 days",
    rating: 4.7,
    reviewCount: 124,
    compatibility: ["Universal", "Most Vehicles"],
    isFeatured: true,
  },
  {
    id: "5",
    name: "Performance Cold Air Intake",
    price: 249.99,
    image: "/placeholder.svg",
    deliveryTime: "3–5 days",
    rating: 4.5,
    reviewCount: 67,
    compatibility: ["BMW 3 Series", "BMW 5 Series"],
    isFeatured: true,
  },
  {
    id: "6",
    name: "Heavy Duty Shock Absorbers",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg",
    deliveryTime: "2–4 days",
    rating: 4.8,
    reviewCount: 91,
    compatibility: ["Chevrolet Silverado", "GMC Sierra"],
    isOnSale: true,
    isFeatured: true,
  },
];

export function FeaturedProducts() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Featured Parts
        </h2>
        <p className="text-muted-foreground">
          Top-rated parts trusted by mechanics and enthusiasts
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
