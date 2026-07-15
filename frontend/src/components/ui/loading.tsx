import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ size = "default", text, fullScreen = false, className, ...props }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-4";

  return (
    <div className={cn(containerClasses, className)} {...props}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
}
