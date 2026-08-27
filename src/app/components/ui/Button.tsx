'use client';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '../../lib/utils';

type BaseProps = {
  variant?: 'primary' | 'outline' | 'ghost' | 'white' | 'green' | 'secondary';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: LinkProps | ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-md';

  const variants = {
    primary:
      'border-2 border-primary-500 bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg',
    secondary:
      'border-2 border-secondary-900 text-secondary-900 bg-transparent hover:bg-secondary-900 hover:text-white',
    green:
      'bg-whatsapp text-white hover:bg-whatsapp-hover shadow-sm hover:shadow-md border border-transparent',
    outline:
      'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost:
      'text-text-secondary hover:bg-primary-50 hover:text-primary-600 border border-transparent',
    white:
      'bg-white text-secondary-950 hover:bg-primary-50 border border-transparent shadow-md hover:shadow-lg',
  };

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    fullWidth ? 'w-full' : '',
    className
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (props as LinkProps).href;
    if (href?.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      (props as LinkProps).onClick?.(e);
    }
  };

  if ((props as LinkProps).href) {
    const { href, ...rest } = props as LinkProps;
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={handleScroll}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
