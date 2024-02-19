import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/login-form";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const origin = headers().get("origin");

  const signInWithOtp = async (formData: FormData) => {
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
        `/login?message=Could not authenticate user, Error:${error.message}`
      );
    }

    return redirect("/login?message=Check your  email for the magic link ");
  };

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <LoginForm
        signIn={signIn}
        signUp={signUp}
        searchParams={searchParams}
        signInWithOtp={signInWithOtp}
      />
    </div>
  );
}
