'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/products';
import { cn } from '@/lib/utils';
import { ComingSoonModal } from '@/components/coming-soon-modal';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();

  const [discount, setDiscount] = useState(0);

  React.useEffect(() => {
    if (product.originalPrice) {
      setDiscount(Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100));
    }
  }, [product.originalPrice, product.price]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.comingSoon) {
      setShowComingSoonModal(true);
      return;
    }
    
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const handleCardClick = (e: React.MouseEvent) => {
    if (product.comingSoon) {
      e.preventDefault();
      setShowComingSoonModal(true);
    }
  };

  const CardContent = (
    <div
      className="group bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            product.comingSoon && "opacity-60 blur-[2px]"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Coming Soon Overlay */}
        {product.comingSoon && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center px-4"
            >
              <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-lg">COMING SOON</span>
              </div>
              <p className="text-white text-sm font-medium">Click to get notified</p>
            </motion.div>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && !product.comingSoon && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}

        {/* Quick Actions */}
        {!product.comingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-3 right-3 flex flex-col gap-2"
          >
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md"
              onClick={handleWishlist}
            >
              <Heart className={cn('h-4 w-4', isWishlisted && 'fill-destructive text-destructive')} />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md">
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Add to Cart Button */}
        {!product.comingSoon && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-3"
          >
            <Button
              className="w-full gap-2"
              onClick={handleAddToCart}
              disabled={isInCart(product.id)}
            >
              <ShoppingCart className="h-4 w-4" />
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className={cn(
          "font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors",
          product.comingSoon && "text-muted-foreground"
        )}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
            <span>{product.rating}</span>
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-bold text-lg",
            product.comingSoon && "text-muted-foreground"
          )}>
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        {product.comingSoon ? (
          <div className="cursor-pointer">{CardContent}</div>
        ) : (
          <Link href={`/product/${product.id}`}>{CardContent}</Link>
        )}
      </motion.div>

      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        productName={product.name}
      />
    </>
  );
}
