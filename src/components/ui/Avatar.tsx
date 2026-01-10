import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  name: string;
  className?: string;
}

export const Avatar = ({ name, className }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const colors = [
    'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200',
    'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-200',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200',
    'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200',
  ];
  
  const colorIndex = name.length % colors.length;

  return (
    <div
      className={twMerge(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 border-bg-card',
        colors[colorIndex],
        className
      )}
    >
      {initials}
    </div>
  );
};