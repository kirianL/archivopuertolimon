import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  light: "bg-cream text-ink focus-visible:outline-ink",
  dark: "bg-ink text-cream focus-visible:outline-ink",
};

type ButtonProps = ComponentProps<typeof Link> & { variant?: keyof typeof variants };

export function Button({ variant = "light", className = "", ...props }: ButtonProps) {
  return (
    <Link
      className={`font-display inline-flex h-10 items-center rounded-[5px] px-4 text-lg transition-transform duration-150 ease-out hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
