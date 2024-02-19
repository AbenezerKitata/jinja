"use client";

import React, { ChangeEvent, useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
}: {
  signIn: (formData: FormData) => Promise<never>;
  signUp: (formData: FormData) => Promise<never>;
  signInWithOtp: (formData: FormData) => Promise<never>;
  searchParams: {
    message: string;
  };
}) => {
  const [isMagicLinkChecked, setIsMagicLinkChecked] = useState(false);
  const [signUpInit, setSignUpInit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form action={signIn} className="flex flex-col gap-4">
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
                      console.log("clicked");
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
                        console.log("clicked");
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
                    console.log("clicked");
                    setSignUpInit(!signUpInit);
                  }}
                />
                <label htmlFor="sign-up">Already Have an account</label>
              </div>
            )}

            {isMagicLinkChecked ? (
              <Button formAction={signInWithOtp}>Send Magic Link</Button>
            ) : (
              <div className="flex flex-col gap-4">
                {!signUpInit && <Button type="submit">Log In</Button>}
                {signUpInit && <Button formAction={signUp}>Sign Up</Button>}
              </div>
            )}
          </div>
        </form>
      </Form>
      <div>{searchParams.message}</div>
    </div>
  );
};

export default LoginForm;
