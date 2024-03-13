"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

export const signInWithOtp = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (error) {
    return redirect(
      `?message=Could not authenticate user, Error:${error.message}`
    );
  }

  return redirect(`/login?message=Check your  email for the magic link `);
};

export const signIn = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/login?message=Could not authenticate user`);
  }

  return redirect("/");
};

export const signUp = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/login?message=Could not authenticate user`);
  }

  return redirect(`/login?message=Check email to continue sign in process`);
};

export const loginWithGoogle = async () => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
};
