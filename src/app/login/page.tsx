"use client";

import React from "react";
import LoginUser from "@/api/login";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/components/user-auth-form";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;
    
    const response = await LoginUser({ email: email.value, password: password.value });

        if(response.status === 200){
            router.push("/dashboard");
        }else{
            router.push("/signup");
        }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to log in to your account
            </p>
          </div> 
          <UserAuthForm onSubmit={handleLoginSubmit} isRegister={false} />
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-violet-600 text-white p-8">
        <div className="relative z-20 flex flex-col items-center text-lg font-medium">
          <div className="flex text-3xl items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-8 w-8"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            VRO
          </div>
          <span className="text-white mt-2">Vehicle Route Optimiser</span>
        </div>
      </div>

      <Link
        href="/signup"
        className={cn("absolute right-4 text-white top-4 md:right-8 md:top-8")}
      >
        Register
      </Link>
    </div>
  );
};

export default LoginPage;