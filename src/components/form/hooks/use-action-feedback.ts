"use client";

import { useEffect, useRef } from "react";

import type { ActionState } from "../action-state-type";

type onArgs = {
  actionState: ActionState;
};

type useActionFeedbackOptions = {
  onSuccess?: (args: onArgs) => void;
  onError?: (args: onArgs) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: useActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
};
