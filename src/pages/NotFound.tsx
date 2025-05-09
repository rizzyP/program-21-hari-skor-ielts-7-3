
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(user ? "/" : "/auth");
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-ielts-blue">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
          </div>
          <div className="space-y-3">
            <Button onClick={handleGoBack} className="bg-ielts-blue hover:bg-ielts-lightblue">
              {user ? "Return to Home" : "Go to Login"}
            </Button>
            {user && (
              <div className="pt-2">
                <Button variant="link" onClick={() => navigate("/test")} className="text-ielts-blue hover:underline">
                  Go to Test Selection
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
