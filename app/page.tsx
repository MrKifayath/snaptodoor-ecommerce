'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Shirt,
  Sparkles,
  Heart,
  Zap,
  Timer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getDealsOfTheDay,
  getProductsByCategory,
} from '@/lib/products';

const heroSlides = [
  {
    title: 'New Season Electronics',
    subtitle: 'Up to 40% Off on Latest Gadgets',
    cta: 'Shop Electronics',
    href: '/category/electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop',
    color: 'from-slate-900/90 to-slate-900/40',
  },
  {
    title: 'Fashion Forward',
    subtitle: 'Trending Styles for Every Occasion',
    cta: 'Explore Fashion',
    href: '/category/fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    color: 'from-stone-900/90 to-stone-900/40',
  },
  {
    title: 'Beauty Essentials',
    subtitle: 'Skincare & Makeup Must-Haves',
    cta: 'Shop Beauty',
    href: '/category/beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop',
    color: 'from-rose-900/90 to-rose-900/40',
  },
];

const categories = [
  { name: 'Electronics', icon: Smartphone, href: '/category/electronics', color: 'bg-blue-50 text-blue-600' },
  { name: 'Fashion', icon: Shirt, href: '/category/fashion', color: 'bg-pink-50 text-pink-600' },
  { name: 'Beauty', icon: Sparkles, href: '/category/beauty', color: 'bg-purple-50 text-purple-600' },
  { name: 'Personal Care', icon: Heart, href: '/category/personal-care', color: 'bg-green-50 text-green-600' },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders above Rs. 499' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
  { icon: RefreshCw, title: 'Easy Returns', description: '7-day return policy' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated customer care' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const dealsOfTheDay = getDealsOfTheDay();
  const electronicsProducts = getProductsByCategory('electronics').slice(0, 4);
  const fashionProducts = getProductsByCategory('fashion').slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: currentSlide === index ? 0 : 30, opacity: currentSlide === index ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-xl text-white"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-white/90">{slide.subtitle}</p>
                    <Link href={slide.href}>
                      <Button size="lg" className="gap-2 group">
                        {slide.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Slide Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                type="button"
                key={`slide-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>

        {/* Features Bar */}
        <section className="bg-secondary py-6 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
              <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={category.href}>
                    <div className="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 text-center">
                      <div className={`w-16 h-16 mx-auto rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deals of the Day */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <Zap className="h-6 w-6 text-accent" />
                  Deals of the Day
                </h2>
                <p className="text-muted-foreground">Grab before it&apos;s gone!</p>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-destructive" />
                <span className="text-sm">Ends in:</span>
                <div className="flex items-center gap-1">
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-mono font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-mono font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span>:</span>
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-mono font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {dealsOfTheDay.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Link href="/products" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop"
                  alt="Electronics Sale"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-2 text-white/80">Limited Time Offer</p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Electronics Sale</h3>
                    <Link href="/category/electronics">
                      <Button variant="secondary" className="gap-2 group/btn">
                        Shop Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop"
                  alt="Fashion Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-2 text-white/80">New Arrivals</p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Fashion Collection</h3>
                    <Link href="/category/fashion">
                      <Button variant="secondary" className="gap-2 group/btn">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
              <Link href="/new-arrivals" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Best Sellers</h2>
              <Link href="/best-sellers" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {bestSellers.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Brands Trust */}
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-center mb-8 text-muted-foreground">Trusted by Leading Brands</h2>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
              {['Samsung', 'Nike', 'Sony', 'Adidas', 'L\'Oreal', 'Philips', 'Puma', 'Maybelline'].map((brand) => (
                <span key={brand} className="text-lg md:text-xl font-bold text-foreground/70">{brand}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
