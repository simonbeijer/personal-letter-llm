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
    console.log('[Auth] Login attempt initiated');

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
        console.log('[Auth] Login successful for user:', data.user.id);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="bg-surface/95 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/10">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-foreground dark:text-white mb-1">
              Personal Letter LLM
            </h1>
            <p className="text-grey dark:text-white/80 text-sm">
              Sign in to generate personalized cover letters
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  <p className="text-error text-sm text-center">
                    Login failed. Please check your email and password.
                  </p>
                )}
              </>
            )}
            <div className="pt-1">
              <CustomButton 
                callBack={handleSubmit} 
                text={loading ? "Signing in..." : "Sign In"} 
                disabled={loading} 
                type="submit"
                variant="primary"
                size="lg"
              />
            </div>
          </form>
          
          <div className="mt-5 pt-4 border-t border-border/30 dark:border-white/20">
            <div className="text-center text-xs text-grey dark:text-white/60 mb-3">
              Test credentials: user@example.com / password123
            </div>
            <div className="flex items-center justify-center text-xs text-grey dark:text-white/60">
              <span className="mr-1">🔒</span>
              <span>Forgot password?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
