
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'number' | 'operator' | 'function';
  className?: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, variant = 'number', active = false, className = '', ...props }) => {
  const baseClasses = 'h-20 rounded-full text-3xl font-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-400 transition-all duration-150 flex items-center justify-center';

  const variantClasses = {
    number: 'bg-gray-700 hover:bg-gray-600 text-white',
    operator: 'bg-orange-500 hover:bg-orange-400 text-white text-4xl',
    function: 'bg-gray-500 hover:bg-gray-400 text-white',
  };
  
  const activeOperatorClass = active ? 'bg-white text-orange-500' : variantClasses.operator;

  const finalClasses = `${baseClasses} ${variant === 'operator' ? activeOperatorClass : variantClasses[variant]} ${className}`;
  
  return (
    <button
      className={finalClasses}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
