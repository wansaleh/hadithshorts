import clsx from 'clsx';

interface BtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
  className?: string;
  color?: 'red' | 'blue';
}

export default function Btn({
  isSelected,
  className,
  children,
  ...props
}: BtnProps) {
  return (
    <button
      type="button"
      className={clsx(
        'hover:bg-neutral-500/20 py-1.5 px-3 transition duration-200 leading-none rounded-full',
        isSelected && 'bg-neutral-500/20',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
