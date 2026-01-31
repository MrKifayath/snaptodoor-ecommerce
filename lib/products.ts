import productsData from '../all-products.json';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  brand: string;
  features?: string[];
  specifications?: Record<string, string>;
  comingSoon?: boolean;
}

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: 'smartphone' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt' },
  { id: 'beauty', name: 'Beauty', icon: 'sparkles' },
  { id: 'personal-care', name: 'Personal Care', icon: 'heart' },
];

// Products that are coming soon (no images available yet)
const comingSoonProductIds = [
  'fa-031', // PUMA Unisex Smashic Sneakers
  'fa-032', // PUMA Flyer Lite 3 Running Shoes
  'fa-033', // PUMA Unisex Casual Backpack
  'fa-034', // Adidas Cushioned Crew Socks - 3 Pack
  'fa-035', // American Tourister Small Duffle Bag
  'fa-036', // Levi's Men's Regular Fit Denim Jacket
  'fa-037', // Allen Solly Men's Formal Shirt
  'fa-038', // Louis Philippe Men's Polo T-Shirt
  'fa-039', // Peter England Slim Fit Chinos
  'fa-040', // Nike Dri-FIT Training T-Shirt
  'fa-048', // Reebok Classic Leather Sneakers
];

// Load products from JSON file and mark coming soon products
export const products: Product[] = (productsData as Product[]).map(product => ({
  ...product,
  comingSoon: comingSoonProductIds.includes(product.id),
}));

// Helper functions
export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return products.filter((p) => p.subcategory === subcategory);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return products
    .filter((p) => p.rating >= 4.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getNewArrivals(limit: number = 8): Product[] {
  return products.slice(0, limit);
}

export function getBestSellers(limit: number = 8): Product[] {
  return products
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
}

export function getDealsOfTheDay(limit: number = 8): Product[] {
  return products
    .filter((p) => p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => {
      const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
      const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
      return discountB - discountA;
    })
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}
