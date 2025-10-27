"use client";

import { useActionState } from "react";

import { EMPTY_ACTION_STATE } from "@/components/form/action-state-type";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/sujbmit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signUp } from "@/futures/auth/actions/sign-up";

const SignUpForm = () => {
  const [actionState, action, isPending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={actionState.payload?.get("name") as string}
      />
      <FieldError actionState={actionState} fieldName="name" />

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

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} fieldName="confirmPassword" />

      <SubmitButton label="Sign Up" isPending={isPending} />
    </Form>
  );
};

export { SignUpForm };
