
import { ArrowRight } from 'lucide-react';
import CategoryCard, { CategoryCardProps } from '../ui/CategoryCard';
import { Link } from 'react-router-dom';

const categories: CategoryCardProps[] = [
  {
    id: 1,
    name: 'Jewelry',
    slug: 'jewelry',
    image: 'https://source.unsplash.com/photo-1518495973542-4542c06a5843',
    itemCount: 98
  },
  {
    id: 2,
    name: 'Home Décor',
    slug: 'home-decor',
    image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
    itemCount: 143
  },
  {
    id: 3,
    name: 'Clothing & Accessories',
    slug: 'clothing-accessories',
    image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    itemCount: 87
  },
  {
    id: 4,
    name: 'Organic & Food Products',
    slug: 'organic-food-products',
    image: 'https://source.unsplash.com/photo-1506617564039-2f3b650b7010',
    itemCount: 64
  },
  {
    id: 5,
    name: 'Wooden & Bamboo Products',
    slug: 'wooden-bamboo-products',
    image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    itemCount: 76
  },
  {
    id: 6,
    name: 'Pottery & Ceramics',
    slug: 'pottery-ceramics',
    image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    itemCount: 72
  },
  {
    id: 7,
    name: 'Personal Care & Wellness',
    slug: 'personal-care-wellness',
    image: 'https://source.unsplash.com/photo-1570172619644-dfd03ed5d881',
    itemCount: 58
  },
  {
    id: 8,
    name: 'Stationery & Art Supplies',
    slug: 'stationery-art-supplies',
    image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
    itemCount: 45
  }
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-hunar-cream">
      <div className="container-custom">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="max-w-xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 text-hunar-earth">
              Explore Our <span className="text-hunar-terracotta">Categories</span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Discover unique handcrafted items across various traditional art forms and techniques
            </p>
          </div>
          <Link to="/categories" className="inline-flex items-center text-hunar-terracotta hover:text-hunar-earth transition-colors">
            <span className="font-medium">View All Categories</span>
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
