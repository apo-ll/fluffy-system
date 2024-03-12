
import { cn } from "@/config/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "transition-all duration-300 font-medium focus:outline focus:outline-2 focus:outline-offset-4 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/80 py-2 px-5",
        outline: "border-white border-2 py-2 px-5 hover:bg-white/20",
        tertiary: "bg-transparent hover:bg-gray-200 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Button = ({ className, children, variant, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export { buttonVariants, Button };

