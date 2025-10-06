"use client";
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type BaseButtonShared = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonLike = BaseButtonShared &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorLike = BaseButtonShared &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonLike | AnchorLike;

const baseStyles =
  'group relative inline-flex items-center justify-center font-medium whitespace-nowrap select-none rounded-full subpixel-antialiased transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm h-9 px-4 gap-2',
  md: 'text-sm h-11 px-6 gap-2',
  lg: 'text-base h-14 px-8 gap-3'
};

/* We simulate a fancy animated gradient border using a wrapper (the button itself) with 1px padding and an inner content span. */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    // Animated gradient border + subtle glass interior + glow on hover
    'p-[1px] bg-[linear-gradient(110deg,hsl(var(--primary))_0%,hsl(var(--secondary))_38%,hsl(var(--primary))_70%)] [background-size:200%_200%] animate-[gradient-shift_8s_linear_infinite] shadow-[0_4px_18px_-6px_hsl(var(--primary)/0.55)] hover:shadow-[0_6px_30px_-8px_hsl(var(--primary)/0.65)] text-primary-foreground',
  secondary:
    'p-[1px] bg-[linear-gradient(120deg,hsl(var(--secondary)/0.9),hsl(var(--primary)/0.9))] [background-size:160%_160%] animate-[gradient-shift_10s_linear_infinite] text-primary-foreground shadow-[0_3px_14px_-4px_hsl(var(--secondary)/0.55)] hover:shadow-[0_6px_26px_-8px_hsl(var(--secondary)/0.65)]',
  outline:
    'border border-border bg-bg/70 hover:border-primary/60 hover:bg-primary/5 backdrop-blur supports-[backdrop-filter]:bg-bg/40',
  ghost:
    'bg-transparent hover:bg-primary/10 text-fg/80 hover:text-fg'
};

// Inner layer for gradient variants (primary/secondary) to create a glass effect
function innerLayer(children: React.ReactNode, variant: ButtonVariant) {
  if (variant === 'primary' || variant === 'secondary') {
    return (
      <span
        className={cn(
          'relative inline-flex h-full w-full items-center justify-center rounded-[inherit] px-[calc(theme(spacing.6)-1px)]',
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] before:translate-x-[-120%] before:transition-transform before:duration-700 before:ease-out group-hover:before:translate-x-[120%]',
          'bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60'
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
        <span className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 blur group-hover:opacity-60 transition duration-500 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.55),transparent_70%)]" />
      </span>
    );
  }
  return <>{children}</>;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      loading = false,
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
  const Comp: any = href ? (asChild ? Link : external ? 'a' : Link) : 'button';
    const content = (
      <>
        {loading && (
          <svg
            className={cn(
              'size-4 animate-spin text-current',
              variant === 'primary' || variant === 'secondary' ? 'drop-shadow-[0_0_4px_hsl(var(--primary)/0.6)]' : ''
            )}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-85"
              d="M4 12a8 8 0 0 1 8-8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span>{children}</span>
      </>
    );

    const isGradientVariant = variant === 'primary' || variant === 'secondary';
    const paddingFix = isGradientVariant ? 'px-0' : '';

    const elementProps: any = href
      ? {
          href,
          ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})
        }
      : {};

    return (
      <Comp
        ref={ref}
        className={cn(
          baseStyles,
            sizeStyles[size],
          variantStyles[variant],
          paddingFix,
          'will-change-transform',
          className
        )}
        {...elementProps}
        {...props}
      >
        {innerLayer(content, variant)}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export default Button;
