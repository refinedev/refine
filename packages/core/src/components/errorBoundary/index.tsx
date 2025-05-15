import React from "react";
import { useNotification } from "@hooks/notification";
import { useTranslate } from "../../hooks/translate";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
  onError,
}) => {
  const [state, setState] = React.useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
  });

  const { open } = useNotification();
  const translate = useTranslate();

  React.useEffect(() => {
    if (state.hasError && state.error) {
      // Log error to monitoring service
      console.error("Refine Error:", state.error);

      // Show error notification
      open?.({
        type: "error",
        message: translate("errors.error", "Error"),
        description: state.error.message,
      });

      // Call onError callback if provided
      onError?.(state.error, {
        componentStack: state.error.stack || "",
      });
    }
  }, [state.hasError, state.error]);

  if (state.hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <h2>{translate("errors.error", "Error")}</h2>
        <p>{state.error?.message}</p>
        <button
          onClick={() => {
            setState({ hasError: false, error: null });
          }}
        >
          {translate("buttons.tryAgain", "Try Again")}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}; 