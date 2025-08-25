"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useAppData, user_service } from "@/context/AppContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";

const RegisterPage = () => {
  const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (isAuth) return redirect("/blogs");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${user_service}/api/v1/register`, {
        name,
        email,
        password,
      });
      toast.success(result.data.message);
      // Optionally log in after registration
      const loginRes = await axios.post(`${user_service}/api/v1/login`, {
        email,
        password,
      });
      Cookies.set("token", loginRes.data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      setIsAuth(true);
      setLoading(false);
      setUser(loginRes.data.user);
    } catch (error) {
      toast.error("Registration failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[350px] m-auto mt-[200px]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Register for The Reading Retreat</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <Button type="submit">Register</Button>
                <div className="text-center mt-2">
                  <a href="/login" className="text-blue-600 underline">
                    Already have an account? Login
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
