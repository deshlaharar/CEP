
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProductCardProps } from '@/components/ui/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import SimilarProducts from '@/components/product/SimilarProducts';
import { Share2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Temporary mock product data - in a real app this would come from an API
const getProductBySlug = (slug: string): ProductCardProps | null => {
  const allProducts: ProductCardProps[] = [
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

  return allProducts.find(product => product.slug === slug) || null;
};

// Mock product details data that would come from an API
const getProductDetails = (productId: number) => {
  const productDetails = {
    1: {
      description: 'This traditional blue pottery vase is handcrafted by skilled artisans from Jaipur, Rajasthan. Each piece is made using a centuries-old technique that originated in Persia and was brought to India during the Mughal era. The distinctive blue color comes from natural cobalt oxide, and the intricate patterns are hand-painted by master craftsmen.',
      features: [
        'Made from natural quartz stone powder and clay',
        'Hand-painted with natural mineral colors',
        'Food-safe and lead-free glazes',
        'Each piece is unique with slight variations',
        'Size: 25cm height, 15cm diameter',
        'Weight: Approximately 1.2kg'
      ],
      materials: ['Clay', 'Quartz Stone Powder', 'Natural Mineral Colors'],
      careInstructions: 'Hand wash only. Do not use in microwave or dishwasher. Avoid exposing to extreme temperature changes.',
      dimensions: {
        height: '25 cm',
        diameter: '15 cm',
        weight: '1.2 kg'
      },
      images: [
        'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07'
      ],
      artistInfo: {
        name: 'Rajesh Kumar',
        location: 'Jaipur, Rajasthan',
        experience: '15+ years',
        bio: 'Rajesh Kumar is a 3rd generation blue pottery artisan from Jaipur. He learned this craft from his father and has been creating exquisite pottery pieces for over 15 years. His work has been exhibited in various national and international craft exhibitions.',
        avatar: 'https://source.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      reviews: [
        {
          id: 1,
          userName: 'Priya Sharma',
          rating: 5,
          date: '2023-08-15',
          comment: 'Absolutely beautiful vase! The craftsmanship is exceptional and the colors are vibrant. It looks even better in person than in the photos.',
          avatar: 'https://source.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        {
          id: 2,
          userName: 'Amit Patel',
          rating: 4,
          date: '2023-07-22',
          comment: 'Love the traditional design and the quality is excellent. Shipping was fast and the product was well-packaged. Giving 4 stars because it\'s slightly smaller than I expected.',
          avatar: 'https://source.unsplash.com/photo-1599566150163-29194dcaad36'
        },
        {
          id: 3,
          userName: 'Sarah Johnson',
          rating: 5,
          date: '2023-06-10',
          comment: 'This vase is a work of art! The blue pottery technique is stunning, and I love supporting traditional crafts. It\'s now the centerpiece of my living room.',
          avatar: 'https://source.unsplash.com/photo-1438761681033-6461ffad8d80'
        }
      ],
      shipping: {
        estimatedDelivery: '5-7 business days',
        returnPolicy: '7-day returns accepted for unused items',
        shippingFee: 150
      }
    },
    // More product details would be added here for other products
    2: {
      description: 'This exquisite handwoven silver necklace showcases the intricate filigree work that has been a hallmark of Indian jewelry craftsmanship for centuries. Every piece is meticulously crafted by hand, with delicate silver wires twisted and soldered to create intricate patterns inspired by nature and traditional motifs.',
      features: [
        '925 Sterling Silver',
        'Handcrafted using traditional filigree technique',
        'Adjustable chain length: 16-18 inches',
        'Unique design with floral motifs',
        'Comes with a handmade gift box',
        'Complimentary polishing cloth included'
      ],
      materials: ['925 Sterling Silver', 'Semi-precious stones'],
      careInstructions: 'Store in a cool, dry place. Clean with a soft silver polishing cloth. Avoid contact with perfumes, lotions, and water.',
      dimensions: {
        length: '16-18 inches (adjustable)',
        pendant: '3.5 cm x 2.8 cm',
        weight: '28 grams'
      },
      images: [
        'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07'
      ],
      artistInfo: {
        name: 'Meera Agarwal',
        location: 'Jaipur, Rajasthan',
        experience: '20+ years',
        bio: 'Meera Agarwal comes from a long line of silversmiths in Jaipur. She has been creating intricate silver jewelry for over two decades, specializing in the ancient art of filigree. Her designs blend traditional techniques with contemporary sensibilities, making her pieces both timeless and modern.',
        avatar: 'https://source.unsplash.com/photo-1544005313-94ddf0286df2'
      },
      reviews: [
        {
          id: 1,
          userName: 'Ananya Desai',
          rating: 5,
          date: '2023-09-05',
          comment: 'This necklace is simply stunning! The craftsmanship is impeccable, and it arrived beautifully packaged. I\'ve received so many compliments whenever I wear it.',
          avatar: 'https://source.unsplash.com/photo-1531746020798-e6953c6e8e04'
        },
        {
          id: 2,
          userName: 'Emma Wilson',
          rating: 5,
          date: '2023-08-18',
          comment: 'Absolutely love this piece! The detail is extraordinary, and you can really see the skill that went into making it. Worth every penny.',
          avatar: 'https://source.unsplash.com/photo-1544725176-7c40e5a71c5e'
        }
      ],
      shipping: {
        estimatedDelivery: '3-5 business days',
        returnPolicy: '10-day returns accepted for unused items',
        shippingFee: 200
      }
    },
    3: {
      description: 'This intricately carved sandalwood elephant is a masterpiece of traditional Indian wood carving. Crafted from fragrant sandalwood, known for its distinctive aroma and fine grain, this decorative piece showcases the exceptional skill of master woodcarvers from Karnataka. Each elephant is carved from a single block of wood, with meticulous attention to detail in the intricate patterns and embellishments.',
      features: [
        'Carved from genuine sandalwood',
        'Hand-carved with traditional tools',
        'Natural sandalwood fragrance',
        'Intricate detailing with traditional motifs',
        'Protective lacquer finish',
        'Decorative piece for home or office'
      ],
      materials: ['Genuine Sandalwood', 'Natural Lacquer'],
      careInstructions: 'Dust with a soft cloth. Keep away from direct sunlight and moisture. Occasionally apply a small amount of natural oil to maintain the wood\'s luster.',
      dimensions: {
        height: '15 cm',
        length: '20 cm',
        width: '8 cm',
        weight: '450 grams'
      },
      images: [
        'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb',
        'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07'
      ],
      artistInfo: {
        name: 'Mohan Verma',
        location: 'Mysore, Karnataka',
        experience: '25+ years',
        bio: 'Mohan Verma is a renowned master woodcarver from Mysore with over 25 years of experience. He comes from a family of traditional woodcarvers who have been practicing this art for five generations. His work is known for its exceptional precision and intricate detailing, often depicting gods, animals, and traditional motifs from Indian mythology.',
        avatar: 'https://source.unsplash.com/photo-1566492031773-4f4e44671857'
      },
      reviews: [
        {
          id: 1,
          userName: 'Rahul Mehta',
          rating: 5,
          date: '2023-07-28',
          comment: 'The craftsmanship is outstanding! The intricate details on this elephant are simply remarkable. The sandalwood fragrance is lovely and still noticeable after months.',
          avatar: 'https://source.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        {
          id: 2,
          userName: 'Lisa Chen',
          rating: 5,
          date: '2023-06-15',
          comment: 'A beautiful piece of art that adds elegance to my collection. The carving is so precise and the elephant looks lifelike. Very impressed with the quality.',
          avatar: 'https://source.unsplash.com/photo-1580489944761-15a19d654956'
        },
        {
          id: 3,
          userName: 'David Thompson',
          rating: 4,
          date: '2023-05-20',
          comment: 'Excellent craftsmanship and beautiful detail. The sandalwood scent is subtle but pleasant. Giving 4 stars only because it was slightly smaller than I expected.',
          avatar: 'https://source.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        }
      ],
      shipping: {
        estimatedDelivery: '7-10 business days',
        returnPolicy: '7-day returns accepted for unused items',
        shippingFee: 250
      }
    },
    4: {
      description: 'This exquisite brass peacock lamp is a stunning example of traditional Indian metalwork. Handcrafted by skilled artisans using age-old techniques, this decorative lamp features intricate cutwork and embossed details that create beautiful light patterns when illuminated. The peacock design symbolizes beauty and elegance in Indian culture, making this piece both a functional light source and a meaningful decorative element.',
      features: [
        'Handcrafted from high-quality brass',
        'Intricate cutwork design with peacock motif',
        'Creates beautiful shadow patterns when lit',
        'Antiqued brass finish with hand-rubbed patina',
        'Compatible with standard E27 bulb (not included)',
        'Includes a 1.5-meter cord with switch'
      ],
      materials: ['High-quality Brass', 'Electrical components'],
      careInstructions: 'Dust with a soft, dry cloth. For deeper cleaning, use a brass cleaner and buff gently. Do not immerse in water or use abrasive cleaners.',
      dimensions: {
        height: '38 cm',
        diameter: '22 cm',
        weight: '1.8 kg'
      },
      images: [
        'https://source.unsplash.com/photo-1465146344425-f00d5f5c8f07',
        'https://source.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
        'https://source.unsplash.com/photo-1513836279014-a89f7a76ae86',
        'https://source.unsplash.com/photo-1482938289607-e9573fc25ebb'
      ],
      artistInfo: {
        name: 'Priya Patel',
        location: 'Moradabad, Uttar Pradesh',
        experience: '18+ years',
        bio: 'Priya Patel hails from Moradabad, a city known as the Brass City of India. She has been working with brass for over 18 years, specializing in traditional lighting fixtures that combine functionality with artistic excellence. Her designs often draw inspiration from Indian mythology, nature, and architectural motifs, resulting in pieces that are both culturally rich and aesthetically pleasing.',
        avatar: 'https://source.unsplash.com/photo-1592621385612-4d7129426394'
      },
      reviews: [
        {
          id: 1,
          userName: 'Maya Reddy',
          rating: 5,
          date: '2023-09-10',
          comment: 'This lamp is absolutely stunning! The craftsmanship is exquisite, and the light patterns it creates are magical. It\'s become the focal point of my living room.',
          avatar: 'https://source.unsplash.com/photo-1573496359142-b8d87734a5a2'
        },
        {
          id: 2,
          userName: 'Robert Garcia',
          rating: 4,
          date: '2023-08-25',
          comment: 'Beautiful craftsmanship and design. The brass quality is excellent, and it gives a warm, ambient glow to the room. Only giving 4 stars because assembly was a bit tricky.',
          avatar: 'https://source.unsplash.com/photo-1568602471122-7832951cc4c5'
        }
      ],
      shipping: {
        estimatedDelivery: '5-7 business days',
        returnPolicy: '7-day returns accepted for unused items',
        shippingFee: 300
      }
    }
  };

  return productDetails[productId as keyof typeof productDetails] || null;
};

// Similar products - in a real app would be fetched based on category or tags
const getSimilarProducts = (category: string, currentProductId: number): ProductCardProps[] => {
  // This would be an API call in a real application
  const allProducts: ProductCardProps[] = [
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
    }
  ];

  // Filter products by the same category, excluding the current product
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase() && 
    product.id !== currentProductId
  ).slice(0, 4); // Limit to 4 similar products
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        const fetchedProduct = getProductBySlug(slug);
        setProduct(fetchedProduct);
        
        if (fetchedProduct) {
          const details = getProductDetails(fetchedProduct.id);
          setProductDetails(details);
          
          const similar = getSimilarProducts(fetchedProduct.category, fetchedProduct.id);
          setSimilarProducts(similar);
        }
        
        setIsLoading(false);
      }, 800);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-10">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-hunar-sand/30 animate-pulse rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-hunar-sand/30 animate-pulse rounded w-3/4"></div>
                <div className="h-6 bg-hunar-sand/30 animate-pulse rounded w-1/2"></div>
                <div className="h-4 bg-hunar-sand/30 animate-pulse rounded w-1/3"></div>
                <div className="h-20 bg-hunar-sand/30 animate-pulse rounded w-full mt-6"></div>
                <div className="h-10 bg-hunar-sand/30 animate-pulse rounded w-full mt-6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product || !productDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-20">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-serif text-hunar-earth mb-4">Product Not Found</h1>
            <p className="text-hunar-earth/70 mb-8">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link to="/" className="btn-primary">
              Return to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-hunar-cream py-3">
          <div className="container-custom">
            <div className="flex items-center text-sm text-hunar-earth/70">
              <Link to="/" className="hover:text-hunar-terracotta">Home</Link>
              <ChevronRight size={16} className="mx-1" />
              <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-hunar-terracotta">
                {product.category}
              </Link>
              <ChevronRight size={16} className="mx-1" />
              <span className="text-hunar-earth font-medium truncate max-w-xs">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-8 md:py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column - Product Gallery */}
              <ProductGallery images={productDetails.images} productName={product.name} />
              
              {/* Right Column - Product Info */}
              <ProductInfo 
                product={product} 
                details={productDetails} 
              />
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="py-10 bg-hunar-cream">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Description */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-serif text-hunar-earth mb-4">Product Description</h2>
                <p className="text-hunar-earth/80 mb-6">
                  {productDetails.description}
                </p>
                
                <h3 className="text-xl font-serif text-hunar-earth mb-3">Features</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-hunar-earth/80">
                  {productDetails.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-serif text-hunar-earth mb-3">Materials Used</h3>
                <ul className="list-disc list-inside space-y-2 mb-6 text-hunar-earth/80">
                  {productDetails.materials.map((material: string, index: number) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-serif text-hunar-earth mb-3">Care Instructions</h3>
                <p className="text-hunar-earth/80 mb-6">
                  {productDetails.careInstructions}
                </p>
              </div>
              
              {/* Artisan Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif text-hunar-earth mb-4">About the Artisan</h2>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={productDetails.artistInfo.avatar} 
                    alt={productDetails.artistInfo.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-hunar-earth">{productDetails.artistInfo.name}</h3>
                    <p className="text-sm text-hunar-earth/70">{productDetails.artistInfo.location}</p>
                    <p className="text-sm text-hunar-earth/70">Experience: {productDetails.artistInfo.experience}</p>
                  </div>
                </div>
                
                <p className="text-hunar-earth/80 mb-4">
                  {productDetails.artistInfo.bio}
                </p>
                
                <Button className="w-full bg-white border border-hunar-terracotta text-hunar-terracotta hover:bg-hunar-terracotta hover:text-white">
                  View Artisan Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-10">
          <div className="container-custom">
            <h2 className="text-2xl font-serif text-hunar-earth mb-6">Customer Reviews</h2>
            
            <div className="space-y-6">
              {productDetails.reviews.map((review: any) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <img 
                      src={review.avatar} 
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="font-medium text-hunar-earth">{review.userName}</h4>
                        <span className="text-sm text-hunar-earth/60">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill={i < review.rating ? "#F59E0B" : "#E5E7EB"} 
                            className="w-5 h-5"
                          >
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-hunar-earth/80">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button className="bg-white border border-hunar-terracotta text-hunar-terracotta hover:bg-hunar-terracotta hover:text-white">
                Write a Review
              </Button>
            </div>
          </div>
        </section>

        {/* Similar Products Section */}
        <SimilarProducts products={similarProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
