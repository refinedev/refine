import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import { X } from "lucide-react";

export function useNotificationProvider(): NotificationProvider {
  return {
    open: ({
      key,
      type,
      message,
      description,
      undoableTimeout,
      cancelMutation,
    }) => {
      if (type === "success") {
        toast.success(message, {
          id: key,
          description,
          richColors: true,
        });
      }

      if (type === "error") {
        toast.error(message, {
          id: key,
          description,
          richColors: true,
        });
      }

      if (type === "progress") {
        const toastId = key || Date.now();

        toast.custom(
          () => (
            <UndoableNotification
              message={message}
              description={description}
              undoableTimeout={undoableTimeout}
              cancelMutation={cancelMutation}
              onClose={() => toast.dismiss(toastId)}
            />
          ),
          {
            id: toastId,
            duration: (undoableTimeout || 5) * 1000,
          },
        );
      }
    },
    close: (id) => {
      toast.dismiss(id);
    },
  };
}

type UndoableNotificationProps = {
  message: string;
  description?: string;
  undoableTimeout?: number;
  cancelMutation?: () => void;
  onClose?: () => void;
};

function UndoableNotification({
  message,
  description,
  undoableTimeout = 5,
  cancelMutation,
  onClose,
}: UndoableNotificationProps) {
  const [countdown, setCountdown] = React.useState(undoableTimeout);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const handleUndo = () => {
    cancelMutation?.();
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Card className="w-full max-w-md shadow-lg border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <div className="font-medium text-foreground">{message}</div>
            {description && (
              <div className="text-sm text-muted-foreground mt-1">
                {description}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-2">
              Auto-closes in {countdown}s
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              className="h-8 px-3 text-xs"
            >
              Undo
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

UndoableNotification.displayName = "UndoableNotification";
