
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hunar-sand/50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-serif font-bold text-hunar-earth">
                <span className="text-hunar-terracotta">Hunar</span>Haath
              </h2>
            </Link>
            <p className="text-foreground/80 leading-relaxed">
              Connecting artisans with art lovers worldwide. Discover unique handcrafted treasures while supporting local craftspeople.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-hunar-earth hover:text-hunar-terracotta transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-hunar-earth hover:text-hunar-terracotta transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-hunar-earth hover:text-hunar-terracotta transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display mb-4 text-hunar-earth">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-display mb-4 text-hunar-earth">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/pottery" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Pottery</Link></li>
              <li><Link to="/category/jewelry" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Jewelry</Link></li>
              <li><Link to="/category/textiles" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Textiles</Link></li>
              <li><Link to="/category/home-decor" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Home Decor</Link></li>
              <li><Link to="/category/paintings" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Paintings</Link></li>
              <li><Link to="/category/woodwork" className="text-foreground/80 hover:text-hunar-terracotta transition-colors">Woodwork</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-display mb-4 text-hunar-earth">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-hunar-terracotta flex-shrink-0 mt-1" />
                <span className="text-foreground/80">123 Artisan Street, Craft District, Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-hunar-terracotta flex-shrink-0" />
                <span className="text-foreground/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-hunar-terracotta flex-shrink-0" />
                <span className="text-foreground/80">hello@hunarhaath.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-hunar-clay/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <p className="text-foreground/70 text-sm">
              © {currentYear} HunarHaath. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 sm:justify-end">
              <img src="https://source.unsplash.com/random/40x25?logos=visa" alt="Visa" className="h-6 object-contain" />
              <img src="https://source.unsplash.com/random/40x25?logos=mastercard" alt="Mastercard" className="h-6 object-contain" />
              <img src="https://source.unsplash.com/random/40x25?logos=paypal" alt="PayPal" className="h-6 object-contain" />
              <img src="https://source.unsplash.com/random/40x25?logos=upi" alt="UPI" className="h-6 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
