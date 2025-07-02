# GearNest - Vehicle Parts Marketplace

A modern, responsive vehicle parts marketplace built with React, TypeScript, and TailwindCSS. GearNest provides a comprehensive platform for browsing, searching, and purchasing automotive parts with features like vehicle compatibility checking, expert mechanic chat, and order tracking.

## 🚗 Features

### Core Marketplace
- **🏠 Home Page** - Hero section with featured products and categories
- **🔧 Compatible Parts** - Vehicle-specific part search with compatibility verification
- **📄 Part Details** - Detailed product pages with specifications and reviews
- **🛒 Shopping Cart** - Full cart management with order summary and checkout
- **🏪 Brands** - Browse parts by manufacturer with authentic brand logos
- **💰 Deals** - Flash sales, bulk discounts, and seasonal offers
- **📂 Categories** - Organized part categories (Engine, Brakes, Electrical, etc.)

### User Experience
- **👤 Profile & Saved Items** - User accounts with wishlist functionality
- **💬 Mechanic Chat** - Expert consultation and support
- **📦 Order Tracker** - Real-time order status and delivery tracking
- **🆘 Support Center** - Help resources and customer service

### Design & Technology
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile
- **🌙 Dark/Light Mode** - Theme toggle with system preference detection
- **🎨 Modern UI** - Clean design with Radix UI components
- **🔍 Search & Filters** - Advanced filtering by brand, price, category
- **⚡ Performance** - Fast loading with optimized assets

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router 6 (SPA mode)
- **Styling**: TailwindCSS 3 + Radix UI
- **Icons**: Lucide React + Simple Icons (brand logos)
- **Backend**: Express.js server
- **Development**: Hot reload, TypeScript validation

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   ```
   http://localhost:8080
   ```

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero and featured products |
| Parts Search | `/parts` | Compatible parts for specific vehicles |
| Part Details | `/part/:id` | Individual product information |
| Shopping Cart | `/cart` | Cart management and checkout |
| Brands | `/brands` | Browse by manufacturer |
| Categories | `/categories` | Browse by part type |
| Deals | `/deals` | Special offers and discounts |
| Profile | `/profile` | User account and saved items |
| Orders | `/orders` | Order tracking and history |
| Support | `/support` | Help center and customer service |
| Mechanic Chat | `/chat` | Expert consultation |

## 🎨 Brand Integration

The marketplace features authentic automotive brand logos from [Simple Icons](https://simpleicons.org/), including:

- **OEM Brands**: Honda, Toyota, BMW, Ford, Chevrolet, Nissan, Mercedes, Audi, Volkswagen
- **Parts Manufacturers**: Bosch, Denso, NGK, Akebono, Brembo, K&N, Philips, Monroe
- **Fluids & Chemicals**: Mobil, Castrol, Valvoline
- **Tires**: Michelin, and more

## 🛒 Shopping Experience

### Cart Features
- Add/remove items with quantity management
- Real-time price calculations with tax and shipping
- Promo code system (try "SAVE10" for 10% off)
- Stock validation and availability checking
- Recommended products based on cart contents

### Product Features
- Vehicle compatibility verification
- Customer reviews and ratings
- Detailed specifications and fitment guides
- High-quality product images
- Expert installation tips

## 📱 Mobile Experience

GearNest is fully responsive with:
- Mobile-optimized navigation menu
- Touch-friendly interface elements
- Compressed layouts for small screens
- Fast loading on mobile networks

## 🔧 Development

### Available Scripts
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run typecheck  # TypeScript validation
npm test          # Run tests
```

### Project Structure
```
client/
├── pages/           # Route components
├── components/      # Reusable UI components
├── lib/            # Utilities (brand logos, etc.)
└── hooks/          # Custom React hooks

server/
├── routes/         # API endpoints
└── index.ts        # Server configuration
```

## 🌟 Key Features in Detail

### Vehicle Compatibility
- VIN lookup for exact part matching
- Year/make/model filtering
- Verified fitment badges
- Installation difficulty indicators

### Expert Support
- Live chat with certified mechanics
- Installation guides and tutorials
- Technical support for complex parts
- Warranty and return assistance

### Order Management
- Real-time order tracking
- Multiple shipping options
- Order history and receipts
- Easy returns and exchanges

## 📄 License

This project is built for demonstration purposes as a modern vehicle parts marketplace prototype.

---

**GearNest** - Your trusted source for quality automotive parts 🚗✨
