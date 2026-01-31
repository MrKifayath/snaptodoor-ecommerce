'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal, X, Grid3X3, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { getProductsByCategory } from '@/lib/products';
import { cn } from '@/lib/utils';

const categoryInfo: Record<string, { title: string; description: string }> = {
  electronics: {
    title: 'Electronics',
    description: 'Latest smartphones, earbuds, smartwatches, and more tech gadgets',
  },
  fashion: {
    title: 'Fashion',
    description: 'Trendy clothing, footwear, and accessories for men and women',
  },
  beauty: {
    title: 'Beauty',
    description: 'Skincare, makeup, haircare, and beauty essentials',
  },
  'personal-care': {
    title: 'Personal Care',
    description: 'Oral care, body care, grooming products, and more',
  },
};

const priceRanges = [
  { label: 'Under Rs. 500', min: 0, max: 500 },
  { label: 'Rs. 500 - Rs. 1000', min: 500, max: 1000 },
  { label: 'Rs. 1000 - Rs. 2000', min: 1000, max: 2000 },
  { label: 'Rs. 2000 - Rs. 5000', min: 2000, max: 5000 },
  { label: 'Rs. 5000 - Rs. 10000', min: 5000, max: 10000 },
];

const ratings = [4, 3, 2, 1];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const searchParams = useSearchParams();
  const subCategory = searchParams.get('sub');

  const [sortBy, setSortBy] = useState('popular');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const info = categoryInfo[slug] || { title: 'Products', description: '' };
  const categoryProducts = getProductsByCategory(slug);

  // Get unique brands for this category
  const brands = useMemo(() => {
    const brandSet = new Set(categoryProducts.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, [categoryProducts]);

  // Get unique subcategories
  const subcategories = useMemo(() => {
    const subSet = new Set(categoryProducts.map((p) => p.subcategory));
    return Array.from(subSet).sort();
  }, [categoryProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Filter by subcategory if specified
    if (subCategory) {
      filtered = filtered.filter((p) => p.subcategory === subCategory);
    }

    // Filter by price
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) =>
        selectedPriceRanges.some((index) => {
          const range = priceRanges[index];
          return p.price >= range.min && p.price <= range.max;
        })
      );
    }

    // Filter by rating
    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [categoryProducts, subCategory, selectedPriceRanges, selectedRating, selectedBrands, sortBy]);

  const clearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedRating(null);
    setSelectedBrands([]);
  };

  const hasFilters = selectedPriceRanges.length > 0 || selectedRating !== null || selectedBrands.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={range.label} className="flex items-center gap-2">
              <Checkbox
                id={`price-${index}`}
                checked={selectedPriceRanges.includes(index)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedPriceRanges([...selectedPriceRanges, index]);
                  } else {
                    setSelectedPriceRanges(selectedPriceRanges.filter((i) => i !== index));
                  }
                }}
              />
              <Label htmlFor={`price-${index}`} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={(checked) => {
                  setSelectedRating(checked ? rating : null);
                }}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                {rating}+ Stars & above
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{info.title}</span>
            {subCategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground capitalize">{subCategory.replace(/-/g, ' ')}</span>
              </>
            )}
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{info.title}</h1>
            <p className="text-muted-foreground">{info.description}</p>
          </div>

          {/* Subcategories */}
          {subcategories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <Link href={`/category/${slug}`}>
                <Button variant={!subCategory ? 'default' : 'outline'} size="sm">
                  All
                </Button>
              </Link>
              {subcategories.map((sub) => (
                <Link key={sub} href={`/category/${slug}?sub=${sub}`}>
                  <Button variant={subCategory === sub ? 'default' : 'outline'} size="sm" className="capitalize">
                    {sub.replace(/-/g, ' ')}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 border rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  {hasFilters && (
                    <button type="button" onClick={clearFilters} className="text-sm text-primary hover:underline">
                      Clear
                    </button>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden gap-2 bg-transparent">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {hasFilters && (
                          <span className="bg-primary text-primary-foreground px-1.5 rounded-full text-xs">
                            {selectedPriceRanges.length + (selectedRating ? 1 : 0) + selectedBrands.length}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Grid Toggle */}
                  <div className="hidden md:flex items-center border rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn('h-8 w-8', gridCols === 2 && 'bg-secondary')}
                      onClick={() => setGridCols(2)}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn('h-8 w-8', gridCols === 3 && 'bg-secondary')}
                      onClick={() => setGridCols(3)}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn('h-8 w-8', gridCols === 4 && 'bg-secondary')}
                      onClick={() => setGridCols(4)}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {hasFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {selectedPriceRanges.map((index) => (
                    <Button
                      key={`price-${index}`}
                      variant="secondary"
                      size="sm"
                      className="gap-1"
                      onClick={() => setSelectedPriceRanges(selectedPriceRanges.filter((i) => i !== index))}
                    >
                      {priceRanges[index].label}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                  {selectedRating && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-1"
                      onClick={() => setSelectedRating(null)}
                    >
                      {selectedRating}+ Stars
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  {selectedBrands.map((brand) => (
                    <Button
                      key={brand}
                      variant="secondary"
                      size="sm"
                      className="gap-1"
                      onClick={() => setSelectedBrands(selectedBrands.filter((b) => b !== brand))}
                    >
                      {brand}
                      <X className="h-3 w-3" />
                    </Button>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div
                  className={cn(
                    'grid gap-4 md:gap-6',
                    gridCols === 2 && 'grid-cols-2',
                    gridCols === 3 && 'grid-cols-2 md:grid-cols-3',
                    gridCols === 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  )}
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
