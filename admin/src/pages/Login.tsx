import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/validation";

import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

type FormData = z.infer<typeof loginSchema>;

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {};

  return (
    <div className=" w-full min-h-screen  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="w-full max-w-md px-4"
      >
        <Card className=" bg-white/95 backdrop-blur-sm shadow-xl border-gray-200  space-y-2">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <CardTitle className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-500">
                Enter your credentials to sign in
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@example.com"
                          type="email"
                          disabled={isLoading}
                          className="border border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hoverEffect placeholder:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          disabled={isLoading}
                          className="border border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hoverEffect placeholder:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <div >
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 hoverEffect py-2">
                    <LogIn />
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-500">Don't have an account? <Link to={"/register"} className="text-indigo-600 hover:text-indigo-800 hoverEffect">Sign up</Link></p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
