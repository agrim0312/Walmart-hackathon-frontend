"use client";

import React from "react";
import LoginUser from "@/api/login";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/components/user-auth-form";
import { useRouter } from "next/navigation";
import { LiaRouteSolid } from "react-icons/lia";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;

    const response = await LoginUser({
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
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
            <LiaRouteSolid className="w-12 h-12" />
            VRO
          </div>
          <span className="text-white text-xl font-semibold mt-2">Vehicle Route Optimiser</span>
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
