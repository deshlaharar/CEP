
import { Link } from 'react-router-dom';

export interface CategoryCardProps {
  id: number;
  name: string;
  image: string;
  slug: string;
  itemCount: number;
  subcategories?: { name: string; slug: string }[];
}

const CategoryCard = ({ name, image, slug, itemCount, subcategories }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`} className="block group">
      <div className="relative overflow-hidden rounded-lg card-hover">
        <div className="aspect-square w-full">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-serif text-white">{name}</h3>
          <p className="text-white/80 text-sm">{itemCount} items</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
