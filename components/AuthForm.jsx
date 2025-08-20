"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction, resendConfirmationAction } from "@/actions/users";

function AuthForm({ type }) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    startTransition(async () => {
      let errorMessage;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
      }

      if (!errorMessage) {
        router.replace("/");
        toast.success(isLoginForm ? "Logged in successfully!" : "Signed up successfully!");
      } else if (errorMessage === "Email not confirmed") {
        toast(
          <div>
            Your email is not confirmed.{" "}
            <button
              className="underline ml-1"
              onClick={async () => {
                const result = await resendConfirmationAction(email); // server action
                if (!result.errorMessage) toast.success("Confirmation email resent!");
                else toast.error(result.errorMessage);
              }}
            >
              Resend
            </button>
          </div>
        );
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required disabled={isPending} />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required disabled={isPending} />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : isLoginForm ? "Login" : "Sign Up"}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <Link href={isLoginForm ? "/sign-up" : "/login"} className="text-blue-500 underline">
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
