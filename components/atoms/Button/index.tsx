type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type TProps = {
  children: React.ReactNode
  size?: 'sm' | 'lg' | 'xs'
  color?: string
} & TButtonProps
export default function Button({
  children,
  size = 'lg',
  color = 'bg-primary-a0',
  ...rest
}: TProps) {
  let cClass = size !== 'sm' ? 'py-2' : 'py-1'
  if (rest.disabled) {
    cClass += ' cursor-not-allowed opacity-50'
  }
  return (
    <button
      {...rest}
      type="submit"
      className={`px-4 ${cClass}  ${color} rounded-lg text-${size}`}
    >
      {children}
    </button>
  )
}
