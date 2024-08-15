"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface UserAuthFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isRegister?: boolean;
}

export function UserAuthForm({  onSubmit, isRegister = false, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (isRegister) {
      const form = event.currentTarget;
      const password = (form.elements.namedItem("password") as HTMLInputElement).value;
      const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        setIsLoading(false);
        return;
      }
    }

    await onSubmit(event);

    setIsLoading(false);
  };

  return (
    <div className="w-full" {...props}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              disabled={isLoading}
              className="mt-1"
              required
            />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoCapitalize="none"
            autoComplete={isRegister ? "new-password" : "current-password"}
            disabled={isLoading}
            className="mt-1"
            required
          />
        </div>
        {isRegister && (
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              className="mt-1"
              required
            />
          </div>
        )}
        {isRegister && !passwordsMatch && (
          <p className="text-sm text-red-500">Passwords do not match</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isRegister ? "Sign Up" : "Sign In"}
        </Button>
      </form>
    </div>
  );
}