import LoginForm from "@/components/forms/client-form-login";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, signInWithOtp, signUp } from "@/lib/actions";
import Link from "next/link";

export default function Login({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[375px]">
        <CardHeader>
          <CardTitle>Login Or SignUp</CardTitle>
          <CardDescription>
            Choose from one of the available options...
          </CardDescription>
        </CardHeader>
        <LoginForm
          signIn={signIn}
          signUp={signUp}
          searchParams={searchParams}
          signInWithOtp={signInWithOtp}
        />
        <CardFooter className="flex flex-col">
          <p> ⚡️ Secured by Supabase Auth ⚡️</p>
          <div className="underline">
            <Link href={"/"}> &larr; back to home</Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
