type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode
  tSize?: 'sm' | 'md'
}
export default function IconButton({
  tSize = 'md',
  icon,
  ...rest
}: ButtonProps) {
  const buttonClass = tSize === 'md' ? 'right-2 top-2' : 'right-1 top-1'
  return (
    <button
      {...rest}
      className={`${buttonClass} absolute h-8 w-8 my-auto px-2 flex items-center bg-primary-a0 rounded-lg`}
    >
      {icon}
    </button>
  )
}
