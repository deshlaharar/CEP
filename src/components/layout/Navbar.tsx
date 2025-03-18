
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-hunar-earth">
              <span className="text-hunar-terracotta">Hunar</span>Haath
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/artists" className="nav-link">Artists</Link>
            <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
            <Link to="/trending" className="nav-link">Trending</Link>
          </nav>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              aria-label="Search" 
              className="p-2 text-foreground/70 hover:text-hunar-terracotta transition-colors"
            >
              <Search size={20} />
            </button>
            <Link 
              to="/wishlist" 
              aria-label="Wishlist"
              className="p-2 text-foreground/70 hover:text-hunar-terracotta transition-colors"
            >
              <Heart size={20} />
            </Link>
            <Link 
              to="/cart" 
              aria-label="Shopping Bag"
              className="p-2 text-foreground/70 hover:text-hunar-terracotta transition-colors relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-hunar-terracotta text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link 
              to="/account" 
              aria-label="Account"
              className="p-2 text-foreground/70 hover:text-hunar-terracotta transition-colors"
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="container-custom py-20">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/categories" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
            <Link to="/artists" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Artists</Link>
            <Link to="/new-arrivals" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
            <Link to="/trending" className="text-xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>Trending</Link>
            <div className="pt-6 border-t border-hunar-sand flex items-center justify-between">
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 text-foreground/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 text-foreground/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag size={20} />
                <span>Cart (0)</span>
              </Link>
              <Link 
                to="/account" 
                className="flex items-center space-x-2 text-foreground/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
