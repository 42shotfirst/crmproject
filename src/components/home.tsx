import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useAuth } from "./auth/AuthProvider";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">CRM Dashboard</h1>
        <p className="text-center text-gray-600 mb-8">
          Manage your customer relationships, track communications, and process
          payments in one centralized interface.
        </p>
        <div className="flex flex-col gap-4">
          <Button onClick={() => navigate("/login")} className="w-full">
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
