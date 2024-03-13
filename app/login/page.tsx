import LoginForm from "@/components/forms/client-form-login";
import { signIn, signInWithOtp, signUp } from "@/lib/actions";

export default function Login({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <LoginForm
      signIn={signIn}
      signUp={signUp}
      searchParams={searchParams}
      signInWithOtp={signInWithOtp}
    />
  );
}
