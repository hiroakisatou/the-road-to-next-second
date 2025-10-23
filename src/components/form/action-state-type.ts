export type ActionStateStatus = "SUCCESS" | "ERROR";

export type ActionState = {
  status?: ActionStateStatus;
  message?: string;
  payload?: FormData;
  fieldErrors?: Record<string,  string[] | undefined >;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};