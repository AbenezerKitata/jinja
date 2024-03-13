import Image from "next/image";
import React from "react";
import { createClient } from "@/utils/supabase/server";

const ProfileAuthImage = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <Image
      src={user.user?.user_metadata.avatar_url || ""}
      alt="user avatar"
      width={100}
      height={100}
    />
  );
};

export default ProfileAuthImage;
