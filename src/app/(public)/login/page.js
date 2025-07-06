"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../context/userContext";
import Spinner from "../../components/spinner";
import InputField from "@/app/components/inputField";
import CustomButton from "@/app/components/button";

export default function Login() {
  const [test, setTest] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);

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
        console.log("LOGIN REPONSE", response);
        router.push("/dashboard");
      } else {
        setError(true);
        console.log("error login");
      }
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      {loading}
      <form
        onSubmit={handleSubmit}
        className="text-foreground flex items-center justify-center flex-col"
      >
        {loading ? (
          <div className="h-[168px]">
            <Spinner />
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <InputField
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter email"
              error={error}
              label="Email:"
            />
            <InputField
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
              error={error}
              label="Password:"
            />
            <p
              className={`text-red-400 mb-4 ${
                error ? "visable" : "invisible"
              } `}
            >
              Login failed. Please check your email and password.
            </p>
          </div>
        )}
        <CustomButton callBack={handleSubmit} text="LOGIN" disabled={loading} type="submit"></CustomButton>
      </form>
    </div>
  );
}
