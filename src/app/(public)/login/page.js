"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/userContext";
import Spinner from "../../components/spinner";
import InputField from "@/app/components/inputField";
import CustomButton from "@/app/components/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('[Auth] Login attempt for:', email);

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setLoading(false);
      setError(true);
      return;
    }
    if (!password) {
      setLoading(false);
      setError(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log('[Auth] Login successful for user:', data.user.email);
        router.push("/dashboard");
      } else {
        setError(true);
        console.error('[Auth] Login failed:', response.status, response.statusText);
      }
    } catch (error) {
      setError(true);
      console.error('[Auth] Login error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8">
        <div className="bg-surface rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-foreground mb-6">
            Personal Letter LLM
          </h1>
          <p className="text-center text-grey mb-8">
            Sign in to generate personalized cover letters
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : (
              <>
                <InputField
                  name="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email"
                  error={error && !email}
                  label="Email"
                  required
                />
                <InputField
                  name="password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter your password"
                  error={error && !password}
                  label="Password"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm text-center">
                    Login failed. Please check your email and password.
                  </p>
                )}
              </>
            )}
            <CustomButton 
              callBack={handleSubmit} 
              text={loading ? "Signing in..." : "Sign In"} 
              disabled={loading} 
              type="submit"
              variant="primary"
              size="lg"
            />
          </form>
          
          <div className="mt-6 text-center text-sm text-grey">
            Test credentials: user@example.com / password123
          </div>
        </div>
      </div>
    </div>
  );
}
