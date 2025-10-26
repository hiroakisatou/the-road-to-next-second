import { ApiError } from "next/dist/server/api-utils";
import z, { ZodError } from "zod";

import type {
  ActionState,
  ActionStateStatus,
} from "@/components/form/action-state-type";

export const fromErrorToActionState = (
  error: unknown,
  payload?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      payload,
      fieldErrors: z.flattenError(error).fieldErrors,
      timestamp: Date.now(),
    };
  }
  if (error instanceof ApiError) {
    if (error.message === "User already exists. Use another email.") {
      return {
        status: "ERROR",
        message: "This email is already in use",
        fieldErrors: {},
        payload,
        timestamp: Date.now(),
      };
    }
    console.error("Unexpeccted APIerror:", error.message);
    return {
      status: "ERROR",
      message: "Something went wrong. Please try again later.",
      fieldErrors: {},
      payload,
      timestamp: Date.now(),
    };
  }
  if (error instanceof Error) {
    console.error("Unexpeccted error:", error.message);
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload,
      timestamp: Date.now(),
    };
  }
  // other error types are handled by the default case
  return {
    status: "ERROR",
    message: "Something went wrong. Please try again later.",
    fieldErrors: {},
    payload,
    timestamp: Date.now(),
  };
};

export const toActionState = (
  status: ActionStateStatus,
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
