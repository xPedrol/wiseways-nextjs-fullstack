type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode
  tSize?: 'sm' | 'md'
}
export default function IconButton({
  tSize = 'md',
  icon,
  ...rest
}: ButtonProps) {
  const buttonClass =
    tSize === 'md' ? 'right-2 top-[8px] h-8 w-8' : 'right-1 top-[4px] h-7 w-7'
  return (
    <button
      {...rest}
      className={`${buttonClass} absolute my-auto px-2 flex items-center bg-primary-a0 rounded-lg`}
    >
      {icon}
    </button>
  )
}
