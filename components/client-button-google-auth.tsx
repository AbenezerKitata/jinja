"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButtonAuth() {
  const supabase = createClient();
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex gap-2"
      type="button"
      onClick={() => {
        loginWithGoogle();
      }}
    >
      <FcGoogle /> <span>Continue With Google</span>
    </Button>
  );
}
