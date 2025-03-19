
import { ArrowRight } from 'lucide-react';
import ProductCard, { ProductCardProps } from '../ui/ProductCard';
import { Link } from 'react-router-dom';

const trendingProducts: ProductCardProps[] = [
  {
    id: 5,
    name: 'Handmade Leather Journal',
    slug: 'handmade-leather-journal',
    image: '',
    price: 1200,
    artistName: 'Vikram Singh',
    rating: 4.6,
    reviewCount: 29,
    category: 'Accessories',
    isTrending: true
  },
  {
    id: 6,
    name: 'Madhubani Painting - Peacock',
    slug: 'madhubani-painting-peacock',
    image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    price: 5500,
    artistName: 'Sarita Devi',
    rating: 4.9,
    reviewCount: 47,
    category: 'Paintings',
    isTrending: true
  },
  {
    id: 7,
    name: 'Beaded Jhumka Earrings',
    slug: 'beaded-jhumka-earrings',
    image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    price: 850,
    discountPrice: 680,
    artistName: 'Meera Agarwal',
    rating: 4.7,
    reviewCount: 36,
    category: 'Jewelry',
    isTrending: true
  },
  {
    id: 8,
    name: 'Bamboo Table Lamp',
    slug: 'bamboo-table-lamp',
    image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
    price: 1800,
    artistName: 'Rahul Joshi',
    rating: 4.5,
    reviewCount: 23,
    category: 'Home Decor',
    isTrending: true
  }
];

const TrendingSection = () => {
  return (
    <section className="section-padding bg-hunar-sand/30">
      <div className="container-custom">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="max-w-xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 text-hunar-earth">
              Trending <span className="text-hunar-terracotta">Now</span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Discover what's popular among art enthusiasts and collectors right now
            </p>
          </div>
          <Link to="/trending" className="inline-flex items-center text-hunar-terracotta hover:text-hunar-earth transition-colors">
            <span className="font-medium">View All Trending</span>
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
