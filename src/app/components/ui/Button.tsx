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
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: LinkProps | ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-lg';

  const variants = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 shadow-md border border-transparent',
    secondary:
      'border-2 border-secondary-900 text-secondary-900 bg-transparent hover:bg-secondary-900 hover:text-white',
    green:
      'bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-sm hover:shadow-md border border-transparent',
    outline:
      'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost:
      'text-text-secondary hover:bg-primary-50 hover:text-primary-600 border border-transparent',
    white:
      'bg-white text-secondary-900 hover:bg-primary-50 border border-transparent shadow-sm hover:shadow-md',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    widthStyles,
    className
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (props as LinkProps).href;
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      if ((props as LinkProps).onClick) {
        (props as LinkProps).onClick!(e);
      }
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
