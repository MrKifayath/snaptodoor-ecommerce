'use client';

import React from "react"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Smartphone,
  Shirt,
  Sparkles,
  Heart,
  Headphones,
  Watch,
  Camera,
  Speaker,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

const categories = [
  {
    name: 'Electronics',
    href: '/category/electronics',
    icon: Smartphone,
    subcategories: [
      { name: 'All Electronics', href: '/category/electronics' },
      { name: 'Earbuds & Headphones', href: '/category/electronics?sub=earbuds' },
      { name: 'Smartwatches', href: '/category/electronics?sub=smartwatches' },
      { name: 'Speakers', href: '/category/electronics?sub=speakers' },
      { name: 'Power Banks', href: '/category/electronics?sub=powerbanks' },
    ],
  },
  {
    name: 'Fashion',
    href: '/category/fashion',
    icon: Shirt,
    subcategories: [
      { name: 'All Fashion', href: '/category/fashion' },
      { name: "Men's T-Shirts", href: '/category/fashion?sub=mens-tshirts' },
      { name: "Men's Shirts", href: '/category/fashion?sub=mens-shirts' },
      { name: "Men's Jeans", href: '/category/fashion?sub=mens-jeans' },
      { name: "Men's Jackets", href: '/category/fashion?sub=mens-jackets' },
      { name: "Men's Trousers", href: '/category/fashion?sub=mens-trousers' },
      { name: "Men's Shorts", href: '/category/fashion?sub=mens-shorts' },
      { name: "Women's Dresses", href: '/category/fashion?sub=womens-dresses' },
      { name: "Women's Tops", href: '/category/fashion?sub=womens-tops' },
      { name: "Women's Kurtis", href: '/category/fashion?sub=womens-kurtis' },
      { name: "Men's Footwear", href: '/category/fashion?sub=mens-footwear' },
      { name: "Women's Footwear", href: '/category/fashion?sub=womens-footwear' },
      { name: 'Bags', href: '/category/fashion?sub=bags' },
      { name: 'Accessories', href: '/category/fashion?sub=accessories' },
    ],
  },
  {
    name: 'Beauty',
    href: '/category/beauty',
    icon: Sparkles,
    subcategories: [
      { name: 'All Beauty', href: '/category/beauty' },
      { name: 'Moisturizers', href: '/category/beauty?sub=moisturizers' },
      { name: 'Cleansers', href: '/category/beauty?sub=cleansers' },
      { name: 'Sunscreen', href: '/category/beauty?sub=sunscreen' },
      { name: 'Serums', href: '/category/beauty?sub=serums' },
      { name: 'Lipsticks', href: '/category/beauty?sub=lipsticks' },
      { name: 'Shampoos', href: '/category/beauty?sub=shampoos' },
    ],
  },
  {
    name: 'Personal Care',
    href: '/category/personal-care',
    icon: Heart,
    subcategories: [
      { name: 'All Personal Care', href: '/category/personal-care' },
      { name: "Men's Grooming", href: '/category/personal-care?sub=mens-grooming' },
      { name: 'Perfumes', href: '/category/personal-care?sub=perfumes' },
    ],
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-background'
        )}
      >
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 text-white text-xs py-2 text-center font-medium">
          <p>Free Shipping on orders above Rs. 499 | COD Available | Easy Returns</p>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo/logo.png"
                alt="SnapToDoor"
                width={880}
                height={203}
                className="h-42 md:h-54 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/products"
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  'hover:bg-secondary',
                  pathname === '/products' && 'bg-secondary'
                )}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    href={category.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      'hover:bg-secondary',
                      pathname.includes(category.href.split('/').pop() || '') && 'bg-secondary'
                    )}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                    <ChevronDown className={cn(
                      'h-4 w-4 transition-transform',
                      activeCategory === category.name && 'rotate-180'
                    )} />
                  </Link>

                  <AnimatePresence>
                    {activeCategory === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-card rounded-lg shadow-lg border p-2"
                      >
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-10 bg-secondary border-0"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Account</span>
                </Button>
              </Link>

              <Link href="/cart" className="relative">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden md:inline">Cart</span>
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <form onSubmit={handleSearch} className="pb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 h-10 bg-secondary border-0"
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo/logo.png"
                      alt="SnapToDoor"
                      width={825}
                      height={190}
                      className="h-[150px] w-auto"
                    />
                  </Link>
                  <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/products"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium">All Products</span>
                  </Link>
                  {categories.map((category) => (
                    <div key={category.name}>
                      <Link
                        href={category.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <category.icon className="h-5 w-5" />
                        <span className="font-medium">{category.name}</span>
                      </Link>
                      <div className="ml-12 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-6 pt-6 space-y-2">
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Login / Sign Up</span>
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart ({totalItems})</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-24 lg:h-28" />
    </>
  );
}
