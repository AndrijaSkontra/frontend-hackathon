"use client";

import type React from "react";
import { useTranslations } from "next-intl";

import { useState } from "react";
import { Eye, EyeOff, UserRound, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { fetcher } from "@/app/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { warningToast } from "./warning-toast";

type Props = {
  invalidLogin?: boolean | undefined;
};

export default function AuthForm({ invalidLogin }: Props) {
  const t = useTranslations("AuthForm");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const { data, error, isLoading } = useSWR(`/api/test`, fetcher);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerError, setRegisterError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
    });
  };

  const router = useRouter();

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerData.email,
        password: registerData.password,
      }),
    }).then((res) => {
      if (res.ok) {
        router.push("/");
      } else {
        warningToast({
          title: t("registrationFailed"),
        });
      }
    });

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError(t("passwordsDoNotMatch"));
      return;
    }

    setRegisterError("");
    console.log("Register submitted:", registerData);
  };

  return (
    <div className="flex justify-center items-center min-h-[500px] w-full max-w-md mx-auto">
      <Card className="w-full border-amber-200 shadow-lg shadow-amber-100/20">
        <CardHeader className="space-y-1 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-t-lg -mt-6 pt-2">
          <CardTitle className="text-2xl font-bold text-center text-amber-800">
            {t("welcome")}
          </CardTitle>
          <CardDescription className="text-center text-amber-700">
            {t("signInOrCreate")}
          </CardDescription>
        </CardHeader>
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-2 w-full bg-amber-50 p-1">
              <TabsTrigger
                value="login"
                className={cn(
                  "relative transition-all duration-300 data-[state=active]:text-amber-800 data-[state=active]:shadow-none",
                  "data-[state=active]:bg-white data-[state=active]:font-medium",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-amber-400",
                  "data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
                )}
              >
                {t("login")}
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className={cn(
                  "relative transition-all duration-300 data-[state=active]:text-amber-800 data-[state=active]:shadow-none",
                  "data-[state=active]:bg-white data-[state=active]:font-medium",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-amber-400",
                  "data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
                )}
              >
                {t("register")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="login"
            className="transition-all duration-500 ease-in-out"
            style={{
              transform:
                activeTab === "login" ? "translateX(0)" : "translateX(-100%)",
              opacity: activeTab === "login" ? 1 : 0,
              position: activeTab === "login" ? "relative" : "absolute",
            }}
          >
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-amber-700">
                    {t("email")}
                  </Label>
                  <div className="relative group">
                    <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400 transition-colors duration-200" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-200"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-amber-700">
                      {t("password")}
                    </Label>
                    <a
                      href="#"
                      className="text-xs text-amber-600 hover:text-amber-800 transition-colors duration-200"
                    >
                      {t("forgotPassword")}
                    </a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400 transition-colors duration-200" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-200"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-4">
                <div className="flex flex-col gap-2 justify-center items-center grow">
                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white group relative overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300">
                      {t("loginButton")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                  {invalidLogin && (
                    <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md w-full text-center">
                      {t("invalidCredentials")}
                    </div>
                  )}
                </div>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent
            value="register"
            className="transition-all duration-500 ease-in-out"
            style={{
              transform:
                activeTab === "register" ? "translateX(0)" : "translateX(100%)",
              opacity: activeTab === "register" ? 1 : 0,
              position: activeTab === "register" ? "relative" : "absolute",
            }}
          >
            <form onSubmit={handleRegisterSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-amber-700">
                    {t("email")}
                  </Label>
                  <div className="relative group">
                    <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400 transition-colors duration-200" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-200"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-amber-700">
                    {t("password")}
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400 transition-colors duration-200" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-200"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-amber-700">
                    {t("confirmPassword")}
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400 transition-colors duration-200" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-10 pr-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400 transition-all duration-200"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600 transition-colors duration-200"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {registerError && (
                  <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                    {registerError}
                  </div>
                )}
              </CardContent>
              <CardFooter className="mt-4">
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white group relative overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300">
                    {t("registerButton")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
