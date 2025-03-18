
import { useState } from 'react';
import { Heart, Share2, Truck, ShieldCheck, Star, HelpCircle, ShoppingBag, BarChart3 } from 'lucide-react';
import { ProductCardProps } from '../ui/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface ProductInfoProps {
  product: ProductCardProps;
  details: any;
}

const ProductInfo = ({ product, details }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);
  
  const formattedDiscountPrice = product.discountPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(product.discountPrice)
    : null;
  
  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: "You'll be redirected to the checkout page shortly",
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: isFavorite 
        ? `${product.name} has been removed from your wishlist` 
        : `${product.name} has been added to your wishlist`,
    });
  };

  const handleShareProduct = () => {
    // In a real app, this would open a share dialog or copy the URL
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this product with others",
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif text-hunar-earth">{product.name}</h1>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-hunar-earth/70 ml-2">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
        
        <div className="mt-1 text-sm">
          <span className="text-hunar-earth/70">
            Handcrafted by{' '}
            <a href="#" className="text-hunar-terracotta hover:underline">
              {product.artistName}
            </a>
          </span>
        </div>
      </div>
      
      {/* Price */}
      <div className="flex items-end gap-2">
        <span className={`text-2xl font-medium ${product.discountPrice ? 'text-hunar-terracotta' : 'text-hunar-earth'}`}>
          {formattedDiscountPrice || formattedPrice}
        </span>
        {formattedDiscountPrice && (
          <>
            <span className="text-hunar-earth/70 text-lg line-through">
              {formattedPrice}
            </span>
            <span className="bg-hunar-clay text-white text-xs font-medium py-1 px-2 rounded">
              {discount}% OFF
            </span>
          </>
        )}
      </div>
      
      {/* Quick Description */}
      <p className="text-hunar-earth/80">
        {typeof details.description === 'string' ? details.description.slice(0, 200) : ''}...
      </p>
      
      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {Object.entries(details.dimensions || {}).map(([key, value]) => (
          <div key={key} className="p-3 bg-hunar-cream rounded-lg">
            <p className="text-xs text-hunar-earth/60 uppercase">{key}</p>
            <p className="text-sm font-medium text-hunar-earth">{String(value)}</p>
          </div>
        ))}
      </div>
      
      {/* Quantity */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-hunar-earth mr-3">Quantity</span>
          <div className="flex items-center">
            <button
              className="w-8 h-8 flex items-center justify-center border border-hunar-sand rounded-l-md bg-white text-hunar-earth hover:bg-hunar-sand/20"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-10 h-8 flex items-center justify-center border-t border-b border-hunar-sand bg-white">
              {quantity}
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center border border-hunar-sand rounded-r-md bg-white text-hunar-earth hover:bg-hunar-sand/20"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="text-sm text-hunar-earth/70">
          <span className="font-medium text-hunar-terracotta">Only 8 left in stock</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="bg-white border-hunar-terracotta text-hunar-terracotta hover:bg-hunar-terracotta hover:text-white h-12"
          onClick={handleAddToCart}
        >
          <ShoppingBag size={18} className="mr-2" />
          Add to Cart
        </Button>
        <Button
          className="bg-hunar-terracotta text-white hover:bg-hunar-earth h-12"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
      
      {/* Wishlist and Share */}
      <div className="flex space-x-4">
        <button
          className="flex items-center text-hunar-earth hover:text-hunar-terracotta"
          onClick={handleToggleFavorite}
        >
          <Heart
            size={20}
            className={isFavorite ? "fill-hunar-terracotta text-hunar-terracotta mr-2" : "mr-2"}
          />
          <span className="text-sm">Add to Wishlist</span>
        </button>
        <button
          className="flex items-center text-hunar-earth hover:text-hunar-terracotta"
          onClick={handleShareProduct}
        >
          <Share2 size={20} className="mr-2" />
          <span className="text-sm">Share</span>
        </button>
      </div>
      
      {/* Shipping & Returns */}
      <div className="border-t border-b border-hunar-sand py-4 space-y-3">
        <div className="flex items-start">
          <Truck size={18} className="text-hunar-terracotta mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-hunar-earth">
              Free shipping on orders over ₹1000
            </p>
            <p className="text-xs text-hunar-earth/70">
              Estimated delivery: {details.shipping?.estimatedDelivery || 'Not available'}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <ShieldCheck size={18} className="text-hunar-terracotta mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-hunar-earth">
              Returns & Exchanges
            </p>
            <p className="text-xs text-hunar-earth/70">
              {details.shipping?.returnPolicy || 'Standard return policy applies'}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <BarChart3 size={18} className="text-hunar-terracotta mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-hunar-earth">
              Product Authenticity
            </p>
            <p className="text-xs text-hunar-earth/70">
              100% handcrafted by verified artisans
            </p>
          </div>
        </div>
      </div>
      
      {/* Additional Info */}
      <div className="text-sm text-hunar-earth/70 flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center hover:text-hunar-terracotta">
              <HelpCircle size={16} className="mr-1.5" />
              Need help with this product?
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Have questions about this product? Contact our customer support team for assistance.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductInfo;
