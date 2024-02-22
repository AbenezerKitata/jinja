import { createClient } from "@/utils/supabase/server";
import LoginButton from "./button-dynamic-login";

import ButtonAuthDropdown from "./button-auth-dropdown";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? <ButtonAuthDropdown user={user} /> : <LoginButton />;
}
