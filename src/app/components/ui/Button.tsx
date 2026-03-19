'use client';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

type BaseProps = {
  variant?: 'primary' | 'outline' | 'ghost' | 'white' | 'green';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

// Se tiver href, é um link (anchor)
type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

// Se não tiver href, é um botão
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
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-md';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-stone-700 shadow-sm hover:shadow-md border border-transparent',
    green:
      'bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-md border border-transparent',
    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-stone-100 border border-transparent',
    white:
      'bg-white text-primary hover:bg-stone-100 border border-transparent shadow-sm hover:shadow-md',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const combinedClassName = `${baseStyles} ${variants[variant]} ${widthStyles} ${className}`;

  // Helper to handle smooth scroll if it's an anchor link to an ID
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
