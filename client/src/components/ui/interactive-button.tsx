import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  animation?: "scale" | "slide" | "glow" | "bounce";
  ripple?: boolean;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ className, variant = "primary", animation = "scale", ripple = true, size = "md", children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300 ease-out transform inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    
    const variantClasses = {
      primary: "bg-stone-blue hover:bg-stone-blue-dark text-white shadow-lg hover:shadow-xl focus:ring-stone-blue",
      secondary: "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl focus:ring-gray-300",
      outline: "border-2 border-current bg-transparent hover:bg-current hover:text-white focus:ring-current",
      ghost: "bg-transparent hover:bg-white/10 backdrop-blur-sm focus:ring-white/20"
    };
    
    const animationClasses = {
      scale: "hover:scale-105 active:scale-95",
      slide: "hover:translate-y-[-2px] active:translate-y-0",
      glow: "hover:shadow-2xl hover:shadow-stone-blue/25",
      bounce: "hover:animate-bounce-gentle active:scale-95"
    };
    
    const rippleClasses = ripple ? "before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:transition-transform before:duration-300 active:before:scale-100" : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          animationClasses[animation],
          rippleClasses,
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";

export { InteractiveButton };