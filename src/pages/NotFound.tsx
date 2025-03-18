
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-serif font-bold mb-4 text-hunar-terracotta">404</h1>
          <h2 className="text-2xl font-serif mb-6 text-hunar-earth">Page Not Found</h2>
          <p className="text-foreground/70 mb-8">
            We're sorry, but the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
