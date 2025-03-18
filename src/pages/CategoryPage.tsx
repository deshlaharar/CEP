
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import CategoryProductsGrid from '@/components/category/CategoryProductsGrid';
import CategoryFilters from '@/components/category/CategoryFilters';
import { ProductCardProps } from '@/components/ui/ProductCard';

// This would normally come from an API
const getCategoryProducts = (slug: string): ProductCardProps[] => {
  // Mock data - in a real app this would be fetched from an API
  const allProducts: Record<string, ProductCardProps[]> = {
    'pottery': [
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
        id: 11,
        name: 'Ceramic Table Planter',
        slug: 'ceramic-table-planter',
        image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        price: 1800,
        artistName: 'Sunita Patel',
        rating: 4.6,
        reviewCount: 18,
        category: 'Pottery'
      },
      {
        id: 12,
        name: 'Handpainted Pottery Bowl Set',
        slug: 'handpainted-pottery-bowl-set',
        image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        price: 3200,
        artistName: 'Rajesh Kumar',
        rating: 4.9,
        reviewCount: 32,
        category: 'Pottery',
        isTrending: true
      },
      {
        id: 13,
        name: 'Blue Pottery Coffee Mug',
        slug: 'blue-pottery-coffee-mug',
        image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
        price: 950,
        discountPrice: 850,
        artistName: 'Rajesh Kumar',
        rating: 4.7,
        reviewCount: 21,
        category: 'Pottery'
      },
      {
        id: 14,
        name: 'Terracotta Plant Holder',
        slug: 'terracotta-plant-holder',
        image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        price: 1200,
        artistName: 'Anita Sharma',
        rating: 4.4,
        reviewCount: 17,
        category: 'Pottery',
        isNew: true
      },
      {
        id: 15,
        name: 'Decorative Clay Wall Hanging',
        slug: 'decorative-clay-wall-hanging',
        image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        price: 1600,
        artistName: 'Vikram Patel',
        rating: 4.6,
        reviewCount: 14,
        category: 'Pottery'
      }
    ],
    'jewelry': [
      {
        id: 2,
        name: 'Handwoven Silver Necklace',
        slug: 'handwoven-silver-necklace',
        image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        price: 4500,
        artistName: 'Meera Agarwal',
        rating: 4.9,
        reviewCount: 38,
        category: 'Jewelry'
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
        id: 21,
        name: 'Traditional Kundan Bracelet',
        slug: 'traditional-kundan-bracelet',
        image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        price: 3800,
        artistName: 'Meera Agarwal',
        rating: 4.8,
        reviewCount: 29,
        category: 'Jewelry',
        isTrending: true
      },
      {
        id: 22,
        name: 'Silver Filigree Pendant',
        slug: 'silver-filigree-pendant',
        image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
        price: 2500,
        discountPrice: 2250,
        artistName: 'Anjali Singh',
        rating: 4.9,
        reviewCount: 42,
        category: 'Jewelry',
        isNew: true
      }
    ],
    'textiles': [
      {
        id: 3,
        name: 'Hand Block Printed Bedsheet',
        slug: 'hand-block-printed-bedsheet',
        image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        price: 2200,
        artistName: 'Prakash Sharma',
        rating: 4.7,
        reviewCount: 22,
        category: 'Textiles'
      },
      {
        id: 23,
        name: 'Ikat Weave Table Runner',
        slug: 'ikat-weave-table-runner',
        image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        price: 1200,
        artistName: 'Suman Patel',
        rating: 4.6,
        reviewCount: 15,
        category: 'Textiles'
      },
      {
        id: 24,
        name: 'Embroidered Cushion Covers',
        slug: 'embroidered-cushion-covers',
        image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
        price: 950,
        discountPrice: 800,
        artistName: 'Prakash Sharma',
        rating: 4.8,
        reviewCount: 27,
        category: 'Textiles',
        isTrending: true
      }
    ],
    'home-decor': [
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
      },
      {
        id: 31,
        name: 'Hand-carved Wooden Wall Art',
        slug: 'hand-carved-wooden-wall-art',
        image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        price: 5600,
        artistName: 'Mohan Verma',
        rating: 4.9,
        reviewCount: 34,
        category: 'Home Decor',
        isNew: true
      },
      {
        id: 32,
        name: 'Hanging Macrame Plant Holder',
        slug: 'hanging-macrame-plant-holder',
        image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        price: 1400,
        artistName: 'Sarita Shah',
        rating: 4.6,
        reviewCount: 19,
        category: 'Home Decor'
      }
    ],
    'paintings': [
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
        id: 41,
        name: 'Warli Art Canvas',
        slug: 'warli-art-canvas',
        image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        price: 3800,
        artistName: 'Suresh Kumar',
        rating: 4.8,
        reviewCount: 31,
        category: 'Paintings'
      },
      {
        id: 42,
        name: 'Miniature Rajasthani Painting',
        slug: 'miniature-rajasthani-painting',
        image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        price: 7500,
        discountPrice: 6750,
        artistName: 'Deepak Sharma',
        rating: 4.9,
        reviewCount: 43,
        category: 'Paintings',
        isTrending: true
      }
    ],
    'woodwork': [
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
        id: 51,
        name: 'Teak Wood Jewelry Box',
        slug: 'teak-wood-jewelry-box',
        image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
        price: 2800,
        artistName: 'Mohan Verma',
        rating: 4.7,
        reviewCount: 24,
        category: 'Woodwork'
      },
      {
        id: 52,
        name: 'Wooden Chess Set',
        slug: 'wooden-chess-set',
        image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        price: 4500,
        artistName: 'Vishal Gupta',
        rating: 4.8,
        reviewCount: 29,
        category: 'Woodwork',
        isNew: true
      }
    ]
  };

  return allProducts[slug] || [];
};

