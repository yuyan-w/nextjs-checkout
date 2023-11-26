"use client";

import React, { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "../ui/use-toast";
import { signIn } from "next-auth/react";

type Credentials = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "admin@example.com",
    password: "123456",
  });
  const { toast } = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        callbackUrl: "/",
      });
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "ログインに失敗しました",
          description: res.error,
        });
      }
    } catch (error) {
      let msg = "エラー";
      if (error instanceof Error) {
        msg = error.message;
      }
      toast({
        variant: "destructive",
        title: "ログインに失敗しました",
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl mx-auto">ログイン</CardTitle>
        <CardDescription className="mx-auto">
          ログインが必要です。
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            onChange={(e) => handleInput(e)}
            value={credentials.email}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            onChange={(e) => handleInput(e)}
            value={credentials.password}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={isLoading}
          className="w-full relative"
          onClick={handleLogin}
        >
          {isLoading && (
            <LiaSpinnerSolid className="mr-2 w-4 h-4 animate-spin" />
          )}
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};
