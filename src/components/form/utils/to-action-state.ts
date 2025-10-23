import { ActionState, ActionStateStatus } from "@/components/form/action-state-type";
import z, { ZodError } from "zod";

export const fromErrorToActionState = (error: unknown, formDate?: FormData): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: z.flattenError(error).fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "Something went wrong. Please try again later.",
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};


export const toActionState = (status: ActionStateStatus, message: string): ActionState => {
  return {
    status,
    message,
    fieldErrors:{},
    timestamp: Date.now(),
  };
}