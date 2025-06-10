import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'neutral'; // Based on Figma component sets
  size?: 'small' | 'medium' | 'large'; // Based on Figma component sets
  hasIconStart?: boolean;
  hasIconEnd?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Added type prop
  className?: string; // Added className prop
  // Add other props as needed from Figma (e.g., specific component properties)
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  hasIconStart = false,
  hasIconEnd = false,
  iconStart,
  iconEnd,
  disabled = false,
  type = 'button', // Default to 'button'
  className = '', // Default to empty string
}) => {
  // Logic to combine class names based on props will go here
  // e.g., styles.button, styles.primary, styles.medium, etc.
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    className, // Add the passed className
  ].join(' ').trim(); // trim to remove any extra spaces if className is empty

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {hasIconStart && iconStart && <span className={styles.iconWrapper}>{iconStart}</span>}
      {children}
      {hasIconEnd && iconEnd && <span className={styles.iconWrapper}>{iconEnd}</span>}
    </button>
  );
};

export default Button;
