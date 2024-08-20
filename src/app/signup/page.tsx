"use client";

import React from "react";
import createUser from "@/api/signup";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "../../components/user-auth-form";
import { Truck } from "lucide-react";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const name = target.elements.namedItem("name") as HTMLInputElement;
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;

    const response = await createUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <UserAuthForm onSubmit={handleRegisterSubmit} isRegister={true} />
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-violet-600 text-white p-8">
        <div className="relative z-20 flex flex-col items-center text-lg font-medium">
          <div className="flex text-3xl items-center">
            <Truck className="w-12 h-12 mr-2" />
            VRO
          </div>
          <span className="text-white mt-2">Vehicle Route Optimiser</span>
        </div>
      </div>

      <Link
        href="/login"
        className={cn("absolute text-white right-4 font-semibold top-4 md:right-8 md:top-8")}
      >
        Login
      </Link>
    </div>
  );
};

export default RegisterPage;
