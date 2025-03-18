
import { ArrowRight } from 'lucide-react';
import ProductCard, { ProductCardProps } from '../ui/ProductCard';
import { Link } from 'react-router-dom';

interface SimilarProductsProps {
  products: ProductCardProps[];
}

const SimilarProducts = ({ products }: SimilarProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-hunar-sand/30">
      <div className="container-custom">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="max-w-xl mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2 text-hunar-earth">
              You May Also <span className="text-hunar-terracotta">Like</span>
            </h2>
            <p className="text-foreground/70">
              Explore more handcrafted treasures similar to this piece
            </p>
          </div>
          {products.length > 4 && (
            <Link to="/featured" className="inline-flex items-center text-hunar-terracotta hover:text-hunar-earth transition-colors">
              <span className="font-medium">View All</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
