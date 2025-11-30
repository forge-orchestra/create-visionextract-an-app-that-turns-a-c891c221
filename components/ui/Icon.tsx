import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps extends LucideProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className, ...props }) => {
  const IconComponent = LucideIcon[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" does not exist in Lucide React.`);
    return null;
  }

  return (
    <span role="img" aria-label={name} className={cn('inline-flex', className)}>
      <IconComponent size={size} color={color} {...props} />
    </span>
  );
};

export default Icon;