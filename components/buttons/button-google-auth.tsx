import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/lib/actions";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButtonAuth() {
  return (
    <Button
      variant="outline"
      className="flex gap-2 w-full"
      type="button"
      onClick={() => {
        loginWithGoogle();
      }}
    >
      <FcGoogle /> <span>Continue With Google</span>
    </Button>
  );
}
