"use client";

import { email, z } from "zod";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

import{
  Form, FormControl,
  FormField,
  FormItem, FormLabel,
  FormMessage
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email(),
  password: z.string().min(1,  { message: "Password is required." }),
  confirmPassword: z.string().min(1,  { message: "Please confirm your password." }),
  rememberMe: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { use, useState } from "react";
import { authClient } from "@/lib/auth-client";

export const SignUpView = () => {
const router = useRouter();
const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    },
    {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
      onError: ({error}) => {
        setError( error.message);
      }
    }
  );

  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              < div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-2xl font-bold">lets get started</h2>
                  <p className="text-muted-foreground text-balance">
                    create your account 
                  </p>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>

                  <div className="grid gap-3 ">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   
                
                  </div>
                     <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                   
                
                  </div>
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 text-destructive border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{`Sign in failed`}</AlertTitle>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
             
            </form>
          </Form>
          <div className="bg-radial from-blue-400 to-blue-500 relative hidden md:flex flex-col gap-y-4 items-center justify-center p-8 text-white">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            
            <p className="text-2xl font-semibold text-white">
              Meet.AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        © 2025 DEPLOYED BY EMAN ONOUR :).
      </div>

    </div>
  );
};
// https://localhost:3000/auth/sign-up 