type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type TProps = {
  children: React.ReactNode
  size?: 'sm' | 'lg' | 'xl' | 'xs'
} & TButtonProps
export default function Button({ children, size = 'lg', ...rest }: TProps) {
  return (
    <button
      {...rest}
      type="submit"
      className={`px-4 py-2 bg-primary-a20 rounded-xl text-${size}`}
    >
      {children}
    </button>
  )
}
