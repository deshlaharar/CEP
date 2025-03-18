
import ProductCard, { ProductCardProps } from "@/components/ui/ProductCard";
import { Menu, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CategoryProductsGridProps {
  products: ProductCardProps[];
  isLoading: boolean;
}

const CategoryProductsGrid = ({ products, isLoading }: CategoryProductsGridProps) => {
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      const aPrice = a.discountPrice || a.price;
      const bPrice = b.discountPrice || b.price;
      return aPrice - bPrice;
    } else if (sortBy === "price-high") {
      const aPrice = a.discountPrice || a.price;
      const bPrice = b.discountPrice || b.price;
      return bPrice - aPrice;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    // Default: featured or newest
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="w-full md:w-auto">
          <p className="text-sm text-hunar-earth/70">
            {isLoading ? (
              "Loading products..."
            ) : (
              `Showing ${sortedProducts.length} products`
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          {/* Search - Hidden on Mobile, Visible on Tablet/Desktop */}
          <div className="relative hidden md:block w-60">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-hunar-earth/50" size={18} />
            <Input
              placeholder="Search products..."
              className="pl-9 bg-white border-hunar-sand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-44 bg-white border-hunar-sand">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filters Button */}
          <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="md:hidden bg-white border-hunar-sand flex gap-2 w-full"
              >
                <SlidersHorizontal size={18} />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-serif text-hunar-earth">Filter Products</DialogTitle>
              </DialogHeader>
              <div className="pt-4">
                {/* Mobile Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-hunar-earth/50" size={18} />
                  <Input
                    placeholder="Search products..."
                    className="pl-9 bg-white border-hunar-sand"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Mobile filters would go here */}
                <div className="space-y-4">
                  <p className="text-center text-hunar-earth/70">
                    Mobile filters would be displayed here
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="aspect-[3/4] w-full bg-hunar-sand/50 rounded-md mb-4"></div>
              <div className="h-4 bg-hunar-sand/50 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-hunar-sand/50 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-hunar-sand/50 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg">
          <h3 className="text-xl font-serif text-hunar-earth mb-2">No products found</h3>
          <p className="text-hunar-earth/70">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsGrid;
