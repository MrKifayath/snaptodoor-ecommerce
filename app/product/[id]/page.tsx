'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Check,
  Minus,
  Plus,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { ComingSoonModal } from '@/components/coming-soon-modal';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/hooks/use-toast';
import { getProductById, getProductsByCategory, type Product } from '@/lib/products';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();

  // Show modal immediately if product is coming soon
  useEffect(() => {
    if (product?.comingSoon) {
      setShowComingSoonModal(true);
    }
  }, [product?.comingSoon]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link href="/">
              <Button>Go to Homepage</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.comingSoon) {
      setShowComingSoonModal(true);
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (product.comingSoon) {
      setShowComingSoonModal(true);
      return;
    }
    
    handleAddToCart();
    window.location.href = '/checkout';
  };

  const handleWishlist = () => {
    if (product.comingSoon) {
      setShowComingSoonModal(true);
      return;
    }
    
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/category/${product.category}`} className="hover:text-foreground transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className={cn(
                    "object-cover",
                    product.comingSoon && "opacity-60 blur-sm"
                  )}
                  priority
                />
                
                {/* Coming Soon Overlay */}
                {product.comingSoon && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center px-4"
                    >
                      <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 mb-3">
                        <Clock className="h-8 w-8 animate-pulse" />
                        <span className="font-bold text-2xl">COMING SOON</span>
                      </div>
                      <p className="text-white text-lg font-medium">This product will be available soon!</p>
                    </motion.div>
                  </div>
                )}
                
                {discount > 0 && !product.comingSoon && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                    -{discount}% OFF
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="mb-4">
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">{product.brand}</p>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

                {product.comingSoon && (
                  <div className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-primary font-medium flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      This product is coming soon! Get notified when it's available.
                    </p>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                    <span>{product.rating}</span>
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-muted-foreground">
                    {product.reviews.toLocaleString()} Reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold">Rs. {product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-green-600 font-medium">
                        Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Features */}
                {product.features && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Key Features:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity Selector - Hidden for coming soon */}
                {!product.comingSoon && (
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {product.comingSoon ? (
                    <Button
                      size="lg"
                      className="flex-1 gap-2"
                      onClick={() => setShowComingSoonModal(true)}
                    >
                      <Clock className="h-5 w-5" />
                      Get Notified
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="flex-1 gap-2"
                        onClick={handleAddToCart}
                        disabled={isInCart(product.id)}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                      </Button>
                      <Button size="lg" variant="secondary" className="flex-1" onClick={handleBuyNow}>
                        Buy Now
                      </Button>
                    </>
                  )}
                </div>

                {/* Wishlist & Share */}
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent"
                    onClick={handleWishlist}
                  >
                    <Heart className={cn('h-4 w-4', isWishlisted && 'fill-destructive text-destructive')} />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Delivery Info */}
                {!product.comingSoon && (
                  <div className="border rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Free Delivery</p>
                        <p className="text-sm text-muted-foreground">On orders above Rs. 499</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">7 Days Return</p>
                        <p className="text-sm text-muted-foreground">Easy return policy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-sm text-muted-foreground">100% secure checkout</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  {product.features && (
                    <>
                      <h3>Key Features</h3>
                      <ul>
                        {product.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium capitalize">{product.category.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Subcategory</span>
                      <span className="font-medium capitalize">{product.subcategory.replace(/-/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">In Stock</span>
                      <span className={cn(
                        "font-medium",
                        product.comingSoon ? "text-orange-600" : "text-green-600"
                      )}>
                        {product.comingSoon ? "Coming Soon" : "Yes"}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    {product.reviews.toLocaleString()} customers have reviewed this product
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1 text-2xl">
                      <span className="font-bold">{product.rating}</span>
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-muted-foreground">out of 5</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      
      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        productName={product.name}
      />
    </>
  );
}
