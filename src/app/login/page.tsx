"use client"
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form className="text-black border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <input type="email" placeholder="Email" className="mb-7 p-3" />
                <br />
                <input type="password" placeholder="Password" className="mb-7 p-3" />
                <br />
                <button type="submit" style={{ padding: "10px", width: "100%", color: "white", border: "none", borderRadius: "5px" }} className="bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;