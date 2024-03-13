import React from "react";
import { createClient } from "@/utils/supabase/server";

import ButtonAuthDropdown from "@/components/buttons/button-auth-dropdown";
import LoginButton from "@/components/buttons/client-button-dynamic-login";

const RightNavBar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? <ButtonAuthDropdown user={user} /> : <LoginButton />;
};

export default RightNavBar;
