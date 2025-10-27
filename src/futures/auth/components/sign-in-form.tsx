"use client";

import { useActionState } from "react";

import { EMPTY_ACTION_STATE } from "@/components/form/action-state-type";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/sujbmit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/futures/auth/actions/sign-in";

const SignInForm = () => {
  const [actionState, action, isPending] = useActionState(
    signIn,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} fieldName="email" />

      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} fieldName="password" />

      <SubmitButton label="Sign In" isPending={isPending} />
    </Form>
  );
};

export { SignInForm };
