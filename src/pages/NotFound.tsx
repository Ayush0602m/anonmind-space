import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-hero text-4xl mb-4">404</h1>
        <p className="font-ui text-xl text-muted-foreground/90 mb-4 leading-relaxed">Oops! Page not found</p>
        <a href="/" className="font-ui text-primary hover:text-primary/80 underline underline-offset-4">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
