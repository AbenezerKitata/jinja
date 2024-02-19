"use client";

import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsMagicLinkChecked(event.target.checked);
  };

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={signIn}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        hidden={isMagicLinkChecked}
        required={!isMagicLinkChecked}
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          name="magiclink"
          className="mr-2"
          onChange={handleCheckboxChange}
        />
        Use Magiclink instead
      </label>
      <button
        className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        hidden={!isMagicLinkChecked}
        formAction={signInWithOtp}
      >
        Send magic link
      </button>
      <button
        hidden={isMagicLinkChecked}
        className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
      >
        Sign In
      </button>
      <button
        hidden={isMagicLinkChecked}
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
      >
        Sign Up
      </button>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
