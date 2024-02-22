"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import GoogleButtonAuth from "./button-google-auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .optional(),
});

const LoginForm = ({
  signIn,
  signUp,
  signInWithOtp,
  searchParams,
  signInWithGoogle,
}: {
  signIn: (formData: FormData) => Promise<never>;
  signUp: (formData: FormData) => Promise<never>;
  signInWithOtp: (formData: FormData) => Promise<never>;
  signInWithGoogle: () => Promise<undefined>;
  searchParams: {
    message?: string;
  };
}) => {
  const [isMagicLinkChecked, setIsMagicLinkChecked] = useState(false);
  const [signUpInit, setSignUpInit] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = (action: (data: FormData) => Promise<any>) => {
    setLoading(true);
    console.log("here");
    const formData = new FormData();
    formData.append("email", form.getValues().email);
    formData.append("password", form.getValues().password || "");
    action(formData).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" name="email" placeholder="" />
                </FormControl>
              </FormItem>
            )}
          />

          {!isMagicLinkChecked && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      name="password"
                      placeholder=""
                      required={!isMagicLinkChecked}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <div className="flex flex-col gap-4">
            {!signUpInit ? (
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="magic-link"
                    onCheckedChange={() => {
                      setIsMagicLinkChecked(!isMagicLinkChecked);
                    }}
                  />
                  <label htmlFor="magic-link">Use Magic Link</label>
                </div>
                {!isMagicLinkChecked && (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="sign-up"
                      onCheckedChange={() => {
                        setSignUpInit(!signUpInit);
                      }}
                    />
                    <label htmlFor="sign-up">New User</label>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="sign-up"
                  onCheckedChange={() => {
                    setSignUpInit(!signUpInit);
                  }}
                />
                <label htmlFor="sign-up">Already Have an account</label>
              </div>
            )}

            {isMagicLinkChecked ? (
              <Button
                disabled={loading}
                formAction={() => {
                  handleFormSubmit(signInWithOtp);
                }}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Send Magic Link"
                )}
              </Button>
            ) : (
              <div className="flex flex-col gap-4">
                {!signUpInit && (
                  <Button
                    disabled={loading}
                    type="button"
                    onClick={() => handleFormSubmit(signIn)}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                )}
                {signUpInit && (
                  <Button
                    disabled={loading}
                    formAction={() => {
                      handleFormSubmit(signUp);
                    }}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </form>
      </Form>
      <div className="p-4">{searchParams?.message}</div>
      <div className="w-full" onClick={() => setLoading(true)}>
        <GoogleButtonAuth />
      </div>
    </div>
  );
};

export default LoginForm;