// Mock category data
const getCategoryInfo = (slug: string) => {
  const categories = {
    'pottery': {
      name: 'Pottery',
      description: 'Discover beautiful handcrafted pottery pieces created by skilled artisans using traditional techniques passed down through generations.',
      image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9'
    },
    'jewelry': {
      name: 'Jewelry',
      description: 'Explore exquisite handmade jewelry pieces that combine traditional craftsmanship with contemporary designs.',
      image: 'https://source.unsplash.com/photo-1518495973542-4542c06a5843'
    },
    'textiles': {
      name: 'Textiles',
      description: 'Browse through our collection of handwoven and hand-printed textiles created using age-old techniques.',
      image: 'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9'
    },
    'home-decor': {
      name: 'Home Decor',
      description: 'Transform your living space with unique handcrafted home decor items made by skilled artisans.',
      image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb'
    },
    'paintings': {
      name: 'Paintings',
      description: 'Discover traditional and contemporary paintings created by talented artists from across the country.',
      image: 'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86'
    },
    'woodwork': {
      name: 'Woodwork',
      description: 'Explore intricately carved wooden artifacts created by master craftsmen using traditional techniques.',
      image: 'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07'
    }
  };

  return categories[slug as keyof typeof categories] || { 
    name: 'Category Not Found', 
    description: 'The category you are looking for does not exist.',
    image: 'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb'
  };
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [categoryInfo, setCategoryInfo] = useState({ 
    name: '', 
    description: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      // Simulate API call with a timeout
      setIsLoading(true);
      setTimeout(() => {
        const fetchedProducts = getCategoryProducts(slug);
        const info = getCategoryInfo(slug);
        
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setCategoryInfo(info);
        setIsLoading(false);
      }, 800);
    }
  }, [slug]);

  const handleApplyFilters = (filters: any) => {
    // In a real app, this would apply the filters to the products
    // For now, we'll just simulate filtering with a timeout
    setIsLoading(true);
    setTimeout(() => {
      // Simple price filter as an example
      let result = [...products];
      
      if (filters.priceRange) {
        result = result.filter(p => {
          const price = p.discountPrice || p.price;
          return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        });
      }
      
      if (filters.ratings && filters.ratings > 0) {
        result = result.filter(p => p.rating >= filters.ratings);
      }
      
      setFilteredProducts(result);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Category Hero */}
        <section className="relative h-64 md:h-80">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={categoryInfo.image}
              alt={categoryInfo.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative z-20 h-full flex items-center justify-center text-center">
            <div className="container-custom px-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
                {categoryInfo.name}
              </h1>
              <p className="text-white/90 max-w-3xl mx-auto">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </section>

        {/* Category Content */}
        <section className="py-10 md:py-16 bg-hunar-cream">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <CategoryFilters onApplyFilters={handleApplyFilters} />
              </div>
              
              {/* Product Grid */}
              <div className="lg:col-span-3">
                <CategoryProductsGrid 
                  products={filteredProducts} 
                  isLoading={isLoading} 
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
