import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="font-caveat text-8xl text-primary mb-4">404</h1>
        <p className="text-xl text-foreground mb-2">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The path you're exploring doesn't exist yet.
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
