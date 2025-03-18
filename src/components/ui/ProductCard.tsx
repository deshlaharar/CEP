
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';

export interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  slug: string;
  price: number;
  discountPrice?: number;
  artistName: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
}

const ProductCard = ({
  name,
  image,
  slug,
  price,
  discountPrice,
  artistName,
  rating,
  reviewCount,
  category,
  isNew,
  isTrending
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
  
  const formattedDiscountPrice = discountPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(discountPrice)
    : null;
  
  const discount = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;
  
  return (
    <div className="card-hover group">
      <div
        className="relative overflow-hidden rounded-lg bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <Link to={`/product/${slug}`} className="block">
          <div className="aspect-[3/4] w-full relative">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isNew && (
                <span className="bg-hunar-olive text-white text-xs font-medium py-1 px-2 rounded">
                  New
                </span>
              )}
              {isTrending && (
                <span className="bg-hunar-terracotta text-white text-xs font-medium py-1 px-2 rounded">
                  Trending
                </span>
              )}
              {discount && (
                <span className="bg-hunar-clay text-white text-xs font-medium py-1 px-2 rounded">
                  {discount}% OFF
                </span>
              )}
            </div>
            
            {/* Quick actions */}
            <div
              className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-hunar-sand transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                }}
              >
                <Heart
                  size={16}
                  className={isFavorite ? "fill-hunar-terracotta text-hunar-terracotta" : "text-hunar-earth"}
                />
              </button>
              <button
                aria-label="Add to cart"
                className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-hunar-sand transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <ShoppingBag size={16} className="text-hunar-earth" />
              </button>
            </div>
          </div>
        </Link>
        
        {/* Info */}
        <div className="p-4">
          <Link to={`/category/${category.toLowerCase()}`} className="text-xs text-hunar-terracotta hover:underline">
            {category}
          </Link>
          <Link to={`/product/${slug}`} className="block mt-1">
            <h3 className="font-serif text-lg font-medium text-hunar-earth line-clamp-1">
              {name}
            </h3>
          </Link>
          <Link to={`/artist/${artistName.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-foreground/70 hover:text-hunar-terracotta transition-colors">
            by {artistName}
          </Link>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-foreground/70 ml-1">
              ({reviewCount})
            </span>
          </div>
          
          {/* Price */}
          <div className="mt-2 flex items-end gap-2">
            <span className={`font-medium ${discountPrice ? 'text-hunar-terracotta' : 'text-hunar-earth'}`}>
              {formattedDiscountPrice || formattedPrice}
            </span>
            {formattedDiscountPrice && (
              <span className="text-foreground/70 text-sm line-through">
                {formattedPrice}
              </span>
            )}
          </div>
          
          {/* Add to cart button (mobile) */}
          <div className="mt-3 md:hidden">
            <button className="btn-primary w-full text-sm py-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
