import Link from "next/link";

import { CardCompact } from "@/components/card-compact";

import { SignInForm } from "@/futures/auth/components/sign-in-form";
import { passwordForgetPath, signUpPath } from "@/path";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              Don't have an account? Sign Up now.
            </Link>

            <Link
              href={passwordForgetPath()}
              className="text-sm text-muted-foreground"
            >
              Forgot your password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignInPage;
