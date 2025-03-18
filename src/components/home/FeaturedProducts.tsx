
import { ArrowRight } from 'lucide-react';
import ProductCard, { ProductCardProps } from '../ui/ProductCard';
import { Link } from 'react-router-dom';

const featuredProducts: ProductCardProps[] = [
  {
    id: 1,
    name: 'Traditional Blue Pottery Vase',
    slug: 'traditional-blue-pottery-vase',
    image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    price: 2800,
    discountPrice: 2250,
    artistName: 'Rajesh Kumar',
    rating: 4.8,
    reviewCount: 24,
    category: 'Pottery',
    isNew: true
  },
  {
    id: 2,
    name: 'Handwoven Silk Scarf',
    slug: 'handwoven-silk-scarf',
    image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
    price: 1500,
    artistName: 'Ananya Sharma',
    rating: 4.5,
    reviewCount: 18,
    category: 'Textiles'
  },
  {
    id: 3,
    name: 'Carved Sandalwood Elephant',
    slug: 'carved-sandalwood-elephant',
    image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
    price: 3500,
    discountPrice: 2975,
    artistName: 'Mohan Verma',
    rating: 4.9,
    reviewCount: 32,
    category: 'Woodwork',
    isTrending: true
  },
  {
    id: 4,
    name: 'Brass Peacock Lamp',
    slug: 'brass-peacock-lamp',
    image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    price: 4200,
    artistName: 'Priya Patel',
    rating: 4.7,
    reviewCount: 15,
    category: 'Home Decor',
    isNew: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="max-w-xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 text-hunar-earth">
              Featured <span className="text-hunar-terracotta">Products</span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Handpicked treasures showcasing exceptional craftsmanship and artistic brilliance
            </p>
          </div>
          <Link to="/featured" className="inline-flex items-center text-hunar-terracotta hover:text-hunar-earth transition-colors">
            <span className="font-medium">View All Featured</span>
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
