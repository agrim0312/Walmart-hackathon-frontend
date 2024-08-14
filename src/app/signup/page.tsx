"use client";
import createUser from '@/api/signup';
import { useRouter } from 'next/navigation';
import React from 'react';

const RegisterPage: React.FC = () => {
    const router = useRouter();

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        console.log("Signup Begin")
        const name = target.elements.namedItem("name") as HTMLInputElement;
        const email = target.elements.namedItem("email") as HTMLInputElement;
        const password = target.elements.namedItem("password") as HTMLInputElement;
        console.log(name,email,password)
        createUser({ name: name.value, email: email.value, password: password.value });

        if(localStorage.getItem('jwtToken')){
            router.push("/dashboard");
        }

    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleRegisterSubmit} className="text-black border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <input type="text" name="name" placeholder="Name" className="mb-7 p-3" />
                <br />
                <input type="email" name="email" placeholder="Email" className="mb-7 p-3" />
                <br />
                <input type="password" name="password" placeholder="Password" className="mb-7 p-3" />
                <br />
                <button type="submit" style={{ padding: "10px", width: "100%", color: "white", border: "none", borderRadius: "5px" }} className="bg-blue-600">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
