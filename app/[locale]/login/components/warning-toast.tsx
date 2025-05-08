"use client";

import { toast as sonnerToast } from "sonner";
import { AlertTriangle } from "lucide-react";

type WarningToastProps = {
  title: string;
  description?: string;
};

export function warningToast({ title, description }: WarningToastProps) {
  return sonnerToast.custom(
    (id) => (
      <div className="flex w-full gap-3 rounded-md border border-destructive bg-red-200/80 p-4 text-destructive">
        <AlertTriangle className="h-5 w-5" />
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
      </div>
    ),
    {
      duration: 5000,
    }
  );
}
